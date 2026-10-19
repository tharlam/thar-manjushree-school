/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState, useCallback } from 'react'

const SESSION_KEY = 'tm.staff.session'

const AuthContext = createContext(null)

function readSession() {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(readSession)

  const login = useCallback(async (profile = {}) => {
    const next = {
      name: profile.name || 'Staff Member',
      role: 'staff',
      signedInAt: new Date().toISOString(),
    }
    setUser(next)
    try {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(next))
    } catch {
      // Storage may be unavailable (private mode); the in-memory session still works.
    }
    return { ok: true }
  }, [])

  const logout = useCallback(async () => {
    setUser(null)
    try {
      window.localStorage.removeItem(SESSION_KEY)
    } catch {
      // Nothing to clean up if storage is unavailable.
    }
  }, [])

  const value = useMemo(
    () => ({
      authenticated: Boolean(user),
      status: 'ready',
      user,
      login,
      logout,
    }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAdminAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
