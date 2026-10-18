import { PageHero, Section } from './shared.jsx'
import { CardEyebrow, CardTitle, OpenCard } from '../../components/cards.jsx'
import { colors } from '../../theme.js'
import { useLanguage } from '../../i18n.jsx'

const levels = [
  {
    eyebrow: 'Level One',
    title: 'Pre-primary level (Class 4 to 6)',
    color: colors.primary,
    items: [
      'Tibetan language: Basic reading and writing.',
      'Basic English: Mathematics.',
      'Daily prayer, creative activities, physical activities.',
    ],
  },
  {
    eyebrow: 'Level Two',
    title: 'Primary level (Class 1 to 5)',
    color: colors.accent,
    items: [
      'Tibetan and English language, Math, Science, Social Studies.',
      'Introduction to Buddhist studies and ritual practices.',
    ],
  },
  {
    eyebrow: 'Level Three',
    title: 'Secondary level (Class 6 to 8)',
    color: colors.success,
    items: [
      'Advanced Tibetan grammar, English composition, Math, Science.',
      'Buddhist studies: Four Noble Truths, Eightfold Path.',
      'Ritual training: Torma, Puja, Sutra chanting.',
    ],
  },
]

export default function Curriculum() {
  const { t } = useLanguage()

  return (
    <div>
      <PageHero
        title="Our Approach to Education"
        subtitle="Combining traditional Buddhist historical practices with modern academic subjects, our curriculum nurtures the mind, heart, and spirit. We focus on wisdom, compassion, and service."
        kicker={t('curriculumPage.title')}
      />

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
