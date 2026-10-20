/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { isSupabaseConfigured, supabase, supabaseError, SUPABASE_NOT_CONFIGURED } from '../lib/supabase.js'

const AuthContext = createContext(null)

function hasAdminClaim(user) {
  if (!user) return false
  const { app_metadata: appMeta, user_metadata: userMeta } = user
  if (appMeta?.is_admin === true || userMeta?.is_admin === true) return true
  return appMeta?.role === 'admin' || userMeta?.role === 'admin'
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminResolved, setAdminResolved] = useState(!isSupabaseConfigured)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [error, setError] = useState(null)
  const adminRequestRef = useRef(0)

  useEffect(() => {
    if (!supabase) return undefined

    let active = true

    const resolveAdmin = async (nextUser) => {
      const requestId = ++adminRequestRef.current
      const finish = (allowed) => {
        if (!active || requestId !== adminRequestRef.current) return
        setIsAdmin(allowed)
        setAdminResolved(true)
        setLoading(false)
      }
      if (!nextUser) {
        finish(false)
        return
      }
      if (hasAdminClaim(nextUser)) {
        finish(true)
        return
      }
      try {
        const { data, error: rpcError } = await supabase.rpc('is_admin')
        finish(!rpcError && Boolean(data))
      } catch {
        finish(false)
      }
    }

    const applySession = (session) => {
      if (!active) return
      setUser(session?.user ?? null)
      setAdminResolved(false)
      setLoading(true)
      resolveAdmin(session?.user ?? null)
    }

    supabase.auth
      .getSession()
      .then(({ data }) => applySession(data.session))
      .catch((e) => {
        if (!active) return
        setError(supabaseError(e))
        setUser(null)
        setIsAdmin(false)
        setAdminResolved(true)
        setLoading(false)
      })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      applySession(session)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback(async (email, password) => {
    if (!supabase) {
      setError(SUPABASE_NOT_CONFIGURED)
      return { ok: false, error: SUPABASE_NOT_CONFIGURED }
    }
    setError(null)
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (signInError) {
        const message = supabaseError(signInError)
        setError(message)
        return { ok: false, error: message }
      }
      setUser(data.user ?? null)
      return { ok: true }
    } catch (e) {
      const message = supabaseError(e)
      setError(message)
      return { ok: false, error: message }
    }
  }, [])

  const signOut = useCallback(async () => {
    setUser(null)
    setIsAdmin(false)
    setError(null)
    if (!supabase) {
      setAdminResolved(true)
      return { ok: true }
    }
    setAdminResolved(false)
    try {
      const { error: signOutError } = await supabase.auth.signOut()
      if (signOutError) {
        setAdminResolved(true)
        return { ok: false, error: supabaseError(signOutError) }
      }
      setAdminResolved(true)
      return { ok: true }
    } catch (e) {
      setAdminResolved(true)
      return { ok: false, error: supabaseError(e) }
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      isAdmin,
      adminResolved,
      error,
      configured: isSupabaseConfigured,
      signIn,
      signOut,
    }),
    [user, loading, isAdmin, adminResolved, error, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
