import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n.jsx'
import { colors, font, radii } from '../theme.js'
import { useAdminAuth } from '../auth/AdminAuth.jsx'

export default function AdminLogin() {
  const { t } = useLanguage()
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
      setError(t('login.invalid'))
    }
  }

  const fieldStyle = (hasError) => ({
    width: '100%',
    padding: '11px 14px',
    borderRadius: radii.md,
    border: `1px solid ${hasError ? colors.danger : colors.border}`,
    background: colors.surfaceAlt,
    fontSize: 14,
    fontFamily: font.sans,
    color: colors.text,
    outline: 'none',
    boxSizing: 'border-box',
  })

  const labelStyle = { display: 'block', fontSize: 12, fontWeight: 700, color: colors.text, marginBottom: 6 }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${colors.sidebar} 0%, ${colors.primaryDark} 50%, ${colors.primary} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: font.sans,
        padding: 20,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: colors.surface,
          borderRadius: radii.lg,
          boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
          overflow: 'hidden',
          animation: 'fadeUp .3s ease',
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
            padding: '28px 28px 24px',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              width: 56,
              height: 56,
              borderRadius: radii.lg,
              background: `linear-gradient(135deg, ${colors.accent}, #C7701F)`,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 800,
              color: '#fff',
              marginBottom: 14,
            }}
          >
            ད
          </span>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#fff' }}>
            {t('app.name')}
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>
            {t('app.admin')}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '28px 28px 24px' }}>
          <p style={{ margin: '0 0 20px', fontSize: 14, color: colors.textSoft, lineHeight: 1.5 }}>
            {t('login.prompt')}
          </p>

          <label style={labelStyle}>
            {t('login.email')}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError('') }}
            placeholder={t('login.placeholderEmail')}
            autoComplete="username"
            autoFocus
            style={fieldStyle(false)}
          />

          <label style={{ ...labelStyle, marginTop: 16 }}>
            {t('login.password')}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError('') }}
            placeholder={t('login.placeholder')}
            autoComplete="current-password"
            style={fieldStyle(Boolean(error))}
          />

          {error && (
            <p style={{ margin: '8px 0 0', fontSize: 12.5, color: colors.danger, fontWeight: 600 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            style={{
              width: '100%',
              marginTop: 22,
              padding: '12px 0',
              borderRadius: radii.md,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
              color: '#fff',
              border: 'none',
              fontSize: 14,
              fontWeight: 700,
              fontFamily: font.sans,
              cursor: busy ? 'default' : 'pointer',
              opacity: busy ? 0.7 : 1,
            }}
          >
            {busy ? t('login.signingIn') : t('login.submit')}
          </button>

          <p style={{ margin: '16px 0 0', fontSize: 11.5, color: colors.muted, textAlign: 'center' }}>
            {t('login.hint')}
          </p>
        </form>

        <div style={{ padding: '14px 28px', borderTop: `1px solid ${colors.border}`, textAlign: 'center' }}>
          <span style={{ fontSize: 11.5, color: colors.muted }}>
            © {new Date().getFullYear()} Tharlam Manjushree School
          </span>
        </div>
      </div>
    </div>
  )
}
