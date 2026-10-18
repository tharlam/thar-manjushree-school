import { useState } from 'react'
import { useField, PageHero, Section, Photo } from './shared.jsx'
import { CardEyebrow, LinkRow, OpenCard, Panel } from '../../components/cards.jsx'
import { colors } from '../../theme.js'
import { cn } from '../../lib/cn.js'
import { useLanguage } from '../../i18n.jsx'
import { useAppStore } from '../../store.jsx'
import { IconClock, IconMail, IconPhone, IconPin } from '../../components/icons.jsx'

const fieldLabel = 'flex min-w-[180px] flex-1 flex-col gap-1.5'
const fieldLabelText = 'text-xs font-semibold text-body'
const fieldInput =
  'w-full rounded-md border border-line bg-surface px-[13px] py-[11px] text-[13.5px] font-sans text-ink outline-none transition-[border-color,box-shadow] focus:border-pine focus:ring-[3px] focus:ring-pine/15'
const fieldTextarea = cn(fieldInput, 'min-h-[110px] resize-y')
const submitBtn =
  'mt-4.5 cursor-pointer rounded-full border-none bg-linear-to-br from-sage to-sage-light px-6 py-3 text-[14px] font-bold font-sans text-ink shadow-sage'

export default function Contact() {
  const { t } = useLanguage()
  const { addContactMessage } = useAppStore()
  const introTitle = useField('contact', 'introTitle')
  const introBody = useField('contact', 'introBody')

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [interest, setInterest] = useState('Donor')
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
      const ok = await addContactMessage({ ...form, interest })
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
    { label: t('contactPage.address'), value: 'Boudhanath, Kathmandu 44600, Nepal', Icon: IconPin, href: 'https://www.openstreetmap.org/?mlat=27.7212&mlon=85.3617#map=16/27.7212/85.3617', cta: 'Map' },
    { label: t('contactPage.phone'), value: '+977 1 449 2210', Icon: IconPhone, href: 'tel:+97714492210', cta: 'Call' },
    { label: t('contactPage.email'), value: 'admin@thar-manjushree.edu.np', Icon: IconMail, href: 'mailto:admin@thar-manjushree.edu.np', cta: 'Write' },
    { label: t('contactPage.hoursTitle'), value: t('contactPage.hoursValue'), Icon: IconClock, cta: 'Visit' },
  ]

  const visitTips = [
    { title: 'When to Come', body: 'Visitors are warmly welcomed most days between the close of morning prayers and the beginning of evening study.' },
    { title: 'How to Behave', body: 'We ask for respectful, mindful conduct on the temple grounds — modest dress, quiet voices, and no photography inside the shrine halls.' },
    { title: 'Getting Here', body: 'We are a short walk from the Boudhanath Stupa. Taxis and buses stop at the Boudha roundabout, from which the monastery is signposted.' },
  ]

  return (
    <div>
      <PageHero
        title={introTitle}
        subtitle={introBody}
        kicker={t('contactPage.title')}
      />

      <Section>
        <div className="mb-[46px]">
          <CardEyebrow>Reach Us</CardEyebrow>
          <div className="mt-4.5">
            {cards.map((c) => (
              <LinkRow key={c.label} href={c.href} accent={colors.gold} cta={c.cta}>
                <span className="flex flex-wrap items-center gap-4">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-sage-soft text-sage">
                    <c.Icon size={18} color={colors.accent} />
                  </span>
                  <span className="min-w-[160px] flex-1">
                    <span className="block text-[11.5px] font-bold tracking-[1.4px] text-muted uppercase">
                      {c.label}
                    </span>
                    <span className="mt-1 block font-heading text-[15px] font-bold text-ink">{c.value}</span>
                  </span>
                </span>
              </LinkRow>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-11">
          <Panel accent={colors.gold}>
            <h3 className="m-0 font-heading text-[20px] font-bold text-ink">{t('contactPage.formTitle')}</h3>
            <p className="mt-1.5 mb-0 text-[13px] text-muted">We reply to every message, usually within two working days.</p>
            {done && (
              <div className="mt-4 rounded-md bg-success-soft px-4 py-[13px] text-[13.5px] font-semibold text-success">
                {t('contactPage.sentMsg')}
              </div>
            )}
            {serverError && (
              <div className="mt-4 rounded-md bg-danger-soft px-4 py-[13px] text-[13.5px] font-semibold text-danger">
                {serverError}
              </div>
            )}
            <div className="mt-4.5 flex flex-1 flex-wrap gap-3.5">
              <label className={cn(fieldLabel, 'min-w-full')}>
                <span className={fieldLabelText}>I am a…</span>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {['Donor', 'Parent', 'Visitor'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setInterest(opt)}
                      className={cn(
                        'cursor-pointer rounded-full border px-[18px] py-2 text-[12.5px] font-bold',
                        interest === opt ? 'border-sage bg-sage text-ink' : 'border-line bg-surface text-body',
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </label>
              <label className={fieldLabel}>
                <span className={fieldLabelText}>{t('contactPage.name')} *</span>
                <input
                  className={cn(fieldInput, errors.name && 'border-danger')}
                  value={form.name}
                  onChange={(e) => set('name')(e.target.value)}
                />
                {errors.name && <span className="text-xs text-danger">{errors.name}</span>}
              </label>
              <label className={fieldLabel}>
                <span className={fieldLabelText}>{t('contactPage.emailLabel')}</span>
                <input
                  className={cn(fieldInput, errors.email && 'border-danger')}
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email')(e.target.value)}
                />
                {errors.email && <span className="text-xs text-danger">{errors.email}</span>}
              </label>
              <label className={cn(fieldLabel, 'min-w-full')}>
                <span className={fieldLabelText}>{t('contactPage.subject')}</span>
                <input className={fieldInput} value={form.subject} onChange={(e) => set('subject')(e.target.value)} />
              </label>
              <label className={cn(fieldLabel, 'min-w-full')}>
                <span className={fieldLabelText}>{t('contactPage.message')} *</span>
                <textarea
                  className={cn(fieldTextarea, errors.message && 'border-danger')}
                  value={form.message}
                  onChange={(e) => set('message')(e.target.value)}
                />
                {errors.message && <span className="text-xs text-danger">{errors.message}</span>}
              </label>
            </div>
            <button
              type="button"
              className={cn(submitBtn, busy && 'cursor-not-allowed opacity-70')}
              onClick={submit}
              disabled={busy}
            >
              {busy ? 'Sending…' : t('contactPage.send')}
            </button>
          </Panel>

          <div>
            <CardEyebrow color={colors.primary}>{t('contactPage.visitTitle')}</CardEyebrow>
            <p className="mt-2 mb-3.5 text-[13px] text-muted">{t('contactPage.mapNote')}</p>
            <div className="overflow-hidden rounded-lg border border-line">
              <iframe
                title="Thar Manjushree School location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=85.3500%2C27.7100%2C85.3750%2C27.7300&layer=mapnik&marker=27.7212%2C85.3617"
                className="block min-h-[380px] w-full border-none"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Plan Your Visit"
        title="A Mindful Journey to Our Doors"
        subtitle="A few courteous pointers to make your visit peaceful for you and for our community."
        className="border-y border-line bg-surface-alt"
      >
        <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-11">
          <Photo
            src="/images/visit.jpg"
            alt="The Boudhanath Stupa near Tharlam Monastery"
            ratio="4 / 3"
            fallbackLabel="Visit photography placed here"
          />
          <div>
            {visitTips.map((tip, i) => (
              <OpenCard key={tip.title} accent={colors.gold} index={i + 1} hover>
                <p className="m-0 text-[11.5px] font-bold tracking-[1.4px] text-sage uppercase">{tip.title}</p>
                <p className="mt-2 mb-0 pr-10 text-[14px] leading-[1.8] text-body">{tip.body}</p>
              </OpenCard>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}
