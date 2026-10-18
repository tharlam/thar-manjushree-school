import { useMemo, useState } from 'react'
import { useLanguage } from '../../i18n.jsx'
import { colors } from '../../theme.js'
import { cn } from '../../lib/cn.js'
import { PageHero, Section } from './shared.jsx'
import { CardEyebrow, OpenCard } from '../../components/cards.jsx'
import { allEvents } from '../../data/index.js'

const tagTone = {
  tagReligious: colors.accent,
  tagAcademic: colors.info,
  tagMeeting: colors.purple,
  tagCultural: colors.teal,
}

const tagLabels = {
  tagReligious: 'Religious',
  tagAcademic: 'Academic',
  tagMeeting: 'Meeting',
  tagCultural: 'Cultural',
}

const categories = ['all', 'tagReligious', 'tagAcademic', 'tagMeeting', 'tagCultural']

export default function Events() {
  const { t } = useLanguage()
  const [active, setActive] = useState('all')

  const events = useMemo(() => (active === 'all' ? allEvents : allEvents.filter((e) => e.tagKey === active)), [active])

  return (
    <div>
      <PageHero title={t('eventsPage.title')} subtitle={t('eventsPage.subtitle')} kicker={t('site.nav.events')} />

      <Section>
        <div className="mx-auto mb-[26px] flex max-w-[820px] flex-col gap-3.5">
          <p className="m-0 text-[14.5px] leading-[1.8] text-body">
            Monks assemble at the main temple and stupa courtyard to observe major Tibetan Buddhist feast days and other important occasions in the valley. These days are so special that they mark the sanctuary&apos;s spiritual heartbeat. The school also stages its own festivals and events.
          </p>
          <p className="m-0 text-[14.5px] leading-[1.8] text-body">
            Additionally, an annual Thangka Artist Workshop brings master artists from Nepal&apos;s northern regions and from India to the school.
          </p>
        </div>

        <div className="mb-[26px] flex flex-wrap justify-center gap-2">
          {categories.map((cat) => {
            const isActive = active === cat
            const label = cat === 'all' ? t('galleryPage.all') : tagLabels[cat]
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={cn(
                  'cursor-pointer rounded-full border px-[18px] py-2 text-[12.5px] font-bold transition-all duration-150',
                  isActive ? 'border-pine bg-pine text-white' : 'border-line bg-surface text-body',
                )}
              >
                {label}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-10 gap-y-1">
          {events.map((e) => (
            <OpenCard key={e.key} accent={tagTone[e.tagKey]} hover>
              <div className="flex items-center gap-3.5">
                <span
                  className="inline-flex w-[52px] shrink-0 flex-col items-center justify-center border-y-2 py-1.5"
                  style={{ borderColor: tagTone[e.tagKey], color: tagTone[e.tagKey] }}
                >
                  <span className="font-heading text-lg leading-none font-bold">{e.date.split(' ')[0]}</span>
                  <span className="text-[10px] font-extrabold tracking-[1px] uppercase">{e.date.split(' ')[1]}</span>
                </span>
                <div className="min-w-0 flex-1">
                  <CardEyebrow color={tagTone[e.tagKey]}>{tagLabels[e.tagKey]}</CardEyebrow>
                  <p className="mt-2 mb-0 font-heading text-[15px] font-bold text-ink">{t(e.titleKey)}</p>
                  <p className="mt-1 mb-0 text-[11.5px] font-bold tracking-[0.6px] text-muted uppercase">
                    {e.time} · 📍 {e.venue}
                  </p>
                </div>
              </div>
              <p className="mt-3.5 mb-0 text-[12.75px] leading-[1.72] text-body">{e.desc}</p>
            </OpenCard>
          ))}
        </div>
      </Section>
    </div>
  )
}
