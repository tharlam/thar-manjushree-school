-- Thar Manjushree School - payments hardening
-- Run AFTER 0002_auth_hardening.sql.

-- =====================================================================
-- 1. Lock down donation inserts.
--    Public users must NOT be able to insert "completed" donations
--    directly (that would let anyone fake the transparency totals).
--    Verified payments are inserted by the verify-donation Edge Function
--    using the service role (RLS bypassed). Admins insert via the
--    admin RLS policy.
-- =====================================================================

drop policy if exists donations_insert_public on public.donations;

-- =====================================================================
-- 2. Gateway integrity
-- =====================================================================

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'donations_gateway_check') then
    alter table public.donations add constraint donations_gateway_check
      check (payment_gateway is null or payment_gateway in ('khalti', 'esewa', 'stripe'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'donations_ref_check') then
    alter table public.donations add constraint donations_ref_check
      check (payment_ref is null or length(payment_ref) <= 64);
  end if;
end $$;

-- A verified payment reference is unique: retries cannot double-record.
create unique index if not exists idx_donations_payment_ref
  on public.donations(payment_ref)
  where payment_ref is not null;
