import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n.jsx'
import { colors } from '../../theme.js'
import { PageHero, Section, Photo } from './shared.jsx'
import { OpenCard, QuoteCard, CardBody, CardEyebrow } from '../../components/cards.jsx'

const pillars = [
  {
    label: 'Our Mission',
    body: 'To provide a compassionate, disciplined, and rigorous educational sanctuary that seamlessly fuses sacred Buddhist philosophy with modern schooling, and to offer it freely to every young monk, producing highly ethical, literate, and peaceful individuals who serve humanity.',
    color: colors.gold,
  },
  {
    label: 'Our Vision',
    body: 'To stand as a beacon of holistic learning where spiritual realization and academic brilliance meet to cultivate lasting inner and outer peace.',
    color: colors.primary,
  },
]

const philosophies = [
  { title: 'Universal Compassion (Karuna)', body: 'Cultivating an active, empathetic heart that seeks to relieve the pain and suffering of all sentient beings.', color: colors.gold },
  { title: 'Direct Analytical Wisdom (Prajna)', body: 'Relying on logic, science, and deep meditative observation to perceive reality clearly and without delusion.', color: colors.primary },
  { title: 'Uncompromising Ethical Integrity (Shila)', body: 'Living honestly, practicing non-harming, and honoring monastic commitments in private and public life.', color: colors.success },
  { title: 'Harmonious Interdependence', body: 'Recognizing that our well-being is completely tied to the well-being of our community, our environment, and the planet.', color: colors.info },
]

const timeline = [
  {
    year: '1436',
    title: 'The Monastery Is Born',
    body: 'Scholar Ga Rabjampa Kunga Yeshe founds Tharlam Monastery in Kham, Eastern Tibet, as a Sakya center of study and practice.',
  },
  {
    year: '1964',
    title: 'The School Begins',
    body: 'Teaching opens with a handful of boys studying together in a single prayer hall — the seed of the school we grow today.',
  },
  {
    year: '1981',
    title: 'A New Home in Boudha',
    body: 'H.E. Dezhung Rinpoche re-establishes the monastery beside the Boudhanath Stupa in Kathmandu, keeping the lineage unbroken.',
  },
  {
    year: 'Today',
    title: 'A Thriving Monastic Family',
    body: 'Young monks from across the Himalayan region study philosophy and modern academics side by side — entirely free of charge.',
  },
]

export default function About() {
  const { t } = useLanguage()

  return (
    <div>
      <PageHero
        title="About Our School"
        subtitle="A living sanctuary for spiritual preservation and intellectual growth, standing in the shadow of the great Boudhanath Stupa in Kathmandu."
        kicker={t('site.nav.about')}
      />

      <Section eyebrow="Our Story" title="Five Centuries of Learning, One Unbroken Heart" align="left">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-9">
          <div className="flex flex-col gap-4">
            <p className="m-0 text-[15px] leading-[1.8] text-body">
              Our story begins with Tharlam Monastery itself. It was founded in 1436 by the scholar and teacher Ga Rabjampa
              Kunga Yeshe in Kham, Eastern Tibet, as a Sakya center of learning and practice. After the turmoil of the
              twentieth century, the monastery was re-established in 1981 beside the Boudhanath Stupa in Kathmandu by
              H.E. Dezhung Rinpoche, so that its teaching, practice, and service could continue unbroken in a new home.
            </p>
            <p className="m-0 text-[15px] leading-[1.8] text-body">
              As the community grew, its guides recognized a critical shift in the modern era: traditional spiritual
              training needed to adapt in order to thrive, and children needed strong academic foundations to build their
              futures. Thus, Tharlam Manjushree School was established. Today it is a thriving monastic school caring for
              its young monks, providing each of them with education, meals, clothing, and housing entirely free of charge.
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

      <Section title="Core Pillars: Mission & Vision" className="border-b border-line">
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

      <Section eyebrow="A Word From Our Spiritual Guide" title="Message from the Abbot" className="border-y border-line bg-surface-alt">
        <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-7">
          <Photo
            src="/images/abbot.jpg"
            alt="The Abbot of Tharlam Monastery"
            ratio="4 / 5"
            fallbackLabel="Abbot portrait placed here"
          />
          <div>
            <QuoteCard
              quote="The true wealth of a nation or a monastery is not measured by the height of its buildings, but by the depth of its values. Every child who crosses our threshold is a precious seed. Our responsibility is to provide the fertile soil of discipline, the water of education, and the warm sunlight of love so they grow into mighty trees of wisdom under whose shade the suffering world can find rest."
              name="The Abbot"
              role="Tharlam Monastery"
              className="max-w-[720px]"
            />
          </div>
        </div>
      </Section>

      <Section eyebrow="What Guides Us" title="Foundational Philosophies" subtitle="Four principles, taught not as theory but as a daily way of life.">
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
          See the Dual Curriculum in Action
        </h2>
        <p className="mx-auto mt-3.5 max-w-[600px] text-[14.5px] leading-[1.7] text-white/80">
          Explore the programs that carry this sacred heritage forward — from dawn debate to modern mathematics.
        </p>
        <div className="mt-[26px] flex flex-wrap justify-center gap-3">
          <Link
            to="/programs"
            className="rounded-full bg-linear-to-br from-sage to-sage-light px-7 py-[13px] text-[14px] font-extrabold text-ink no-underline shadow-sage"
          >
            Explore Programs →
          </Link>
          <Link
            to="/contact"
            className="rounded-full border-2 border-white/75 px-7 py-3 text-[14px] font-bold text-white no-underline"
          >
            Plan a Visit
          </Link>
        </div>
      </div>
    </div>
  )
}
