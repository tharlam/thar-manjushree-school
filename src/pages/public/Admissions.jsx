import { useState } from 'react'
import { useField, PageHero, Section, Tile, fieldStyles } from './shared.jsx'
import { colors, radii } from '../../theme.js'
import { useLanguage } from '../../i18n.jsx'
import { useAppStore } from '../../store.jsx'

const classOptions = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7']

export default function Admissions() {
  const { t } = useLanguage()
  const { addAdmission } = useAppStore()
  const introTitle = useField('admissions', 'introTitle')
  const introBody = useField('admissions', 'introBody')
  const requirementsTitle = useField('admissions', 'requirementsTitle')
  const requirementsBody = useField('admissions', 'requirementsBody')
  const processTitle = useField('admissions', 'processTitle')
  const processBody = useField('admissions', 'processBody')

  const [form, setForm] = useState({
    name: '',
    guardian: '',
    dob: '',
    age: '',
    phone: '',
    address: '',
    education: '',
    classRequested: 'Level 1',
    message: '',
  })
  const [error, setError] = useState('')
  const [done, setDone] = useState('')
  const [busy, setBusy] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  const set = (key) => (v) => {
    setForm((f) => ({ ...f, [key]: v }))
    if (fieldErrors[key]) setFieldErrors((e) => ({ ...e, [key]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    else if (form.name.trim().length < 2) e.name = 'Name must be at least 2 characters'
    if (!form.guardian.trim()) e.guardian = 'Guardian name is required'
    const age = Number(form.age)
    if (!form.age) e.age = 'Age is required'
    else if (age < 5 || age > 18) e.age = 'Age must be between 5 and 18'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    else if (form.phone.trim().length < 7) e.phone = 'Phone must be at least 7 digits'
    setFieldErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async () => {
    if (!validate()) {
      setError(t('admissionsPage.invalid'))
      return
    }
    setError('')
    setBusy(true)
    try {
      await addAdmission(form)
      setDone(t('admissionsPage.success'))
      setForm({ name: '', guardian: '', dob: '', age: '', phone: '', address: '', education: '', classRequested: 'Level 1', message: '' })
    } catch {
      setError('Failed to submit. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const processSteps = [
    { n: '1', text: processBody },
  ]

  return (
    <div>
      <PageHero title={introTitle} subtitle={introBody} kicker={t('admissionsPage.title')} />

      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 26 }}>
          <Tile style={{ borderTop: `3px solid ${colors.info}` }}>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: colors.text }}>{requirementsTitle}</h3>
            <p style={{ margin: '10px 0 0', fontSize: 13.5, lineHeight: 1.7, color: colors.textSoft }}>{requirementsBody}</p>
          </Tile>
          <Tile style={{ borderTop: `3px solid ${colors.primary}` }}>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: colors.text }}>{processTitle}</h3>
            {processSteps.map((s) => (
              <p key={s.n} style={{ margin: '10px 0 0', fontSize: 13.5, lineHeight: 1.7, color: colors.textSoft }}>{s.text}</p>
            ))}
          </Tile>
        </div>

        <Tile style={{ maxWidth: 780, margin: '0 auto', padding: 26 }}>
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: colors.text }}>{t('admissionsPage.formTitle')}</h3>

          {done && (
            <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: radii.md, background: colors.successSoft, color: colors.success, fontSize: 13.5, fontWeight: 600 }}>
              {done}
            </div>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 18 }}>
            <label style={fieldStyles.label}>
              <span style={fieldStyles.labelText}>{t('admissionsPage.fullName')} *</span>
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
              <span style={fieldStyles.labelText}>{t('admissionsPage.guardianName')} *</span>
              <input
                style={{
                  ...fieldStyles.input,
                  ...(fieldErrors.guardian ? { borderColor: colors.danger } : {}),
                }}
                value={form.guardian}
                onChange={(e) => set('guardian')(e.target.value)}
              />
              {fieldErrors.guardian && <span style={{ fontSize: 12, color: colors.danger }}>{fieldErrors.guardian}</span>}
            </label>
            <label style={{ ...fieldStyles.label, minWidth: 150 }}>
              <span style={fieldStyles.labelText}>{t('admissionsPage.dateOfBirth')}</span>
              <input style={fieldStyles.input} type="date" value={form.dob} onChange={(e) => set('dob')(e.target.value)} />
            </label>
            <label style={{ ...fieldStyles.label, minWidth: 90 }}>
              <span style={fieldStyles.labelText}>{t('admissionsPage.age')} *</span>
              <input
                style={{
                  ...fieldStyles.input,
                  ...(fieldErrors.age ? { borderColor: colors.danger } : {}),
                }}
                type="number"
                min="5"
                max="18"
                value={form.age}
                onChange={(e) => set('age')(e.target.value)}
              />
              {fieldErrors.age && <span style={{ fontSize: 12, color: colors.danger }}>{fieldErrors.age}</span>}
            </label>
            <label style={fieldStyles.label}>
              <span style={fieldStyles.labelText}>{t('admissionsPage.phone')} *</span>
              <input
                style={{
                  ...fieldStyles.input,
                  ...(fieldErrors.phone ? { borderColor: colors.danger } : {}),
                }}
                value={form.phone}
                onChange={(e) => set('phone')(e.target.value)}
              />
              {fieldErrors.phone && <span style={{ fontSize: 12, color: colors.danger }}>{fieldErrors.phone}</span>}
            </label>
            <label style={fieldStyles.label}>
              <span style={fieldStyles.labelText}>{t('admissionsPage.address')}</span>
              <input style={fieldStyles.input} value={form.address} onChange={(e) => set('address')(e.target.value)} />
            </label>
            <label style={fieldStyles.label}>
              <span style={fieldStyles.labelText}>{t('admissionsPage.education')}</span>
              <input style={fieldStyles.input} value={form.education} onChange={(e) => set('education')(e.target.value)} />
            </label>
            <label style={{ ...fieldStyles.label, minWidth: 160 }}>
              <span style={fieldStyles.labelText}>{t('admissionsPage.classRequested')}</span>
              <select style={fieldStyles.input} value={form.classRequested} onChange={(e) => set('classRequested')(e.target.value)}>
                {classOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <label style={{ ...fieldStyles.label, minWidth: '100%' }}>
              <span style={fieldStyles.labelText}>{t('admissionsPage.message')}</span>
              <textarea style={fieldStyles.textarea} value={form.message} onChange={(e) => set('message')(e.target.value)} />
            </label>
          </div>

          {error && <p style={{ margin: '12px 0 0', fontSize: 12.5, color: colors.danger, fontWeight: 600 }}>{error}</p>}

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 18, flexWrap: 'wrap' }}>
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
              {busy ? 'Submitting...' : t('admissionsPage.submit')}
            </button>
            <span style={{ fontSize: 12, color: colors.muted }}>{t('admissionsPage.previewNote')}</span>
          </div>
        </Tile>
      </Section>
    </div>
  )
}
