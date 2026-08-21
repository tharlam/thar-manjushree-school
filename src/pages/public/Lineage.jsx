import { useField, PageHero, Section, Tile } from './shared.jsx'
import { colors, radii } from '../../theme.js'
import { useLanguage } from '../../i18n.jsx'
import { classes } from '../../data/index.js'

const lineageSteps = [
  { label: 'Sakyamuni Buddha', sub: 'The Founder of the Teaching', color: colors.primary },
  { label: 'Nalanda Masters', sub: 'Nagārjuna · Āryadeva · Dharmakīrti', color: colors.primaryDark },
  { label: 'Tibetan Lineages', sub: 'Kagyu & Gelug traditions', color: colors.accent },
  { label: 'Tharlam Rinpoche', sub: 'Founder of Thar Manjushree', color: colors.primary },
  { label: 'Our Teachers Today', sub: 'Geshes & Khenpos of the community', color: colors.success },
]

export default function Lineage() {
  const { t } = useLanguage()
  const introTitle = useField('lineage', 'introTitle')
  const introBody = useField('lineage', 'introBody')
  const mastersTitle = useField('lineage', 'mastersTitle')
  const mastersBody = useField('lineage', 'mastersBody')

  const masters = [...new Map(classes.map((c) => [c.teacher, c])).values()]

  return (
    <div>
      <PageHero title={introTitle} subtitle={introBody} kicker={t('lineagePage.title')} />

      <Section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 640, margin: '0 auto' }}>
          {lineageSteps.map((s, i) => (
            <div key={s.label} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ width: 34, height: 34, borderRadius: '50%', background: s.color, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800 }}>
                  {i + 1}
                </span>
                {i < lineageSteps.length - 1 && <span style={{ width: 2, flex: 1, minHeight: 26, background: colors.border }} />}
              </div>
              <div style={{ flex: 1, padding: '8px 0' }}>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: colors.text }}>{s.label}</p>
                <p style={{ margin: '2px 0 0', fontSize: 12.5, color: colors.muted }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title={mastersTitle} subtitle={mastersBody} style={{ background: colors.surfaceAlt, borderTop: `1px solid ${colors.border}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
          {masters.map((c) => (
            <Tile key={c.teacher} style={{ display: 'flex', alignItems: 'center', gap: 12, borderLeft: `4px solid ${c.color}` }}>
              <span style={{ width: 44, height: 44, borderRadius: '50%', background: `${c.color}1A`, color: c.color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>
                {c.teacher.split(' ').map((p) => p[0]).slice(0, 2).join('')}
              </span>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: colors.text }}>{c.teacher}</p>
                <p style={{ margin: '3px 0 0', fontSize: 12, color: colors.muted }}>{c.name} · {c.room}</p>
              </div>
              <span style={{ padding: '2px 9px', borderRadius: radii.round, background: colors.primarySoft, color: colors.primary, fontSize: 10.5, fontWeight: 700, whiteSpace: 'nowrap' }}>{t('statuses.active')}</span>
            </Tile>
          ))}
        </div>
      </Section>
    </div>
  )
}
