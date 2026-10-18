import { useMemo, useState } from 'react'
import { useLanguage } from '../i18n.jsx'
import { cn } from '../lib/cn.js'
import { Card, CardHeader, Badge, Button, Select, PageHeader } from '../components/ui.jsx'
import { IconAttendance, IconCheck, IconX, IconClock } from '../components/icons.jsx'
import { monks, classes } from '../data/index.js'

const statusOpts = [
  { key: 'present', icon: <IconCheck size={15} />, tone: 'success' },
  { key: 'absent', icon: <IconX size={15} />, tone: 'danger' },
  { key: 'late', icon: <IconClock size={15} />, tone: 'warning' },
]

const chipTone = {
  success: 'border-success bg-success-soft text-success',
  danger: 'border-danger bg-danger-soft text-danger',
  warning: 'border-warning bg-warning-soft text-warning',
}
const borderTone = { success: 'border-l-success', danger: 'border-l-danger', warning: 'border-l-warning' }
const iconTone = { success: 'bg-success-soft text-success', danger: 'bg-danger-soft text-danger', warning: 'bg-warning-soft text-warning' }
const dotTone = { success: 'bg-success', danger: 'bg-danger', warning: 'bg-warning' }

export default function AttendanceLogger() {
  const { t } = useLanguage()
  const [date, setDate] = useState('2026-08-03')
  const [classFilter, setClassFilter] = useState('all')
  const [records, setRecords] = useState(() =>
    monks.map((m) => ({
      id: m.id,
      name: m.name,
      classId: m.classId,
      status: m.id === 'TM-1005' ? 'absent' : m.id === 'TM-1010' ? 'late' : 'present',
      time: m.id === 'TM-1010' ? '09:12' : '08:45',
    }))
  )
  const [log, setLog] = useState([])

  const filtered = useMemo(() => {
    const list = records
    return classFilter === 'all' ? list : list.filter((r) => r.classId === classFilter)
  }, [records, classFilter])

  const counts = useMemo(() => {
    const c = { present: 0, absent: 0, late: 0 }
    filtered.forEach((r) => {
      c[r.status] = (c[r.status] || 0) + 1
    })
    return c
  }, [filtered])

  const rate = filtered.length ? Math.round(((counts.present + counts.late) / filtered.length) * 100) : 0

  const setStatus = (id, status) => {
    setRecords((rs) => rs.map((r) => (r.id === id ? { ...r, status, time: status === 'present' ? '08:45' : status === 'late' ? '09:12' : '—' } : r)))
    setLog((l) => [...l, { id: `${Date.now()}-${id}`, monk: id, status, date }].slice(-50))
  }

  const markAll = (status) => {
    setRecords((rs) => rs.map((r) => ({ ...r, status, time: status === 'present' ? '08:45' : status === 'late' ? '09:12' : '—' })))
  }

  const clearLog = () => setLog([])

  const statusChip = (current, key, rec) => {
    const o = statusOpts.find((s) => s.key === key)
    const isActive = rec.status === key
    return (
      <button
        type="button"
        onClick={() => setStatus(rec.id, key)}
        className={cn(
          'inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-[5px] text-[12px] font-bold font-sans transition-all',
          isActive ? chipTone[o.tone] : 'border-line bg-surface text-muted',
        )}
      >
        {o.icon}
        {t(`attendancePage.${key}`)}
      </button>
    )
  }

  const classLabel = (id) => {
    const c = classes.find((x) => x.id === id)
    return c ? c.name : id
  }

  return (
    <div>
      <PageHeader title={t('attendancePage.title')} subtitle={t('attendancePage.subtitle')} />

      <Card pad={18} className="mb-4">
        <div className="flex flex-wrap items-end gap-3">
          <Select
            label={t('attendancePage.selectDate')}
            value={date}
            onChange={setDate}
            options={['2026-08-03', '2026-08-02', '2026-08-01'].map((d) => ({ value: d, label: d }))}
          />
          <Select
            label={t('attendancePage.selectClass')}
            value={classFilter}
            onChange={setClassFilter}
            options={[{ value: 'all', label: t('common.all') }, ...classes.map((c) => ({ value: c.id, label: c.name }))]}
          />
          <div className="ml-auto flex flex-wrap gap-2">
            <Button tone="success" icon={<IconCheck size={15} />} onClick={() => markAll('present')}>
              {t('attendancePage.markAllPresent')}
            </Button>
            <Button tone="outline" onClick={clearLog}>
              {t('attendancePage.clearLog')}
            </Button>
          </div>
        </div>

        <p className="mt-3.5 mx-0.5 mb-0 text-[12px] text-muted">{t('attendancePage.legend')}</p>
      </Card>

      <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5">
        {statusOpts.map((o) => (
          <Card key={o.key} pad={16} className={cn('flex items-center gap-3 border-l-4', borderTone[o.tone])}>
            <span className={cn('inline-flex size-9 items-center justify-center rounded-md', iconTone[o.tone])}>
              {o.icon}
            </span>
            <div>
              <p className="m-0 text-[24px] font-extrabold text-ink">{counts[o.key]}</p>
              <p className="m-0 text-[11.5px] text-muted">
                {o.key === 'present' ? t('attendancePage.presentCount') : o.key === 'absent' ? t('attendancePage.absentCount') : t('attendancePage.lateCount')}
              </p>
            </div>
          </Card>
        ))}
        <Card pad={16} className="flex items-center gap-3 border-l-4 border-l-purple">
          <span className="inline-flex size-9 items-center justify-center rounded-md bg-[#F0E6F8] text-purple">
            <IconAttendance size={17} />
          </span>
          <div>
            <p className="m-0 text-[24px] font-extrabold text-ink">{rate}%</p>
            <p className="m-0 text-[11.5px] text-muted">{t('attendancePage.rate')}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-4">
        <Card pad={18}>
          <CardHeader title={t('attendancePage.logTitle')} subtitle={t('attendancePage.snapshot')} />
          <div className="overflow-x-auto rounded-md border border-line">
            <table className="w-full min-w-[640px] border-collapse text-[13px]">
              <thead>
                <tr className="bg-surface-alt">
                  {[t('common.name'), t('common.className'), t('attendancePage.present'), t('attendancePage.absent'), t('attendancePage.late'), t('attendancePage.time')].map((h) => (
                    <th key={h} className="px-3 py-2.5 text-left text-[11px] font-bold tracking-[0.4px] text-muted uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className={cn('border-t border-line', r.status === 'absent' ? 'bg-danger-soft' : 'bg-surface')}>
                    <td className="px-3 py-2.5 font-semibold whitespace-nowrap text-ink">{r.name}</td>
                    <td className="px-3 py-2.5 text-body">{classLabel(r.classId)}</td>
                    {['present', 'absent', 'late'].map((k) => (
                      <td key={k} className="px-2 py-2.5">{statusChip(r.status, k, r)}</td>
                    ))}
                    <td className="px-3 py-2.5 text-[12px] whitespace-nowrap text-muted">{r.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 mx-0.5 mb-0 text-[12px] text-muted">
            {filtered.length} {t('attendancePage.recorded')}
          </p>
        </Card>

        <Card pad={18}>
          <CardHeader title={t('attendancePage.logTitle')} />
          <div className="flex flex-col gap-2.5">
            {log.length === 0 && (
              <p className="m-0 text-[12.5px] text-muted">{t('common.noResults')}</p>
            )}
            {log.slice().reverse().slice(0, 14).map((l, i) => {
              const m = monks.find((x) => x.id === l.monk)
              const o = statusOpts.find((s) => s.key === l.status)
              return (
                <div key={`${l.id}-${i}`} className="flex items-center gap-2.5 rounded-sm border border-line bg-surface-alt px-2.5 py-2">
                  <span className={cn('size-2 shrink-0 rounded-full', dotTone[o.tone])} />
                  <span className="flex-1 text-[12.5px] text-ink">{m ? m.name : l.monk}</span>
                  <Badge tone={o.tone}>{t(`attendancePage.${l.status}`)}</Badge>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
