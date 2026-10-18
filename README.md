# Thar Manjushree School

A React 19 + Vite application for Thar Manjushree School — a monastic school in Boudhanath, Kathmandu, Nepal. Features a public website (10 pages) and an admin dashboard for managing monks, classes, admissions, donations, and content.

## Tech Stack

- **Frontend:** React 19, Vite 8, React Router 7
- **Data storage:** Browser localStorage (no backend required)
- **Deployment:** Vercel

> Note: A `supabase/` folder (migrations + seed tooling) is kept in the repo for
> reference/future use, but the app currently does not call it.

## Getting Started

### Prerequisites

- Node.js 18+

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

No environment variables are needed — all data is stored in the browser's
localStorage. (Optional: `.env` variables are only used by `scripts/seed.mjs`
to seed a Supabase project.)

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Only for seeding |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Only for seeding |
| `VITE_SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) | Only for seeding |

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
├── auth/           # Authentication logic
├── components/     # Reusable UI components
├── data/           # Static data and seed data
├── layout/         # Layout components (Public, Admin)
├── lib/            # Utility libraries (currency formatting)
├── pages/          # Page components
│   ├── public/     # Public website pages
│   └── *.jsx       # Admin dashboard pages
├── store.jsx       # Global state management (localStorage)
├── theme.js        # Design tokens and theme
└── i18n.jsx        # Internationalization (en/ne/bo)
```

## License

© {year} Thar Manjushree School. All rights reserved.
