import { useField, usePage, PageHero, Section } from './shared.jsx'
import { RailCard } from '../../components/cards.jsx'
import { colors } from '../../theme.js'
import { useLanguage } from '../../i18n.jsx'
import { classes } from '../../data/index.js'

export default function Lineage() {
  const { t } = useLanguage()
  const introTitle = useField('lineage', 'introTitle')
  const introBody = useField('lineage', 'introBody')
  const mastersTitle = useField('lineage', 'mastersTitle')
  const mastersBody = useField('lineage', 'mastersBody')
  const f = usePage('lineage')

  const lineageSteps = [
    { label: f('lineageStep1Label'), sub: f('lineageStep1Sub'), color: colors.primary },
    { label: f('lineageStep2Label'), sub: f('lineageStep2Sub'), color: colors.primaryDark },
    { label: f('lineageStep3Label'), sub: f('lineageStep3Sub'), color: colors.accent },
    { label: f('lineageStep4Label'), sub: f('lineageStep4Sub'), color: colors.primary },
    { label: f('lineageStep5Label'), sub: f('lineageStep5Sub'), color: colors.success },
  ]

  const masters = [...new Map(classes.map((c) => [c.teacher, c])).values()]

  return (
    <div>
      <PageHero title={introTitle} subtitle={introBody} kicker={f('pageKicker')} />

      <Section>
        <div className="mx-auto flex max-w-[640px] flex-col">
          {lineageSteps.map((s, i) => (
            <div key={s.label} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <span
                  className="inline-flex size-[34px] items-center justify-center rounded-full text-[13px] font-extrabold text-white"
                  style={{ background: s.color }}
                >
                  {i + 1}
                </span>
                {i < lineageSteps.length - 1 && <span className="min-h-[26px] w-0.5 flex-1 bg-line" />}
              </div>
              <div className="flex-1 py-2">
                <p className="m-0 text-[15px] font-extrabold text-ink">{s.label}</p>
                <p className="mt-0.5 mb-0 text-[12.5px] text-muted">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title={mastersTitle} subtitle={mastersBody} className="border-t border-line bg-surface-alt">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-[34px] gap-y-[18px]">
          {masters.map((c) => (
            <RailCard key={c.teacher} accent={c.color} className="flex-row items-center gap-3 py-3.5 pr-4.5 pl-6">
              <span
                className="inline-flex size-11 items-center justify-center rounded-full text-xs font-extrabold"
                style={{ background: `${c.color}1A`, color: c.color }}
              >
                {c.teacher.split(' ').map((p) => p[0]).slice(0, 2).join('')}
              </span>
              <div className="flex-1">
                <p className="m-0 text-sm font-bold text-ink">{c.teacher}</p>
                <p className="mt-[3px] mb-0 text-xs text-muted">{c.name} · {c.room}</p>
              </div>
              <span className="rounded-full bg-pine-soft px-[9px] py-0.5 text-[10.5px] font-bold whitespace-nowrap text-pine">{t('statuses.active')}</span>
            </RailCard>
          ))}
        </div>
      </Section>
    </div>
  )
}
