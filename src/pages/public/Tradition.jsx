import { useField, PageHero, Section } from './shared.jsx'
import { CardBody, CardEyebrow, StatBand } from '../../components/cards.jsx'
import { colors } from '../../theme.js'
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
        <div className="relative mx-auto flex max-w-[760px] flex-col">
          <span aria-hidden="true" className="absolute top-4 bottom-4 left-[63px] w-px bg-line" />
          {milestones.map((m) => (
            <div key={m.key} className="relative flex items-center gap-5 py-[9px]">
              <span className="relative z-[1] min-w-[66px] bg-mint px-2 py-[7px] text-center font-heading text-sm font-bold whitespace-nowrap text-sage">
                {m.year}
              </span>
              <div className="flex-1 border-b border-l border-line py-3.5 pl-[22px]">
                <CardEyebrow color={colors.gold}>Milestone</CardEyebrow>
                <CardBody className="mt-2">{translations[m.key]?.[lang] || translations[m.key]?.en || m.text}</CardBody>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title={philosophyTitle} subtitle={philosophyBody} className="border-t border-line bg-surface-alt">
        <div className="mx-auto max-w-[760px]">
          <CardEyebrow>Three Trainings</CardEyebrow>
          <StatBand
            className="mt-[22px]"
            stats={[
              { value: 'Śīla', label: 'Discipline & Ethics', color: colors.primary },
              { value: 'Samādhi', label: 'Meditation & Focus', color: colors.accent },
              { value: 'Prajñā', label: 'Wisdom & Insight', color: colors.success },
            ]}
          />
        </div>
      </Section>
    </div>
  )
}
