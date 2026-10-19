import { PageHero, Section, usePage } from './shared.jsx'
import { CardEyebrow, CardTitle, OpenCard } from '../../components/cards.jsx'
import { colors } from '../../theme.js'

export default function Curriculum() {
  const f = usePage('curriculum')

  const levels = [
    {
      eyebrow: f('level1Eyebrow'),
      title: f('level1Title'),
      color: colors.primary,
      items: [f('level1Item1'), f('level1Item2'), f('level1Item3')],
    },
    {
      eyebrow: f('level2Eyebrow'),
      title: f('level2Title'),
      color: colors.accent,
      items: [f('level2Item1'), f('level2Item2')],
    },
    {
      eyebrow: f('level3Eyebrow'),
      title: f('level3Title'),
      color: colors.success,
      items: [f('level3Item1'), f('level3Item2'), f('level3Item3')],
    },
  ]

  return (
    <div>
      <PageHero title={f('heroTitle')} subtitle={f('heroSubtitle')} kicker={f('heroKicker')} />

      <Section>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
          {levels.map((level, i) => (
            <OpenCard key={level.title} accent={level.color} index={i + 1} hover>
              <CardEyebrow color={level.color}>{level.eyebrow}</CardEyebrow>
              <CardTitle as="h3" className="mt-2.5 pr-10 text-[17px]">
                {level.title}
              </CardTitle>
              <ul className="mt-4 flex flex-col gap-2.5">
                {level.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[13.75px] leading-[1.7] text-body">
                    <span
                      aria-hidden="true"
                      className="mt-[9px] size-1.5 shrink-0 rounded-full"
                      style={{ background: level.color }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </OpenCard>
          ))}
        </div>
      </Section>
    </div>
  )
}
