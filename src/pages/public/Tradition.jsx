import { useField, PageHero, Section, usePage } from './shared.jsx'
import { CardBody, CardEyebrow, StatBand } from '../../components/cards.jsx'
import { colors } from '../../theme.js'

export default function Tradition() {
  const f = usePage('tradition')
  const introTitle = useField('tradition', 'introTitle')
  const introBody = useField('tradition', 'introBody')
  const historyTitle = useField('tradition', 'historyTitle')
  const historyBody = useField('tradition', 'historyBody')
  const philosophyTitle = useField('tradition', 'philosophyTitle')
  const philosophyBody = useField('tradition', 'philosophyBody')

  const milestones = [
    { year: '1964', key: 'm1', text: f('milestone1Text') },
    { year: '1982', key: 'm2', text: f('milestone2Text') },
    { year: '2001', key: 'm3', text: f('milestone3Text') },
    { year: '2015', key: 'm4', text: f('milestone4Text') },
    { year: '2026', key: 'm5', text: f('milestone5Text') },
  ]

  return (
    <div>
      <PageHero title={introTitle} subtitle={introBody} kicker={f('pageKicker')} />

      <Section title={historyTitle} subtitle={historyBody}>
        <div className="relative mx-auto flex max-w-[760px] flex-col">
          <span aria-hidden="true" className="absolute top-4 bottom-4 left-[63px] w-px bg-line" />
          {milestones.map((m) => (
            <div key={m.key} className="relative flex items-center gap-5 py-[9px]">
              <span className="relative z-[1] min-w-[66px] bg-mint px-2 py-[7px] text-center font-heading text-sm font-bold whitespace-nowrap text-sage">
                {m.year}
              </span>
              <div className="flex-1 border-b border-l border-line py-3.5 pl-[22px]">
                <CardEyebrow color={colors.gold}>{f('milestoneLabel')}</CardEyebrow>
                <CardBody className="mt-2">{m.text}</CardBody>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title={philosophyTitle} subtitle={philosophyBody} className="border-t border-line bg-surface-alt">
        <div className="mx-auto max-w-[760px]">
          <CardEyebrow>{f('threeTrainingsLabel')}</CardEyebrow>
          <StatBand
            className="mt-[22px]"
            stats={[
              { value: f('training1Value'), label: f('training1Label'), color: colors.primary },
              { value: f('training2Value'), label: f('training2Label'), color: colors.accent },
              { value: f('training3Value'), label: f('training3Label'), color: colors.success },
            ]}
          />
        </div>
      </Section>
    </div>
  )
}
