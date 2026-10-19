import { useLanguage } from '../../i18n.jsx'
import { colors } from '../../theme.js'
import { PageHero, Section, Photo, usePage } from './shared.jsx'
import { OpenCard, RailCard, StatBand, CardTitle, CardBody } from '../../components/cards.jsx'
import { useAppStore } from '../../store.jsx'
import { classes } from '../../data/index.js'

export default function Teachers() {
  const { t } = useLanguage()
  const f = usePage('teachers')
  const { monks } = useAppStore()

  const profiles = [
    {
      role: f('profile1Role'),
      name: f('profile1Name'),
      body: f('profile1Body'),
      color: colors.primary,
    },
    {
      role: f('profile2Role'),
      name: f('profile2Name'),
      body: f('profile2Body'),
      color: colors.accent,
    },
    {
      role: f('profile3Role'),
      name: f('profile3Name'),
      body: f('profile3Body'),
      color: colors.success,
    },
  ]

  const faculty = [...new Map(classes.map((c) => [c.teacher, c])).values()]
  const classLabel = (id) => (classes.find((c) => c.id === id) || {}).name || id || '—'

  const spiritualMasters = faculty.filter((c) => /^(Khenpo|Geshe|Lama)/.test(c.teacher)).length
  const secularTeachers = faculty.filter((c) => /^(Mr\.|Ms\.)/.test(c.teacher)).length

  const stats = [
    { label: f('statLabel1'), value: monks.length, color: colors.primary },
    { label: f('statLabel2'), value: spiritualMasters, color: colors.accent },
    { label: f('statLabel3'), value: secularTeachers, color: colors.success },
  ]

  return (
    <div>
      <PageHero
        title={f('heroTitle')}
        subtitle={f('heroSubtitle')}
        kicker={t('site.nav.teachers')}
      />

      <Section title={f('communityTitle')} className="border-b border-line bg-surface-alt">
        <StatBand stats={stats} className="mx-auto max-w-[900px]" />
      </Section>

      <Section title={f('profilesTitle')}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8">
          {profiles.map((p, i) => (
            <OpenCard key={p.role} accent={p.color} index={i + 1} hover>
              <p className="m-0 text-[11.5px] font-bold tracking-[1.4px] uppercase" style={{ color: p.color }}>{p.role}</p>
              <CardTitle as="h3" className="mt-2 pr-10 text-[17px]">{p.name}</CardTitle>
              <CardBody className="mt-2.5 pr-[26px]">{p.body}</CardBody>
            </OpenCard>
          ))}
        </div>
      </Section>

      <Section title={f('visionTitle')} className="border-y border-line bg-surface-alt">
        <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-12">
          <Photo
            src="/images/campus.jpg"
            alt="Teachers and monks of Thar Manjushree School"
            ratio="4 / 3"
            fallbackLabel="Educational Vision"
          />
          <div className="flex flex-col gap-5">
            <p className="m-0 text-[11px] font-bold tracking-[1.8px] text-sage uppercase">{f('visionEyebrow')}</p>
            <p className="m-0 font-heading text-[18.5px] leading-[1.6] font-semibold text-ink">
              {f('visionQuote')}
            </p>
            <div className="border-t border-line pt-4">
              <p className="m-0 text-[14px] font-bold text-ink">{f('visionSignatureLine1')}</p>
              <p className="m-0 text-[12.5px] text-muted">{f('visionSignatureLine2')}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section title={f('facultyTitle')}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-[34px] gap-y-4.5">
          {faculty.map((c) => (
            <RailCard key={c.teacher} accent={c.color} className="flex-row items-center gap-3 py-3.5 pr-4.5 pl-6">
              <span
                className="inline-flex size-[46px] shrink-0 items-center justify-center rounded-full text-xs font-extrabold"
                style={{ background: `${c.color}1A`, color: c.color }}
              >
                {c.teacher.split(' ').map((p) => p[0]).slice(0, 2).join('')}
              </span>
              <div className="min-w-0 flex-1">
                <p className="m-0 text-sm font-bold text-ink">{c.teacher}</p>
                <p className="mt-[3px] mb-0 text-xs text-muted">{c.name} · {c.room}</p>
              </div>
              <span className="rounded-full bg-pine-soft px-[9px] py-0.5 text-[10.5px] font-bold whitespace-nowrap text-pine">{t('statuses.active')}</span>
            </RailCard>
          ))}
        </div>
      </Section>

      <Section title={f('monksTitle')} className="border-t border-line bg-surface-alt">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-x-8 gap-y-2.5">
          {monks.slice(0, 12).map((m) => (
            <div key={m.id} className="flex items-center gap-3 border-t border-line py-2.5">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-pine-soft text-[11px] font-extrabold text-pine">
                {m.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
              </span>
              <div className="min-w-0 flex-1">
                <p className="m-0 truncate text-[13.5px] font-bold text-ink">{m.name}</p>
                <p className="mt-0.5 mb-0 text-[11.5px] text-muted">{classLabel(m.classId)}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-[22px] mx-0.5 mb-0 text-xs text-muted">{monks.length} {f('monksTitle').toLowerCase()}</p>
      </Section>
    </div>
  )
}
