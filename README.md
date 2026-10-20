# Thar Manjushree School

A React 19 + Vite application for Thar Manjushree School — a monastic school in Boudhanath, Kathmandu, Nepal. Features a public website (10 pages) and an admin dashboard for managing monks, classes, admissions, donations, and content.

## Tech Stack

- **Frontend:** React 19, Vite 8, React Router 7
- **Backend / data:** Supabase (Postgres + Auth + Storage + Realtime)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+

### Setup (fresh Supabase project)

Follow these steps in order. Steps 1–2 are done in the browser; steps 3–6 use a terminal in the project folder.

#### 1. Create a Supabase project

1. Go to https://supabase.com/dashboard and click **New project**.
2. Choose a name, a strong database password, and a region, then **Create**.
3. Wait ~1 minute for provisioning.

#### 2. Run the database migrations

In your project, open **SQL Editor → New query** and run each file below **in order**, one at a time (copy the whole file, paste, click **Run**):

1. `supabase/migrations/0001_init.sql`
2. `supabase/migrations/0002_auth_hardening.sql`
3. `supabase/migrations/0003_realtime.sql`

The migrations are **idempotent** — if a step fails or you are unsure whether it ran, just run it again. Re-running is safe and never duplicates objects.

#### 3. Get your project keys

In your project, go to **Project Settings → API** and copy:

- **Project URL** → `VITE_SUPABASE_URL`
- **anon public** key → `VITE_SUPABASE_ANON_KEY`
- **service_role** key → `VITE_SUPABASE_SERVICE_ROLE_KEY` (secret — only used by scripts)

#### 4. Configure the environment

Copy `.env.example` to `.env` and fill in the three values from step 3:

```bash
cp .env.example .env
```

Never commit `.env` — it holds secrets. (It is already in `.gitignore`.)

#### 5. Install dependencies

```bash
npm install
```

#### 6. Create your admin account

This creates the Supabase Auth user (email + password) **and** the matching
`admin_users` row that `is_admin()` checks, so the account can actually reach
the `/admin` dashboard.

```bash
node scripts/create-admin.mjs <email> <password> [name]
```

Example:

```bash
node scripts/create-admin.mjs admin@school.edu.np MySecret123 "School Admin"
```

Re-running the same command updates the password of an existing account.

#### 7. (Optional) Seed sample data

Populates page content, classes, monks, announcements and gallery from the
app's own source files:

```bash
node scripts/seed.mjs
```

#### 8. Run the app

```bash
npm run dev
```

Open the printed URL, then go to **`/admin/login`** and sign in with the
email/password from step 6.

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes (app + scripts) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes (app) |
| `VITE_SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Scripts only — never expose in the frontend |

### Deployment

This project is configured for Vercel deployment:

1. Push to GitHub
2. Import the repository in Vercel
3. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the Vercel dashboard (do **not** set the service-role key)
4. Deploy

## Features

### Public Website
- Home page with school overview
- Tradition, Founder, and Lineage pages
- Curriculum and Daily Schedule
- Admissions application form
- Gallery with category filtering
- Donations page with bank transfer details and manual donation instructions
- Contact form

### Admin Dashboard
- Dashboard with statistics
- Monks roster management
- Classes and curriculum management
- Attendance tracking
- Fees and donations management
- Content management (multilingual)
- Gallery management
- Settings

## Project Structure

```
src/
├── auth/           # Authentication logic (Supabase Auth)
├── components/     # Reusable UI components
├── data/           # Static data and seed data
├── layout/         # Layout components (Public, Admin)
├── lib/            # Utility libraries (Supabase client, currency)
├── pages/          # Page components
│   ├── public/     # Public website pages
│   └── *.jsx       # Admin dashboard pages
├── store.jsx       # Global state management (Supabase-backed)
├── theme.js        # Design tokens and theme
└── i18n.jsx        # Internationalization (en/ne/bo)

scripts/
├── seed.mjs         # Seed page content, classes, monks, etc.
└── create-admin.mjs # Create an admin auth user + admin_users row

supabase/
└── migrations/      # SQL migrations (idempotent, run in order)
```

## License

© {year} Thar Manjushree School. All rights reserved.
