import { useState } from 'react'
import { useLanguage } from '../../i18n.jsx'
import { colors } from '../../theme.js'
import { cn } from '../../lib/cn.js'
import { PageHero, Section, Photo } from './shared.jsx'
import { Accordion, CardBody, CardEyebrow, CardTitle, CheckList, LinkRow, OpenCard, OpenFigure } from '../../components/cards.jsx'

const spiritualItems = [
  'Scriptural study and memorization',
  'Classical Tibetan literature',
  'Ritual arts',
  'Buddhist philosophy and psychology',
  'Formal dialectic debate',
]

const secularItems = ['English Language', 'Tibetan Language', 'Mathematics', 'General Science', 'Computer Basics']

const tiers = [
  {
    title: 'The Junior Monastic Level',
    age: 'Ages 7–12',
    body: 'Focuses on foundational reading and writing in Tibetan and English, correct pronunciation, scripture memorization, basic mathematics, early science, and initial mindfulness practices.',
    color: colors.primary,
  },
  {
    title: 'The Senior Monastic Level',
    age: 'Ages 13–18',
    body: 'Focuses on advanced Buddhist logic and philosophy, daily debate practice, ethics, and deeper study of English, Tibetan, Mathematics, and General Science.',
    color: colors.gold,
  },
]

const programs = [
  {
    title: 'Monastic Studies',
    image: '/images/program-monastic.jpg',
    body: 'Philosophy, memorization, Tibetan grammar and ritual arts — the classical curriculum of the Nalanda tradition, taught as it has been for centuries.',
  },
  {
    title: 'Modern Academics',
    image: '/images/program-academics.jpg',
    body: 'English, Tibetan, Mathematics, General Science and computer literacy, delivered by certified teachers to the national curriculum standard.',
  },
  {
    title: 'Residential & Total Care',
    image: '/images/program-care.jpg',
    body: 'A warm dormitory, three daily meals, robes, healthcare and round-the-clock guardianship — a true home within the monastery walls.',
  },
  {
    title: 'Arts, Ritual & Thangka',
    image: '/images/program-arts.jpg',
    body: 'Sacred music, cham dance, and the meticulous art of thangka painting, preserving the visual culture of the Himalayas.',
  },
]

const scheduleTabs = [
  {
    key: 'daily',
    label: 'Daily schedule',
    title: 'Our Daily Routine at Tharlam Academy',
    subtitle:
      'Each day is thoughtfully structured to balance spiritual practice, academic learning, and personal development.',
    items: [
      { time: '5:30 AM', title: 'Morning Puja and Prayers' },
      { time: '7:00 AM', title: 'Breakfast' },
      { time: '7:40 AM', title: 'Avalokiteshvara Prayer & Meditation' },
      { time: '10:30 AM', title: 'Academic Classes' },
      { time: '3:30 PM', title: 'Sports and Play Time' },
      { time: '6:00 PM', title: 'Dinner Break' },
      { time: '8:30 PM', title: 'Homework and Self-Study' },
      { time: '9:30 PM', title: 'Sleeping Time' },
    ],
  },
  {
    key: 'sports',
    label: 'Monthly Sports Day',
    title: 'Monthly Sports Day',
    subtitle:
      'At the end of every month, a special Sports Day is organized to foster skills, teamwork, and healthy competition.',
    items: [
      { title: 'Football', body: 'Inter-house competition' },
      { title: 'Relay Race', body: 'Inter-house competition' },
      { title: 'Kabaddi', body: 'Inter-house competition' },
      { title: 'Volleyball', body: 'Inter-house competition' },
      { title: 'High Jump & Long Jump', body: 'Inter-house competition' },
      { title: 'Various Games', body: 'Other inter-house competitions and recreational activities' },
    ],
  },
  {
    key: 'friday',
    label: 'Friday activity',
    title: 'Weekly Friday Activities',
    subtitle:
      'Every Friday is dedicated to diverse extracurricular activities, fostering creative expression and critical thinking.',
    items: [
      {
        title: 'Speech & Presentation',
        body: 'Students practice public speaking and presentation skills in English, Tibetan, and Nepali.',
      },
      {
        title: 'General Knowledge Quiz',
        body: 'Engaging quizzes on various subjects to test and expand students\u2019 knowledge.',
      },
      {
        title: 'Creative Project Work',
        body: 'Collaborative projects focused on topics like water preservation, animal welfare, and natural phenomena.',
      },
      {
        title: 'Debate & Discussion',
        body: 'Structured debates on diverse topics such as education impact and internet usage.',
      },
    ],
  },
]

const faqs = [
  {
    q: 'Is education really completely free?',
    a: 'Yes. Every young monk in our care receives his education, meals, clothing, housing and healthcare entirely free of charge. This is possible only through the generosity of our sponsors and benefactors.',
  },
  {
    q: 'Who can apply, and at what age?',
    a: 'We welcome boys aged 7 to 14 who genuinely wish to join the monastic community. A personal wish to ordain, a basic medical check, and clear written consent from parents or guardians are the essential criteria.',
  },
  {
    q: 'How do monks learn both philosophy and modern subjects?',
    a: 'Our dual curriculum runs through a single, balanced day. Mornings are devoted to modern academic classes, afternoons to philosophical debate and scriptural study, and the day opens and closes with prayer and meditation.',
  },
  {
    q: 'How can I sponsor a child or make a donation?',
    a: 'You may donate online or by direct bank transfer, one-time or monthly. Every contribution is recorded, acknowledged, and applied fully to the care of the monks. Visit our Donations page for details.',
  },
  {
    q: 'Can I visit the school?',
    a: 'Absolutely. Visitors are warmly received between morning prayers and evening study. Please reach out through our Contact page so we can welcome you properly.',
  },
]

export default function Programs() {
  const { t } = useLanguage()
  const [scheduleTab, setScheduleTab] = useState(0)
  const activeSchedule = scheduleTabs[scheduleTab]

  return (
    <div>
      <PageHero
        title="Programs & Services"
        subtitle="A holistic constellation of care and study — monastic philosophy, modern academics, and the full embrace of residential life, all offered freely."
        kicker={t('site.nav.programs')}
      />

      <Section eyebrow="Programs & Courses" title="Four Pillars of a Complete Education" subtitle="Together these pillars shape a child who is learned, disciplined, healthy, and artistically alive.">
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
        eyebrow="The Dual Curriculum"
        title="Two Traditions, One Balanced Mind"
        subtitle="Our educational framework balances the student's day between two beautifully complementary halves."
        className="border-y border-line bg-surface-alt"
      >
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
          <OpenCard accent={colors.primary} hover>
            <CardEyebrow>Sphere One</CardEyebrow>
            <CardTitle as="h3" className="mt-2.5">The Spiritual Sphere</CardTitle>
            <CardBody className="mt-2.5">
              Immersive monastic studies and ethics taught in the traditional way — the beating heart of our heritage.
            </CardBody>
            <CheckList items={spiritualItems} accent={colors.primary} className="mt-4.5" />
          </OpenCard>

          <OpenCard accent={colors.gold} hover>
            <CardEyebrow color={colors.gold}>Sphere Two</CardEyebrow>
            <CardTitle as="h3" className="mt-2.5">The Secular Sphere</CardTitle>
            <CardBody className="mt-2.5">
              A full modern school program taught alongside the monastic curriculum, readying graduates for the wide world.
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

      <Section eyebrow="Milestones" title="Academic Divisions & Age Tiers" subtitle="A clear path of growth from first steps of the alphabet to advanced philosophical mastery.">
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
        eyebrow="Rhythm of a Day"
        title="A Day in the Monastic Life"
        subtitle="Choose a schedule below to see how our students spend their time — body, mind and spirit in careful balance."
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

      <Section eyebrow="Questions Answered" title="Frequently Asked Questions" subtitle="Everything benefactors and families most often ask about our programs and care.">
        <Accordion items={faqs} />
      </Section>

        <div className="bg-linear-to-b from-sage-soft to-mint to-60% px-[22px] py-11">
        <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-11">
          <div>
            <CardEyebrow>Keep Exploring</CardEyebrow>
            <CardTitle as="h3" className="mt-2.5 text-[19px]">Want the full timetable?</CardTitle>
            <CardBody className="mt-2">See how the dual curriculum is scheduled across the week and the full daily routine.</CardBody>
            <div className="mt-6">
              <LinkRow to="/curriculum" accent={colors.primary} cta="Curriculum">
                <span className="text-[14.5px] font-bold text-ink">{t('curriculumPage.title')}</span>
              </LinkRow>
              <LinkRow
                href="#daily-schedule"
                accent={colors.accent}
                cta="Routine"
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
            <CardEyebrow>Take Part</CardEyebrow>
            <CardTitle as="h3" className="mt-2.5 text-[19px]">Ready to make a difference?</CardTitle>
            <CardBody className="mt-2">Sponsor a young monk&rsquo;s education, meals and home — and watch a life transform.</CardBody>
            <div className="mt-6">
              <LinkRow to="/donate" accent={colors.gold} cta="Donate">
                <span className="text-[14.5px] font-bold text-ink">Give a monthly sponsorship</span>
              </LinkRow>
              <LinkRow to="/admissions" accent={colors.primary} cta="Apply">
                <span className="text-[14.5px] font-bold text-ink">Apply for a child</span>
              </LinkRow>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
