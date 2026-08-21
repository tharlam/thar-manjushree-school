import { useState } from 'react'
import { useField, PageHero, Section, Tile, fieldStyles } from './shared.jsx'
import { colors, radii } from '../../theme.js'
import { useLanguage } from '../../i18n.jsx'
import { useAppStore } from '../../store.jsx'

export default function Contact() {
  const { t } = useLanguage()
  const { addContactMessage } = useAppStore()
  const introTitle = useField('contact', 'introTitle')
  const introBody = useField('contact', 'introBody')

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')

  const set = (key) => (v) => {
    setForm((f) => ({ ...f, [key]: v }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    else if (form.name.trim().length < 2) e.name = 'Name must be at least 2 characters'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address'
    if (!form.message.trim()) e.message = 'Message is required'
    else if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async () => {
    if (!validate()) return
    setBusy(true)
    setServerError('')
    try {
      const ok = await addContactMessage(form)
      if (ok) {
        setDone(true)
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setServerError('Failed to send message. Please try again.')
      }
    } catch {
      setServerError('An error occurred. Please try again later.')
    } finally {
      setBusy(false)
    }
  }

  const cards = [
    { label: t('contactPage.address'), value: 'Boudhanath, Kathmandu 44600, Nepal', icon: '📍' },
    { label: t('contactPage.phone'), value: '+977 1 449 2210', icon: '📞' },
    { label: t('contactPage.email'), value: 'admin@thar-manjushree.edu.np', icon: '✉️' },
    { label: t('contactPage.hoursTitle'), value: t('contactPage.hoursValue'), icon: '🕗' },
  ]

  return (
    <div>
      <PageHero title={introTitle} subtitle={introBody} kicker={t('contactPage.title')} />

      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 26 }}>
          {cards.map((c) => (
            <Tile key={c.label} style={{ borderTop: `3px solid ${colors.primary}` }}>
              <span style={{ fontSize: 22 }}>{c.icon}</span>
              <p style={{ margin: '10px 0 0', fontSize: 12, fontWeight: 700, color: colors.muted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{c.label}</p>
              <p style={{ margin: '5px 0 0', fontSize: 14, fontWeight: 700, color: colors.text, lineHeight: 1.45 }}>{c.value}</p>
            </Tile>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          <Tile style={{ padding: 24 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: colors.text }}>{t('contactPage.formTitle')}</h3>
            {done && (
              <div style={{ marginTop: 14, padding: '12px 16px', borderRadius: radii.md, background: colors.successSoft, color: colors.success, fontSize: 13.5, fontWeight: 600 }}>
                {t('contactPage.sentMsg')}
              </div>
            )}
            {serverError && (
              <div style={{ marginTop: 14, padding: '12px 16px', borderRadius: radii.md, background: colors.dangerSoft, color: colors.danger, fontSize: 13.5, fontWeight: 600 }}>
                {serverError}
              </div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 16 }}>
              <label style={fieldStyles.label}>
                <span style={fieldStyles.labelText}>{t('contactPage.name')} *</span>
                <input
                  style={{
                    ...fieldStyles.input,
                    ...(errors.name ? { borderColor: colors.danger } : {}),
                  }}
                  value={form.name}
                  onChange={(e) => set('name')(e.target.value)}
                />
                {errors.name && <span style={{ fontSize: 12, color: colors.danger }}>{errors.name}</span>}
              </label>
              <label style={fieldStyles.label}>
                <span style={fieldStyles.labelText}>{t('contactPage.emailLabel')}</span>
                <input
                  style={{
                    ...fieldStyles.input,
                    ...(errors.email ? { borderColor: colors.danger } : {}),
                  }}
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email')(e.target.value)}
                />
                {errors.email && <span style={{ fontSize: 12, color: colors.danger }}>{errors.email}</span>}
              </label>
              <label style={{ ...fieldStyles.label, minWidth: '100%' }}>
                <span style={fieldStyles.labelText}>{t('contactPage.subject')}</span>
                <input style={fieldStyles.input} value={form.subject} onChange={(e) => set('subject')(e.target.value)} />
              </label>
              <label style={{ ...fieldStyles.label, minWidth: '100%' }}>
                <span style={fieldStyles.labelText}>{t('contactPage.message')} *</span>
                <textarea
                  style={{
                    ...fieldStyles.textarea,
                    ...(errors.message ? { borderColor: colors.danger } : {}),
                  }}
                  value={form.message}
                  onChange={(e) => set('message')(e.target.value)}
                />
                {errors.message && <span style={{ fontSize: 12, color: colors.danger }}>{errors.message}</span>}
              </label>
            </div>
            <button
              type="button"
              style={{
                ...fieldStyles.submit,
                opacity: busy ? 0.7 : 1,
                cursor: busy ? 'not-allowed' : 'pointer',
              }}
              onClick={submit}
              disabled={busy}
            >
              {busy ? 'Sending...' : t('contactPage.send')}
            </button>
          </Tile>

          <Tile style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}` }}>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: colors.text }}>{t('contactPage.visitTitle')}</p>
              <p style={{ margin: '4px 0 0', fontSize: 12.5, color: colors.muted }}>{t('contactPage.mapNote')}</p>
            </div>
            <iframe
              title="Thar Manjushree School location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=85.3500%2C27.7100%2C85.3750%2C27.7300&layer=mapnik&marker=27.7212%2C85.3617"
              style={{ flex: 1, minHeight: 360, width: '100%', border: 'none' }}
              loading="lazy"
            />
          </Tile>
        </div>
      </Section>
    </div>
  )
}
