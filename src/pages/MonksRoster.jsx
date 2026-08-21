import { Fragment, useMemo, useState } from 'react'
import { useLanguage } from '../i18n.jsx'
import { colors, radii } from '../theme.js'
import { Card, CardHeader, Badge, Button, Input, Select, PageHeader, EmptyState, statusTone, ProgressBar } from '../components/ui.jsx'
import { IconSearch, IconPlus, IconChevron, IconMonks, IconFees, IconShield, IconUser, IconCheck, IconX } from '../components/icons.jsx'
import { classes } from '../data/index.js'
import { useAppStore } from '../store.jsx'

const statusKeys = ['enrolled', 'pending', 'graduated', 'withdrawn']

export default function MonksRoster() {
  const { t } = useLanguage()
  const { monks: storeMonks, admissions, addMonk, setAdmissionStatus } = useAppStore()
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
    { label: t('roster.totalMonks'), value: monks.length, color: colors.primary },
    { label: t('statuses.enrolled'), value: counts.enrolled, color: colors.success },
    { label: t('statuses.pending'), value: counts.pending + pendingAdmissions.length, color: colors.warning },
    { label: t('roster.activeNow'), value: counts.activeNow, color: colors.accent },
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
        title={t('roster.title')}
        subtitle={t('roster.subtitle')}
        actions={
          <Button icon={<IconPlus size={16} />} onClick={() => setAdding((v) => !v)}>{t('roster.addMonk')}</Button>
        }
      />

      {adding && (
        <Card pad={18} style={{ marginBottom: 18, borderLeft: `3px solid ${colors.primary}` }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <Input label={t('common.name')} value={newName} onChange={setNewName} placeholder={t('roster.namePlaceholder')} style={{ flex: 2, minWidth: 220 }} />
            <Select
              label={t('roster.filterClass')}
              value={newClass}
              onChange={setNewClass}
              options={classes.map((c) => ({ value: c.id, label: c.name }))}
              style={{ flex: 1, minWidth: 180 }}
            />
            <Button tone="success" icon={<IconPlus size={15} />} onClick={submitNewMonk}>{t('roster.saveMonk')}</Button>
            <Button tone="ghost" onClick={() => setAdding(false)}>{t('common.cancel')}</Button>
          </div>
        </Card>
      )}

      {pendingAdmissions.length > 0 && (
        <Card pad={18} style={{ marginBottom: 18, borderLeft: `3px solid ${colors.warning}` }}>
          <CardHeader title={t('roster.pendingTitle')} subtitle={t('roster.pendingHint')} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
            {pendingAdmissions.map((a) => (
              <div key={a.id} style={{ padding: '12px 14px', borderRadius: radii.md, background: colors.surfaceAlt, border: `1px solid ${colors.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 34, height: 34, borderRadius: '50%', background: colors.warningSoft, color: colors.warning, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>
                    {a.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: colors.text }}>{a.name}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 11.5, color: colors.muted }}>
                      {t('common.className')}: {classLabel(a.classRequested)} · {a.submittedAt}
                    </p>
                  </div>
                </div>
                <p style={{ margin: '10px 0 0', fontSize: 12, color: colors.textSoft }}>
                  {a.guardian && <span>{t('roster.guardian')}: {a.guardian} · </span>}
                  {a.phone || a.email || ''}
                </p>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <Button size="sm" tone="success" icon={<IconCheck size={14} />} onClick={() => approveAdmission(a)}>{t('roster.approve')}</Button>
                  <Button size="sm" tone="danger" icon={<IconX size={14} />} onClick={() => setAdmissionStatus(a.id, 'declined')}>{t('roster.decline')}</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 18 }}>
        {summary.map((s) => (
          <Card key={s.label} pad={16} style={{ borderTop: `3px solid ${s.color}` }}>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: colors.muted }}>{s.label}</p>
            <p style={{ margin: '6px 0 0', fontSize: 26, fontWeight: 800, color: colors.text }}>{s.value}</p>
          </Card>
        ))}
      </div>

      <Card pad={18}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16, alignItems: 'flex-end' }}>
          <Input
            value={query}
            onChange={setQuery}
            placeholder={t('roster.search')}
            icon={<IconSearch size={15} />}
            style={{ flex: 2, minWidth: 240 }}
          />
          <Select
            label={t('roster.filterStatus')}
            value={statusFilter}
            onChange={setStatusFilter}
            options={[{ value: 'all', label: t('common.all') }, ...statusKeys.map((k) => ({ value: k, label: t(`statuses.${k}`) }))]}
          />
          <Select
            label={t('roster.filterClass')}
            value={classFilter}
            onChange={setClassFilter}
            options={[{ value: 'all', label: t('common.all') }, ...classes.map((c) => ({ value: c.id, label: c.name }))]}
          />
        </div>

        <div style={{ overflowX: 'auto', borderRadius: radii.md, border: `1px solid ${colors.border}` }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 820 }}>
            <thead>
              <tr style={{ background: colors.surfaceAlt }}>
                {[t('roster.id'), t('common.name'), t('common.className'), t('statuses.enrolled'), t('roster.guardian'), t('roster.joined'), t('roster.attendanceRate'), t('roster.feeBalance'), t('roster.sponsor')].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: 11, fontWeight: 700, color: colors.muted, textTransform: 'uppercase', letterSpacing: '0.4px', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
                <th style={{ width: 40 }} />
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <Fragment key={m.id}>
                  <tr
                    onClick={() => setExpandedId(expandedId === m.id ? null : m.id)}
                    style={{
                      borderTop: `1px solid ${colors.border}`,
                      cursor: 'pointer',
                      background: expandedId === m.id ? colors.primarySoft : colors.surface,
                      transition: 'background .12s ease',
                      ':hover': { background: expandedId === m.id ? colors.primarySoft : colors.surfaceAlt },
                    }}
                  >
                    <td style={{ padding: '11px 12px', fontWeight: 700, color: colors.primary, whiteSpace: 'nowrap' }}>{m.id}</td>
                    <td style={{ padding: '11px 12px', fontWeight: 600, color: colors.text, whiteSpace: 'nowrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 28, height: 28, borderRadius: '50%', background: colors.primarySoft, color: colors.primary, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800 }}>
                          {m.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                        </span>
                        {m.name}
                      </span>
                    </td>
                    <td style={{ padding: '11px 12px', color: colors.textSoft }}>{classLabel(m.classId)}</td>
                    <td style={{ padding: '11px 12px' }}>
                      <Badge tone={statusTone(m.status)} dot>{t(`statuses.${m.status}`)}</Badge>
                    </td>
                    <td style={{ padding: '11px 12px', color: colors.textSoft }}>{m.guardian}</td>
                    <td style={{ padding: '11px 12px', color: colors.textSoft, whiteSpace: 'nowrap' }}>{m.joined}</td>
                    <td style={{ padding: '11px 12px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 46, fontSize: 12, fontWeight: 700, color: m.attendanceRate >= 90 ? colors.success : m.attendanceRate === 0 ? colors.muted : colors.warning }}>
                          {m.attendanceRate > 0 ? `${m.attendanceRate}%` : '—'}
                        </span>
                      </span>
                    </td>
                    <td style={{ padding: '11px 12px', fontWeight: 700, color: m.feeBalance > 0 ? colors.danger : colors.success, whiteSpace: 'nowrap' }}>
                      {m.feeBalance > 0 ? `$${m.feeBalance}` : '✓'}
                    </td>
                    <td style={{ padding: '11px 12px', color: colors.textSoft }}>{m.sponsor || t('roster.noSponsor')}</td>
                    <td style={{ padding: '11px 12px' }}>
                      <IconChevron size={16} color={colors.muted} style={{ transform: expandedId === m.id ? 'rotate(180deg)' : 'none', transition: 'transform .15s ease' }} />
                    </td>
                  </tr>
                  {expandedId === m.id && (
                    <tr key={`${m.id}-detail`} style={{ background: colors.primarySoft }}>
                      <td colSpan={10} style={{ padding: '18px 20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
                          <div>
                            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: colors.muted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{t('roster.profile')}</p>
                            <p style={{ margin: '8px 0', fontSize: 13, color: colors.text }}><IconUser size={13} /> <b>{m.name}</b></p>
                            <p style={{ margin: 0, fontSize: 12.5, color: colors.textSoft }}>{t('roster.id')}: {m.id} · {classLabel(m.classId)}</p>
                          </div>
                          <div>
                            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: colors.muted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{t('roster.guardian')}</p>
                            <p style={{ margin: '8px 0', fontSize: 13, color: colors.text }}>{m.guardian}</p>
                            <p style={{ margin: 0, fontSize: 12.5, color: colors.textSoft }}>{t('roster.enrolledDate')}: {m.joined}</p>
                          </div>
                          <div>
                            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: colors.muted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{t('roster.academic')}</p>
                            <p style={{ margin: '8px 0 4px', fontSize: 12.5, color: colors.textSoft }}>{t('roster.avgAttendance')}: {m.attendanceRate > 0 ? `${m.attendanceRate}%` : '—'}</p>
                            <ProgressBar value={m.attendanceRate} color={m.attendanceRate >= 90 ? colors.success : colors.warning} height={7} style={{ maxWidth: 160 }} />
                          </div>
                          <div>
                            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: colors.muted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{t('roster.fees')}</p>
                            <p style={{ margin: '8px 0', fontSize: 13, fontWeight: 700, color: m.feeBalance > 0 ? colors.danger : colors.success }}>
                              {m.feeBalance > 0 ? `${t('roster.feeBalance')}: $${m.feeBalance}` : t('statuses.paid')}
                            </p>
                            <p style={{ margin: 0, fontSize: 12.5, color: colors.textSoft }}>
                              <IconShield size={12} /> {t('roster.sponsor')}: {m.sponsor || t('roster.noSponsor')}
                            </p>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center' }}>
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

        <p style={{ margin: '12px 2px 0', fontSize: 12, color: colors.muted }}>{t('roster.expand')}</p>
      </Card>
    </div>
  )
}
