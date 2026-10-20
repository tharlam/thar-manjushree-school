import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '../lib/cn.js'
import { SUPABASE_NOT_CONFIGURED } from '../lib/supabase.js'
import { useAuth } from '../auth/AuthProvider.jsx'
import { useLanguage } from '../i18n.jsx'

const fieldBase =
  'block min-h-11 w-full rounded-md border bg-surface px-3.5 py-3 text-base font-sans text-ink outline-none transition-[border-color,box-shadow] placeholder:text-muted focus:ring-2 sm:text-[15px]'

const fieldValid = 'border-line focus:border-brand-500 focus:ring-brand-500'
const fieldInvalid = 'border-danger focus:border-danger focus:ring-danger'

export default function AdminLogin() {
  const { signIn, user, isAdmin, adminResolved, loading } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!loading && adminResolved && user && isAdmin) navigate('/admin', { replace: true })
  }, [loading, adminResolved, user, isAdmin, navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    setError(null)
    const result = await signIn(email.trim(), password)
    setBusy(false)
    if (!result.ok) {
      if (result.error === SUPABASE_NOT_CONFIGURED) setError(t('login.notConfigured'))
      else if (/invalid login credentials/i.test(result.error)) setError(t('login.invalid'))
      else setError(result.error)
    }
  }

  const unauthorized = Boolean(user) && adminResolved && !isAdmin && !loading
  const alertMessage = error || (unauthorized ? t('login.forbidden') : '')

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-brand to-brand-900 px-4 py-6 font-sans sm:px-6 sm:py-10">
      <div className="w-full max-w-[440px] animate-fade-in overflow-hidden rounded-lg bg-surface shadow-pop">
        <div className="bg-linear-to-br from-brand-700 to-brand-900 px-5 pt-7 pb-6 text-center sm:px-7">
          <h1 className="m-0 text-[19px] font-extrabold text-white sm:text-[20px]">{t('app.name')}</h1>
          <p className="mt-1.5 mb-0 text-[13px] text-white/75">{t('app.admin')}</p>
        </div>

        <form onSubmit={handleLogin} noValidate className="px-5 pt-6 pb-6 sm:px-7 sm:pt-7">
          <p className="mt-0 mb-5 text-[14px] leading-[1.6] text-body">{t('login.prompt')}</p>

          <div className="mb-4">
            <label htmlFor="admin-email" className="mb-1.5 block text-[13px] font-semibold text-ink">
              {t('login.email')}
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              autoCapitalize="none"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('login.placeholderEmail')}
              aria-invalid={alertMessage ? true : undefined}
              aria-describedby={alertMessage ? 'admin-login-alert' : undefined}
              className={cn(fieldBase, alertMessage ? fieldInvalid : fieldValid)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="admin-password" className="mb-1.5 block text-[13px] font-semibold text-ink">
              {t('login.password')}
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('login.placeholder')}
              aria-invalid={alertMessage ? true : undefined}
              aria-describedby={alertMessage ? 'admin-login-alert' : undefined}
              className={cn(fieldBase, alertMessage ? fieldInvalid : fieldValid)}
            />
          </div>

          {alertMessage && (
            <p
              id="admin-login-alert"
              role="alert"
              aria-live="assertive"
              className="mt-0 mb-5 flex items-start gap-2 rounded-md border border-danger/30 bg-danger-soft px-3.5 py-3 text-[13px] leading-[1.5] font-medium text-danger"
            >
              <span aria-hidden="true" className="mt-px font-bold">
                !
              </span>
              <span>{alertMessage}</span>
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className={cn(
              'min-h-11 w-full rounded-md border-none bg-brand px-4 py-3 text-base font-bold font-sans text-white shadow-card transition-[filter,opacity]',
              busy ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:brightness-110',
            )}
          >
            {busy ? t('login.signingIn') : t('login.submit')}
          </button>

          <p className="mt-4 mb-0 text-center text-[11.5px] leading-[1.5] text-muted">{t('login.hint')}</p>
        </form>

        <div className="border-t border-line px-5 py-3.5 text-center sm:px-7">
          <span className="text-[11.5px] text-muted">
            © {new Date().getFullYear()} {t('app.name')}
          </span>
        </div>
      </div>
    </div>
  )
}
