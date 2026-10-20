-- Thar Manjushree School - realtime publication for the staff dashboard
-- Run AFTER 0002_auth_hardening.sql.
--
-- Why: the admin areas (Admissions inbox, Monks roster) subscribe to
-- postgres_changes so a decision taken on one device shows up on the
-- others without a refresh. Realtime only streams tables that are part
-- of the `supabase_realtime` publication, so the two operational tables
-- are added here. Content/organisation tables stay out of the stream:
-- they change through the CMS and are reloaded on demand.
--
-- RLS still applies: a subscriber only receives rows the policy lets it
-- read, so anonymous visitors never see guardians or fee balances.

-- =====================================================================
-- 1. Create the publication when the project does not have one yet
--    (Supabase projects normally ship with it already present).
-- =====================================================================

do $$
begin
  if not exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    create publication supabase_realtime;
  end if;
end
$$;

-- =====================================================================
-- 2. Add the operational tables, tolerating a re-run
--    (alter publication ... add table fails if the table is already a
--    member, so each add is guarded by a catalogue check).
-- =====================================================================

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'admissions'
  ) then
    alter publication supabase_realtime add table public.admissions;
  end if;

  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'monks'
  ) then
    alter publication supabase_realtime add table public.monks;
  end if;
end
$$;

-- =====================================================================
-- 3. Replica identity for deletes
--    DELETE payloads need the key columns. The primary key is already
--    part of the default identity, so nothing further is required;
--    this note exists so the migration stays self-documenting if the
--    tables gain composite keys later.
-- =====================================================================
