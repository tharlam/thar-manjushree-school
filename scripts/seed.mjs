// Thar Manjushree School - seed script
// Seeds default page content, announcements, gallery, classes and monks
// from the app's own source files so the database matches the prototype.
//
// Usage:
//   1. Copy .env.example to .env and fill in VITE_SUPABASE_URL and
//      VITE_SUPABASE_SERVICE_ROLE_KEY (Project Settings -> API -> service_role).
//   2. Run:  node scripts/seed.mjs

import { readFileSync, existsSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'
import { contentDefaults, defaultAnnouncements, defaultGallery } from '../src/contentDefaults.js'
import { monks, classes } from '../src/data/monks.js'

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

const supabase = createClient(url, key, { auth: { persistSession: false } })

const ok = (r) => {
  if (r.error) {
    console.error(r.error)
    process.exit(1)
  }
  return r
}

async function seedContent() {
  const rows = []
  for (const [page, fields] of Object.entries(contentDefaults.pages)) {
    for (const [field, langs] of Object.entries(fields)) {
      for (const lang of ['en', 'ne', 'bo']) {
        rows.push({ page, field, lang, value: langs[lang] || '' })
      }
    }
  }
  console.log(`Seeding page_content (${rows.length} rows)`)
  const r = await supabase.from('page_content').upsert(rows, { onConflict: 'page,field,lang' })
  ok(r)
}

async function seedClasses() {
  console.log(`Seeding classes (${classes.length})`)
  const r = await supabase.from('classes').upsert(classes, { onConflict: 'id' })
  ok(r)
}

async function seedMonks() {
  const rows = monks.map((m) => ({
    code: m.id,
    name: m.name,
    class_id: m.classId,
    status: m.status,
    guardian: m.guardian,
    joined: m.joined,
    attendance_rate: m.attendanceRate,
    fee_balance: m.feeBalance,
    sponsor: m.sponsor,
  }))
  console.log(`Seeding monks (${rows.length})`)
  const r = await supabase.from('monks').upsert(rows, { onConflict: 'code' })
  ok(r)
}

async function seedAnnouncements() {
  const { count } = ok(
    await supabase.from('announcements').select('*', { count: 'exact', head: true })
  )
  if (count > 0) {
    console.log('announcements already has rows - skipping')
    return
  }
  const rows = defaultAnnouncements.map((a) => ({
    date: a.date,
    title_en: a.en.title,
    title_ne: a.ne.title,
    title_bo: a.bo.title,
    body_en: a.en.body,
    body_ne: a.ne.body,
    body_bo: a.bo.body,
  }))
  console.log(`Seeding announcements (${rows.length})`)
  ok(await supabase.from('announcements').insert(rows))
}

async function seedGallery() {
  const { count } = ok(
    await supabase.from('gallery_photos').select('*', { count: 'exact', head: true })
  )
  if (count > 0) {
    console.log('gallery_photos already has rows - skipping')
    return
  }
  const rows = defaultGallery.map((g) => ({
    title: g.title,
    category: g.category,
    url: g.url,
    uploaded_at: g.uploadedAt,
  }))
  console.log(`Seeding gallery_photos (${rows.length})`)
  ok(await supabase.from('gallery_photos').insert(rows))
}

await seedContent()
await seedClasses()
await seedMonks()
await seedAnnouncements()
await seedGallery()

console.log('Done.')
