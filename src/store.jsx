/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { contentDefaults, defaultAnnouncements, defaultGallery } from './contentDefaults.js'
import { monks as seededMonks, classes as seededClasses } from './data/monks.js'
import { transactions as seededTransactions } from './data/finances.js'
import { houseDetails as seededHouseDetails } from './data/houseDetails.js'
import { supabase, supabaseError } from './lib/supabase.js'
import useRealtimeCollection from './hooks/useRealtimeCollection.js'

const PAGE_WRITE_DELAY = 750

const today = () => new Date().toISOString().slice(0, 10)

const classIds = new Set(seededClasses.map((c) => c.id))
const classIdByName = new Map(seededClasses.map((c) => [c.name.toLowerCase(), c.id]))

function defaults() {
  return {
    content: contentDefaults,
    announcements: defaultAnnouncements,
    gallery: defaultGallery,
    admissions: [],
    donations: seededTransactions,
    monks: seededMonks,
    houseDetails: seededHouseDetails,
  }
}

/* Recursive merge used by the CMS so partial edits (one field at a time)
   layer cleanly over the bundle defaults. Arrays are treated as atomic values. */
function mergeDeep(target, patch) {
  const out = { ...target }
  Object.keys(patch || {}).forEach((key) => {
    const next = patch[key]
    const prev = target?.[key]
    const bothPlainObjects =
      next && prev && typeof next === 'object' && typeof prev === 'object' && !Array.isArray(next) && !Array.isArray(prev)
    out[key] = bothPlainObjects ? mergeDeep(prev, next) : next
  })
  return out
}

function upsertWhere(list, match, record) {
  const index = list.findIndex(match)
  if (index === -1) return [record, ...list]
  const next = [...list]
  next[index] = { ...list[index], ...record }
  return next
}

function contentFromRows(rows) {
  const pages = {}
  for (const row of rows || []) {
    if (!row?.page || !row?.field || !row?.lang) continue
    pages[row.page] = pages[row.page] || {}
    pages[row.page][row.field] = { ...(pages[row.page][row.field] || {}), [row.lang]: row.value }
  }
  return { pages: mergeDeep(contentDefaults.pages, pages) }
}

function admissionFromRow(row) {
  if (!row) return null
  return {
    id: row.id,
    status: row.status,
    submittedAt: row.submitted_at || '',
    name: row.name || '',
    guardian: row.guardian || '',
    email: row.email || '',
    dob: row.dob || '',
    age: row.age ?? '',
    phone: row.phone || '',
    address: row.address || '',
    education: row.education || '',
    classRequested: row.class_requested || '',
    message: row.message || '',
  }
}

function admissionToRow(data) {
  return {
    status: data.status || 'pending',
    submitted_at: data.submittedAt || today(),
    name: data.name || '',
    guardian: data.guardian || '',
    email: data.email || '',
    dob: data.dob ? data.dob : null,
    age: data.age === '' || data.age === undefined || data.age === null ? null : Number(data.age),
    phone: data.phone || '',
    address: data.address || '',
    education: data.education || '',
    class_requested: data.classRequested || 'Level 1',
    message: data.message || '',
  }
}

function classIdToDb(value) {
  if (!value) return null
  if (classIds.has(value)) return value
  return classIdByName.get(String(value).toLowerCase()) || null
}

function monkFromRow(row) {
  if (!row) return null
  return {
    id: row.code || row.id,
    dbId: row.id,
    name: row.name || '',
    classId: row.class_id || '',
    status: row.status || 'enrolled',
    guardian: row.guardian || '',
    joined: row.joined || '',
    attendanceRate: Number(row.attendance_rate) || 0,
    feeBalance: Number(row.fee_balance) || 0,
    sponsor: row.sponsor || '',
  }
}

function monkToRow(monk) {
  return {
    code: monk.id,
    name: monk.name,
    class_id: classIdToDb(monk.classId),
    status: monk.status || 'enrolled',
    guardian: monk.guardian || '',
    joined: monk.joined || today(),
    attendance_rate: Number(monk.attendanceRate) || 0,
    fee_balance: Number(monk.feeBalance) || 0,
    sponsor: monk.sponsor || '',
  }
}

function donationFromRow(row) {
  if (!row) return null
  return {
    id: row.id,
    type: row.type,
    name: row.name || '',
    email: row.email || '',
    amount: Number(row.amount) || 0,
    currency: row.currency || 'USD',
    status: row.status,
    date: row.date || '',
    note: row.note || '',
    monk: row.monk || '',
  }
}

function donationToRow(donation) {
  return {
    type: donation.type || 'donation',
    name: donation.name || donation.donorName || 'Anonymous Devotee',
    email: donation.email || '',
    amount: Number(donation.amount) || 0,
    currency: donation.currency || 'USD',
    status: donation.status || 'completed',
    date: donation.date || today(),
    note: donation.note || '',
    monk: donation.monk || '',
  }
}

function announcementFromRow(row) {
  if (!row) return null
  return {
    id: row.id,
    date: row.date || '',
    en: { title: row.title_en || '', body: row.body_en || '' },
    ne: { title: row.title_ne || '', body: row.body_ne || '' },
    bo: { title: row.title_bo || '', body: row.body_bo || '' },
  }
}

function announcementToRow(announcement) {
  const langs = { en: 'en', ne: 'ne', bo: 'bo' }
  const row = { date: announcement.date || today() }
  for (const key of Object.keys(langs)) {
    row[`title_${key}`] = announcement[key]?.title || ''
    row[`body_${key}`] = announcement[key]?.body || ''
  }
  return row
}

function announcementPatchToRow(patch) {
  const row = {}
  if (patch.date !== undefined) row.date = patch.date || today()
  for (const key of ['en', 'ne', 'bo']) {
    if (patch[key]) {
      if (patch[key].title !== undefined) row[`title_${key}`] = patch[key].title
      if (patch[key].body !== undefined) row[`body_${key}`] = patch[key].body
    }
  }
  return row
}

function photoFromRow(row) {
  if (!row) return null
  return {
    id: row.id,
    title: row.title || '',
    category: row.category || 'school',
    url: row.url || '',
    uploadedAt: row.uploaded_at || '',
  }
}

const AppStoreContext = createContext(null)

export function AppStoreProvider({ children }) {
  const [store, setStore] = useState(defaults)
  const [loading, setLoading] = useState(Boolean(supabase))
  const [error, setError] = useState(null)
  const pageWritesRef = useRef(new Map())
  const pageTimerRef = useRef(null)

  const fail = useCallback((e) => {
    const message = supabaseError(e)
    setError(message)
    return message
  }, [])

  const flushPageWrites = useCallback(async () => {
    const map = pageWritesRef.current
    if (!supabase || map.size === 0) return
    const rows = Array.from(map.values())
    map.clear()
    try {
      const { error: upsertError } = await supabase
        .from('page_content')
        .upsert(rows, { onConflict: 'page,field,lang' })
      if (upsertError) setError(supabaseError(upsertError))
    } catch (e) {
      setError(supabaseError(e))
    }
  }, [])

  const loadAll = useCallback(async () => {
    if (!supabase) return
    setLoading(true)
    setError(null)

    const fetchMonks = async () => {
      const full = await supabase.from('monks').select('*').order('created_at', { ascending: false })
      if (!full.error) return full
      return supabase.from('monks_public').select('*').order('joined', { ascending: false })
    }

    try {
      const [content, announcements, gallery, admissions, donations, monks] = await Promise.all([
        supabase.from('page_content').select('page, field, lang, value'),
        supabase.from('announcements').select('*').order('date', { ascending: false }),
        supabase.from('gallery_photos').select('*').order('uploaded_at', { ascending: false }),
        supabase.from('admissions').select('*').order('created_at', { ascending: false }),
        supabase.from('donations').select('*').order('date', { ascending: false }),
        fetchMonks(),
      ])

      const failures = [content, announcements, gallery, admissions, donations, monks].filter((r) => r.error)
      if (failures.length > 0) fail(failures[0].error)

      setStore((s) => ({
        ...s,
        content: content.error ? s.content : contentFromRows(content.data),
        announcements: announcements.error ? s.announcements : (announcements.data || []).map(announcementFromRow),
        gallery: gallery.error ? s.gallery : (gallery.data || []).map(photoFromRow),
        admissions: admissions.error ? s.admissions : (admissions.data || []).map(admissionFromRow),
        donations: donations.error ? s.donations : (donations.data || []).map(donationFromRow),
        monks: monks.error ? s.monks : (monks.data || []).map(monkFromRow),
      }))
    } catch (e) {
      fail(e)
    } finally {
      setLoading(false)
    }
  }, [fail])

  useEffect(() => {
    if (!supabase) return undefined
    let cancelled = false
    const initialLoad = window.setTimeout(() => {
      if (!cancelled) loadAll()
    }, 0)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') loadAll()
    })
    return () => {
      cancelled = true
      window.clearTimeout(initialLoad)
      subscription.unsubscribe()
    }
  }, [loadAll])

  useEffect(
    () => () => {
      if (pageTimerRef.current) clearTimeout(pageTimerRef.current)
      flushPageWrites()
    },
    [flushPageWrites],
  )

  const handleRealtime = useCallback(({ table, eventType, row, oldRow }) => {
    if (table === 'admissions') {
      if (eventType === 'DELETE') {
        const id = oldRow?.id
        setStore((s) => ({ ...s, admissions: s.admissions.filter((a) => a.id !== id) }))
        return
      }
      const record = admissionFromRow(row)
      if (!record) return
      setStore((s) => ({
        ...s,
        admissions: upsertWhere(
          s.admissions,
          (a) =>
            a.id === record.id ||
            (a.name === record.name && a.phone === record.phone && a.submittedAt === record.submittedAt),
          record,
        ),
      }))
      return
    }

    if (table === 'monks') {
      if (eventType === 'DELETE') {
        const id = oldRow?.id
        setStore((s) => ({ ...s, monks: s.monks.filter((m) => m.dbId !== id && m.id !== id) }))
        return
      }
      const record = monkFromRow(row)
      if (!record) return
      setStore((s) => ({
        ...s,
        monks: upsertWhere(s.monks, (m) => m.id === record.id || (record.dbId && m.dbId === record.dbId), record),
      }))
    }
  }, [])

  const realtime = useRealtimeCollection(['admissions', 'monks'], {
    enabled: Boolean(supabase),
    onEvent: handleRealtime,
  })

  const refresh = useCallback(() => loadAll(), [loadAll])

  const value = useMemo(() => {
    const addAdmission = async (data) => {
      const local = { id: `APP-${Date.now()}`, status: 'pending', submittedAt: today(), ...data }
      if (supabase) {
        try {
          const { error: insertError } = await supabase.from('admissions').insert(admissionToRow(local))
          if (insertError) return { ok: false, error: fail(insertError) }
        } catch (e) {
          return { ok: false, error: fail(e) }
        }
      }
      setStore((s) => ({ ...s, admissions: [local, ...s.admissions] }))
      return { ok: true }
    }

    const setAdmissionStatus = async (id, status) => {
      if (supabase) {
        try {
          const { error: updateError } = await supabase.from('admissions').update({ status }).eq('id', id)
          if (updateError) return { ok: false, error: fail(updateError) }
        } catch (e) {
          return { ok: false, error: fail(e) }
        }
      }
      setStore((s) => ({ ...s, admissions: s.admissions.map((a) => (a.id === id ? { ...a, status } : a)) }))
      return { ok: true }
    }

    const removeAdmission = async (id) => {
      if (supabase) {
        try {
          const { error: deleteError } = await supabase.from('admissions').delete().eq('id', id)
          if (deleteError) return { ok: false, error: fail(deleteError) }
        } catch (e) {
          return { ok: false, error: fail(e) }
        }
      }
      setStore((s) => ({ ...s, admissions: s.admissions.filter((a) => a.id !== id) }))
      return { ok: true }
    }

    const addMonk = async (monk) => {
      const row = {
        id: monk.id || `TM-${Date.now()}`,
        name: monk.name,
        classId: monk.classId || '',
        status: monk.status || 'enrolled',
        guardian: monk.guardian || '',
        joined: monk.joined || today(),
        attendanceRate: Number(monk.attendanceRate) || 0,
        feeBalance: Number(monk.feeBalance) || 0,
        sponsor: monk.sponsor || '',
      }
      if (supabase) {
        try {
          const { data, error: insertError } = await supabase.from('monks').insert(monkToRow(row)).select().single()
          if (insertError) return { ok: false, error: fail(insertError) }
          setStore((s) => ({ ...s, monks: upsertWhere(s.monks, (m) => m.id === row.id, monkFromRow(data)) }))
          return { ok: true }
        } catch (e) {
          return { ok: false, error: fail(e) }
        }
      }
      setStore((s) => ({ ...s, monks: [row, ...s.monks] }))
      return { ok: true }
    }

    const addDonation = async (donation) => {
      const row = {
        id: `D-${Date.now()}`,
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
      if (supabase) {
        try {
          const { data, error: insertError } = await supabase
            .from('donations')
            .insert(donationToRow(row))
            .select()
            .single()
          if (insertError) return { ok: false, error: fail(insertError) }
          setStore((s) => ({ ...s, donations: upsertWhere(s.donations, (d) => d.id === row.id, donationFromRow(data)) }))
          return { ok: true }
        } catch (e) {
          return { ok: false, error: fail(e) }
        }
      }
      setStore((s) => ({ ...s, donations: [row, ...s.donations] }))
      return { ok: true }
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
      pageWritesRef.current.set(`${page}|${field}|${lang}`, { page, field, lang, value: text })
      if (pageTimerRef.current) clearTimeout(pageTimerRef.current)
      pageTimerRef.current = setTimeout(() => {
        pageTimerRef.current = null
        flushPageWrites()
      }, PAGE_WRITE_DELAY)
    }

    const addAnnouncement = async (ann) => {
      const local = {
        id: `ann-${Date.now()}`,
        date: today(),
        en: { title: '', body: '' },
        ne: { title: '', body: '' },
        bo: { title: '', body: '' },
        ...ann,
      }
      if (supabase) {
        try {
          const { data, error: insertError } = await supabase
            .from('announcements')
            .insert(announcementToRow(local))
            .select()
            .single()
          if (insertError) return { ok: false, error: fail(insertError) }
          setStore((s) => ({ ...s, announcements: [announcementFromRow(data), ...s.announcements] }))
          return { ok: true }
        } catch (e) {
          return { ok: false, error: fail(e) }
        }
      }
      setStore((s) => ({ ...s, announcements: [local, ...s.announcements] }))
      return { ok: true }
    }

    const updateAnnouncement = async (id, patch) => {
      if (supabase) {
        try {
          const { error: updateError } = await supabase.from('announcements').update(announcementPatchToRow(patch)).eq('id', id)
          if (updateError) return { ok: false, error: fail(updateError) }
        } catch (e) {
          return { ok: false, error: fail(e) }
        }
      }
      setStore((s) => ({
        ...s,
        announcements: s.announcements.map((a) => (a.id === id ? { ...a, ...patch } : a)),
      }))
      return { ok: true }
    }

    const deleteAnnouncement = async (id) => {
      if (supabase) {
        try {
          const { error: deleteError } = await supabase.from('announcements').delete().eq('id', id)
          if (deleteError) return { ok: false, error: fail(deleteError) }
        } catch (e) {
          return { ok: false, error: fail(e) }
        }
      }
      setStore((s) => ({ ...s, announcements: s.announcements.filter((a) => a.id !== id) }))
      return { ok: true }
    }

    const fileToDataUrl = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject(new Error('Could not read the selected file.'))
        reader.readAsDataURL(file)
      })

    const addPhoto = async (photo) => {
      let url = photo.url || ''
      if (!url && photo.file) {
        try {
          url = await fileToDataUrl(photo.file)
        } catch (e) {
          return { ok: false, error: fail(e) }
        }
      }
      const local = {
        id: `g-${Date.now()}`,
        title: photo.title || 'Untitled',
        category: photo.category || 'school',
        url,
        uploadedAt: today(),
      }
      if (supabase) {
        try {
          const { data, error: insertError } = await supabase
            .from('gallery_photos')
            .insert({ title: local.title, category: local.category, url, uploaded_at: local.uploadedAt })
            .select()
            .single()
          if (insertError) return { ok: false, error: fail(insertError) }
          setStore((s) => ({ ...s, gallery: [photoFromRow(data), ...s.gallery] }))
          return { ok: true }
        } catch (e) {
          return { ok: false, error: fail(e) }
        }
      }
      setStore((s) => ({ ...s, gallery: [local, ...s.gallery] }))
      return { ok: true }
    }

    const deletePhoto = async (id) => {
      if (supabase) {
        try {
          const { error: deleteError } = await supabase.from('gallery_photos').delete().eq('id', id)
          if (deleteError) return { ok: false, error: fail(deleteError) }
        } catch (e) {
          return { ok: false, error: fail(e) }
        }
      }
      setStore((s) => ({ ...s, gallery: s.gallery.filter((g) => g.id !== id) }))
      return { ok: true }
    }

    const updatePhoto = async (id, patch) => {
      if (supabase) {
        const row = {}
        if (patch.title !== undefined) row.title = patch.title
        if (patch.category !== undefined) row.category = patch.category
        if (patch.url !== undefined) row.url = patch.url
        try {
          const { error: updateError } = await supabase.from('gallery_photos').update(row).eq('id', id)
          if (updateError) return { ok: false, error: fail(updateError) }
        } catch (e) {
          return { ok: false, error: fail(e) }
        }
      }
      setStore((s) => ({ ...s, gallery: s.gallery.map((g) => (g.id === id ? { ...g, ...patch } : g)) }))
      return { ok: true }
    }

    const addContactMessage = async (message) => {
      if (!supabase) return { ok: true }
      try {
        const { error: insertError } = await supabase.from('contact_messages').insert({
          name: message.name || '',
          email: message.email || '',
          subject: message.subject || message.interest || '',
          message: message.message || '',
        })
        if (insertError) return { ok: false, error: fail(insertError) }
        return { ok: true }
      } catch (e) {
        return { ok: false, error: fail(e) }
      }
    }

    const updateHouseDetail = (houseId, patch) => {
      setStore((s) => ({
        ...s,
        houseDetails: {
          ...s.houseDetails,
          [houseId]: mergeDeep(s.houseDetails?.[houseId] || {}, patch),
        },
      }))
      return { ok: true }
    }

    const resetHouseDetail = (houseId) => {
      setStore((s) => ({
        ...s,
        houseDetails: { ...s.houseDetails, [houseId]: seededHouseDetails[houseId] },
      }))
      return { ok: true }
    }

    return {
      ...store,
      loading,
      error,
      realtime: realtime.connected,
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
      updateHouseDetail,
      resetHouseDetail,
    }
  }, [store, loading, error, realtime.connected, refresh, fail, flushPageWrites])

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>
}

export function useAppStore() {
  const ctx = useContext(AppStoreContext)
  if (!ctx) throw new Error('useAppStore must be used within AppStoreProvider')
  return ctx
}
