import { useMemo, useState } from 'react'
import { useLanguage } from '../i18n.jsx'
import { colors, font, radii } from '../theme.js'
import { Card, CardHeader, Badge, Button, Select, PageHeader } from '../components/ui.jsx'
import { IconAttendance, IconCheck, IconX, IconClock } from '../components/icons.jsx'
import { monks, classes } from '../data/index.js'

const statusOpts = [
  { key: 'present', icon: <IconCheck size={15} />, color: colors.success, bg: colors.successSoft },
  { key: 'absent', icon: <IconX size={15} />, color: colors.danger, bg: colors.dangerSoft },
  { key: 'late', icon: <IconClock size={15} />, color: colors.warning, bg: colors.warningSoft },
]

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
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '5px 12px',
          borderRadius: radii.round,
          border: `1px solid ${isActive ? o.color : colors.border}`,
          background: isActive ? o.bg : colors.surface,
          color: isActive ? o.color : colors.muted,
          fontSize: 12,
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: font.sans,
          transition: 'all .15s ease',
        }}
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

      <Card pad={18} style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
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
          <div style={{ display: 'flex', gap: 8, marginLeft: 'auto', flexWrap: 'wrap' }}>
            <Button tone="success" icon={<IconCheck size={15} />} onClick={() => markAll('present')}>
              {t('attendancePage.markAllPresent')}
            </Button>
            <Button tone="outline" onClick={clearLog}>
              {t('attendancePage.clearLog')}
            </Button>
          </div>
        </div>

        <p style={{ margin: '14px 2px 0', fontSize: 12, color: colors.muted }}>{t('attendancePage.legend')}</p>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14, marginBottom: 16 }}>
        {statusOpts.map((o) => (
          <Card key={o.key} pad={16} style={{ borderLeft: `4px solid ${o.color}`, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 36, height: 36, borderRadius: radii.md, background: o.bg, color: o.color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              {o.icon}
            </span>
            <div>
              <p style={{ margin: 0, fontSize: 24, fontWeight: 800, color: colors.text }}>{counts[o.key]}</p>
              <p style={{ margin: 0, fontSize: 11.5, color: colors.muted }}>
                {o.key === 'present' ? t('attendancePage.presentCount') : o.key === 'absent' ? t('attendancePage.absentCount') : t('attendancePage.lateCount')}
              </p>
            </div>
          </Card>
        ))}
        <Card pad={16} style={{ borderLeft: `4px solid ${colors.purple}`, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 36, height: 36, borderRadius: radii.md, background: '#F0E6F8', color: colors.purple, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconAttendance size={17} />
          </span>
          <div>
            <p style={{ margin: 0, fontSize: 24, fontWeight: 800, color: colors.text }}>{rate}%</p>
            <p style={{ margin: 0, fontSize: 11.5, color: colors.muted }}>{t('attendancePage.rate')}</p>
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <Card pad={18}>
          <CardHeader title={t('attendancePage.logTitle')} subtitle={t('attendancePage.snapshot')} />
          <div style={{ overflowX: 'auto', borderRadius: radii.md, border: `1px solid ${colors.border}` }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 640 }}>
              <thead>
                <tr style={{ background: colors.surfaceAlt }}>
                  {[t('common.name'), t('common.className'), t('attendancePage.present'), t('attendancePage.absent'), t('attendancePage.late'), t('attendancePage.time')].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: 11, fontWeight: 700, color: colors.muted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} style={{ borderTop: `1px solid ${colors.border}`, background: r.status === 'absent' ? colors.dangerSoft : colors.surface }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600, color: colors.text, whiteSpace: 'nowrap' }}>{r.name}</td>
                    <td style={{ padding: '10px 12px', color: colors.textSoft }}>{classLabel(r.classId)}</td>
                    {['present', 'absent', 'late'].map((k) => (
                      <td key={k} style={{ padding: '10px 8px' }}>{statusChip(r.status, k, r)}</td>
                    ))}
                    <td style={{ padding: '10px 12px', color: colors.muted, fontSize: 12, whiteSpace: 'nowrap' }}>{r.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ margin: '12px 2px 0', fontSize: 12, color: colors.muted }}>
            {filtered.length} {t('attendancePage.recorded')}
          </p>
        </Card>

        <Card pad={18}>
          <CardHeader title={t('attendancePage.logTitle')} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {log.length === 0 && (
              <p style={{ margin: 0, fontSize: 12.5, color: colors.muted }}>{t('common.noResults')}</p>
            )}
            {log.slice().reverse().slice(0, 14).map((l, i) => {
              const m = monks.find((x) => x.id === l.monk)
              const o = statusOpts.find((s) => s.key === l.status)
              return (
                <div key={`${l.id}-${i}`} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: radii.sm, background: colors.surfaceAlt, border: `1px solid ${colors.border}` }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: o.color, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 12.5, color: colors.text }}>{m ? m.name : l.monk}</span>
                  <Badge tone={o.color === colors.success ? 'success' : o.color === colors.danger ? 'danger' : 'warning'}>{t(`attendancePage.${l.status}`)}</Badge>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
