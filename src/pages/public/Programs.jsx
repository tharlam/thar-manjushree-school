import { useState } from 'react'
import { useLanguage } from '../../i18n.jsx'
import { colors } from '../../theme.js'
import { cn } from '../../lib/cn.js'
import { PageHero, Section, Photo, usePage } from './shared.jsx'
import { Accordion, CardBody, CardEyebrow, CardTitle, CheckList, LinkRow, OpenCard, OpenFigure } from '../../components/cards.jsx'

export default function Programs() {
  const { t } = useLanguage()
  const f = usePage('programs')
  const [scheduleTab, setScheduleTab] = useState(0)

  const spiritualItems = [
    f('spiritualItem1'),
    f('spiritualItem2'),
    f('spiritualItem3'),
    f('spiritualItem4'),
    f('spiritualItem5'),
  ]

  const secularItems = [f('secularItem1'), f('secularItem2'), f('secularItem3'), f('secularItem4'), f('secularItem5')]

  const tiers = [
    {
      title: f('tier1Title'),
      age: f('tier1Age'),
      body: f('tier1Body'),
      color: colors.primary,
    },
    {
      title: f('tier2Title'),
      age: f('tier2Age'),
      body: f('tier2Body'),
      color: colors.gold,
    },
  ]

  const programs = [
    {
      title: f('programCard1Title'),
      image: '/images/program-monastic.jpg',
      body: f('programCard1Body'),
    },
    {
      title: f('programCard2Title'),
      image: '/images/program-academics.jpg',
      body: f('programCard2Body'),
    },
    {
      title: f('programCard3Title'),
      image: '/images/program-care.jpg',
      body: f('programCard3Body'),
    },
    {
      title: f('programCard4Title'),
      image: '/images/program-arts.jpg',
      body: f('programCard4Body'),
    },
  ]

  const scheduleTabs = [
    {
      key: 'daily',
      label: f('tabDailyLabel'),
      title: f('tabDailyTitle'),
      subtitle: f('tabDailySubtitle'),
      items: [
        { time: f('dailyItem1Time'), title: f('dailyItem1Title') },
        { time: f('dailyItem2Time'), title: f('dailyItem2Title') },
        { time: f('dailyItem3Time'), title: f('dailyItem3Title') },
        { time: f('dailyItem4Time'), title: f('dailyItem4Title') },
        { time: f('dailyItem5Time'), title: f('dailyItem5Title') },
        { time: f('dailyItem6Time'), title: f('dailyItem6Title') },
        { time: f('dailyItem7Time'), title: f('dailyItem7Title') },
        { time: f('dailyItem8Time'), title: f('dailyItem8Title') },
      ],
    },
    {
      key: 'sports',
      label: f('tabSportsLabel'),
      title: f('tabSportsTitle'),
      subtitle: f('tabSportsSubtitle'),
      items: [
        { title: f('sportsItem1Title'), body: f('sportsItem1Body') },
        { title: f('sportsItem2Title'), body: f('sportsItem2Body') },
        { title: f('sportsItem3Title'), body: f('sportsItem3Body') },
        { title: f('sportsItem4Title'), body: f('sportsItem4Body') },
        { title: f('sportsItem5Title'), body: f('sportsItem5Body') },
        { title: f('sportsItem6Title'), body: f('sportsItem6Body') },
      ],
    },
    {
      key: 'friday',
      label: f('tabFridayLabel'),
      title: f('tabFridayTitle'),
      subtitle: f('tabFridaySubtitle'),
      items: [
        {
          title: f('fridayItem1Title'),
          body: f('fridayItem1Body'),
        },
        {
          title: f('fridayItem2Title'),
          body: f('fridayItem2Body'),
        },
        {
          title: f('fridayItem3Title'),
          body: f('fridayItem3Body'),
        },
        {
          title: f('fridayItem4Title'),
          body: f('fridayItem4Body'),
        },
      ],
    },
  ]

  const faqs = [
    {
      q: f('faqQuestion1'),
      a: f('faqAnswer1'),
    },
    {
      q: f('faqQuestion2'),
      a: f('faqAnswer2'),
    },
    {
      q: f('faqQuestion3'),
      a: f('faqAnswer3'),
    },
    {
      q: f('faqQuestion4'),
      a: f('faqAnswer4'),
    },
    {
      q: f('faqQuestion5'),
      a: f('faqAnswer5'),
    },
  ]

  const activeSchedule = scheduleTabs[scheduleTab]

  return (
    <div>
      <PageHero
        title={f('heroTitle')}
        subtitle={f('heroSubtitle')}
        kicker={t('site.nav.programs')}
      />

      <Section eyebrow={f('programsEyebrow')} title={f('programsTitle')} subtitle={f('programsSubtitle')}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-8 gap-y-6">
          {programs.map((p, i) => (
            <OpenFigure
              key={p.title}
              className="reveal"
              style={{ animationDelay: `${i * 0.07}s` }}
              media={<Photo src={p.image} alt={p.title} ratio="4 / 3" fallbackLabel={p.title} className="shadow-none" />}
              caption={p.title}
              meta={<p className="mt-2 mb-0 text-[13.5px] leading-[1.75] text-body">{p.body}</p>}
            />
          ))}
        </div>
      </Section>

      <Section
        eyebrow={f('curriculumEyebrow')}
        title={f('curriculumTitle')}
        subtitle={f('curriculumSubtitle')}
        className="border-y border-line bg-surface-alt"
      >
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
          <OpenCard accent={colors.primary} hover>
            <CardEyebrow>{f('sphereOneLabel')}</CardEyebrow>
            <CardTitle as="h3" className="mt-2.5">{f('sphereOneTitle')}</CardTitle>
            <CardBody className="mt-2.5">
              {f('sphereOneBody')}
            </CardBody>
            <CheckList items={spiritualItems} accent={colors.primary} className="mt-4.5" />
          </OpenCard>

          <OpenCard accent={colors.gold} hover>
            <CardEyebrow color={colors.gold}>{f('sphereTwoLabel')}</CardEyebrow>
            <CardTitle as="h3" className="mt-2.5">{f('sphereTwoTitle')}</CardTitle>
            <CardBody className="mt-2.5">
              {f('sphereTwoBody')}
            </CardBody>
            <div className="mt-4.5 flex flex-wrap gap-2">
              {secularItems.map((s) => (
                <span key={s} className="rounded-full bg-sage-soft px-[13px] py-1.5 text-[12px] font-bold text-sage">
                  {s}
                </span>
              ))}
            </div>
          </OpenCard>
        </div>
      </Section>

      <Section eyebrow={f('tiersEyebrow')} title={f('tiersTitle')} subtitle={f('tiersSubtitle')}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-x-8 gap-y-3.5">
          {tiers.map((tier, i) => (
            <OpenCard key={tier.title} accent={tier.color} index={i + 1} hover>
              <div className="flex flex-wrap items-center justify-between gap-2.5 pr-[46px]">
                <CardTitle as="h3" className="text-[17px]">{tier.title}</CardTitle>
                <span className="rounded-full px-3 py-[3px] text-[12px] font-extrabold" style={{ background: `${tier.color}1a`, color: tier.color }}>{tier.age}</span>
              </div>
              <CardBody className="mt-2.5 pr-[30px]">{tier.body}</CardBody>
            </OpenCard>
          ))}
        </div>
      </Section>

      <Section
        id="daily-schedule"
        eyebrow={f('scheduleEyebrow')}
        title={f('scheduleTitle')}
        subtitle={f('scheduleSubtitle')}
        className="border-y border-line bg-surface-alt"
      >
        <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-8">
          <div className="flex flex-col gap-2.5">
            {scheduleTabs.map((tab, i) => {
              const active = i === scheduleTab
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setScheduleTab(i)}
                  aria-pressed={active}
                  className={cn(
                    'flex items-center gap-3 rounded-lg border px-4 py-3.5 text-left text-[13.5px] font-semibold transition-colors',
                    active
                      ? 'border-pine bg-pine text-white shadow-card'
                      : 'border-line bg-surface text-body hover:border-sage hover:bg-surface-alt',
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex size-7 shrink-0 items-center justify-center rounded-md text-[12px] font-bold',
                      active ? 'bg-white/20 text-white' : 'bg-pine-soft text-pine',
                    )}
                  >
                    {i + 1}
                  </span>
                  {tab.label}
                  <span className={cn('ml-auto transition-opacity', active ? 'opacity-100' : 'opacity-0')}>&rarr;</span>
                </button>
              )
            })}
          </div>

          <div className="rounded-lg border border-line bg-surface p-6 shadow-card lg:p-8">
            <h3 className="m-0 font-heading text-[22px] font-bold tracking-[-0.3px] text-ink">{activeSchedule.title}</h3>
            <p className="mt-2.5 mb-0 text-[14px] leading-[1.75] text-muted">{activeSchedule.subtitle}</p>
            <div className="mt-6 flex flex-col">
              {activeSchedule.items.map((it) => (
                <div
                  key={`${it.time || ''}${it.title}`}
                  className="flex items-start gap-4 border-t border-line py-3.5 first:border-t-0 first:pt-0"
                >
                  {it.time ? (
                    <span className="mt-0.5 inline-flex w-[76px] shrink-0 justify-center rounded-md bg-pine-soft px-2 py-1 text-[12px] font-bold text-pine">
                      {it.time}
                    </span>
                  ) : (
                    <span aria-hidden="true" className="mt-2 inline-flex size-2 shrink-0 rounded-full bg-sage" />
                  )}
                  <div className="min-w-0">
                    <p className="m-0 text-[14px] font-bold text-ink">{it.title}</p>
                    {it.body && <p className="mt-1 mb-0 text-[12.5px] leading-[1.6] text-muted">{it.body}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow={f('faqEyebrow')} title={f('faqTitle')} subtitle={f('faqSubtitle')}>
        <Accordion items={faqs} />
      </Section>

        <div className="bg-linear-to-b from-sage-soft to-mint to-60% px-[22px] py-11">
        <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-11">
          <div>
            <CardEyebrow>{f('ctaExploreEyebrow')}</CardEyebrow>
            <CardTitle as="h3" className="mt-2.5 text-[19px]">{f('ctaExploreTitle')}</CardTitle>
            <CardBody className="mt-2">{f('ctaExploreBody')}</CardBody>
            <div className="mt-6">
              <LinkRow to="/curriculum" accent={colors.primary} cta={f('ctaCurriculumButton')}>
                <span className="text-[14.5px] font-bold text-ink">{t('curriculumPage.title')}</span>
              </LinkRow>
              <LinkRow
                href="#daily-schedule"
                accent={colors.accent}
                cta={f('ctaRoutineButton')}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('daily-schedule')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
              >
                <span className="text-[14.5px] font-bold text-ink">{t('schedulePage.title')}</span>
              </LinkRow>
            </div>
          </div>

          <div>
            <CardEyebrow>{f('ctaTakePartEyebrow')}</CardEyebrow>
            <CardTitle as="h3" className="mt-2.5 text-[19px]">{f('ctaTakePartTitle')}</CardTitle>
            <CardBody className="mt-2">{f('ctaTakePartBody')}</CardBody>
            <div className="mt-6">
              <LinkRow to="/donate" accent={colors.gold} cta={f('ctaDonateButton')}>
                <span className="text-[14.5px] font-bold text-ink">{f('ctaDonateLabel')}</span>
              </LinkRow>
              <LinkRow to="/admissions" accent={colors.primary} cta={f('ctaApplyButton')}>
                <span className="text-[14.5px] font-bold text-ink">{f('ctaApplyLabel')}</span>
              </LinkRow>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
