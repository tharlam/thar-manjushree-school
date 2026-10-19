import { usePage, PageHero, Section, Photo } from './shared.jsx'
import { CardEyebrow, CardTitle, CardBody, CheckList, LinkRow, OpenCard } from '../../components/cards.jsx'
import { colors } from '../../theme.js'

export default function Donations() {
  const f = usePage('donations')
  const introTitle = f('introTitle')
  const introBody = f('introBody')
  const bankTitle = f('bankTitle')
  const bankBody = f('bankBody')
  const transparencyTitle = f('transparencyTitle')
  const transparencyBody = f('transparencyBody')

  return (
    <div>
      <PageHero title={introTitle} subtitle={introBody} kicker={f('heroKicker')} />

      <Section title={f('waysToGiveTitle')}>
        <div className="grid items-start gap-9 lg:grid-cols-[1fr_360px] lg:gap-12">
          <div>
            <CardEyebrow>{f('givingOptionsEyebrow')}</CardEyebrow>
            <div className="mt-4.5">
              <LinkRow to="/contact" accent={colors.primary} cta={f('givingOption1Cta')}>
                <span className="block text-[11.5px] font-bold tracking-[1.4px] text-muted uppercase">{f('givingOption1Eyebrow')}</span>
                <span className="mt-1.5 block text-[15.5px] font-bold text-ink">{f('givingOption1Title')}</span>
                <span className="mt-[5px] block text-[13.5px] leading-[1.7] text-body">
                  {f('givingOption1Body')}
                </span>
                <span className="mt-2.5 inline-block text-[14.5px] font-extrabold text-pine">{f('givingOption1Amount')}</span>
              </LinkRow>

              <LinkRow to="/contact" accent={colors.gold} cta={f('givingOption2Cta')}>
                <span className="block text-[11.5px] font-bold tracking-[1.4px] text-muted uppercase">{f('givingOption2Eyebrow')}</span>
                <span className="mt-1.5 block text-[15.5px] font-bold text-ink">{f('givingOption2Title')}</span>
                <span className="mt-[5px] block text-[13.5px] leading-[1.7] text-body">
                  {f('givingOption2Body')}
                </span>
                <span className="mt-2.5 inline-block text-[14.5px] font-extrabold text-sage">{f('givingOption2Amount')}</span>
              </LinkRow>

              <LinkRow to="/contact" accent={colors.success} cta={f('givingOption3Cta')}>
                <span className="block text-[11.5px] font-bold tracking-[1.4px] text-muted uppercase">{f('givingOption3Eyebrow')}</span>
                <span className="mt-1.5 block text-[15.5px] font-bold text-ink">{f('givingOption3Title')}</span>
                <span className="mt-[5px] block text-[13.5px] leading-[1.7] text-body">
                  {f('givingOption3Body')}
                </span>
                <span className="mt-2.5 inline-block text-[14.5px] font-extrabold text-success">{f('givingOption3Amount')}</span>
              </LinkRow>
            </div>
          </div>

          <Photo
            src="/images/program-care.jpg"
            alt="The dining hall and dormitory at Thar Manjushree School"
            ratio="4 / 3"
            fallbackLabel="Ways to Give"
          />
        </div>
      </Section>

      <Section className="border-t border-line bg-surface-alt">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8">
          <OpenCard accent={colors.primary} hover>
            <CardEyebrow color={colors.primary}>{f('bankEyebrow')}</CardEyebrow>
            <CardTitle as="h3" className="mt-2.5 text-[17px]">{bankTitle}</CardTitle>
            <p className="mt-2.5 mb-0 text-[13.5px] leading-[1.75] text-body">{bankBody}</p>
            <div className="mt-4.5 border-t border-line pt-3.5 font-mono text-[12.5px] leading-[1.9] text-body">
              {f('bankDetailLine1')}<br />
              {f('bankDetailLine2')}<br />
              {f('bankDetailLine3')}<br />
              {f('bankDetailLine4')}<br />
              {f('bankDetailLine5')}
            </div>
          </OpenCard>

          <OpenCard accent={colors.accent} hover>
            <CardEyebrow color={colors.accent}>{f('donationStepsEyebrow')}</CardEyebrow>
            <CardTitle as="h3" className="mt-2.5 text-[17px]">{f('howToDonateTitle')}</CardTitle>
            <CheckList
              accent={colors.accent}
              ordered
              className="mt-4.5"
              items={[
                f('donationStepItem1'),
                f('donationStepItem2'),
                f('donationStepItem3'),
              ]}
            />
          </OpenCard>

          <OpenCard accent={colors.success} hover>
            <CardEyebrow color={colors.success}>{f('transparencyEyebrow')}</CardEyebrow>
            <CardTitle as="h3" className="mt-2.5 text-[17px]">{transparencyTitle}</CardTitle>
            <CardBody className="mt-2.5">{transparencyBody}</CardBody>
          </OpenCard>
        </div>
      </Section>
    </div>
  )
}
