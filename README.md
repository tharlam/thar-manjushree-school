# Thar Manjushree School

A React 19 + Vite application for Thar Manjushree School — a monastic school in Boudhanath, Kathmandu, Nepal. Features a public website (10 pages) and an admin dashboard for managing monks, classes, admissions, donations, and content.

## Tech Stack

- **Frontend:** React 19, Vite 8, React Router 7
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **Payments:** Khalti (Nepal-focused payment gateway)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project ([supabase.com](https://supabase.com))
- Khalti merchant account (optional, for payments)

### Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the seed script to create the first admin user:
   ```bash
   node scripts/seed.mjs
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `VITE_SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) | For seeding |
| `VITE_KHALTI_PUBLIC_KEY` | Khalti public key | For payments |
| `SEED_ADMIN_EMAIL` | Admin email for seeding | For seeding |
| `SEED_ADMIN_PASSWORD` | Admin password for seeding | For seeding |

### Supabase Setup

1. Create a new Supabase project
2. Run the migrations in order:
   - `supabase/migrations/0001_init.sql`
   - `supabase/migrations/0002_auth_hardening.sql`
   - `supabase/migrations/0003_payments.sql`
3. Deploy the Edge Function:
   ```bash
   supabase functions deploy verify-donation
   ```
4. Set the Khalti secret key:
   ```bash
   supabase secrets set KHALTI_SECRET_KEY=<your-khalti-secret>
   ```

### Deployment

This project is configured for Vercel deployment:

1. Push to GitHub
2. Import the repository in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

## Features

### Public Website
- Home page with school overview
- Tradition, Founder, and Lineage pages
- Curriculum and Daily Schedule
- Admissions application form
- Gallery with category filtering
- Donations with Khalti integration
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
├── auth/           # Authentication logic
├── components/     # Reusable UI components
├── data/           # Static data and seed data
├── layout/         # Layout components (Public, Admin)
├── lib/            # Utility libraries (Supabase, payments)
├── pages/          # Page components
│   ├── public/     # Public website pages
│   └── *.jsx       # Admin dashboard pages
├── store.jsx       # Global state management (Supabase)
├── theme.js        # Design tokens and theme
└── i18n.jsx        # Internationalization (en/ne/bo)
```

## License

© {year} Thar Manjushree School. All rights reserved.
