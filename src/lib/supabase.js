import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

export const SUPABASE_NOT_CONFIGURED =
  'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY and rebuild.'

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
        storageKey: 'tms-auth-token',
      },
    })
  : null

export function supabaseError(e) {
  if (!e) return 'Something went wrong'
  if (typeof e === 'string') return e
  const message = e.message || e.error_description || e.error || ''
  if (/failed to fetch|networkerror|network request failed|load failed|fetch failed/i.test(message)) {
    return 'Network error: could not reach the server. Check your connection and try again.'
  }
  if (e.code === 'ECONNREFUSED' || e.code === 'ENOTFOUND') {
    return 'Network error: could not reach the server. Check your connection and try again.'
  }
  return message || 'Something went wrong'
}
