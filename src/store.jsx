/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useCallback, useMemo, useState } from 'react'
import { contentDefaults, defaultAnnouncements, defaultGallery } from './contentDefaults.js'
import { monks as seededMonks } from './data/monks.js'
import { transactions as seededTransactions } from './data/finances.js'
import { supabase, isSupabaseConfigured, supabaseError } from './lib/supabase.js'

function initialLocalState() {
  return {
    content: contentDefaults,
    announcements: defaultAnnouncements,
    gallery: defaultGallery,
    admissions: [],
    donations: seededTransactions,
    monks: seededMonks,
  }
}

// ---- row mappers (snake_case DB -> camelCase app shape) ----

const mapMonk = (r) => ({
  id: r.code,
  uuid: r.id,
  name: r.name,
  classId: r.class_id,
  status: r.status,
  guardian: r.guardian,
  joined: r.joined,
  attendanceRate: Number(r.attendance_rate) || 0,
  feeBalance: Number(r.fee_balance) || 0,
  sponsor: r.sponsor,
})

const mapAdmission = (r) => ({
  id: r.id,
  status: r.status,
  submittedAt: r.submitted_at,
  name: r.name,
  guardian: r.guardian,
  email: r.email,
  dob: r.dob,
  age: r.age,
  phone: r.phone,
  address: r.address,
  education: r.education,
  classRequested: r.class_requested,
  message: r.message,
})

const mapDonation = (r) => ({
  id: r.id,
  type: r.type,
  name: r.name,
  amount: Number(r.amount) || 0,
  currency: r.currency,
  status: r.status,
  date: r.date,
  note: r.note,
  monk: r.monk || '',
  email: r.email || '',
})

const mapAnnouncement = (r) => ({
  id: r.id,
  date: r.date,
  en: { title: r.title_en || '', body: r.body_en || '' },
  ne: { title: r.title_ne || '', body: r.body_ne || '' },
  bo: { title: r.title_bo || '', body: r.body_bo || '' },
})

const mapPhoto = (r) => ({
  id: r.id,
  title: r.title,
  category: r.category,
  url: r.url,
  uploadedAt: r.uploaded_at,
  storagePath: r.storage_path || null,
})

// Rebuild the nested content.pages[page][field][lang] tree from flat rows,
// falling back to the default content for any missing keys.
function contentFromRows(rows) {
  const pages = JSON.parse(JSON.stringify(contentDefaults.pages))
  for (const row of rows) {
    if (!pages[row.page]) pages[row.page] = {}
    if (!pages[row.page][row.field]) pages[row.page][row.field] = {}
    pages[row.page][row.field][row.lang] = row.value
  }
  return { pages }
}

const today = () => new Date().toISOString().slice(0, 10)

// Which dataset should we load? Admins get the full tables (RLS-gated),
// anonymous visitors get only public views / completed donations.
async function loadMode() {
  if (!supabase) return 'public'
  const { data } = await supabase.auth.getSession()
  return data.session ? 'admin' : 'public'
}

async function loadAll() {
  const mode = await loadMode()
  const [c, a, g, m, ad, d] = await Promise.all([
    supabase.from('page_content').select('page, field, lang, value'),
    supabase.from('announcements').select('*').order('date', { ascending: false }),
    supabase.from('gallery_photos').select('*').order('uploaded_at', { ascending: false }),
    supabase.from(mode === 'admin' ? 'monks' : 'monks_public').select('*').order('code'),
    mode === 'admin'
      ? supabase.from('admissions').select('*').order('created_at', { ascending: false })
      : Promise.resolve({ data: [], error: null }),
    mode === 'admin'
      ? supabase.from('donations').select('*').order('created_at', { ascending: false })
      : supabase.from('donations').select('*').eq('status', 'completed').order('created_at', { ascending: false }),
  ])
  for (const r of [c, a, g, m, ad, d]) if (r.error) throw r.error
  return {
    content: contentFromRows(c.data || []),
    announcements: (a.data || []).map(mapAnnouncement),
    gallery: (g.data || []).map(mapPhoto),
    monks: (m.data || []).map(mapMonk),
    admissions: (ad.data || []).map(mapAdmission),
    donations: (d.data || []).map(mapDonation),
  }
}

const AppStoreContext = createContext(null)

export function AppStoreProvider({ children }) {
  const [store, setStore] = useState(initialLocalState)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    let active = true

    const load = async (showSpinner) => {
      if (showSpinner) setLoading(true)
      try {
        const next = await loadAll()
        if (!active) return
        setStore(next)
        setError(null)
      } catch (e) {
        if (active) setError(supabaseError(e))
      } finally {
        if (active) setLoading(false)
      }
    }

    load(true)

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') load(false)
    })

    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [])

  const refresh = useCallback(() => {
    if (!isSupabaseConfigured) return
    setLoading(true)
    loadAll()
      .then((next) => {
        setStore(next)
        setError(null)
      })
      .catch((e) => setError(supabaseError(e)))
      .finally(() => setLoading(false))
  }, [])

  const value = useMemo(() => {
    const fail = (e) => setError(supabaseError(e))

    const addAdmission = async (data) => {
      const row = {
        name: data.name,
        guardian: data.guardian,
        email: data.email || '',
        dob: data.dob || null,
        age: data.age ? Number(data.age) : null,
        phone: data.phone,
        address: data.address || '',
        education: data.education || '',
        class_requested: data.classRequested || 'Level 1',
        message: data.message || '',
      }
      if (!supabase) {
        setStore((s) => ({
          ...s,
          admissions: [{ id: `APP-${Date.now()}`, status: 'pending', submittedAt: today(), ...data }, ...s.admissions],
        }))
        return
      }
      const { data: created, error } = await supabase.from('admissions').insert([row]).select().single()
      if (error) return fail(error)
      setStore((s) => ({ ...s, admissions: [mapAdmission(created), ...s.admissions] }))
    }

    const setAdmissionStatus = (id, status) => {
      setStore((s) => ({ ...s, admissions: s.admissions.map((a) => (a.id === id ? { ...a, status } : a)) }))
      if (!supabase) return
      supabase.from('admissions').update({ status }).eq('id', id).then(({ error }) => error && fail(error))
    }

    const removeAdmission = (id) => {
      setStore((s) => ({ ...s, admissions: s.admissions.filter((a) => a.id !== id) }))
      if (!supabase) return
      supabase.from('admissions').delete().eq('id', id).then(({ error }) => error && fail(error))
    }

    const addMonk = async (monk) => {
      const code = monk.id || `TM-${Date.now()}`
      const row = {
        code,
        name: monk.name,
        class_id: monk.classId || '',
        status: monk.status || 'enrolled',
        guardian: monk.guardian || '',
        joined: monk.joined || today(),
        attendance_rate: Number(monk.attendanceRate) || 0,
        fee_balance: Number(monk.feeBalance) || 0,
        sponsor: monk.sponsor || '',
      }
      if (!supabase) {
        setStore((s) => ({ ...s, monks: [row, ...s.monks] }))
        return
      }
      const { data: created, error } = await supabase.from('monks').insert([row]).select().single()
      if (error) return fail(error)
      setStore((s) => ({ ...s, monks: [mapMonk(created), ...s.monks] }))
    }

    const addDonation = async (donation) => {
      const row = {
        type: donation.type || 'donation',
        name: donation.name || donation.donorName || 'Anonymous Devotee',
        email: donation.email || '',
        amount: Number(donation.amount) || 0,
        currency: 'USD',
        status: 'completed',
        date: donation.date || today(),
        note: donation.note || '',
        monk: donation.monk || '',
      }
      if (!supabase) {
        setStore((s) => ({ ...s, donations: [{ id: `D-${Date.now()}`, ...row }, ...s.donations] }))
        return
      }
      const { data: created, error } = await supabase.from('donations').insert([row]).select().single()
      if (error) return fail(error)
      setStore((s) => ({ ...s, donations: [mapDonation(created), ...s.donations] }))
    }

    const setPageField = (page, field, lang, text) => {
      setStore((s) => ({
        ...s,
        content: {
          ...s.content,
          pages: {
            ...s.content.pages,
            [page]: {
              ...s.content.pages[page],
              [field]: { ...(s.content.pages[page]?.[field] || {}), [lang]: text },
            },
          },
        },
      }))
      if (!supabase) return
      supabase
        .from('page_content')
        .upsert({ page, field, lang, value: text }, { onConflict: 'page,field,lang' })
        .then(({ error }) => error && fail(error))
    }

    const addAnnouncement = async (ann) => {
      const row = {
        date: ann.date || today(),
        title_en: ann.en?.title || '',
        title_ne: ann.ne?.title || '',
        title_bo: ann.bo?.title || '',
        body_en: ann.en?.body || '',
        body_ne: ann.ne?.body || '',
        body_bo: ann.bo?.body || '',
      }
      if (!supabase) {
        setStore((s) => ({
          ...s,
          announcements: [
            { id: `ann-${Date.now()}`, date: today(), en: { title: '', body: '' }, ne: { title: '', body: '' }, bo: { title: '', body: '' }, ...ann },
            ...s.announcements,
          ],
        }))
        return
      }
      const { data: created, error } = await supabase.from('announcements').insert([row]).select().single()
      if (error) return fail(error)
      setStore((s) => ({ ...s, announcements: [mapAnnouncement(created), ...s.announcements] }))
    }

    const deleteAnnouncement = (id) => {
      setStore((s) => ({ ...s, announcements: s.announcements.filter((a) => a.id !== id) }))
      if (!supabase) return
      supabase.from('announcements').delete().eq('id', id).then(({ error }) => error && fail(error))
    }

    const updateAnnouncement = (id, patch) => {
      setStore((s) => ({
        ...s,
        announcements: s.announcements.map((a) => (a.id === id ? { ...a, ...patch } : a)),
      }))
      if (!supabase) return
      const build = {}
      if (patch.date) build.date = patch.date
      for (const lang of ['en', 'ne', 'bo']) {
        if (patch[lang]) {
          if (patch[lang].title !== undefined) build[`title_${lang}`] = patch[lang].title
          if (patch[lang].body !== undefined) build[`body_${lang}`] = patch[lang].body
        }
      }
      if (Object.keys(build).length === 0) return
      supabase.from('announcements').update(build).eq('id', id).then(({ error }) => error && fail(error))
    }

    const addPhoto = async (photo) => {
      let url = photo.url || ''
      let storagePath = null
      if (photo.file && supabase) {
        const ext = photo.file.name.split('.').pop() || 'jpg'
        const path = `photos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        const { error: upErr } = await supabase.storage.from('gallery').upload(path, photo.file, { contentType: photo.file.type })
        if (upErr) return fail(upErr)
        storagePath = path
        const { data: pub } = supabase.storage.from('gallery').getPublicUrl(path)
        url = pub.publicUrl
      }
      const row = {
        title: photo.title || 'Untitled',
        category: photo.category || 'school',
        url,
        storage_path: storagePath,
      }
      if (!supabase) {
        setStore((s) => ({ ...s, gallery: [{ id: `g-${Date.now()}`, title: row.title, category: row.category, url, uploadedAt: today() }, ...s.gallery] }))
        return
      }
      const { data: created, error } = await supabase.from('gallery_photos').insert([row]).select().single()
      if (error) return fail(error)
      setStore((s) => ({ ...s, gallery: [mapPhoto(created), ...s.gallery] }))
    }

    const deletePhoto = (id) => {
      const target = store.gallery.find((g) => g.id === id)
      setStore((s) => ({ ...s, gallery: s.gallery.filter((g) => g.id !== id) }))
      if (!supabase) return
      supabase.from('gallery_photos').delete().eq('id', id).then(({ error }) => error && fail(error))
      if (target?.storagePath) {
        supabase.storage.from('gallery').remove([target.storagePath]).then(({ error }) => error && fail(error))
      }
    }

    const updatePhoto = (id, patch) => {
      setStore((s) => ({ ...s, gallery: s.gallery.map((g) => (g.id === id ? { ...g, ...patch } : g)) }))
      if (!supabase) return
      supabase.from('gallery_photos').update(patch).eq('id', id).then(({ error }) => error && fail(error))
    }

    const addContactMessage = async (msg) => {
      const row = {
        name: msg.name,
        email: msg.email || '',
        subject: msg.subject || '',
        message: msg.message,
      }
      if (!supabase) return true
      const { error } = await supabase.from('contact_messages').insert([row])
      if (error) {
        fail(error)
        return false
      }
      return true
    }

    return {
      ...store,
      loading,
      error,
      refresh,
      addAdmission,
      setAdmissionStatus,
      removeAdmission,
      addMonk,
      addDonation,
      setPageField,
      addAnnouncement,
      deleteAnnouncement,
      updateAnnouncement,
      addPhoto,
      deletePhoto,
      updatePhoto,
      addContactMessage,
    }
  }, [store, loading, error, refresh])

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>
}

export function useAppStore() {
  const ctx = useContext(AppStoreContext)
  if (!ctx) throw new Error('useAppStore must be used within AppStoreProvider')
  return ctx
}
