import { Fragment, useMemo, useState } from 'react'
import { colors } from '../theme.js'
import { cn } from '../lib/cn.js'
import { Card, CardHeader, Badge, Button, Input, Select, PageHeader, EmptyState, statusTone, ProgressBar } from '../components/ui.jsx'
import { IconSearch, IconPlus, IconChevron, IconMonks, IconFees, IconShield, IconUser, IconCheck, IconX } from '../components/icons.jsx'
import { classes } from '../data/index.js'
import { useAppStore } from '../store.jsx'
import { useLanguage } from '../i18n.jsx'

const statusKeys = ['enrolled', 'pending', 'graduated', 'withdrawn']

const statusLabels = {
  enrolled: 'Enrolled',
  pending: 'Pending',
  graduated: 'Graduated',
  withdrawn: 'Withdrawn',
}

export default function MonksRoster() {
  const { monks: storeMonks, admissions, addMonk, setAdmissionStatus } = useAppStore()
  const { t } = useLanguage()
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [classFilter, setClassFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(null)
  const [adding, setAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [newClass, setNewClass] = useState(classes[0]?.id || '')

  const monks = storeMonks

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return monks.filter((m) => {
      const matchesQ = !q || m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q) || m.guardian.toLowerCase().includes(q)
      const matchesStatus = statusFilter === 'all' || m.status === statusFilter
      const matchesClass = classFilter === 'all' || m.classId === classFilter
      return matchesQ && matchesStatus && matchesClass
    })
  }, [query, statusFilter, classFilter, monks])

  const counts = useMemo(() => ({
    enrolled: monks.filter((m) => m.status === 'enrolled').length,
    pending: monks.filter((m) => m.status === 'pending').length,
    graduated: monks.filter((m) => m.status === 'graduated').length,
    activeNow: monks.filter((m) => m.status !== 'withdrawn').length,
  }), [monks])

  const pendingAdmissions = useMemo(() => admissions.filter((a) => a.status === 'pending'), [admissions])

  const classLabel = (id) => {
    const c = classes.find((x) => x.id === id)
    return c ? c.name : id
  }

  const summary = [
    { label: 'Total Monks', value: monks.length, border: 'border-t-pine' },
    { label: 'Enrolled', value: counts.enrolled, border: 'border-t-success' },
    { label: 'Pending', value: counts.pending + pendingAdmissions.length, border: 'border-t-warning' },
    { label: 'Active this term', value: counts.activeNow, border: 'border-t-sage' },
  ]

  const approveAdmission = (a) => {
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

  const submitNewMonk = () => {
    if (!newName.trim()) return
    addMonk({
      name: newName.trim(),
      classId: newClass,
      guardian: '',
      status: 'enrolled',
      joined: new Date().toISOString().slice(0, 10),
      feeBalance: 0,
      attendanceRate: 0,
      sponsor: '',
    })
    setNewName('')
    setAdding(false)
  }

  return (
    <div>
      <PageHeader
        title="Monks Roster"
        subtitle="Directory of all student monks"
        actions={
          <Button icon={<IconPlus size={16} />} onClick={() => setAdding((v) => !v)}>Add Monk</Button>
        }
      />

      {adding && (
        <Card pad={18} className="mb-4.5 border-l-[3px] border-l-pine">
          <div className="flex flex-wrap items-end gap-3">
            <Input label="Name" value={newName} onChange={setNewName} placeholder="Enter full name…" className="flex-[2] min-w-[220px]" />
            <Select
              label="Filter by class"
              value={newClass}
              onChange={setNewClass}
              options={classes.map((c) => ({ value: c.id, label: c.name }))}
              className="flex-1 min-w-[180px]"
            />
            <Button tone="success" icon={<IconPlus size={15} />} onClick={submitNewMonk}>Save Monk</Button>
            <Button tone="ghost" onClick={() => setAdding(false)}>Cancel</Button>
          </div>
        </Card>
      )}

      {pendingAdmissions.length > 0 && (
        <Card pad={18} className="mb-4.5 border-l-[3px] border-l-warning">
          <CardHeader title="Pending Admissions" subtitle="Applications submitted from the public website awaiting review" />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3">
            {pendingAdmissions.map((a) => (
              <div key={a.id} className="rounded-md border border-line bg-surface-alt px-3.5 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex size-[34px] items-center justify-center rounded-full bg-warning-soft text-[11px] font-extrabold text-warning">
                    {a.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="m-0 text-[13.5px] font-bold text-ink">{a.name}</p>
                    <p className="mt-0.5 mb-0 text-[11.5px] text-muted">
                      Class: {classLabel(a.classRequested)} · {a.submittedAt}
                    </p>
                  </div>
                </div>
                <p className="mt-2.5 mb-0 text-[12px] text-body">
                  {a.guardian && <span>Guardian: {a.guardian} · </span>}
                  {a.phone || a.email || ''}
                </p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" tone="success" icon={<IconCheck size={14} />} onClick={() => approveAdmission(a)}>Approve</Button>
                  <Button size="sm" tone="danger" icon={<IconX size={14} />} onClick={() => setAdmissionStatus(a.id, 'declined')}>Decline</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="mb-4.5 grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3.5">
        {summary.map((s) => (
          <Card key={s.label} pad={16} className={cn('border-t-[3px]', s.border)}>
            <p className="m-0 text-[12px] font-semibold text-muted">{s.label}</p>
            <p className="mt-1.5 mb-0 text-[26px] font-extrabold text-ink">{s.value}</p>
          </Card>
        ))}
      </div>

      <Card pad={18}>
        <div className="mb-4 flex flex-wrap items-end gap-3">
          <Input
            value={query}
            onChange={setQuery}
            placeholder="Search by name or ID…"
            icon={<IconSearch size={15} />}
            className="flex-[2] min-w-[240px]"
          />
          <Select
            label="Filter by status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[{ value: 'all', label: 'All' }, ...statusKeys.map((k) => ({ value: k, label: statusLabels[k] }))]}
          />
          <Select
            label="Filter by class"
            value={classFilter}
            onChange={setClassFilter}
            options={[{ value: 'all', label: 'All' }, ...classes.map((c) => ({ value: c.id, label: c.name }))]}
          />
        </div>

        <div className="overflow-x-auto rounded-md border border-line">
          <table className="w-full min-w-[820px] border-collapse text-[13px]">
            <thead>
              <tr className="bg-surface-alt">
                {['ID', 'Name', 'Class', 'Status', 'Guardian', 'Joined', 'Attendance', 'Fee Balance', 'Sponsorship'].map((h) => (
                  <th key={h} className="px-3 py-2.5 text-left text-[11px] font-bold tracking-[0.4px] whitespace-nowrap text-muted uppercase">
                    {h}
                  </th>
                ))}
                <th className="w-10" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <Fragment key={m.id}>
                  <tr
                    onClick={() => setExpandedId(expandedId === m.id ? null : m.id)}
                    className={cn(
                      'cursor-pointer border-t border-line transition-colors',
                      expandedId === m.id ? 'bg-pine-soft hover:bg-pine-soft' : 'bg-surface hover:bg-surface-alt',
                    )}
                  >
                    <td className="px-3 py-2.5 font-bold whitespace-nowrap text-pine">{m.id}</td>
                    <td className="px-3 py-2.5 font-semibold whitespace-nowrap text-ink">
                      <span className="inline-flex items-center gap-2">
                        <span className="inline-flex size-7 items-center justify-center rounded-full bg-pine-soft text-[10px] font-extrabold text-pine">
                          {m.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                        </span>
                        {m.name}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-body">{classLabel(m.classId)}</td>
                    <td className="px-3 py-2.5">
                      <Badge tone={statusTone(m.status)} dot>{t(`statuses.${m.status}`)}</Badge>
                    </td>
                    <td className="px-3 py-2.5 text-body">{m.guardian}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-body">{m.joined}</td>
                    <td className="px-3 py-2.5">
                      <span className="inline-flex items-center gap-2">
                        <span className={cn('w-[46px] text-[12px] font-bold', m.attendanceRate >= 90 ? 'text-success' : m.attendanceRate === 0 ? 'text-muted' : 'text-warning')}>
                          {m.attendanceRate > 0 ? `${m.attendanceRate}%` : '—'}
                        </span>
                      </span>
                    </td>
                    <td className={cn('px-3 py-2.5 font-bold whitespace-nowrap', m.feeBalance > 0 ? 'text-danger' : 'text-success')}>
                      {m.feeBalance > 0 ? `$${m.feeBalance}` : '✓'}
                    </td>
                    <td className="px-3 py-2.5 text-body">{m.sponsor || t('roster.noSponsor')}</td>
                    <td className="px-3 py-2.5">
                      <span className={cn('inline-flex transition-transform', expandedId === m.id && 'rotate-180')}>
                        <IconChevron size={16} color={colors.muted} />
                      </span>
                    </td>
                  </tr>
                  {expandedId === m.id && (
                    <tr key={`${m.id}-detail`} className="bg-pine-soft">
                      <td colSpan={10} className="px-5 py-[18px]">
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
                          <div>
                            <p className="m-0 text-[11px] font-bold tracking-[0.4px] text-muted uppercase">{t('roster.profile')}</p>
                            <p className="my-2 text-[13px] text-ink"><IconUser size={13} /> <b>{m.name}</b></p>
                            <p className="m-0 text-[12.5px] text-body">{t('roster.id')}: {m.id} · {classLabel(m.classId)}</p>
                          </div>
                          <div>
                            <p className="m-0 text-[11px] font-bold tracking-[0.4px] text-muted uppercase">{t('roster.guardian')}</p>
                            <p className="my-2 text-[13px] text-ink">{m.guardian}</p>
                            <p className="m-0 text-[12.5px] text-body">{t('roster.enrolledDate')}: {m.joined}</p>
                          </div>
                          <div>
                            <p className="m-0 text-[11px] font-bold tracking-[0.4px] text-muted uppercase">{t('roster.academic')}</p>
                            <p className="mt-2 mb-1 text-[12.5px] text-body">{t('roster.avgAttendance')}: {m.attendanceRate > 0 ? `${m.attendanceRate}%` : '—'}</p>
                            <ProgressBar value={m.attendanceRate} color={m.attendanceRate >= 90 ? colors.success : colors.warning} height={7} className="max-w-40" />
                          </div>
                          <div>
                            <p className="m-0 text-[11px] font-bold tracking-[0.4px] text-muted uppercase">{t('roster.fees')}</p>
                            <p className={cn('my-2 text-[13px] font-bold', m.feeBalance > 0 ? 'text-danger' : 'text-success')}>
                              {m.feeBalance > 0 ? `${t('roster.feeBalance')}: $${m.feeBalance}` : t('statuses.paid')}
                            </p>
                            <p className="m-0 text-[12.5px] text-body">
                              <IconShield size={12} /> {t('roster.sponsor')}: {m.sponsor || t('roster.noSponsor')}
                            </p>
                          </div>
                          <div className="flex flex-col justify-center gap-2">
                            <Button size="sm" tone="success" icon={<IconMonks size={14} />}>{t('roster.recordAttendance')}</Button>
                            <Button size="sm" tone="outline" icon={<IconFees size={14} />}>{t('roster.recordFee')}</Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <EmptyState text={t('common.noResults')} />}
        </div>

        <p className="mt-3 mx-0.5 mb-0 text-[12px] text-muted">{t('roster.expand')}</p>
      </Card>
    </div>
  )
}
