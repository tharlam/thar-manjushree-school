import { useField, PageHero, Section } from './shared.jsx'
import { CardBody, CardEyebrow, CardTitle, StatBand } from '../../components/cards.jsx'
import { useLanguage } from '../../i18n.jsx'

export default function Founder() {
  const { t } = useLanguage()
  const name = useField('founder', 'name')
  const title = useField('founder', 'title')
  const bioTitle = useField('founder', 'bioTitle')
  const bioBody = useField('founder', 'bioBody')
  const visionTitle = useField('founder', 'visionTitle')
  const visionBody = useField('founder', 'visionBody')

  const facts = [
    { value: '1964', label: t('settingsPage.established') },
    { value: '142+', label: t('homePage.statMonks') },
    { value: '7', label: t('classesPage.credits') },
    { value: '3', label: t('settingsPage.defaultLang') },
  ]

  return (
    <div>
      <PageHero title={name} subtitle={title} kicker={t('founderPage.title')} />

      <Section>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-center gap-11">
          <div className="flex min-h-[300px] flex-col items-center justify-center gap-1.5 rounded-lg bg-[linear-gradient(150deg,var(--color-ink)_0%,var(--color-pine)_100%)] p-7 text-center text-white">
            <span className="text-[60px] leading-none opacity-[0.92]">☸</span>
            <span className="font-heading text-[17px] font-bold">{name}</span>
            <span className="text-xs text-sage-light">{title}</span>
          </div>

          <div>
            <CardEyebrow>Life &amp; Service</CardEyebrow>
            <CardTitle as="h3" className="mt-2.5 text-[20px]">{bioTitle}</CardTitle>
            <CardBody className="mt-3 text-[14.5px]">{bioBody}</CardBody>
          </div>
        </div>
      </Section>

      <Section title={visionTitle} subtitle={visionBody} className="border-t border-line bg-surface-alt">
        <StatBand stats={facts} className="mx-auto max-w-[860px]" />
      </Section>
    </div>
  )
}
