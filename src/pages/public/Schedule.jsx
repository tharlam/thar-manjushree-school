import { useField, PageHero, Section } from './shared.jsx'
import { colors } from '../../theme.js'
import { CardEyebrow } from '../../components/cards.jsx'
import { useLanguage } from '../../i18n.jsx'

const dayRows = [
  { time: '04:30 – 05:30', activityKey: 'wakePrayers', icon: '🌅' },
  { time: '05:30 – 06:30', activityKey: 'tibetanClass', icon: '📖' },
  { time: '06:30 – 07:30', activityKey: 'breakfast', icon: '🥣' },
  { time: '08:00 – 11:30', activityKey: 'philosophyClass', icon: '📿' },
  { time: '11:30 – 13:00', activityKey: 'lunchRest', icon: '🍚' },
  { time: '13:00 – 15:30', activityKey: 'modernClass', icon: '✏️' },
  { time: '15:30 – 17:00', activityKey: 'debatePractice', icon: '🗣️' },
  { time: '17:00 – 18:00', activityKey: 'artStudy', icon: '🎨' },
  { time: '18:00 – 19:00', activityKey: 'eveningPuja', icon: '🕯️' },
  { time: '19:00 – 20:30', activityKey: 'selfStudy', icon: '📚' },
  { time: '20:30 – 21:30', activityKey: 'dinnerRest', icon: '🌙' },
]

export default function Schedule() {
  const { t } = useLanguage()
  const introTitle = useField('schedule', 'introTitle')
  const introBody = useField('schedule', 'introBody')

  return (
    <div>
      <PageHero title={introTitle} subtitle={introBody} kicker={t('schedulePage.title')} />

      <Section>
        <div className="mx-auto flex max-w-[760px] flex-col">
          <div className="schedule-header grid grid-cols-[120px_1fr] gap-3.5 border-b border-line pb-2 text-[11px] font-extrabold tracking-[1.4px] text-muted uppercase">
            <span>{t('schedulePage.time')}</span>
            <span>{t('schedulePage.activity')}</span>
          </div>
          {dayRows.map((row, i) => {
            const accent = i % 2 === 0 ? colors.primary : colors.accent
            return (
              <div
                key={row.activityKey}
                className="schedule-row grid grid-cols-[120px_1fr] items-center gap-3.5 border-b border-line py-[15px]"
              >
                <span className="text-[12.5px] font-extrabold tracking-[0.6px] whitespace-nowrap" style={{ color: accent }}>{row.time}</span>
                <span className="flex items-center gap-3 text-sm font-semibold text-ink">
                  <span className="text-[17px]">{row.icon}</span>
                  {t(`schedulePage.${row.activityKey}`)}
                </span>
              </div>
            )
          })}
          <CardEyebrow className="mt-5">A Day Begins Before Dawn</CardEyebrow>
        </div>
      </Section>
    </div>
  )
}
