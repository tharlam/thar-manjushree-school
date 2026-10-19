import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n.jsx'
import { useAppStore } from '../../store.jsx'
import { colors } from '../../theme.js'
import { useField, usePage, Section, Photo } from './shared.jsx'
import { ArchCard, CardBody, CardEyebrow, CardTitle, Hairline, NotchCard, QuoteCard, RailCard, SealCard } from '../../components/cards.jsx'
import { classes as baseClasses } from '../../data/index.js'
import { usdValue, formatUsd } from '../../lib/currency.js'

const leadership = [
  {
    label: 'From the Compassionate Heart of our Rinpoche',
    name: 'H.E. Tharlam Rinpoche',
    role: 'Spiritual Guide',
    initial: 'T',
    message:
      'True wisdom is not the mere accumulation of external knowledge, but the profound awakening of inner peace and boundless compassion. In this rapidly changing world, our young monks learn to look inward, master their minds, and extend unconditional kindness to every living being. We welcome you to join our spiritual family.',
    color: colors.gold,
  },
  {
    label: 'From the Desk of the Principal',
    name: 'The Principal',
    role: 'Head of the School',
    initial: 'P',
    message:
      'Education is the bridge between heritage and capability. My duty is to ensure our students remain deeply rooted in their sacred lineage while gaining the sharp intellectual tools they need in the modern world. Through rigorous academic standards and an empathetic environment, we unlock the full human potential of every child entrusted to our care.',
    color: colors.primary,
  },
]

const pillars = [
  {
    eyebrow: 'Pillar One',
    title: 'Sacred Heritage',
    body: 'An unbroken 590-year lineage of Sakya monastic scholarship — philosophy, debate, ritual and scripture — preserved for the next generation.',
  },
  {
    eyebrow: 'Pillar Two',
    title: 'Modern Excellence',
    body: 'A complete national curriculum in English, Tibetan, Mathematics, Science and computing, taught by certified teachers in modern classrooms.',
  },
  {
    eyebrow: 'Pillar Three',
    title: 'Total Care, Zero Cost',
    body: 'Every monk receives education, meals, clothing, housing and healthcare completely free, so no child is ever turned away for lack of means.',
  },
]

const supportAreas = [
  {
    title: 'Nourishment',
    body: 'Three wholesome meals a day, prepared on campus, keeping growing bodies strong and clear-eyed for study and meditation.',
  },
  {
    title: 'Shelter & Robes',
    body: 'A safe, warm dormitory beneath the monastery roof, and the robes that mark each child as part of our spiritual family.',
  },
  {
    title: 'Learning & Libraries',
    body: 'Books, stationery, modern classrooms and our new thousand-volume library — in Tibetan, Sanskrit and English.',
  },
  {
    title: 'Health & Care',
    body: 'Regular medical check-ups, care when a child is ill, and a protective, nurturing environment at every hour of the day.',
  },
]

const invitations = [
  {
    to: '/donate',
    index: '01',
    title: 'Sponsor a Young Monk',
    body: 'Transform a life by providing food, shelter, robes, and books. Monthly or one-time, every gift shapes a future.',
    cta: 'Support Us',
    color: colors.gold,
  },
  {
    to: '/admissions',
    index: '02',
    title: 'A Sacred Path for Your Child',
    body: 'Discover our free education and residential programs, with meals, clothing, housing and healthcare all provided.',
    cta: 'Apply Now',
    color: colors.primary,
  },
  {
    to: '/contact',
    index: '03',
    title: 'Experience the Peace',
    body: 'Plan a respectful, mindful visit to our temple grounds at Tharlam Monastery in Boudha, Kathmandu.',
    cta: 'Plan a Visit',
    color: colors.teal,
  },
]

const testimonials = [
  {
    quote:
      'What moved me was not only the excellence of the teaching, but the dignity of the boys — bright, disciplined, and joyful. My small monthly gift feeds a child who might otherwise go hungry.',
    name: 'A Monthly Benefactor',
    role: 'Sponsor since 2021',
  },
  {
    quote:
      'Every rupee I send is accounted for and put to work. This school has shown me that when heritage and modern care are both honored, children truly flourish.',
    name: 'Family Sponsor, Europe',
    role: 'Supports two young monks',
  },
]
void testimonials

function Hero() {
  const { t } = useLanguage()
  const f = usePage('home')
  const heroTitle = useField('home', 'heroTitle')
  const heroSubtitle = useField('home', 'heroSubtitle')
  const ctaSupport = useField('home', 'ctaSupport')
  const ctaAdmissions = useField('home', 'ctaAdmissions')
  const [imgOk, setImgOk] = useState(true)

  const quickFacts = [
    { value: '590', label: f('quickFact1Label') },
    { value: '1964', label: f('quickFact2Label') },
    { value: '100%', label: f('quickFact3Label') },
  ]

  return (
    <section className="relative isolate flex min-h-[clamp(540px,84vh,800px)] w-full items-center overflow-hidden bg-[linear-gradient(120deg,#0f2a2a_0%,#1e4646_55%,#285848_100%)] text-white">
      {imgOk && (
        <img
          src="/images/hero-school.png"
          alt="Young monks of Tharlam Manjushree School at the Boudhanath Stupa"
          onError={() => setImgOk(false)}
          className="absolute inset-0 z-0 h-full w-full object-cover object-[center_32%] animate-kenburns"
        />
      )}

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(100deg,rgba(13,18,33,0.95)_0%,rgba(13,18,33,0.86)_30%,rgba(13,18,33,0.5)_62%,rgba(13,18,33,0.42)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(8,26,26,0.72)_0%,rgba(8,26,26,0)_24%,rgba(8,26,26,0)_52%,rgba(15,42,42,0.55)_84%,rgba(15,42,42,0.98)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(64%_62%_at_84%_16%,rgba(136,184,152,0.34)_0%,rgba(136,184,152,0)_62%)]" />
      <div className="relative z-[2] mx-auto w-full max-w-[1240px] px-[22px] pt-[92px] pb-[84px]">
        <div className="max-w-[760px] animate-rise">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(221,184,107,0.42)] bg-sage/[0.14] px-[17px] py-2 text-[11.5px] font-bold tracking-[2.2px] text-sage-light uppercase backdrop-blur-[6px]">
            <span className="size-1.5 shrink-0 rounded-full bg-sage-light" />
            {f('heroKicker')}
          </span>

          <h1 className="mt-[22px] mb-0 mx-0 font-heading text-[clamp(36px,5.6vw,64px)] leading-[1.08] font-semibold tracking-[-1px] text-shadow-[0_2px_30px_rgba(9,13,24,0.5)]">
            {heroTitle}
          </h1>

          <p className="mt-5 mb-0 mx-0 max-w-[620px] text-[16.5px] leading-[1.75] font-normal text-white/90 text-shadow-[0_1px_18px_rgba(9,13,24,0.55)]">
            {heroSubtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3.5">
            <Link
              to="/donate"
              className="rounded-full bg-linear-to-br from-sage to-sage-light px-[30px] py-[15px] text-sm font-extrabold text-ink no-underline shadow-sage"
            >
              {ctaSupport || t('site.supportUs')}
            </Link>
            <Link
              to="/admissions"
              className="inline-flex items-center rounded-full border border-white/55 bg-white/10 px-[30px] py-[14px] text-sm font-bold text-white no-underline backdrop-blur-[6px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
            >
              {ctaAdmissions || t('site.ctaAdmissions')}
            </Link>
          </div>
        </div>

        <div className="mt-[46px] flex max-w-[760px] flex-wrap gap-x-[46px] gap-y-[18px] border-t border-white/[0.18] pt-6 animate-rise [animation-delay:.12s]">
          {quickFacts.map((fact) => (
            <div key={fact.label}>
              <p className="m-0 font-heading text-[26px] font-semibold tracking-[-0.5px] text-sage-light">
                {fact.value}
              </p>
              <p className="mt-[5px] mb-0 mx-0 text-xs font-semibold tracking-[0.9px] text-white/[0.72] uppercase">
                {fact.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-[30px] mb-0 mx-0 max-w-[620px] text-[12.5px] tracking-[0.2px] text-white/[0.66] animate-rise [animation-delay:.18s]">
          {f('heroNote')}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[18px] z-[2] flex justify-center">
        <span className="block h-10 w-px bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.55)_100%)]" />
      </div>
    </section>
  )
}

function Impact() {
  const { t } = useLanguage()
  const { monks: storeMonks, admissions, donations, loading } = useAppStore()
  const totalMonks = storeMonks.length
  const pending = admissions.filter((a) => a.status === 'pending').length
  const donationTotal = donations.filter((d) => d.type !== 'fee').reduce((s, d) => s + usdValue(d.amount, d.currency), 0)

  const stats = [
    { label: t('homePage.statMonks'), value: loading ? '…' : totalMonks },
    { label: t('homePage.statClasses'), value: baseClasses.length },
    { label: t('homePage.statDonations'), value: loading ? '…' : formatUsd(donationTotal) },
    { label: t('homePage.statAdmissions'), value: loading ? '…' : pending },
  ]

  const f = usePage('home')
  return (
    <div className="bg-ink py-11">
      <div className="mx-auto max-w-[1240px] px-[22px]">
        <p className="mt-0 mb-[26px] mx-0 text-center text-[11.5px] font-bold tracking-[2.2px] text-sage-light uppercase">
          {f('impactTitle')} — {f('impactNote')}
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-[18px]">
          {stats.map((s) => (
            <div key={s.label} className="border-l border-white/10 px-2.5 py-2 text-center">
              <p className="m-0 font-heading text-4xl font-semibold tracking-[-0.5px] text-sage-light">
                {s.value}
              </p>
              <p className="mt-2 mb-0 mx-0 text-xs font-semibold tracking-[0.6px] text-white/80 uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Welcome() {
  const f = usePage('home')
  const welcomeTitle = useField('home', 'welcomeTitle')
  const items = [f('welcomeItem1'), f('welcomeItem2'), f('welcomeItem3')]
  return (
    <Section eyebrow={f('welcomeEyebrow')} title={welcomeTitle}>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-center gap-9">
        <div className="order-1">
          <Photo
            src="/images/campus.jpg"
            alt={f('welcomeAlt')}
            ratio="4 / 3"
            fallbackLabel={f('welcomeFallback')}
          />
        </div>
        <div className="order-2 flex flex-col gap-3.5">
          <p className="m-0 text-[15px] leading-[1.8] font-normal text-body">
            {f('welcomeBody1')}
          </p>
          <p className="m-0 text-[15px] leading-[1.8] font-normal text-body">
            {f('welcomeBody2')}
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link
              to="/about"
              className="rounded-full bg-pine px-[22px] py-[11px] text-[13.5px] font-bold text-white no-underline"
            >
              {f('welcomeCtaStory')}
            </Link>
            <Link
              to="/programs"
              className="rounded-full border border-line px-[22px] py-2.5 text-[13.5px] font-bold text-pine no-underline"
            >
              {f('welcomeCtaPrograms')}
            </Link>
          </div>
          <div className="mt-1.5 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2.5">
            {items.map((item) => (
              <div key={item} className="rounded-md border border-line bg-surface-alt px-3.5 py-2.5 text-[12.5px] font-semibold text-body">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

function Pillars() {
  const f = usePage('home')
  return (
    <Section
      eyebrow={f('pillarsEyebrow')}
      title={f('pillarsTitle')}
      subtitle={f('pillarsSubtitle')}
      className="border-y border-line bg-surface-alt"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-stretch gap-6">
        {pillars.map((p, i) => (
          <ArchCard key={p.title} hover className="reveal" style={{ animationDelay: `${i * 0.08}s` }}>
            <span className="inline-flex size-[38px] items-center justify-center rounded-md bg-pine-soft font-heading text-base font-bold text-pine">
              {String(i + 1).padStart(2, '0')}
            </span>
            <CardEyebrow className="mt-2.5">{f(`pillar${i + 1}Eyebrow`)}</CardEyebrow>
            <CardTitle className="mt-1.5">{f(`pillar${i + 1}Title`)}</CardTitle>
            <CardBody className="mt-1.5">{f(`pillar${i + 1}Body`)}</CardBody>
          </ArchCard>
        ))}
      </div>
    </Section>
  )
}

function Leadership() {
  const f = usePage('home')
  return (
    <Section
      eyebrow={f('leadershipEyebrow')}
      title={f('leadershipTitle')}
      subtitle={f('leadershipSubtitle')}
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
        {leadership.map((l, i) => (
          <SealCard key={l.label} accent={l.color} className="reveal" style={{ animationDelay: `${i * 0.1}s` }}>
            <CardEyebrow color={l.color}>{f(`leader${i + 1}Label`)}</CardEyebrow>
            <p className="mt-3.5 mb-0 mx-0 text-[14.5px] leading-[1.85] text-body italic [text-wrap:pretty]">
              &ldquo;{f(`leader${i + 1}Message`)}&rdquo;
            </p>
            <div className="mt-auto pt-[18px]">
              <Hairline />
              <p className="mt-3.5 mb-0 mx-0 text-[14.5px] font-bold text-ink">{f(`leader${i + 1}Name`)}</p>
              <p className="mt-[3px] mb-0 mx-0 text-[12.5px] font-semibold tracking-[0.2px] text-muted">{f(`leader${i + 1}Role`)}</p>
            </div>
          </SealCard>
        ))}
      </div>
    </Section>
  )
}

function Support() {
  const f = usePage('home')
  return (
    <Section
      eyebrow={f('supportEyebrow')}
      title={f('supportTitle')}
      subtitle={f('supportSubtitle')}
      className="border-y border-line bg-surface-alt"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-8 gap-y-3.5">
        {supportAreas.map((s, i) => {
          const accent = i % 2 ? colors.primary : colors.accent
          return (
            <RailCard key={s.title} accent={accent} hover className="reveal" style={{ animationDelay: `${i * 0.06}s` }}>
              <CardEyebrow color={accent}>{f(`supportArea${i + 1}Eyebrow`)}</CardEyebrow>
              <CardTitle className="mt-2.5">{f(`supportArea${i + 1}Title`)}</CardTitle>
              <CardBody className="mt-1.5">{f(`supportArea${i + 1}Body`)}</CardBody>
            </RailCard>
          )
        })}
      </div>
      <div className="mt-7 text-center">
        <Link
          to="/donate"
          className="inline-block rounded-full bg-linear-to-br from-sage to-sage-light px-8 py-[14px] text-sm font-extrabold text-ink no-underline shadow-sage"
        >
          {f('supportCta')}
        </Link>
      </div>
    </Section>
  )
}

function Announcements() {
  const { t } = useLanguage()
  const f = usePage('home')
  const { announcements, gallery } = useAppStore()
  const { lang } = useLanguage()
  const recent = announcements.slice(0, 3)

  const updates = [
    {
      tag: f('update1Tag'),
      title: f('update1Title'),
      body: f('update1Body'),
      color: colors.gold,
    },
    {
      tag: f('update2Tag'),
      title: f('update2Title'),
      body: f('update2Body'),
      color: colors.primary,
    },
  ]

  return (
    <Section eyebrow={f('announcementsEyebrow')} title={f('announcementsTitle')}>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[18px]">
        <div className="flex flex-col gap-3.5">
          {updates.map((u, i) => (
            <RailCard key={u.tag} accent={u.color} hover className="reveal" style={{ animationDelay: `${i * 0.08}s` }}>
              <CardEyebrow color={u.color}>{u.tag}</CardEyebrow>
              <CardTitle className="mt-2.5">{u.title}</CardTitle>
              <CardBody className="mt-1.5">{u.body}</CardBody>
            </RailCard>
          ))}
        </div>

        <div className="flex flex-col gap-3.5">
          <RailCard accent={colors.primary} className="reveal [animation-delay:.16s]">
            <CardTitle className="text-[17px]">{f('newsTitle')}</CardTitle>
            <div className="mt-3.5 flex flex-col gap-1.5">
              {recent.map((a) => (
                <div key={a.id} className="flex items-baseline gap-3 border-b border-line pb-1.5">
                  <span className="text-[11px] font-bold tracking-[0.6px] whitespace-nowrap text-sage">{a.date?.slice(5)}</span>
                  <span className="flex-1 text-[12.5px] font-semibold text-ink">{a[lang]?.title || a.en?.title}</span>
                </div>
              ))}
            </div>
          </RailCard>
          <RailCard accent={colors.accent} className="reveal flex-row flex-wrap items-center justify-between gap-3.5 py-[18px] pr-[18px] pl-8 [animation-delay:.24s]">
            <div>
              <p className="m-0 font-heading text-[15px] font-bold text-ink">{gallery.length} {t('site.nav.gallery')}</p>
              <p className="mt-1 mb-0 mx-0 text-[12.5px] text-muted">{t('site.brandLine')}</p>
            </div>
            <Link
              to="/gallery"
              className="card-cta rounded-full bg-pine px-[18px] py-2.5 text-[12.5px] font-bold text-white no-underline"
            >
              {t('site.viewAll')}
              <span className="card-cta-arrow">→</span>
            </Link>
          </RailCard>
        </div>
      </div>
    </Section>
  )
}

function Testimonials() {
  const f = usePage('home')
  const testimonialsCms = [
    { quote: f('testimonial1Quote'), name: f('testimonial1Name'), role: f('testimonial1Role') },
    { quote: f('testimonial2Quote'), name: f('testimonial2Name'), role: f('testimonial2Role') },
  ]
  void testimonialsCms
  return (
    <Section
      eyebrow={f('testimonialsEyebrow')}
      title={f('testimonialsTitle')}
      className="border-t border-line bg-[linear-gradient(160deg,#e6f5e6_0%,#f2fbf2_60%)]"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
        {testimonialsCms.map((x, i) => (
          <QuoteCard
            key={x.name}
            quote={x.quote}
            name={x.name}
            role={x.role}
            className="reveal"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </Section>
  )
}

function Invitations() {
  const f = usePage('home')
  return (
    <Section eyebrow={f('invitationsEyebrow')} title={f('invitationsTitle')}>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-stretch gap-6">
        {invitations.map((i, n) => (
          <NotchCard key={i.title} accent={i.color} hover className="reveal" style={{ animationDelay: `${n * 0.08}s` }}>
            <CardEyebrow color={i.color}>{f(`invitation${n + 1}Index`)}</CardEyebrow>
            <CardTitle className="mt-3.5 pr-3.5">{f(`invitation${n + 1}Title`)}</CardTitle>
            <CardBody className="mt-2.5 flex-1">{f(`invitation${n + 1}Body`)}</CardBody>
            <Link
              to={i.to}
              className="card-cta mt-[18px] self-start rounded-full px-5 py-[11px] text-[13px] font-bold text-white no-underline"
              style={{
                background: `linear-gradient(135deg, ${i.color}, ${i.color}D9)`,
                boxShadow: `0 6px 18px ${i.color}33`,
              }}
            >
              {f(`invitation${n + 1}Cta`)}
              <span className="card-cta-arrow">→</span>
            </Link>
          </NotchCard>
        ))}
      </div>
    </Section>
  )
}

export default function HomePage() {
  const { t } = useLanguage()
  const f = usePage('home')
  return (
    <div>
      <Hero />
      <Impact />
      <Welcome />
      <Pillars />
      <Leadership />
      <Support />
      <Announcements />
      <Testimonials />
      <Invitations />
      <div className="relative overflow-hidden bg-[radial-gradient(90%_120%_at_50%_0%,#285848_0%,#0f2a2a_55%,#0f2a2a_100%)] px-[22px] py-[54px] text-center">
        <div className="relative">
          <p className="mt-0 mb-3 mx-0 text-[11.5px] font-bold tracking-[2.2px] text-sage-light uppercase">
            {f('bottomEyebrow')}
          </p>
          <h2 className="mx-auto my-0 max-w-[640px] font-heading text-[clamp(26px,3.4vw,36px)] font-semibold text-white">
            {f('bottomTitle')}
          </h2>
          <Link
            to="/donate"
            className="mt-[26px] inline-block rounded-full bg-linear-to-br from-sage to-sage-light px-9 py-[15px] text-[14.5px] font-extrabold text-ink no-underline shadow-sage"
          >
            {f('bottomCta') || t('site.donateNow')}
          </Link>
        </div>
      </div>
    </div>
  )
}
