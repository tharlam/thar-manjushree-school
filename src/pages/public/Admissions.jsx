import { useState } from 'react'
import { usePage, PageHero, Section, Photo } from './shared.jsx'
import { Accordion, CardTitle, CardBody, CardEyebrow, CheckList, OpenCard, Panel } from '../../components/cards.jsx'
import { colors, space } from '../../theme.js'
import { cn } from '../../lib/cn.js'
import { useAppStore } from '../../store.jsx'

const fieldLabel = 'flex min-w-[180px] flex-1 flex-col gap-1.5'
const fieldLabelText = 'text-xs font-semibold text-body'
const fieldInput =
  'w-full rounded-md border border-line bg-surface px-[13px] py-[11px] text-[13.5px] font-sans text-ink outline-none transition-[border-color,box-shadow] focus:border-pine focus:ring-[3px] focus:ring-pine/15'
const fieldTextarea = cn(fieldInput, 'min-h-[110px] resize-y')
const submitBtn =
  'cursor-pointer rounded-md border-none bg-pine px-6 py-3 text-[14px] font-bold font-sans text-white shadow-pop'

export default function Admissions() {
  const f = usePage('admissions')
  const { addAdmission } = useAppStore()
  const introTitle = f('introTitle')
  const introBody = f('introBody')

  const classOptions = [
    { value: 'Level 1', label: f('classOption1') },
    { value: 'Level 2', label: f('classOption2') },
    { value: 'Level 3', label: f('classOption3') },
    { value: 'Level 4', label: f('classOption4') },
    { value: 'Level 5', label: f('classOption5') },
    { value: 'Level 6', label: f('classOption6') },
    { value: 'Level 7', label: f('classOption7') },
  ]

  const criteria = [
    f('criteriaItem1'),
    f('criteriaItem2'),
    f('criteriaItem3'),
    f('criteriaItem4'),
  ]

  const steps = [
    { n: '1', title: f('step1Title'), body: f('step1Body') },
    { n: '2', title: f('step2Title'), body: f('step2Body') },
    { n: '3', title: f('step3Title'), body: f('step3Body') },
    { n: '4', title: f('step4Title'), body: f('step4Body') },
  ]

  const documents = [
    f('documentItem1'),
    f('documentItem2'),
    f('documentItem3'),
    f('documentItem4'),
  ]

  const faqs = [
    {
      q: f('faq1Question'),
      a: f('faq1Answer'),
    },
    {
      q: f('faq2Question'),
      a: f('faq2Answer'),
    },
  ]

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
      setError(f('formInvalidMessage'))
      return
    }
    setError('')
    setBusy(true)
    try {
      const result = await addAdmission(form)
      if (!result.ok) {
        setError(result.error || 'Failed to submit. Please try again.')
        return
      }
      setDone(f('formSuccessMessage'))
      setForm({ name: '', guardian: '', dob: '', age: '', phone: '', address: '', education: '', classRequested: 'Level 1', message: '' })
    } catch {
      setError('Failed to submit. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <PageHero title={introTitle} subtitle={introBody} kicker={f('heroKicker')} />

      <Section title={f('requirementsTitle')}>
        <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-12">
          <div>
            <CardEyebrow>{f('criteriaEyebrow')}</CardEyebrow>
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

      <Section title={f('processTitle')} className="border-y border-line bg-surface-alt">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-8">
          {steps.map((s, i) => (
            <OpenCard key={s.n} accent={colors.primary} index={i + 1} hover>
              <CardEyebrow color={colors.primary}>{f('stepEyebrow')} {s.n}</CardEyebrow>
              <CardTitle as="h3" className="mt-2.5 pr-[34px] text-[15.5px]">{s.title}</CardTitle>
              <CardBody className="mt-2 pr-6">{s.body}</CardBody>
            </OpenCard>
          ))}
        </div>
      </Section>

      <Section title={f('documentationTitle')}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
          <div>
            <CardEyebrow color={colors.accent}>{f('documentsEyebrow')}</CardEyebrow>
            <CheckList items={documents} accent={colors.accent} className="mt-4.5" />
          </div>
          <div>
            <CardEyebrow color={colors.success}>{f('faqEyebrow')}</CardEyebrow>
            <CardTitle as="h3" className="mt-2.5 text-[16px]">{f('faqTitle')}</CardTitle>
            <Accordion items={faqs} initial={-1} className="mt-3.5 max-w-full" />
          </div>
        </div>
      </Section>

      <Section className="border-t border-line bg-surface-alt">
        <div className="mx-auto max-w-[780px]">
          <Panel accent={colors.primary} pad={space['3xl']}>
            <CardTitle as="h3" className="text-[20px]">{f('formTitle')}</CardTitle>

          {done && (
            <div className="mt-4 rounded-md bg-success-soft px-4 py-3 text-[13.5px] font-semibold text-success">
              {done}
            </div>
          )}

          <div className="mt-4.5 flex flex-wrap gap-3.5">
            <label className={fieldLabel}>
              <span className={fieldLabelText}>{f('formFullName')} *</span>
              <input
                className={cn(fieldInput, fieldErrors.name && 'border-danger')}
                value={form.name}
                onChange={(e) => set('name')(e.target.value)}
              />
              {fieldErrors.name && <span className="text-xs text-danger">{fieldErrors.name}</span>}
            </label>
            <label className={fieldLabel}>
              <span className={fieldLabelText}>{f('formGuardianName')} *</span>
              <input
                className={cn(fieldInput, fieldErrors.guardian && 'border-danger')}
                value={form.guardian}
                onChange={(e) => set('guardian')(e.target.value)}
              />
              {fieldErrors.guardian && <span className="text-xs text-danger">{fieldErrors.guardian}</span>}
            </label>
            <label className={cn(fieldLabel, 'min-w-[150px]')}>
              <span className={fieldLabelText}>{f('formDateOfBirth')}</span>
              <input className={fieldInput} type="date" value={form.dob} onChange={(e) => set('dob')(e.target.value)} />
            </label>
            <label className={cn(fieldLabel, 'min-w-[90px]')}>
              <span className={fieldLabelText}>{f('formAge')} *</span>
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
              <span className={fieldLabelText}>{f('formPhone')} *</span>
              <input
                className={cn(fieldInput, fieldErrors.phone && 'border-danger')}
                value={form.phone}
                onChange={(e) => set('phone')(e.target.value)}
              />
              {fieldErrors.phone && <span className="text-xs text-danger">{fieldErrors.phone}</span>}
            </label>
            <label className={fieldLabel}>
              <span className={fieldLabelText}>{f('formAddress')}</span>
              <input className={fieldInput} value={form.address} onChange={(e) => set('address')(e.target.value)} />
            </label>
            <label className={fieldLabel}>
              <span className={fieldLabelText}>{f('formEducation')}</span>
              <input className={fieldInput} value={form.education} onChange={(e) => set('education')(e.target.value)} />
            </label>
            <label className={cn(fieldLabel, 'min-w-[160px]')}>
              <span className={fieldLabelText}>{f('formClassRequested')}</span>
              <select className={fieldInput} value={form.classRequested} onChange={(e) => set('classRequested')(e.target.value)}>
                {classOptions.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </label>
            <label className={cn(fieldLabel, 'min-w-full')}>
              <span className={fieldLabelText}>{f('formMessage')}</span>
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
              {busy ? f('submittingLabel') : f('formSubmit')}
            </button>
            <span className="text-xs text-muted">{f('formPreviewNote')}</span>
          </div>
          </Panel>
        </div>
      </Section>
    </div>
  )
}
