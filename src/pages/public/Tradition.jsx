import { useField, PageHero, Section, Tile } from './shared.jsx'
import { colors, radii } from '../../theme.js'
import { useLanguage } from '../../i18n.jsx'

const milestones = [
  { year: '1964', key: 'm1', text: 'School founded with a handful of students in a single prayer hall.' },
  { year: '1982', key: 'm2', text: 'First full class of monks completes the five great treatises curriculum.' },
  { year: '2001', key: 'm3', text: 'Modern academic wing opens with certified teachers for English, science and mathematics.' },
  { year: '2015', key: 'm4', text: 'Monastery library expands to over 10,000 texts in Tibetan, Sanskrit and English.' },
  { year: '2026', key: 'm5', text: 'Today our community continues to serve young monks from across the Himalayan region.' },
]

const translations = {
  m1: { en: 'School founded with a handful of students in a single prayer hall.', ne: 'एकल प्रार्थना कक्षमा थोरै विद्यार्थीसहित विद्यालयको स्थापना।', bo: 'མཆོད་ཁང་གཅིག་ཏུ་སློབ་མ་ཉུང་ཤས་ཤིག་དང་བཅས་སློབ་གྲྭ་བཙུགས།' },
  m2: { en: 'First full class of monks completes the five great treatises curriculum.', ne: 'भिक्षुहरूको पहिलो पूर्ण कक्षाले पाँच महान् ग्रन्थहरूको पाठ्यक्रम पूरा गर्छ।', bo: 'གྲྭ་བ་ཚོགས་པ་ཐོག་མ་གཅིག་གིས་གཞུང་ཆེན་ལྔའི་སློབ་གཉེར་མཇུག་སྒྲིལ།' },
  m3: { en: 'Modern academic wing opens with certified teachers for English, science and mathematics.', ne: 'अंग्रेजी, विज्ञान र गणितका प्रमाणित शिक्षकसहित आधुनिक शैक्षिक भवन खुल्छ।', bo: 'དབྱིན་ཡིག་དང་། ཚན་རིག། རྩིས་རིག་བཅས་ཀྱི་ལས་གནས་དགེ་རྒན་དང་བཅས་དེང་རབས་སློབ་ཁང་ཕྱེ།' },
  m4: { en: 'Monastery library expands to over 10,000 texts in Tibetan, Sanskrit and English.', ne: 'मठ पुस्तकालय तिब्बती, संस्कृत र अंग्रेजीमा १०,००० भन्दा बढी ग्रन्थसहित विस्तार हुन्छ।', bo: 'དགོན་སྡེའི་དཔེ་མཛོད་བོད་ཡིག་དང་། ལེགས་སྦྱར། དབྱིན་ཡིག་བཅས་ཀྱི་དཔེ་ཆ་ཁྲི་ལྷག་བར་རྒྱ་བསྐྱེད།' },
  m5: { en: 'Today our community continues to serve young monks from across the Himalayan region.', ne: 'आज हाम्रो समुदायले हिमाली क्षेत्रभरका युवा भिक्षुहरूको सेवा जारी राख्छ।', bo: 'དེ་རིང་ང་ཚོའི་སྡེ་ཚོགས་ཀྱིས་ཧི་མ་ལ་ཡའི་ས་ཁུལ་ཡོངས་ནས་ཕེབས་པའི་གྲྭ་བ་གཞོན་ནུ་རྣམས་ལ་ཞབས་ཞུ་རྒྱུན་སྐྱོང་བྱེད་བཞིན་ཡོད།' },
}

export default function Tradition() {
  const { lang } = useLanguage()
  const introTitle = useField('tradition', 'introTitle')
  const introBody = useField('tradition', 'introBody')
  const historyTitle = useField('tradition', 'historyTitle')
  const historyBody = useField('tradition', 'historyBody')
  const philosophyTitle = useField('tradition', 'philosophyTitle')
  const philosophyBody = useField('tradition', 'philosophyBody')

  return (
    <div>
      <PageHero title={introTitle} subtitle={introBody} kicker="Mahayana · Nalanda Lineage" />

      <Section title={historyTitle} subtitle={historyBody}>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 0, margin: '0 auto', maxWidth: 760 }}>
          <span style={{ position: 'absolute', left: 61, top: 12, bottom: 12, width: 2, background: colors.border }} />
          {milestones.map((m) => (
            <div key={m.key} style={{ position: 'relative', display: 'flex', gap: 20, alignItems: 'center', padding: '10px 0' }}>
              <span style={{ position: 'relative', zIndex: 1, minWidth: 64, textAlign: 'center', padding: '7px 8px', borderRadius: radii.md, background: colors.primarySoft, color: colors.primary, fontSize: 12.5, fontWeight: 800, whiteSpace: 'nowrap' }}>
                {m.year}
              </span>
              <Tile style={{ flex: 1, padding: 14 }}>
                <p style={{ margin: 0, fontSize: 13.5, color: colors.textSoft, lineHeight: 1.55 }}>{translations[m.key]?.[lang] || translations[m.key]?.en || m.text}</p>
              </Tile>
            </div>
          ))}
        </div>
      </Section>

      <Section title={philosophyTitle} subtitle={philosophyBody} style={{ background: colors.surfaceAlt, borderTop: `1px solid ${colors.border}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
          {[
            { label: 'Śīla', sub: 'Discipline & Ethics' },
            { label: 'Samādhi', sub: 'Meditation & Focus' },
            { label: 'Prajñā', sub: 'Wisdom & Insight' },
          ].map((t) => (
            <Tile key={t.label} style={{ textAlign: 'center', borderTop: `3px solid ${colors.accent}` }}>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: colors.primary }}>{t.label}</p>
              <p style={{ margin: '6px 0 0', fontSize: 12.5, color: colors.muted }}>{t.sub}</p>
            </Tile>
          ))}
        </div>
      </Section>
    </div>
  )
}
