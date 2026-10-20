import { useMemo, useState } from 'react'
import { useLanguage } from '../i18n.jsx'
import { cn } from '../lib/cn.js'
import { Card, Badge, Button, PageHeader, EmptyState, statusTone } from '../components/ui.jsx'
import { IconCheck, IconX, IconUser, IconSearch } from '../components/icons.jsx'
import { useAppStore } from '../store.jsx'
import { classes } from '../data/index.js'

const searchInput =
  'min-h-11 w-full rounded-md border border-line bg-surface-alt py-2.5 pr-3.5 pl-10 text-[14px] font-sans text-ink outline-none transition-[border-color,box-shadow] focus:border-brand-500 focus:ring-2 focus:ring-brand-500'

const initials = (name) =>
  (name || '?')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

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

  const counts = useMemo(
    () => ({
      total: admissions.length,
      pending: admissions.filter((a) => a.status === 'pending').length,
      approved: admissions.filter((a) => a.status === 'approved').length,
      declined: admissions.filter((a) => a.status === 'declined').length,
    }),
    [admissions],
  )

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

  const decline = (a) => setAdmissionStatus(a.id, 'declined')

  const summary = [
    { label: t('admMgmt.total'), value: counts.total, tone: 'border-t-pine' },
    { label: t('admMgmt.pending'), value: counts.pending, tone: 'border-t-warning' },
    { label: t('admMgmt.approved'), value: counts.approved, tone: 'border-t-success' },
    { label: t('admMgmt.declined'), value: counts.declined, tone: 'border-t-danger' },
  ]

  return (
    <div>
      <PageHeader title={t('admMgmt.title')} subtitle={t('admMgmt.subtitle')} />

      <div className="mb-4.5 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        {summary.map((s) => (
          <Card key={s.label} pad={16} className={cn('border-t-[3px]', s.tone)}>
            <p className="m-0 text-[12px] font-semibold text-muted">{s.label}</p>
            <p className="mt-1.5 mb-0 text-[26px] font-extrabold text-ink">{s.value}</p>
          </Card>
        ))}
      </div>

      <Card pad={18}>
        <div className="relative mb-4 w-full sm:max-w-[380px]">
          <span className="absolute top-1/2 left-3 inline-flex -translate-y-1/2 text-muted">
            <IconSearch size={16} />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('common.searchName')}
            aria-label={t('common.searchName')}
            className={searchInput}
          />
        </div>

        {/* Mobile (<768px): vertical card stack with thumb-friendly actions */}
        <ul className="m-0 flex list-none flex-col gap-3 p-0 md:hidden">
          {filtered.map((a) => (
            <li key={a.id} className="rounded-lg border border-line bg-surface p-4 shadow-card">
              <div className="flex items-start gap-3">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-pine-soft text-[12px] font-extrabold text-pine">
                  {initials(a.name)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="m-0 truncate text-[15px] font-bold text-ink">{a.name}</p>
                  <p className="mt-0.5 mb-0 text-[12.5px] text-muted">
                    {t('common.date')} · {a.submittedAt}
                  </p>
                </div>
                <Badge tone={statusTone(a.status)} dot>
                  {a.status}
                </Badge>
              </div>

              <dl className="mt-3.5 mb-0 grid grid-cols-2 gap-x-3 gap-y-2.5 text-[12.5px]">
                <div>
                  <dt className="text-muted">{t('common.className')}</dt>
                  <dd className="m-0 font-semibold text-ink">{classLabel(a.classRequested)}</dd>
                </div>
                <div>
                  <dt className="text-muted">{t('roster.guardian')}</dt>
                  <dd className="m-0 truncate font-semibold text-ink">{a.guardian || '—'}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-muted">{t('admissionsPage.phone')}</dt>
                  <dd className="m-0 break-words font-semibold text-ink">{a.phone || a.email || '—'}</dd>
                </div>
              </dl>

              {a.status === 'pending' ? (
                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  <Button
                    size="lg"
                    tone="success"
                    icon={<IconCheck size={16} />}
                    onClick={() => approve(a)}
                    className="min-h-11 w-full"
                  >
                    {t('roster.approve')}
                  </Button>
                  <Button
                    size="lg"
                    tone="danger"
                    icon={<IconX size={16} />}
                    onClick={() => decline(a)}
                    className="min-h-11 w-full"
                  >
                    {t('roster.decline')}
                  </Button>
                </div>
              ) : (
                <p
                  className={cn(
                    'mt-4 mb-0 flex items-center gap-1.5 text-[12.5px] font-semibold',
                    a.status === 'approved' ? 'text-success' : 'text-danger',
                  )}
                >
                  <IconUser size={14} />
                  {a.status === 'approved' ? t('admMgmt.approved') : t('admMgmt.declined')}
                </p>
              )}
            </li>
          ))}
          {filtered.length === 0 && <EmptyState text={t('common.noResults')} />}
        </ul>

        {/* Desktop (>=768px): standard data table */}
        <div className="hidden overflow-x-auto rounded-md border border-line md:block">
          <table className="w-full min-w-[720px] border-collapse text-[13px]">
            <thead>
              <tr className="bg-surface-alt">
                {[
                  t('common.name'),
                  t('roster.id'),
                  t('common.className'),
                  t('roster.guardian'),
                  t('admissionsPage.phone'),
                  t('common.date'),
                  t('common.status'),
                ].map((h) => (
                  <th
                    key={h}
                    className="px-3 py-2.5 text-left text-[11px] font-bold tracking-[0.4px] whitespace-nowrap text-muted uppercase"
                  >
                    {h}
                  </th>
                ))}
                <th className="w-[110px] px-3 py-2.5 text-right text-[11px] font-bold tracking-[0.4px] whitespace-nowrap text-muted uppercase">
                  {t('common.actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-t border-line bg-surface">
                  <td className="px-3 py-[11px] font-semibold whitespace-nowrap text-ink">
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-flex size-7 items-center justify-center rounded-full bg-pine-soft text-[10px] font-extrabold text-pine">
                        {initials(a.name)}
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
                    <Badge tone={statusTone(a.status)} dot>
                      {a.status}
                    </Badge>
                  </td>
                  <td className="px-3 py-[11px]">
                    {a.status === 'pending' ? (
                      <div className="flex justify-end gap-2">
                        <Button
                          tone="success"
                          size="sm"
                          className="min-h-11 min-w-11 p-0"
                          aria-label={t('roster.approve')}
                          onClick={() => approve(a)}
                        >
                          <IconCheck size={16} />
                        </Button>
                        <Button
                          tone="danger"
                          size="sm"
                          className="min-h-11 min-w-11 p-0"
                          aria-label={t('roster.decline')}
                          onClick={() => decline(a)}
                        >
                          <IconX size={16} />
                        </Button>
                      </div>
                    ) : (
                      <span
                        className={cn(
                          'inline-flex items-center justify-end gap-[5px] text-[12px]',
                          a.status === 'approved' ? 'text-success' : 'text-danger',
                        )}
                      >
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
