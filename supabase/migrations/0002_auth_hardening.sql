-- Thar Manjushree School - auth hardening + server-side validation
-- Run AFTER 0001_init.sql (order matters; `supabase db reset` applies in order).

-- =====================================================================
-- 1. Restrict monk data
--    Public no longer reads the monks table directly. It gets a lean
--    view (id, code, name, class_id, status, joined, sponsor) so
--    guardian / fee_balance / contact details are never exposed.
-- =====================================================================

drop policy if exists monks_read_public on public.monks;

create policy "monks_read_admin" on public.monks
  for select to authenticated
  using (public.is_admin());

revoke select on public.monks from anon;

create or replace view public.monks_public as
select id, code, name, class_id, status, joined, sponsor
from public.monks;

grant select on public.monks_public to anon, authenticated;

-- =====================================================================
-- 2. Server-side validation: CHECK constraints
--    These run in Postgres, so even direct API calls (bypassing the UI)
--    are rejected for malformed data.
-- =====================================================================

do $$
begin
  -- admissions -------------------------------------------------------
  if not exists (select 1 from pg_constraint where conname = 'admissions_name_check') then
    alter table public.admissions add constraint admissions_name_check
      check (length(trim(name)) between 2 and 120);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'admissions_guardian_check') then
    alter table public.admissions add constraint admissions_guardian_check
      check (length(trim(guardian)) between 2 and 120);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'admissions_phone_check') then
    alter table public.admissions add constraint admissions_phone_check
      check (length(trim(phone)) between 7 and 20);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'admissions_age_check') then
    alter table public.admissions add constraint admissions_age_check
      check (age is null or age between 5 and 18);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'admissions_email_check') then
    alter table public.admissions add constraint admissions_email_check
      check (email = '' or email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$');
  end if;
  if not exists (select 1 from pg_constraint where conname = 'admissions_message_check') then
    alter table public.admissions add constraint admissions_message_check
      check (length(message) <= 2000);
  end if;

  -- contact_messages --------------------------------------------------
  if not exists (select 1 from pg_constraint where conname = 'contact_name_check') then
    alter table public.contact_messages add constraint contact_name_check
      check (length(trim(name)) between 1 and 120);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'contact_email_check') then
    alter table public.contact_messages add constraint contact_email_check
      check (email = '' or email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$');
  end if;
  if not exists (select 1 from pg_constraint where conname = 'contact_subject_check') then
    alter table public.contact_messages add constraint contact_subject_check
      check (length(subject) <= 200);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'contact_message_check') then
    alter table public.contact_messages add constraint contact_message_check
      check (length(trim(message)) between 1 and 4000);
  end if;

  -- donations ---------------------------------------------------------
  if not exists (select 1 from pg_constraint where conname = 'donations_name_check') then
    alter table public.donations add constraint donations_name_check
      check (length(trim(name)) between 1 and 120);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'donations_email_check') then
    alter table public.donations add constraint donations_email_check
      check (email = '' or email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$');
  end if;
  if not exists (select 1 from pg_constraint where conname = 'donations_amount_check') then
    alter table public.donations add constraint donations_amount_check
      check (amount > 0 and amount <= 1000000);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'donations_note_check') then
    alter table public.donations add constraint donations_note_check
      check (length(note) <= 1000);
  end if;
end $$;

-- =====================================================================
-- 3. Server-side sanitization: BEFORE INSERT/UPDATE triggers
--    Trim strings, strip control characters, normalize email/amount.
-- =====================================================================

create or replace function public.sanitize_public_form()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if TG_TABLE_NAME = 'admissions' then
    new.name := btrim(regexp_replace(new.name, '[\x00-\x1F\x7F]', '', 'g'));
    new.guardian := btrim(regexp_replace(new.guardian, '[\x00-\x1F\x7F]', '', 'g'));
    new.phone := btrim(regexp_replace(new.phone, '[\x00-\x1F\x7F]', '', 'g'));
    new.email := lower(btrim(new.email));
    new.address := btrim(regexp_replace(new.address, '[\x00-\x1F\x7F]', '', 'g'));
    new.education := btrim(regexp_replace(new.education, '[\x00-\x1F\x7F]', '', 'g'));
    new.class_requested := btrim(new.class_requested);
    new.message := btrim(new.message);
  elsif TG_TABLE_NAME = 'contact_messages' then
    new.name := btrim(regexp_replace(new.name, '[\x00-\x1F\x7F]', '', 'g'));
    new.email := lower(btrim(new.email));
    new.subject := btrim(new.subject);
    new.message := btrim(regexp_replace(new.message, '[\x00-\x1F\x7F]', '', 'g'));
  elsif TG_TABLE_NAME = 'donations' then
    new.name := btrim(regexp_replace(new.name, '[\x00-\x1F\x7F]', '', 'g'));
    new.email := lower(btrim(new.email));
    new.note := btrim(new.note);
    new.amount := round(new.amount::numeric, 2);
  end if;
  return new;
end;
$$;

create trigger trg_admissions_sanitize
  before insert or update on public.admissions
  for each row execute function public.sanitize_public_form();

create trigger trg_contact_messages_sanitize
  before insert or update on public.contact_messages
  for each row execute function public.sanitize_public_form();

create trigger trg_donations_sanitize
  before insert or update on public.donations
  for each row execute function public.sanitize_public_form();
