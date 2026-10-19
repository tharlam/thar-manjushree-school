import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n.jsx'
import { colors } from '../../theme.js'
import { PageHero, Section, Photo, usePage } from './shared.jsx'
import { OpenCard, QuoteCard, CardBody, CardEyebrow } from '../../components/cards.jsx'

export default function About() {
  const { t } = useLanguage()
  const f = usePage('about')

  const pillars = [
    {
      label: f('pillarMissionLabel'),
      body: f('pillarMissionBody'),
      color: colors.gold,
    },
    {
      label: f('pillarVisionLabel'),
      body: f('pillarVisionBody'),
      color: colors.primary,
    },
  ]

  const philosophies = [
    { title: f('philosophy1Title'), body: f('philosophy1Body'), color: colors.gold },
    { title: f('philosophy2Title'), body: f('philosophy2Body'), color: colors.primary },
    { title: f('philosophy3Title'), body: f('philosophy3Body'), color: colors.success },
    { title: f('philosophy4Title'), body: f('philosophy4Body'), color: colors.info },
  ]

  const timeline = [
    {
      year: '1436',
      title: f('timeline1Title'),
      body: f('timeline1Body'),
    },
    {
      year: '1964',
      title: f('timeline2Title'),
      body: f('timeline2Body'),
    },
    {
      year: '1981',
      title: f('timeline3Title'),
      body: f('timeline3Body'),
    },
    {
      year: 'Today',
      title: f('timeline4Title'),
      body: f('timeline4Body'),
    },
  ]

  return (
    <div>
      <PageHero
        title={f('heroTitle')}
        subtitle={f('heroSubtitle')}
        kicker={t('site.nav.about')}
      />

      <Section eyebrow={f('storyEyebrow')} title={f('storyTitle')} align="left">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-center gap-9">
          <div className="flex flex-col gap-4">
            <p className="m-0 text-[15px] leading-[1.8] text-body">
              {f('storyParagraph1')}
            </p>
            <p className="m-0 text-[15px] leading-[1.8] text-body">
              {f('storyParagraph2')}
            </p>
          </div>
          <Photo
            src="/images/about-history.jpg"
            alt="The prayer hall and campus of Tharlam Monastery, Kathmandu"
            ratio="4 / 3"
            fallbackLabel="Historical & campus imagery placed here"
          />
        </div>
      </Section>

      <Section className="border-t border-line bg-surface-alt">
        <div className="relative mx-auto max-w-[880px]">
          <div className="absolute top-0 bottom-0 left-0 w-[3px] rounded-full bg-linear-to-b from-sage to-pine" />
          <div className="flex flex-col gap-[22px] pl-[26px]">
            {timeline.map((x) => (
              <div key={x.year} className="relative">
                <span className="absolute -left-[31px] top-[5px] size-[13px] rounded-full border-[3px] border-mint bg-sage shadow-[0_0_0_1px_rgba(136,184,152,0.5)]" />
                <p className="m-0 text-[12.5px] font-bold tracking-[1.4px] text-sage uppercase">
                  {x.year}
                </p>
                <h3 className="mt-1.5 mb-0 font-heading text-[18px] font-bold text-ink">{x.title}</h3>
                <p className="mt-1.5 mb-0 text-[14px] leading-[1.75] text-body">{x.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title={f('pillarsTitle')} className="border-b border-line">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
          {pillars.map((p, i) => (
            <OpenCard key={p.label} accent={p.color} index={i + 1} hover>
              <CardEyebrow color={p.color}>{p.label}</CardEyebrow>
              <h3 className="mt-3 mb-0 font-heading text-[20px] font-bold text-ink">{p.label}</h3>
              <CardBody className="mt-2.5 max-w-[520px]">{p.body}</CardBody>
            </OpenCard>
          ))}
        </div>
      </Section>

      <Section eyebrow={f('abbotEyebrow')} title={f('abbotTitle')} className="border-y border-line bg-surface-alt">
        <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-7">
          <Photo
            src="/images/abbot.jpg"
            alt="The Abbot of Tharlam Monastery"
            ratio="4 / 5"
            fallbackLabel="Abbot portrait placed here"
          />
          <div>
            <QuoteCard
              quote={f('abbotQuote')}
              name={f('abbotName')}
              role={f('abbotRole')}
              className="max-w-[720px]"
            />
          </div>
        </div>
      </Section>

      <Section eyebrow={f('philosophiesEyebrow')} title={f('philosophiesTitle')} subtitle={f('philosophiesSubtitle')}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8">
          {philosophies.map((p, i) => (
            <OpenCard key={p.title} accent={p.color} index={i + 1} hover>
              <h3 className="m-0 font-heading text-[16.5px] font-bold text-ink">{p.title}</h3>
              <CardBody className="mt-2.5 pr-3.5">{p.body}</CardBody>
            </OpenCard>
          ))}
        </div>
      </Section>

      <div className="bg-[radial-gradient(90%_130%_at_50%_0%,#285848_0%,#0F2A2A_55%,#0F2A2A_100%)] px-[22px] py-[52px] text-center">
        <h2 className="m-0 font-heading text-[clamp(24px,3vw,32px)] font-semibold text-white">
          {f('ctaTitle')}
        </h2>
        <p className="mx-auto mt-3.5 max-w-[600px] text-[14.5px] leading-[1.7] text-white/80">
          {f('ctaSubtitle')}
        </p>
        <div className="mt-[26px] flex flex-wrap justify-center gap-3">
          <Link
            to="/programs"
            className="rounded-full bg-linear-to-br from-sage to-sage-light px-7 py-[13px] text-[14px] font-extrabold text-ink no-underline shadow-sage"
          >
            {f('ctaExploreLabel')}
          </Link>
          <Link
            to="/contact"
            className="rounded-full border-2 border-white/75 px-7 py-3 text-[14px] font-bold text-white no-underline"
          >
            {f('ctaVisitLabel')}
          </Link>
        </div>
      </div>
    </div>
  )
}
