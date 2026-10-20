-- Thar Manjushree School - initial schema
-- Target: Supabase (Postgres 15+). Run with `supabase db push` or the SQL editor.
--
-- IDEMPOTENT: this file is safe to run any number of times. Tables use
-- `if not exists`, every policy/trigger is dropped before being created, and
-- the function bodies use `create or replace`. It can also repair a partially
-- applied run (e.g. after a failed first attempt).

-- =====================================================================
-- 1. Tables (dependency order)
--    NOTE: `is_admin()` is created in section 3, AFTER admin_users exists,
--    so this file no longer fails on a fresh database.
-- =====================================================================

create table if not exists public.classes (
  id text primary key,                 -- e.g. 'L1', 'A1'
  name text not null,
  students integer not null default 0,
  teacher text not null default '',
  room text not null default '',
  color text not null default '#8C1F28'
);

create table if not exists public.monks (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,           -- legacy display id, e.g. 'TM-1001'
  name text not null,
  class_id text references public.classes(id) on delete set null,
  status text not null default 'enrolled' check (status in ('enrolled', 'pending', 'graduated', 'withdrawn')),
  guardian text not null default '',
  joined date,
  attendance_rate numeric not null default 0,
  fee_balance numeric not null default 0,
  sponsor text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  monk_id uuid not null references public.monks(id) on delete cascade,
  date date not null,
  status text not null check (status in ('present', 'absent', 'late', 'leave')),
  note text not null default '',
  created_at timestamptz not null default now(),
  unique (monk_id, date)
);

create table if not exists public.page_content (
  page text not null,                  -- e.g. 'home'
  field text not null,                 -- e.g. 'heroTitle'
  lang text not null check (lang in ('en', 'ne', 'bo')),
  value text not null default '',
  updated_at timestamptz not null default now(),
  primary key (page, field, lang)
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  date date not null default current_date,
  title_en text not null default '',
  title_ne text not null default '',
  title_bo text not null default '',
  body_en text not null default '',
  body_ne text not null default '',
  body_bo text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  category text not null default 'school' check (category in ('festival', 'ceremony', 'school')),
  url text not null,
  storage_path text,
  uploaded_at date not null default current_date,
  created_at timestamptz not null default now()
);

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  type text not null default 'donation' check (type in ('fee', 'sponsorship', 'donation')),
  name text not null default 'Anonymous Devotee',
  email text not null default '',
  amount numeric not null check (amount > 0),
  currency text not null default 'USD',
  status text not null default 'pending' check (status in ('pending', 'completed', 'failed')),
  payment_gateway text,                -- 'esewa' | 'khalti' | 'stripe' (added in payments step)
  payment_ref text,
  monk text not null default '',       -- display name of linked monk (frontend uses names)
  note text not null default '',
  date date not null default current_date,
  created_at timestamptz not null default now()
);

create table if not exists public.admissions (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'pending' check (status in ('pending', 'approved', 'declined')),
  submitted_at date not null default current_date,
  name text not null,
  guardian text not null default '',
  email text not null default '',
  dob date,
  age integer,
  phone text not null default '',
  address text not null default '',
  education text not null default '',
  class_requested text not null default 'Level 1',
  message text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null default '',
  subject text not null default '',
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  name text not null default '',
  role text not null default 'admin' check (role in ('admin', 'teacher', 'accountant')),
  permissions text[] not null default array['Full access'],
  color text not null default '#8C1F28',
  created_at timestamptz not null default now()
);

-- =====================================================================
-- 2. Indexes
-- =====================================================================

create index if not exists idx_monks_class_id on public.monks(class_id);
create index if not exists idx_attendance_monk_id on public.attendance(monk_id);
create index if not exists idx_attendance_date on public.attendance(date);
create index if not exists idx_donations_created_at on public.donations(created_at desc);
create index if not exists idx_donations_status on public.donations(status);
create index if not exists idx_admissions_created_at on public.admissions(created_at desc);
create index if not exists idx_announcements_date on public.announcements(date desc);

-- =====================================================================
-- 3. Helpers
--    Created AFTER the tables so the function body always resolves.
-- =====================================================================

-- Returns true when the current auth user is a registered admin.
-- security definer so the function bypasses RLS on admin_users.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin_users
    where id = auth.uid()
  );
$$;

-- =====================================================================
-- 4. Storage - gallery bucket
-- =====================================================================

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

drop policy if exists "gallery_files_public_read" on storage.objects;
create policy "gallery_files_public_read" on storage.objects
  for select using (bucket_id = 'gallery');

drop policy if exists "gallery_files_admin_write" on storage.objects;
create policy "gallery_files_admin_write" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'gallery' and public.is_admin());

drop policy if exists "gallery_files_admin_update" on storage.objects;
create policy "gallery_files_admin_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'gallery' and public.is_admin());

drop policy if exists "gallery_files_admin_delete" on storage.objects;
create policy "gallery_files_admin_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'gallery' and public.is_admin());

-- =====================================================================
-- 5. Row Level Security
-- =====================================================================

alter table public.classes enable row level security;
alter table public.monks enable row level security;
alter table public.attendance enable row level security;
alter table public.page_content enable row level security;
alter table public.announcements enable row level security;
alter table public.gallery_photos enable row level security;
alter table public.donations enable row level security;
alter table public.admissions enable row level security;
alter table public.contact_messages enable row level security;
alter table public.admin_users enable row level security;

-- classes -------------------------------------------------------------------
drop policy if exists "classes_read_public" on public.classes;
create policy "classes_read_public" on public.classes
  for select using (true);
drop policy if exists "classes_write_admin" on public.classes;
create policy "classes_write_admin" on public.classes
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- monks ---------------------------------------------------------------------
-- NOTE: full monk rows are readable by the public here for prototype parity.
-- The auth step (0002) restricts this to a public view (names/status only).
drop policy if exists "monks_read_public" on public.monks;
create policy "monks_read_public" on public.monks
  for select using (true);
drop policy if exists "monks_write_admin" on public.monks;
create policy "monks_write_admin" on public.monks
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- attendance ----------------------------------------------------------------
drop policy if exists "attendance_read_admin" on public.attendance;
create policy "attendance_read_admin" on public.attendance
  for select to authenticated
  using (public.is_admin());
drop policy if exists "attendance_write_admin" on public.attendance;
create policy "attendance_write_admin" on public.attendance
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- page_content --------------------------------------------------------------
drop policy if exists "page_content_read_public" on public.page_content;
create policy "page_content_read_public" on public.page_content
  for select using (true);
drop policy if exists "page_content_write_admin" on public.page_content;
create policy "page_content_write_admin" on public.page_content
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- announcements -------------------------------------------------------------
drop policy if exists "announcements_read_public" on public.announcements;
create policy "announcements_read_public" on public.announcements
  for select using (true);
drop policy if exists "announcements_write_admin" on public.announcements;
create policy "announcements_write_admin" on public.announcements
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- gallery_photos ------------------------------------------------------------
drop policy if exists "gallery_read_public" on public.gallery_photos;
create policy "gallery_read_public" on public.gallery_photos
  for select using (true);
drop policy if exists "gallery_write_admin" on public.gallery_photos;
create policy "gallery_write_admin" on public.gallery_photos
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- donations -----------------------------------------------------------------
-- Public: read only completed rows (for transparency stats) and submit new
-- completed donations. Hardened in the payments step.
drop policy if exists "donations_read_public_completed" on public.donations;
create policy "donations_read_public_completed" on public.donations
  for select using (status = 'completed');
drop policy if exists "donations_insert_public" on public.donations;
create policy "donations_insert_public" on public.donations
  for insert with check (status = 'completed' and type = 'donation' and amount > 0);
drop policy if exists "donations_write_admin" on public.donations;
create policy "donations_write_admin" on public.donations
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- admissions ----------------------------------------------------------------
drop policy if exists "admissions_insert_public" on public.admissions;
create policy "admissions_insert_public" on public.admissions
  for insert with check (status = 'pending');
drop policy if exists "admissions_read_admin" on public.admissions;
create policy "admissions_read_admin" on public.admissions
  for select to authenticated
  using (public.is_admin());
drop policy if exists "admissions_write_admin" on public.admissions;
create policy "admissions_write_admin" on public.admissions
  for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admissions_delete_admin" on public.admissions;
create policy "admissions_delete_admin" on public.admissions
  for delete to authenticated
  using (public.is_admin());

-- contact_messages ----------------------------------------------------------
drop policy if exists "contact_insert_public" on public.contact_messages;
create policy "contact_insert_public" on public.contact_messages
  for insert with check (length(name) > 0 and length(message) > 0);
drop policy if exists "contact_read_admin" on public.contact_messages;
create policy "contact_read_admin" on public.contact_messages
  for select to authenticated
  using (public.is_admin());
drop policy if exists "contact_delete_admin" on public.contact_messages;
create policy "contact_delete_admin" on public.contact_messages
  for delete to authenticated
  using (public.is_admin());

-- admin_users ---------------------------------------------------------------
drop policy if exists "admin_users_read_admin" on public.admin_users;
create policy "admin_users_read_admin" on public.admin_users
  for select to authenticated
  using (public.is_admin());
drop policy if exists "admin_users_write_admin" on public.admin_users;
create policy "admin_users_write_admin" on public.admin_users
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- =====================================================================
-- 6. Trigger: keep page_content.updated_at fresh
-- =====================================================================

create or replace function public.touch_page_content()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_page_content_touch on public.page_content;
create trigger trg_page_content_touch
  before update on public.page_content
  for each row
  execute function public.touch_page_content();
