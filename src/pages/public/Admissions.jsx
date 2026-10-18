import { useState } from 'react'
import { useField, PageHero, Section, Photo } from './shared.jsx'
import { Accordion, CardTitle, CardBody, CardEyebrow, CheckList, OpenCard, Panel } from '../../components/cards.jsx'
import { colors, space } from '../../theme.js'
import { cn } from '../../lib/cn.js'
import { useLanguage } from '../../i18n.jsx'
import { useAppStore } from '../../store.jsx'

const classOptions = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7']

const criteria = [
  'The applicant must be a male child between the ages of 7 and 14 years old.',
  'The child must express an authentic, personal desire to join the monastic community.',
  'He must pass a basic medical check to ensure he does not have a contagious condition that could affect a residential community.',
  'Both parents, or his legal guardians, must provide clear written consent.',
]

const steps = [
  { n: '1', title: 'The Digital Inquiry', body: 'Submit the initial application form through our website.' },
  { n: '2', title: 'The Monastic Invitation', body: 'Shortlisted families are invited to stay at the guest house for a 3-day trial evaluation.' },
  { n: '3', title: 'The Spiritual & Academic Dialogue', body: 'A gentle interview with the Principal to understand the child\u2019s natural inclination and readiness.' },
  { n: '4', title: 'The Hair-Cutting & Robe Ceremony', body: 'Upon formal acceptance, the student is assigned to his house and officially enters the novice order.' },
]

const documents = [
  'Certified copy of the official Birth Certificate.',
  'National Identity Cards or Passports of both parents/guardians.',
  'Official school transcripts or character certificates from previous schools (if any).',
  'Recent medical check-up clearance report from a certified physician.',
]

const faqs = [
  {
    q: 'Are there hidden fees for books, clothing, or housing?',
    a: 'Absolutely not. Once a child is accepted, his education, meals, clothing, and housing are 100% free. That includes his seasonal robes, textbooks, three meals a day, and his bed in our residential quarters.',
  },
  {
    q: 'Can a student leave the monastery if he realizes the path is not right for him?',
    a: 'Yes. Monastic life is entirely voluntary. If a student decides later in life to pursue a secular career, he leaves with the education he has received.',
  },
]

const fieldLabel = 'flex min-w-[180px] flex-1 flex-col gap-1.5'
const fieldLabelText = 'text-xs font-semibold text-body'
const fieldInput =
  'w-full rounded-md border border-line bg-surface px-[13px] py-[11px] text-[13.5px] font-sans text-ink outline-none transition-[border-color,box-shadow] focus:border-pine focus:ring-[3px] focus:ring-pine/15'
const fieldTextarea = cn(fieldInput, 'min-h-[110px] resize-y')
const submitBtn =
  'cursor-pointer rounded-md border-none bg-pine px-6 py-3 text-[14px] font-bold font-sans text-white shadow-pop'

export default function Admissions() {
  const { t } = useLanguage()
  const { addAdmission } = useAppStore()
  const introTitle = useField('admissions', 'introTitle')
  const introBody = useField('admissions', 'introBody')

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

  return (
    <div>
      <PageHero title={introTitle} subtitle={introBody} kicker={t('admissionsPage.title')} />

      <Section title="Criteria for Entry">
        <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-12">
          <div>
            <CardEyebrow>Before You Apply</CardEyebrow>
            <CheckList items={criteria} accent={colors.info} ordered className="mt-4.5" />
          </div>
          <Photo
            src="/images/program-monastic.jpg"
            alt="Young monks in study at Thar Manjushree School"
            ratio="4 / 3"
            fallbackLabel="Criteria for Entry"
          />
        </div>
      </Section>

      <Section title="The Four Steps to Enrollment" className="border-y border-line bg-surface-alt">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-8">
          {steps.map((s, i) => (
            <OpenCard key={s.n} accent={colors.primary} index={i + 1} hover>
              <CardEyebrow color={colors.primary}>Step {s.n}</CardEyebrow>
              <CardTitle as="h3" className="mt-2.5 pr-[34px] text-[15.5px]">{s.title}</CardTitle>
              <CardBody className="mt-2 pr-6">{s.body}</CardBody>
            </OpenCard>
          ))}
        </div>
      </Section>

      <Section title="Documentation Checklist">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
          <div>
            <CardEyebrow color={colors.accent}>Please Prepare</CardEyebrow>
            <CheckList items={documents} accent={colors.accent} className="mt-4.5" />
          </div>
          <div>
            <CardEyebrow color={colors.success}>Good to Know</CardEyebrow>
            <CardTitle as="h3" className="mt-2.5 text-[16px]">Frequently Asked Questions</CardTitle>
            <Accordion items={faqs} initial={-1} className="mt-3.5 max-w-full" />
          </div>
        </div>
      </Section>

      <Section className="border-t border-line bg-surface-alt">
        <div className="mx-auto max-w-[780px]">
          <Panel accent={colors.primary} pad={space['3xl']}>
            <CardTitle as="h3" className="text-[20px]">{t('admissionsPage.formTitle')}</CardTitle>

          {done && (
            <div className="mt-4 rounded-md bg-success-soft px-4 py-3 text-[13.5px] font-semibold text-success">
              {done}
            </div>
          )}

          <div className="mt-4.5 flex flex-wrap gap-3.5">
            <label className={fieldLabel}>
              <span className={fieldLabelText}>{t('admissionsPage.fullName')} *</span>
              <input
                className={cn(fieldInput, fieldErrors.name && 'border-danger')}
                value={form.name}
                onChange={(e) => set('name')(e.target.value)}
              />
              {fieldErrors.name && <span className="text-xs text-danger">{fieldErrors.name}</span>}
            </label>
            <label className={fieldLabel}>
              <span className={fieldLabelText}>{t('admissionsPage.guardianName')} *</span>
              <input
                className={cn(fieldInput, fieldErrors.guardian && 'border-danger')}
                value={form.guardian}
                onChange={(e) => set('guardian')(e.target.value)}
              />
              {fieldErrors.guardian && <span className="text-xs text-danger">{fieldErrors.guardian}</span>}
            </label>
            <label className={cn(fieldLabel, 'min-w-[150px]')}>
              <span className={fieldLabelText}>{t('admissionsPage.dateOfBirth')}</span>
              <input className={fieldInput} type="date" value={form.dob} onChange={(e) => set('dob')(e.target.value)} />
            </label>
            <label className={cn(fieldLabel, 'min-w-[90px]')}>
              <span className={fieldLabelText}>{t('admissionsPage.age')} *</span>
              <input
                className={cn(fieldInput, fieldErrors.age && 'border-danger')}
                type="number"
                min="5"
                max="18"
                value={form.age}
                onChange={(e) => set('age')(e.target.value)}
              />
              {fieldErrors.age && <span className="text-xs text-danger">{fieldErrors.age}</span>}
            </label>
            <label className={fieldLabel}>
              <span className={fieldLabelText}>{t('admissionsPage.phone')} *</span>
              <input
                className={cn(fieldInput, fieldErrors.phone && 'border-danger')}
                value={form.phone}
                onChange={(e) => set('phone')(e.target.value)}
              />
              {fieldErrors.phone && <span className="text-xs text-danger">{fieldErrors.phone}</span>}
            </label>
            <label className={fieldLabel}>
              <span className={fieldLabelText}>{t('admissionsPage.address')}</span>
              <input className={fieldInput} value={form.address} onChange={(e) => set('address')(e.target.value)} />
            </label>
            <label className={fieldLabel}>
              <span className={fieldLabelText}>{t('admissionsPage.education')}</span>
              <input className={fieldInput} value={form.education} onChange={(e) => set('education')(e.target.value)} />
            </label>
            <label className={cn(fieldLabel, 'min-w-[160px]')}>
              <span className={fieldLabelText}>{t('admissionsPage.classRequested')}</span>
              <select className={fieldInput} value={form.classRequested} onChange={(e) => set('classRequested')(e.target.value)}>
                {classOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className={cn(fieldLabel, 'min-w-full')}>
              <span className={fieldLabelText}>{t('admissionsPage.message')}</span>
              <textarea className={fieldTextarea} value={form.message} onChange={(e) => set('message')(e.target.value)} />
            </label>
          </div>

          {error && <p className="mt-3 mb-0 text-[12.5px] font-semibold text-danger">{error}</p>}

          <div className="mt-4.5 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              className={cn(submitBtn, busy && 'cursor-not-allowed opacity-70')}
              onClick={submit}
              disabled={busy}
            >
              {busy ? 'Submitting...' : t('admissionsPage.submit')}
            </button>
            <span className="text-xs text-muted">{t('admissionsPage.previewNote')}</span>
          </div>
          </Panel>
        </div>
      </Section>
    </div>
  )
}
