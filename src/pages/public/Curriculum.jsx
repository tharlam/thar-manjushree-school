import { useField, PageHero, Section, Tile } from './shared.jsx'
import { colors, radii } from '../../theme.js'
import { useLanguage } from '../../i18n.jsx'
import { syllabi } from '../../data/index.js'

export default function Curriculum() {
  const { t } = useLanguage()
  const introTitle = useField('curriculum', 'introTitle')
  const introBody = useField('curriculum', 'introBody')
  const philosophyTitle = useField('curriculum', 'philosophyTitle')
  const philosophyBody = useField('curriculum', 'philosophyBody')
  const modernTitle = useField('curriculum', 'modernTitle')
  const modernBody = useField('curriculum', 'modernBody')

  const subjects = [
    { name: 'Buddhist Logic', key: 'logic', color: colors.primary, progress: 78 },
    { name: 'Debate Practice', key: 'debate', color: colors.accent, progress: 88 },
    { name: 'Madhyamaka', key: 'madhyamaka', color: colors.purple, progress: 62 },
    { name: 'Vinaya Studies', key: 'vinaya', color: colors.teal, progress: 55 },
  ]

  return (
    <div>
      <PageHero title={introTitle} subtitle={introBody} kicker={t('curriculumPage.title')} />

      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          <Tile style={{ borderTop: `3px solid ${colors.primary}` }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: colors.text }}>{philosophyTitle}</h3>
            <p style={{ margin: '10px 0 0', fontSize: 13.5, lineHeight: 1.7, color: colors.textSoft }}>{philosophyBody}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
              {subjects.map((s) => (
                <div key={s.key}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: colors.text }}>{t(`subjects.${s.key}`)}</span>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: s.color }}>{s.progress}%</span>
                  </div>
                  <div style={{ height: 8, borderRadius: radii.round, background: colors.border, overflow: 'hidden' }}>
                    <div style={{ width: `${s.progress}%`, height: '100%', borderRadius: radii.round, background: s.color }} />
                  </div>
                </div>
              ))}
            </div>
          </Tile>

          <Tile style={{ borderTop: `3px solid ${colors.success}` }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: colors.text }}>{modernTitle}</h3>
            <p style={{ margin: '10px 0 0', fontSize: 13.5, lineHeight: 1.7, color: colors.textSoft }}>{modernBody}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
              {['English Language', 'Mathematics', 'Science & Environment', 'Computer Basics', 'Tibetan & Nepali', 'Arts & Music'].map((s) => (
                <span key={s} style={{ padding: '5px 12px', borderRadius: radii.round, background: colors.successSoft, color: colors.success, fontSize: 12, fontWeight: 700 }}>
                  {s}
                </span>
              ))}
            </div>
          </Tile>
        </div>
      </Section>

      <Section title={t('classesPage.syllabiTitle')} style={{ background: colors.surfaceAlt, borderTop: `1px solid ${colors.border}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
          {syllabi.map((s) => (
            <Tile key={s.id} style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '14px 16px', background: `${s.color}12`, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 8, height: 36, borderRadius: 4, background: s.color }} />
                <div>
                  <p style={{ margin: 0, fontSize: 14.5, fontWeight: 800, color: colors.text }}>{t(`subjects.${s.titleKey}`)}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 11.5, color: colors.muted }}>{s.code} · {s.credits} {t('classesPage.credits')}</p>
                </div>
              </div>
              <div style={{ padding: '12px 16px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                  {s.modules.map((m) => (
                    <span key={m} style={{ padding: '2px 9px', borderRadius: radii.round, background: colors.surfaceAlt, border: `1px solid ${colors.border}`, fontSize: 11, color: colors.textSoft }}>
                      {m}
                    </span>
                  ))}
                </div>
                <p style={{ margin: 0, fontSize: 12.5, color: colors.textSoft, lineHeight: 1.55 }}>{t(`classesPage.${s.descriptionKey}`)}</p>
              </div>
            </Tile>
          ))}
        </div>
      </Section>
    </div>
  )
}
