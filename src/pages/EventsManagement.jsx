import { useMemo, useState } from 'react'
import { useLanguage } from '../i18n.jsx'
import { cn } from '../lib/cn.js'
import { Card, CardHeader, Badge, Button, PageHeader, EmptyState } from '../components/ui.jsx'
import { IconPlus, IconCalendar, IconTrash } from '../components/icons.jsx'
import { allEvents } from '../data/index.js'

const tagTone = {
  tagReligious: 'accent',
  tagAcademic: 'info',
  tagMeeting: 'purple',
  tagCultural: 'teal',
}

const tagLabels = {
  tagReligious: 'Religious',
  tagAcademic: 'Academic',
  tagMeeting: 'Meeting',
  tagCultural: 'Cultural',
}

export default function EventsManagement() {
  const { t } = useLanguage()
  const [events, setEvents] = useState(allEvents)
  const [adding, setAdding] = useState(false)

  const byTag = useMemo(() => {
    const c = { tagReligious: 0, tagAcademic: 0, tagMeeting: 0, tagCultural: 0 }
    events.forEach((e) => { c[e.tagKey] = (c[e.tagKey] || 0) + 1 })
    return c
  }, [events])

  const summary = [
    { label: t('eventsMgmt.totalEvents'), value: events.length, tone: 'border-t-pine' },
    { label: tagLabels.tagReligious, value: byTag.tagReligious, tone: 'border-t-sage' },
    { label: tagLabels.tagAcademic, value: byTag.tagAcademic, tone: 'border-t-info' },
    { label: tagLabels.tagCultural, value: byTag.tagCultural, tone: 'border-t-teal' },
  ]

  return (
    <div>
      <PageHeader
        title={t('eventsMgmt.title')}
        subtitle={t('eventsMgmt.subtitle')}
        actions={
          <Button icon={<IconPlus size={16} />} onClick={() => setAdding((v) => !v)}>Add Event</Button>
        }
      />

      <div className="mb-[18px] grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-[14px]">
        {summary.map((s) => (
          <Card key={s.label} pad={16} className={cn('border-t-[3px]', s.tone)}>
            <p className="m-0 text-[12px] font-semibold text-muted">{s.label}</p>
            <p className="mt-[6px] mb-0 text-[26px] font-extrabold text-ink">{s.value}</p>
          </Card>
        ))}
      </div>

      {adding && (
        <Card pad={18} className="mb-[18px] border-l-[3px] border-l-pine">
          <p className="m-0 text-[13.5px] text-muted">
            New event form goes here — select date, type and venue to schedule an event.
          </p>
          <div className="mt-3 flex gap-[10px]">
            <Button size="sm" tone="success" onClick={() => setAdding(false)}>{t('common.saved')}</Button>
            <Button size="sm" tone="ghost" onClick={() => setAdding(false)}>{t('common.cancel')}</Button>
          </div>
        </Card>
      )}

      <Card pad={18}>
        <CardHeader title={t('eventsPage.upcoming')} subtitle={`${events.length} ${t('eventsMgmt.totalEvents').toLowerCase()}`} />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3">
          {events.map((e) => (
            <div key={e.key} className="rounded-lg border border-line bg-surface-alt px-4 py-3.5">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-[42px] shrink-0 flex-col items-center justify-center rounded-md bg-pine-soft text-[13px] font-extrabold text-pine">
                  <IconCalendar size={15} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="m-0 text-[14px] font-bold text-ink">{t(e.titleKey)}</p>
                  <p className="mt-[2px] mb-0 text-[11.5px] text-muted">{e.date} · {e.time}</p>
                </div>
                <span className="rounded-full bg-info/10 px-[9px] py-[3px] text-[10.5px] font-bold text-info">
                  {tagLabels[e.tagKey]}
                </span>
              </div>
              <p className="mt-[10px] mb-0 text-[12.5px] leading-[1.5] text-body">{e.desc}</p>
              <div className="mt-3 flex items-center justify-between">
                <Badge tone={tagTone[e.tagKey] || 'neutral'}>{e.venue}</Badge>
                <Button size="sm" tone="outline" icon={<IconTrash size={13} />} onClick={() => setEvents((es) => es.filter((x) => x.key !== e.key))}>{t('common.delete')}</Button>
              </div>
            </div>
          ))}
        </div>
        {events.length === 0 && <EmptyState text={t('common.noResults')} />}
      </Card>
    </div>
  )
}
