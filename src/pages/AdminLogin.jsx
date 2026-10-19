import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '../lib/cn.js'
import { useAdminAuth } from '../auth/AdminAuth.jsx'

export default function AdminLogin() {
  const { login, authenticated } = useAdminAuth()
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (authenticated) navigate('/admin', { replace: true })
  }, [authenticated, navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    await login()
    setBusy(false)
    navigate('/admin', { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-ink to-pine p-5 font-sans">
      <div className="w-full max-w-[420px] animate-[fadeUp_0.3s_ease] overflow-hidden rounded-lg bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <div className="bg-linear-to-br from-pine to-ink px-7 pt-7 pb-6 text-center">
          <h1 className="m-0 text-[20px] font-extrabold text-white">
            Tharlam Manjushree School
          </h1>
          <p className="mt-1.5 mb-0 text-[13px] text-white/75">
            Staff Portal
          </p>
        </div>

        <form onSubmit={handleLogin} className="px-7 pt-7 pb-6">
          <p className="mt-0 mb-5 text-[14px] leading-[1.6] text-body">
            Open the staff dashboard to manage pages, content, admissions, houses and events.
          </p>

          <button
            type="submit"
            disabled={busy}
            className={cn(
              'w-full rounded-md border-none bg-linear-to-br from-pine to-ink py-3 text-[14px] font-bold font-sans text-white',
              busy ? 'cursor-default opacity-70' : 'cursor-pointer',
            )}
          >
            {busy ? 'Signing in…' : 'Enter Staff Area'}
          </button>

          <p className="mt-4 mb-0 text-center text-[11.5px] leading-[1.5] text-muted">
            Staff sign-in is open. Email and password protection can be added later.
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
