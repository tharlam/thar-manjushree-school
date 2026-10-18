import { useField, PageHero, Section, Photo } from './shared.jsx'
import { CardEyebrow, CardTitle, CardBody, CheckList, LinkRow, OpenCard } from '../../components/cards.jsx'
import { colors } from '../../theme.js'
import { useLanguage } from '../../i18n.jsx'

export default function Donations() {
  const { t } = useLanguage()
  const introTitle = useField('donations', 'introTitle')
  const introBody = useField('donations', 'introBody')
  const bankTitle = useField('donations', 'bankTitle')
  const bankBody = useField('donations', 'bankBody')
  const transparencyTitle = useField('donations', 'transparencyTitle')
  const transparencyBody = useField('donations', 'transparencyBody')

  return (
    <div>
      <PageHero title={introTitle} subtitle={introBody} kicker={t('donationsPage.title')} />

      <Section title="Ways to Give">
        <div className="grid items-start gap-9 lg:grid-cols-[1fr_360px] lg:gap-12">
          <div>
            <CardEyebrow>Choose Your Gift</CardEyebrow>
            <div className="mt-4.5">
              <LinkRow to="/contact" accent={colors.primary} cta="Sponsor">
                <span className="block text-[11.5px] font-bold tracking-[1.4px] text-muted uppercase">Guardian Circle</span>
                <span className="mt-1.5 block text-[15.5px] font-bold text-ink">The Monthly Food Guarantee</span>
                <span className="mt-[5px] block text-[13.5px] leading-[1.7] text-body">
                  Our most popular sponsorship — a stable daily meal program for eight young monks, with vegetables, proteins, fruit and warm drinks.
                </span>
                <span className="mt-2.5 inline-block text-[14.5px] font-extrabold text-pine">Rs. 1,500 / month</span>
              </LinkRow>

              <LinkRow to="/contact" accent={colors.gold} cta="Offer">
                <span className="block text-[11.5px] font-bold tracking-[1.4px] text-muted uppercase">Sangha Feast Offering</span>
                <span className="mt-1.5 block text-[15.5px] font-bold text-ink">One-Time Feast for All</span>
                <span className="mt-[5px] block text-[13.5px] leading-[1.7] text-body">
                  Feed every one of our students lunch for a day, in the monastery courtyard, with full merit dedication.
                </span>
                <span className="mt-2.5 inline-block text-[14.5px] font-extrabold text-sage">Rs. 25,000 (Optional)</span>
              </LinkRow>

              <LinkRow to="/contact" accent={colors.success} cta="Give">
                <span className="block text-[11.5px] font-bold tracking-[1.4px] text-muted uppercase">Brick &amp; Mortar Fund</span>
                <span className="mt-1.5 block text-[15.5px] font-bold text-ink">One-Time, Flexible</span>
                <span className="mt-[5px] block text-[13.5px] leading-[1.7] text-body">
                  The monastery is ancient. Every gift protects the safety, integrity and beauty of our old buildings and new classrooms.
                </span>
                <span className="mt-2.5 inline-block text-[14.5px] font-extrabold text-success">Any amount</span>
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
            <CardEyebrow color={colors.primary}>Direct Transfer</CardEyebrow>
            <CardTitle as="h3" className="mt-2.5 text-[17px]">{bankTitle}</CardTitle>
            <p className="mt-2.5 mb-0 text-[13.5px] leading-[1.75] text-body">{bankBody}</p>
            <div className="mt-4.5 border-t border-line pt-3.5 font-mono text-[12.5px] leading-[1.9] text-body">
              Account Name: Thar Manjushree School<br />
              Bank: Nepal Rastra Bank, Kathmandu<br />
              Account No: 010-202-4460-1964<br />
              SWIFT: NRBLNPKT<br />
              Branch: Boudhanath
            </div>
          </OpenCard>

          <OpenCard accent={colors.accent} hover>
            <CardEyebrow color={colors.accent}>Three Steps</CardEyebrow>
            <CardTitle as="h3" className="mt-2.5 text-[17px]">How to Donate</CardTitle>
            <CheckList
              accent={colors.accent}
              ordered
              className="mt-4.5"
              items={[
                "Transfer your offering to the bank account listed here, or scan the school's QR code at the front desk.",
                'Note your name and purpose (e.g. donation, sponsorship, fee support) in the transfer remark.',
                'Email or message us the transfer receipt so we can confirm and issue a record of thanks.',
              ]}
            />
          </OpenCard>

          <OpenCard accent={colors.success} hover>
            <CardEyebrow color={colors.success}>Our Promise</CardEyebrow>
            <CardTitle as="h3" className="mt-2.5 text-[17px]">{transparencyTitle}</CardTitle>
            <CardBody className="mt-2.5">{transparencyBody}</CardBody>
          </OpenCard>
        </div>
      </Section>
    </div>
  )
}
