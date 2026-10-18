import { useMemo, useState } from 'react'
import { useLanguage } from '../i18n.jsx'
import { cn } from '../lib/cn.js'
import { Card, CardHeader, Badge, Button, PageHeader, EmptyState, statusTone } from '../components/ui.jsx'
import { IconCheck, IconX, IconUser, IconSearch } from '../components/icons.jsx'
import { useAppStore } from '../store.jsx'
import { classes } from '../data/index.js'

export default function AdmissionManagement() {
  const { t } = useLanguage()
  const { admissions, setAdmissionStatus, addMonk } = useAppStore()
  const [query, setQuery] = useState('')

  const classesById = useMemo(() => new Map(classes.map((c) => [c.id, c])), [])
  const classLabel = (id) => (classesById.get(id) || {}).name || id || '—'

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return admissions.filter((a) => !q || a.name.toLowerCase().includes(q) || (a.phone || '').toLowerCase().includes(q))
  }, [admissions, query])

  const counts = useMemo(() => ({
    total: admissions.length,
    pending: admissions.filter((a) => a.status === 'pending').length,
    approved: admissions.filter((a) => a.status === 'approved').length,
    declined: admissions.filter((a) => a.status === 'declined').length,
  }), [admissions])

  const approve = (a) => {
    addMonk({
      name: a.name,
      classId: a.classRequested || classes[0]?.id || '',
      guardian: a.guardian || '',
      status: 'enrolled',
      joined: a.submittedAt || new Date().toISOString().slice(0, 10),
      feeBalance: 0,
      attendanceRate: 0,
      sponsor: a.sponsor || '',
      contact: a.phone || a.email || '',
    })
    setAdmissionStatus(a.id, 'approved')
  }

  const summary = [
    { label: t('admMgmt.total'), value: counts.total, tone: 'border-t-pine' },
    { label: t('admMgmt.pending'), value: counts.pending, tone: 'border-t-warning' },
    { label: t('admMgmt.approved'), value: counts.approved, tone: 'border-t-success' },
    { label: t('admMgmt.declined'), value: counts.declined, tone: 'border-t-danger' },
  ]

  return (
    <div>
      <PageHeader title={t('admMgmt.title')} subtitle={t('admMgmt.subtitle')} />

      <div className="mb-4.5 grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3.5">
        {summary.map((s) => (
          <Card key={s.label} pad={16} className={cn('border-t-[3px]', s.tone)}>
            <p className="m-0 text-[12px] font-semibold text-muted">{s.label}</p>
            <p className="mt-1.5 mb-0 text-[26px] font-extrabold text-ink">{s.value}</p>
          </Card>
        ))}
      </div>

      {counts.pending > 0 && (
        <Card pad={18} className="mb-4.5 border-l-[3px] border-l-warning">
          <CardHeader title={`${t('admMgmt.pending')} · ${counts.pending}`} />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3">
            {admissions.filter((a) => a.status === 'pending').map((a) => (
              <div key={a.id} className="rounded-md border border-line bg-surface-alt px-3.5 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex size-[34px] items-center justify-center rounded-full bg-warning-soft text-[11px] font-extrabold text-warning">
                    {a.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="m-0 text-[13.5px] font-bold text-ink">{a.name}</p>
                    <p className="mt-0.5 mb-0 text-[11.5px] text-muted">
                      {classLabel(a.classRequested)} · {a.submittedAt}
                    </p>
                  </div>
                </div>
                <p className="mt-2.5 mb-0 text-[12px] text-body">
                  {a.guardian && <span>Guardian: {a.guardian} · </span>}
                  {a.phone || a.email || ''}
                </p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" tone="success" icon={<IconCheck size={14} />} onClick={() => approve(a)}>{t('common.add')}</Button>
                  <Button size="sm" tone="danger" icon={<IconX size={14} />} onClick={() => setAdmissionStatus(a.id, 'declined')}>{t('roster.decline')}</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card pad={18}>
        <div className="mb-4 flex items-center gap-3">
          <div className="relative max-w-[360px] flex-1">
            <span className="absolute top-1/2 left-3 inline-flex -translate-y-1/2 text-muted">
              <IconSearch size={15} />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('common.searchName')}
              className="w-full rounded-md border border-line bg-surface-alt py-[9px] pr-3.5 pl-9 text-[13px] font-sans text-ink outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-md border border-line">
          <table className="w-full min-w-[720px] border-collapse text-[13px]">
            <thead>
              <tr className="bg-surface-alt">
                {[t('common.name'), t('roster.id'), t('common.className'), t('roster.guardian'), t('admissionsPage.phone'), t('roster.joined'), t('common.status')].map((h) => (
                  <th key={h} className="px-3 py-2.5 text-left text-[11px] font-bold tracking-[0.4px] whitespace-nowrap text-muted uppercase">{h}</th>
                ))}
                <th className="w-[90px]">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-t border-line bg-surface">
                  <td className="px-3 py-[11px] font-semibold whitespace-nowrap text-ink">
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-flex size-7 items-center justify-center rounded-full bg-pine-soft text-[10px] font-extrabold text-pine">
                        {a.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                      </span>
                      {a.name}
                    </span>
                  </td>
                  <td className="px-3 py-[11px] font-bold whitespace-nowrap text-pine">{a.id}</td>
                  <td className="px-3 py-[11px] text-body">{classLabel(a.classRequested)}</td>
                  <td className="px-3 py-[11px] text-body">{a.guardian || '—'}</td>
                  <td className="px-3 py-[11px] text-body">{a.phone || a.email || '—'}</td>
                  <td className="px-3 py-[11px] whitespace-nowrap text-body">{a.submittedAt}</td>
                  <td className="px-3 py-[11px]">
                    <Badge tone={statusTone(a.status)} dot>{a.status}</Badge>
                  </td>
                  <td className="px-3 py-[11px]">
                    {a.status === 'pending' ? (
                      <div className="flex gap-1.5">
                        <Button size="sm" tone="success" onClick={() => approve(a)}><IconCheck size={14} /></Button>
                        <Button size="sm" tone="danger" onClick={() => setAdmissionStatus(a.id, 'declined')}><IconX size={14} /></Button>
                      </div>
                    ) : (
                      <span className={cn('inline-flex items-center gap-[5px] text-[12px]', a.status === 'approved' ? 'text-success' : 'text-danger')}>
                        <IconUser size={13} /> {a.status === 'approved' ? t('admMgmt.approved') : t('admMgmt.declined')}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <EmptyState text={t('common.noResults')} />}
        </div>
      </Card>
    </div>
  )
}
