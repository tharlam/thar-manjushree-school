// Thar Manjushree School - create a new admin account
// Creates BOTH the Supabase Auth user (email + password) AND the
// admin_users row that is_admin() checks, so the account can log in
// and reach the /admin dashboard.
//
// Usage:
//   1. Fill .env with VITE_SUPABASE_URL and VITE_SUPABASE_SERVICE_ROLE_KEY.
//   2. Run migrations (supabase db push, or paste supabase/migrations/*.sql
//      into the Supabase SQL editor in order).
//   3. Run:
//        node scripts/create-admin.mjs <email> <password> [name]
//      Example:
//        node scripts/create-admin.mjs admin@school.edu.np MySecret123 "School Admin"

import { readFileSync, existsSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

function loadEnv() {
  const file = existsSync('.env') ? '.env' : existsSync('.env.local') ? '.env.local' : null
  if (!file) return
  const raw = readFileSync(file, 'utf8')
  for (const line of raw.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !(m[1] in process.env)) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  }
}

loadEnv()

const url = process.env.VITE_SUPABASE_URL
const key = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_SERVICE_ROLE_KEY in .env')
  process.exit(1)
}

if (url.includes('your-project-ref') || key === 'your-service-role-key') {
  console.error('You are still using the placeholder values from .env.example.')
  console.error('Open .env and paste your real Supabase URL and service-role key first.')
  process.exit(1)
}

const [email, password, name = 'Administrator'] = process.argv.slice(2)

if (!email || !password) {
  console.error('Usage: node scripts/create-admin.mjs <email> <password> [name]')
  process.exit(1)
}

if (password.length < 6) {
  console.error('Password must be at least 6 characters (Supabase default minimum).')
  process.exit(1)
}

const supabase = createClient(url, key, { auth: { persistSession: false } })

// 1. Create (or find) the auth user.
let userId = null
const { data: created, error: createError } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
  app_metadata: { is_admin: true, role: 'admin' },
})

if (createError) {
  if (/already been registered|already exists/i.test(createError.message)) {
    console.log(`Auth user ${email} already exists - looking it up.`)
    const { data: list, error: listError } = await supabase.auth.admin.listUsers()
    if (listError) {
      console.error(listError)
      process.exit(1)
    }
    const existing = list.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())
    if (!existing) {
      console.error('Could not find the existing user. Create it manually in the dashboard.')
      process.exit(1)
    }
    userId = existing.id
    const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
      password,
      email_confirm: true,
      app_metadata: { is_admin: true, role: 'admin' },
    })
    if (updateError) {
      console.error(updateError)
      process.exit(1)
    }
    console.log('Updated existing auth user password + admin metadata.')
  } else {
    console.error(createError)
    process.exit(1)
  }
} else {
  userId = created.user.id
  console.log(`Created auth user ${email} (${userId}).`)
}

// 2. Add the admin_users row that is_admin() checks.
const { error: upsertError } = await supabase
  .from('admin_users')
  .upsert(
    { id: userId, email, name, role: 'admin', permissions: ['Full access'] },
    { onConflict: 'id' },
  )

if (upsertError) {
  console.error('Auth user is ready, but writing admin_users failed:')
  console.error(upsertError)
  console.error('\nMake sure the migrations have been run so the admin_users table exists.')
  process.exit(1)
}

console.log('\nDone. Admin account is ready:')
console.log(`  email:    ${email}`)
console.log(`  password: ${password}`)
console.log('\nStart the app with: npm run dev   then go to /admin/login')
