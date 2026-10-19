import { useField, usePage, PageHero, Section } from './shared.jsx'
import { colors } from '../../theme.js'
import { CardEyebrow } from '../../components/cards.jsx'

export default function Schedule() {
  const f = usePage('schedule')
  const introTitle = useField('schedule', 'introTitle')
  const introBody = useField('schedule', 'introBody')

  const dayRows = [
    { time: f('scheduleRow1Time'), label: f('scheduleRow1Label'), icon: '🌅' },
    { time: f('scheduleRow2Time'), label: f('scheduleRow2Label'), icon: '📖' },
    { time: f('scheduleRow3Time'), label: f('scheduleRow3Label'), icon: '🥣' },
    { time: f('scheduleRow4Time'), label: f('scheduleRow4Label'), icon: '📿' },
    { time: f('scheduleRow5Time'), label: f('scheduleRow5Label'), icon: '🍚' },
    { time: f('scheduleRow6Time'), label: f('scheduleRow6Label'), icon: '✏️' },
    { time: f('scheduleRow7Time'), label: f('scheduleRow7Label'), icon: '🗣️' },
    { time: f('scheduleRow8Time'), label: f('scheduleRow8Label'), icon: '🎨' },
    { time: f('scheduleRow9Time'), label: f('scheduleRow9Label'), icon: '🕯️' },
    { time: f('scheduleRow10Time'), label: f('scheduleRow10Label'), icon: '📚' },
    { time: f('scheduleRow11Time'), label: f('scheduleRow11Label'), icon: '🌙' },
  ]

  return (
    <div>
      <PageHero title={introTitle} subtitle={introBody} kicker={f('pageTitle')} />

      <Section>
        <div className="mx-auto flex max-w-[760px] flex-col">
          <div className="schedule-header grid grid-cols-[120px_1fr] gap-3.5 border-b border-line pb-2 text-[11px] font-extrabold tracking-[1.4px] text-muted uppercase">
            <span>{f('timeLabel')}</span>
            <span>{f('activityLabel')}</span>
          </div>
          {dayRows.map((row, i) => {
            const accent = i % 2 === 0 ? colors.primary : colors.accent
            return (
              <div
                key={i}
                className="schedule-row grid grid-cols-[120px_1fr] items-center gap-3.5 border-b border-line py-[15px]"
              >
                <span className="text-[12.5px] font-extrabold tracking-[0.6px] whitespace-nowrap" style={{ color: accent }}>
                  {row.time}
                </span>
                <span className="flex items-center gap-3 text-sm font-semibold text-ink">
                  <span className="text-[17px]">{row.icon}</span>
                  {row.label}
                </span>
              </div>
            )
          })}
          <CardEyebrow className="mt-5">{f('footerNote')}</CardEyebrow>
        </div>
      </Section>
    </div>
  )
}
