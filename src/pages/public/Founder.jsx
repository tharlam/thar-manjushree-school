import { useField, PageHero, Section, Tile } from './shared.jsx'
import { colors } from '../../theme.js'
import { useLanguage } from '../../i18n.jsx'

export default function Founder() {
  const { t } = useLanguage()
  const name = useField('founder', 'name')
  const title = useField('founder', 'title')
  const bioTitle = useField('founder', 'bioTitle')
  const bioBody = useField('founder', 'bioBody')
  const visionTitle = useField('founder', 'visionTitle')
  const visionBody = useField('founder', 'visionBody')

  return (
    <div>
      <PageHero title={name} subtitle={title} kicker={t('founderPage.title')} />

      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22, alignItems: 'stretch' }}>
          <Tile
            style={{
              minHeight: 320,
              background: `linear-gradient(150deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              flexDirection: 'column',
              gap: 6,
              color: '#fff',
            }}
          >
            <span style={{ fontSize: 96, fontWeight: 900, opacity: 0.9 }}>ད</span>
            <span style={{ fontSize: 16, fontWeight: 800 }}>{name}</span>
            <span style={{ fontSize: 12, color: '#E5B98B' }}>{title}</span>
          </Tile>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Tile>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: colors.text }}>{bioTitle}</h3>
              <p style={{ margin: '10px 0 0', fontSize: 14, lineHeight: 1.7, color: colors.textSoft }}>{bioBody}</p>
            </Tile>
          </div>
        </div>
      </Section>

      <Section title={visionTitle} subtitle={visionBody} style={{ background: colors.surfaceAlt, borderTop: `1px solid ${colors.border}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
          {[
            { label: '1964', sub: t('settingsPage.established') },
            { label: '142+', sub: t('homePage.statMonks') },
            { label: '7', sub: t('classesPage.credits') },
            { label: '3', sub: t('settingsPage.defaultLang') },
          ].map((s) => (
            <Tile key={s.label} style={{ textAlign: 'center', borderTop: `3px solid ${colors.primary}` }}>
              <p style={{ margin: 0, fontSize: 26, fontWeight: 800, color: colors.text }}>{s.label}</p>
              <p style={{ margin: '6px 0 0', fontSize: 12.5, color: colors.muted }}>{s.sub}</p>
            </Tile>
          ))}
        </div>
      </Section>
    </div>
  )
}
