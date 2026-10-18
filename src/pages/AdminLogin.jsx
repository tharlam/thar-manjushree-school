import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '../lib/cn.js'
import { useAdminAuth } from '../auth/AdminAuth.jsx'

export default function AdminLogin() {
  const { login, authenticated } = useAdminAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (authenticated) navigate('/admin', { replace: true })
  }, [authenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    setError('')
    const res = await login(email.trim(), password)
    setBusy(false)
    if (res.ok) {
      navigate('/admin', { replace: true })
    } else {
      setError('Incorrect email or password. Please try again.')
    }
  }

  const fieldClass = 'box-border w-full rounded-md border bg-surface-alt px-3.5 py-[11px] text-[14px] font-sans text-ink outline-none'

  const labelClass = 'mb-1.5 block text-[12px] font-bold text-ink'

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-ink to-pine p-5 font-sans">
      <div className="w-full max-w-[420px] animate-[fadeUp_0.3s_ease] overflow-hidden rounded-lg bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <div className="bg-linear-to-br from-pine to-ink px-7 pt-7 pb-6 text-center">
          <h1 className="m-0 text-[20px] font-extrabold text-white">
            Tharlam Manjushree School
          </h1>
          <p className="mt-1.5 mb-0 text-[13px] text-white/75">
            Admin Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-7 pt-7 pb-6">
          <p className="mt-0 mb-5 text-[14px] leading-[1.5] text-body">
            Enter your staff email and password to access the Admin Portal.
          </p>

          <label className={labelClass}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError('') }}
            placeholder="you@school.edu.np"
            autoComplete="username"
            autoFocus
            className={cn(fieldClass, 'border-line')}
          />

          <label className={cn(labelClass, 'mt-4')}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError('') }}
            placeholder="Enter your password"
            autoComplete="current-password"
            className={cn(fieldClass, error ? 'border-danger' : 'border-line')}
          />

          {error && (
            <p className="mt-2 mb-0 text-[12.5px] font-semibold text-danger">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className={cn(
              'mt-[22px] w-full rounded-md border-none bg-linear-to-br from-pine to-ink py-3 text-[14px] font-bold font-sans text-white',
              busy ? 'cursor-default opacity-70' : 'cursor-pointer',
            )}
          >
            {busy ? 'Signing in…' : 'Sign In'}
          </button>

          <p className="mt-4 mb-0 text-center text-[11.5px] text-muted">
            Protected by Firebase Auth. Sessions expire automatically.
          </p>
        </form>

        <div className="border-t border-line px-7 py-3.5 text-center">
          <span className="text-[11.5px] text-muted">
            © {new Date().getFullYear()} Tharlam Manjushree School
          </span>
        </div>
      </div>
    </div>
  )
}
