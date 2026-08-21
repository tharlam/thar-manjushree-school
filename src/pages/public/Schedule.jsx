import { useField, PageHero, Section } from './shared.jsx'
import { colors, radii } from '../../theme.js'
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
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 760, margin: '0 auto', gap: 10 }}>
          <div className="schedule-header" style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 12, padding: '0 4px 6px', fontSize: 11, fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: colors.muted }}>
            <span>{t('schedulePage.time')}</span>
            <span>{t('schedulePage.activity')}</span>
          </div>
          {dayRows.map((row, i) => (
            <div
              key={row.activityKey}
              className="schedule-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '110px 1fr',
                gap: 12,
                alignItems: 'center',
                padding: '13px 16px',
                borderRadius: radii.md,
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderLeft: `4px solid ${i % 2 === 0 ? colors.primary : colors.accent}`,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 800, color: colors.primary, whiteSpace: 'nowrap' }}>{row.time}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600, color: colors.text }}>
                <span style={{ fontSize: 17 }}>{row.icon}</span>
                {t(`schedulePage.${row.activityKey}`)}
              </span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
