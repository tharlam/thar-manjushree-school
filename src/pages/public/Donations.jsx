import { useState } from 'react'
import { useField, PageHero, Section, Tile, fieldStyles } from './shared.jsx'
import { colors, radii } from '../../theme.js'
import { useLanguage } from '../../i18n.jsx'
import { useAppStore } from '../../store.jsx'
import { supabase, isSupabaseConfigured } from '../../lib/supabase.js'
import { khaltiConfigured, payWithKhalti } from '../../lib/payments.js'

export default function Donations() {
  const { t } = useLanguage()
  const { addDonation, refresh } = useAppStore()
  const introTitle = useField('donations', 'introTitle')
  const introBody = useField('donations', 'introBody')
  const bankTitle = useField('donations', 'bankTitle')
  const bankBody = useField('donations', 'bankBody')
  const transparencyTitle = useField('donations', 'transparencyTitle')
  const transparencyBody = useField('donations', 'transparencyBody')

  const [form, setForm] = useState({ name: '', email: '', amount: '', type: 'oneTime', note: '' })
  const [error, setError] = useState('')
  const [done, setDone] = useState('')
  const [busy, setBusy] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  const set = (key) => (v) => {
    setForm((f) => ({ ...f, [key]: v }))
    if (fieldErrors[key]) setFieldErrors((e) => ({ ...e, [key]: '' }))
  }

  const resetForm = () => setForm({ name: '', email: '', amount: '', type: 'oneTime', note: '' })

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    else if (form.name.trim().length < 2) e.name = 'Name must be at least 2 characters'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address'
    const amount = Number(form.amount)
    if (!form.amount || !amount) e.amount = 'Amount is required'
    else if (amount < 10) e.amount = 'Minimum donation is NPR 10'
    setFieldErrors(e)
    return Object.keys(e).length === 0
  }

  const verifyAndRecord = async (res) => {
    const { data } = await supabase.functions.invoke('verify-donation', {
      body: {
        token: res.token,
        amountPaisa: Math.round(Number(form.amount) * 100),
        name: form.name.trim(),
        email: form.email.trim(),
        note: form.note.trim(),
      },
    })
    if (!data || !data.ok) throw new Error(data?.error || 'VERIFY_FAILED')
  }

  const submit = async () => {
    if (!validate()) return
    const amount = Number(form.amount)
    setError('')
    setDone('')

    // Offline/demo build: no backend and no gateway - record locally.
    if (!isSupabaseConfigured) {
      addDonation({ name: form.name.trim(), email: form.email.trim(), amount, note: form.note.trim(), type: 'donation' })
      setDone(t('donationsPage.success'))
      resetForm()
      return
    }

    if (!khaltiConfigured) return

    setBusy(true)
    try {
      await payWithKhalti({
        amountNpr: amount,
        onSuccess: async (res) => {
          try {
            await verifyAndRecord(res)
            await refresh()
            setDone(t('donationsPage.success'))
            resetForm()
          } catch (e) {
            setError(t('donationsPage.failed'))
          } finally {
            setBusy(false)
          }
        },
        onError: () => {
          setError(t('donationsPage.failed'))
          setBusy(false)
        },
        onClose: () => {
          setBusy(false)
        },
      })
    } catch (e) {
      setError(t('donationsPage.gatewayError'))
      setBusy(false)
    }
  }

  return (
    <div>
      <PageHero title={introTitle} subtitle={introBody} kicker={t('donationsPage.title')} />

      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 26 }}>
          <Tile style={{ borderTop: `3px solid ${colors.accent}`, padding: 26 }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: colors.text }}>{t('donationsPage.formTitle')}</h3>
            {done && (
              <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: radii.md, background: colors.successSoft, color: colors.success, fontSize: 13.5, fontWeight: 600 }}>
                {done}
              </div>
            )}
            {error && (
              <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: radii.md, background: colors.dangerSoft, color: colors.danger, fontSize: 13.5, fontWeight: 600 }}>
                {error}
              </div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 18 }}>
              <label style={fieldStyles.label}>
                <span style={fieldStyles.labelText}>{t('donationsPage.donorName')} *</span>
                <input
                  style={{
                    ...fieldStyles.input,
                    ...(fieldErrors.name ? { borderColor: colors.danger } : {}),
                  }}
                  value={form.name}
                  onChange={(e) => set('name')(e.target.value)}
                />
                {fieldErrors.name && <span style={{ fontSize: 12, color: colors.danger }}>{fieldErrors.name}</span>}
              </label>
              <label style={fieldStyles.label}>
                <span style={fieldStyles.labelText}>{t('donationsPage.email')}</span>
                <input
                  style={{
                    ...fieldStyles.input,
                    ...(fieldErrors.email ? { borderColor: colors.danger } : {}),
                  }}
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email')(e.target.value)}
                />
                {fieldErrors.email && <span style={{ fontSize: 12, color: colors.danger }}>{fieldErrors.email}</span>}
              </label>
              <label style={{ ...fieldStyles.label, minWidth: 150 }}>
                <span style={fieldStyles.labelText}>{t('donationsPage.amount')} *</span>
                <input
                  style={{
                    ...fieldStyles.input,
                    ...(fieldErrors.amount ? { borderColor: colors.danger } : {}),
                  }}
                  type="number"
                  min="10"
                  step="any"
                  value={form.amount}
                  onChange={(e) => set('amount')(e.target.value)}
                  placeholder="NPR"
                />
                {fieldErrors.amount && <span style={{ fontSize: 12, color: colors.danger }}>{fieldErrors.amount}</span>}
              </label>
              <label style={{ ...fieldStyles.label, minWidth: 180 }}>
                <span style={fieldStyles.labelText}>{t('donationsPage.typeLabel')}</span>
                <select style={fieldStyles.input} value={form.type} onChange={(e) => set('type')(e.target.value)}>
                  <option value="oneTime">{t('donationsPage.oneTime')}</option>
                  <option value="monthly">{t('donationsPage.monthly')}</option>
                  <option value="sponsor">{t('donationsPage.sponsor')}</option>
                </select>
              </label>
              <label style={{ ...fieldStyles.label, minWidth: '100%' }}>
                <span style={fieldStyles.labelText}>{t('donationsPage.note')}</span>
                <textarea style={fieldStyles.textarea} value={form.note} onChange={(e) => set('note')(e.target.value)} />
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 18, flexWrap: 'wrap' }}>
              <button
                type="button"
                disabled={busy || !khaltiConfigured}
                style={{
                  ...fieldStyles.submit,
                  opacity: busy || !khaltiConfigured ? 0.55 : 1,
                  cursor: busy || !khaltiConfigured ? 'not-allowed' : 'pointer',
                }}
                onClick={submit}
              >
                {busy ? t('donationsPage.processing') : t('donationsPage.payWith')}
              </button>
              {!isSupabaseConfigured && <span style={{ fontSize: 12, color: colors.muted }}>{t('donationsPage.previewNote')}</span>}
              {isSupabaseConfigured && !khaltiConfigured && (
                <span style={{ fontSize: 12, color: colors.muted }}>{t('donationsPage.notConfigured')}</span>
              )}
            </div>
          </Tile>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Tile style={{ borderTop: `3px solid ${colors.primary}` }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: colors.text }}>{bankTitle}</h3>
              <p style={{ margin: '10px 0 0', fontSize: 13.5, lineHeight: 1.7, color: colors.textSoft }}>{bankBody}</p>
              <div style={{ marginTop: 14, padding: 12, borderRadius: radii.md, background: colors.surfaceAlt, border: `1px solid ${colors.border}`, fontFamily: 'Consolas, monospace', fontSize: 12.5, color: colors.textSoft, lineHeight: 1.8 }}>
                Account Name: Thar Manjushree School<br />
                Bank: Nepal Rastra Bank, Kathmandu<br />
                Account No: 010-202-4460-1964<br />
                SWIFT: NRBLNPKT<br />
                Branch: Boudhanath
              </div>
            </Tile>
            <Tile style={{ borderTop: `3px solid ${colors.success}` }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: colors.text }}>{transparencyTitle}</h3>
              <p style={{ margin: '10px 0 0', fontSize: 13.5, lineHeight: 1.7, color: colors.textSoft }}>{transparencyBody}</p>
            </Tile>
          </div>
        </div>
      </Section>
    </div>
  )
}
