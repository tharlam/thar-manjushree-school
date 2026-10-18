import { useMemo } from 'react'
import { useLanguage } from '../i18n.jsx'
import { cn } from '../lib/cn.js'
import { Card, CardHeader, Badge, PageHeader } from '../components/ui.jsx'
import { IconMonks, IconShield } from '../components/icons.jsx'
import { houses, houseEvents, monks } from '../data/index.js'

export default function HouseManagement() {
  const { t } = useLanguage()

  const houseCounts = useMemo(() => {
    const byId = Object.fromEntries(houses.map((h) => [h.id, 0]))
    monks.forEach((m) => {
      const letter = m.id ? (m.id.match(/^TM-(\d)/) || [])[1] : null
      if (letter && byId[letter] !== undefined) byId[letter] += 1
    })
    return byId
  }, [])

  const totalMembers = houses.reduce((s, h) => s + h.members, 0)
  const summary = [
    { label: t('houseMgmt.totalHouses'), value: houses.length, tone: 'border-t-pine' },
    { label: t('houseMgmt.totalMembers'), value: totalMembers, tone: 'border-t-sage' },
    { label: 'Inter-House Events', value: houseEvents.length, tone: 'border-t-info' },
  ]

  const houseLabel = (id) => (houses.find((h) => h.id === id) || {}).name || id

  return (
    <div>
      <PageHeader title={t('houseMgmt.title')} subtitle={t('houseMgmt.subtitle')} />

      <div className="mb-[18px] grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-[14px]">
        {summary.map((s) => (
          <Card key={s.label} pad={16} className={cn('border-t-[3px]', s.tone)}>
            <p className="m-0 text-[12px] font-semibold text-muted">{s.label}</p>
            <p className="mt-[6px] mb-0 text-[26px] font-extrabold text-ink">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="mb-[18px] grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[14px]">
        {houses.map((h) => (
          <Card key={h.id} pad={18} style={{ borderTop: `4px solid ${h.color}` }}>
            <div className="flex items-center gap-3">
              <span
                className="inline-flex size-[44px] items-center justify-center rounded-md text-[14px] font-extrabold"
                style={{ background: `${h.color}1A`, color: h.color }}
              >
                {h.id}
              </span>
              <div className="flex-1">
                <p className="m-0 text-[15px] font-extrabold text-ink">{h.name}</p>
                <p className="mt-[2px] mb-0 text-[12px] text-muted">{h.patron}</p>
              </div>
              <span
                className="rounded-full px-[10px] py-[3px] text-[12px] font-extrabold"
                style={{ background: `${h.color}1A`, color: h.color }}
              >
                {h.members + (houseCounts[h.id] || 0)}
              </span>
            </div>
            <div className="mt-3 flex flex-col gap-[6px]">
              <p className="m-0 text-[12.5px] text-body">
                <IconMonks size={13} /> {t('housesPage.captain')}: <b>{h.captain}</b>
              </p>
              <p className="m-0 text-[12.5px] text-body">
                <IconShield size={13} /> {t('housesPage.motto')}: <b>{h.motto}</b>
              </p>
            </div>
          </Card>
        ))}
      </div>

      <Card pad={18}>
        <CardHeader title={t('housesPage.eventsTitle')} />
        <div className="overflow-x-auto rounded-md border border-line">
          <table className="w-full min-w-[640px] border-collapse text-[13px]">
            <thead>
              <tr className="bg-surface-alt">
                {[t('common.name'), t('housesPage.patron'), t('common.date'), 'Type', t('common.status')].map((h) => (
                  <th key={h} className="px-[12px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[0.4px] text-muted">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {houseEvents.map((e) => (
                <tr key={e.id} className="border-t border-line bg-surface">
                  <td className="px-[12px] py-[11px] font-semibold text-ink">{e.name}</td>
                  <td className="px-[12px] py-[11px] text-body">{houseLabel(e.house)}</td>
                  <td className="whitespace-nowrap px-[12px] py-[11px] text-body">{e.date}</td>
                  <td className="px-[12px] py-[11px] text-body">{e.type}</td>
                  <td className="px-[12px] py-[11px]">
                    <Badge tone="success" dot>
                      {e.winner}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
