/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { contentDefaults, defaultAnnouncements, defaultGallery } from './contentDefaults.js'
import { monks as seededMonks } from './data/monks.js'
import { transactions as seededTransactions } from './data/finances.js'
import { houseDetails as seededHouseDetails } from './data/houseDetails.js'

const STORAGE_KEY = 'tms-app-store-v1'

const today = () => new Date().toISOString().slice(0, 10)

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

/* Recursive merge used by the house CMS so partial edits (one field at a time)
   layer cleanly over the seeded content. Arrays are treated as atomic values. */
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

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaults()
    const saved = JSON.parse(raw)
    if (!saved || typeof saved !== 'object') return defaults()
    /* Saved edits layer over the shipped defaults, so fields added in a later
       release still reach browsers that hold an older snapshot in storage. */
    return { ...defaults(), ...saved, content: mergeDeep(contentDefaults, saved.content || {}) }
  } catch {
    return defaults()
  }
}

function saveToStorage(store) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        content: store.content,
        announcements: store.announcements,
        gallery: store.gallery,
        admissions: store.admissions,
        donations: store.donations,
        monks: store.monks,
        houseDetails: store.houseDetails,
      }),
    )
  } catch {
    // Storage full or unavailable - keep working in memory.
  }
}

const AppStoreContext = createContext(null)

export function AppStoreProvider({ children }) {
  const [store, setStore] = useState(loadFromStorage)
  const [loading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    saveToStorage(store)
  }, [store])

  const refresh = useCallback(() => {
    setStore(loadFromStorage())
  }, [])

  const value = useMemo(() => {
    const fail = (e) => setError(e?.message || String(e))

    const addAdmission = (data) => {
      setStore((s) => ({
        ...s,
        admissions: [{ id: `APP-${Date.now()}`, status: 'pending', submittedAt: today(), ...data }, ...s.admissions],
      }))
    }

    const setAdmissionStatus = (id, status) => {
      setStore((s) => ({ ...s, admissions: s.admissions.map((a) => (a.id === id ? { ...a, status } : a)) }))
    }

    const removeAdmission = (id) => {
      setStore((s) => ({ ...s, admissions: s.admissions.filter((a) => a.id !== id) }))
    }

    const addMonk = (monk) => {
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
      setStore((s) => ({ ...s, monks: [row, ...s.monks] }))
    }

    const addDonation = (donation) => {
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
      setStore((s) => ({ ...s, donations: [row, ...s.donations] }))
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
    }

    const addAnnouncement = (ann) => {
      setStore((s) => ({
        ...s,
        announcements: [
          { id: `ann-${Date.now()}`, date: today(), en: { title: '', body: '' }, ne: { title: '', body: '' }, bo: { title: '', body: '' }, ...ann },
          ...s.announcements,
        ],
      }))
    }

    const deleteAnnouncement = (id) => {
      setStore((s) => ({ ...s, announcements: s.announcements.filter((a) => a.id !== id) }))
    }

    const updateAnnouncement = (id, patch) => {
      setStore((s) => ({
        ...s,
        announcements: s.announcements.map((a) => (a.id === id ? { ...a, ...patch } : a)),
      }))
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
          return fail(e)
        }
      }
      setStore((s) => ({
        ...s,
        gallery: [{ id: `g-${Date.now()}`, title: photo.title || 'Untitled', category: photo.category || 'school', url, uploadedAt: today() }, ...s.gallery],
      }))
    }

    const deletePhoto = (id) => {
      setStore((s) => ({ ...s, gallery: s.gallery.filter((g) => g.id !== id) }))
    }

    const updatePhoto = (id, patch) => {
      setStore((s) => ({ ...s, gallery: s.gallery.map((g) => (g.id === id ? { ...g, ...patch } : g)) }))
    }

    const addContactMessage = async () => true

    const updateHouseDetail = (houseId, patch) => {
      setStore((s) => ({
        ...s,
        houseDetails: {
          ...s.houseDetails,
          [houseId]: mergeDeep(s.houseDetails?.[houseId] || {}, patch),
        },
      }))
    }

    const resetHouseDetail = (houseId) => {
      setStore((s) => ({
        ...s,
        houseDetails: { ...s.houseDetails, [houseId]: seededHouseDetails[houseId] },
      }))
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
      updateHouseDetail,
      resetHouseDetail,
    }
  }, [store, loading, error, refresh])

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>
}

export function useAppStore() {
  const ctx = useContext(AppStoreContext)
  if (!ctx) throw new Error('useAppStore must be used within AppStoreProvider')
  return ctx
}
