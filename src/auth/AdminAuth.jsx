/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { auth } from '../firebase.js'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

const AuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [status, setStatus] = useState('checking')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUser)
      setStatus('ready')
    })
    return () => unsubscribe()
  }, [])

  const login = useCallback(async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return { ok: true }
    } catch (err) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        return { ok: false, error: 'INVALID' }
      }
      return { ok: false, error: 'INVALID' }
    }
  }, [])

  const logout = useCallback(async () => {
    await signOut(auth)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      authenticated: Boolean(user),
      status,
      user,
      login,
      logout,
    }),
    [user, status, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAdminAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
