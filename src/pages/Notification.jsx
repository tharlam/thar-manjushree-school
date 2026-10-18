import { useMemo, useState } from 'react'
import { useLanguage } from '../i18n.jsx'
import { cn } from '../lib/cn.js'
import { Card, CardHeader, Badge, Button, PageHeader, EmptyState } from '../components/ui.jsx'
import { IconBell } from '../components/icons.jsx'
import { notifications as seedNotifications } from '../data/index.js'

const toneMap = {
  info: 'info',
  success: 'success',
  accent: 'accent',
  warning: 'warning',
  purple: 'purple',
  teal: 'teal',
}

export default function Notification() {
  const { t } = useLanguage()
  const [items, setItems] = useState(() => seedNotifications.map((n) => ({ ...n, read: !!n.read })))

  const unread = items.filter((i) => !i.read).length
  const counts = useMemo(() => ({ total: items.length, unread }), [items, unread])

  const summary = [
    { label: t('header.notifications'), value: counts.total, tone: 'border-t-pine' },
    { label: t('notif.unread'), value: counts.unread, tone: 'border-t-warning' },
  ]

  const toggleRead = (id) => {
    setItems((it) => it.map((x) => (x.id === id ? { ...x, read: !x.read } : x)))
  }

  const markAll = () => setItems((it) => it.map((x) => ({ ...x, read: true })))

  return (
    <div>
      <PageHeader title={t('notif.title')} subtitle={t('notif.subtitle')} />

      <div className="mb-[18px] grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-[14px]">
        {summary.map((s) => (
          <Card key={s.label} pad={16} className={cn('border-t-[3px]', s.tone)}>
            <p className="m-0 text-[12px] font-semibold text-muted">{s.label}</p>
            <p className="mt-[6px] mb-0 text-[26px] font-extrabold text-ink">{s.value}</p>
          </Card>
        ))}
      </div>

      <Card pad={18}>
        <CardHeader
          title={t('header.notifications')}
          subtitle={`${unread} ${t('notif.unread')}`}
          right={<Button size="sm" tone="outline" onClick={markAll}>{t('notif.markRead')}</Button>}
        />
        <div className="flex flex-col">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleRead(item.id)}
              className={cn(
                'flex cursor-pointer items-center gap-3 rounded-md border-0 border-b border-line px-3 py-3 text-left font-sans',
                item.read ? 'bg-surface' : 'bg-pine-soft',
              )}
            >
              <span className="inline-flex size-[34px] shrink-0 items-center justify-center rounded-full bg-pine/[0.07] text-pine">
                <IconBell size={15} />
              </span>
              <div className="min-w-0 flex-1">
                <p className={cn('m-0 text-[13.5px] text-ink', item.read ? 'font-medium' : 'font-bold')}>{item.text}</p>
                <span className="text-[11.5px] text-muted">{item.time} ago</span>
              </div>
              <Badge tone={toneMap[item.tone] || 'neutral'}>{item.read ? t('common.none') : t('notif.unread')}</Badge>
              {!item.read && <span className="size-[9px] shrink-0 rounded-full bg-danger" />}
            </button>
          ))}
          {items.length === 0 && <EmptyState text={t('common.noResults')} />}
        </div>
      </Card>
    </div>
  )
}
