import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n.jsx'
import { useAppStore } from '../store.jsx'
import { colors, radii } from '../theme.js'
import { Card, CardHeader, StatCard, Badge, PageHeader, Button } from '../components/ui.jsx'
import { IconMonks, IconClasses, IconFees, IconUser, IconShield, IconClock } from '../components/icons.jsx'
import { classes as baseClasses, activities, events } from '../data/index.js'
import { usdValue, formatUsd, formatAmount } from '../lib/currency.js'

export default function Dashboard() {
  const { t } = useLanguage()
  const { monks: storeMonks, admissions, donations } = useAppStore()

  const totals = useMemo(() => {
    const totalMonks = storeMonks.length
    const activeClasses = baseClasses.length
    const donationTotal = donations.filter((d) => d.type !== 'fee').reduce((s, d) => s + usdValue(d.amount, d.currency), 0)
    const pendingAdmissions = admissions.filter((a) => a.status === 'pending').length
    const outstanding = storeMonks.reduce((s, m) => s + Number(m.feeBalance || 0), 0)
    return { totalMonks, activeClasses, donationTotal, pendingAdmissions, outstanding }
  }, [storeMonks, admissions, donations])

  const statDefs = [
    { key: 'monks', label: t('dashboard.statMonks'), value: totals.totalMonks, delta: 4.2, color: colors.primary, icon: <IconMonks size={16} /> },
    { key: 'classes', label: t('dashboard.statClasses'), value: totals.activeClasses, delta: 0, color: colors.accent, icon: <IconClasses size={16} /> },
    { key: 'donations', label: t('dashboard.statDonations'), value: formatUsd(totals.donationTotal), delta: 12.5, color: colors.success, icon: <IconFees size={16} /> },
    { key: 'admissions', label: t('dashboard.statAdmissions'), value: totals.pendingAdmissions, delta: 8.3, color: colors.info, icon: <IconUser size={16} /> },
  ]

  const pendingQueue = admissions.filter((a) => a.status === 'pending').slice(0, 5)
  const recentDonations = [...donations].filter((d) => d.type !== 'fee').slice(0, 5)
  const enrollment = baseClasses.slice(0, 8)
  const maxStudents = Math.max(...enrollment.map((c) => c.students))

  return (
    <div>
      <PageHeader title={t('dashboard.title')} subtitle={t('dashboard.subtitle')} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14, marginBottom: 22 }}>
        {statDefs.map((s) => (
          <StatCard key={s.key} label={s.label} value={s.value} delta={s.key === 'classes' ? undefined : s.delta} color={s.color} icon={s.icon} hint={s.key === 'classes' ? t('dashboard.vs') : undefined} />
        ))}
      </div>

      <div className="dashboard-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card pad={18}>
          <CardHeader title={t('dashboard.enrollmentTitle')} />
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 170, paddingTop: 8 }}>
            {enrollment.map((c) => (
              <div key={c.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: colors.textSoft }}>{c.students}</span>
                <div
                  title={`${c.name}: ${c.students}`}
                  style={{
                    width: '100%',
                    maxWidth: 32,
                    height: `${(c.students / maxStudents) * 120}px`,
                    minHeight: 8,
                    borderRadius: '6px 6px 2px 2px',
                    background: `linear-gradient(180deg, ${c.color}, ${c.color}99)`,
                  }}
                />
                <span style={{ fontSize: 9, color: colors.muted, whiteSpace: 'nowrap', transform: 'rotate(-40deg)', transformOrigin: 'top left' }}>{c.name}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card pad={18}>
          <CardHeader title={t('dashboard.statAdmissions')} subtitle={t('dashboard.clickHint')} />
          {pendingQueue.length === 0 ? (
            <p style={{ margin: 0, fontSize: 13, color: colors.muted }}>{t('common.noResults')}</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pendingQueue.map((a) => (
                <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 11px', borderRadius: radii.md, background: colors.surfaceAlt, border: `1px solid ${colors.border}` }}>
                  <span style={{ width: 30, height: 30, borderRadius: '50%', background: colors.warningSoft, color: colors.warning, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800 }}>
                    {a.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: colors.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 11, color: colors.muted }}>{a.classRequested} · {a.submittedAt}</p>
                  </div>
                  <Badge tone="warning" dot>{t('statuses.pending')}</Badge>
                </div>
              ))}
              <Link to="/admin/monks" style={{ textDecoration: 'none' }}>
                <Button tone="outline" style={{ width: '100%' }}>{t('common.viewAll')}</Button>
              </Link>
            </div>
          )}
        </Card>
      </div>

      <div className="dashboard-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card pad={18}>
          <CardHeader title={t('feesPage.donationTitle')} subtitle={t('feesPage.recent')} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 260, overflowY: 'auto' }}>
            {recentDonations.map((d) => (
              <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 12px', borderRadius: radii.md, background: colors.surfaceAlt, border: `1px solid ${colors.border}` }}>
                <span style={{ width: 32, height: 32, borderRadius: radii.md, background: colors.successSoft, color: colors.success, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconFees size={15} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: colors.text }}>{d.name}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 11.5, color: colors.muted }}>{d.date} · {d.note || t('feesPage.donation')}</p>
                </div>
                <span style={{ fontSize: 14, fontWeight: 800, color: colors.success }}>{formatAmount(d.amount, d.currency)}</span>
              </div>
            ))}
            {recentDonations.length === 0 && <p style={{ margin: 0, fontSize: 13, color: colors.muted }}>{t('common.noResults')}</p>}
          </div>
        </Card>

        <Card pad={18}>
          <CardHeader title={t('dashboard.feeTitle')} subtitle={`${t('dashboard.collected')} vs ${t('dashboard.outstanding')}`} />
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 120 }}>
            <div style={{ flex: 1 }}>
              <div style={{ height: 90, borderRadius: radii.md, background: 'linear-gradient(180deg, rgba(46,125,50,0.85), rgba(46,125,50,0.35))', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>{formatUsd(totals.donationTotal + donations.filter((x) => x.type === 'fee').reduce((s, x) => s + usdValue(x.amount, x.currency), 0))}</span>
              </div>
              <p style={{ margin: '6px 0 0', textAlign: 'center', fontSize: 11, color: colors.muted }}>{t('dashboard.collected')}</p>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ height: 45, borderRadius: radii.md, background: 'linear-gradient(180deg, rgba(198,40,40,0.8), rgba(198,40,40,0.35))', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>{formatUsd(totals.outstanding)}</span>
              </div>
              <p style={{ margin: '6px 0 0', textAlign: 'center', fontSize: 11, color: colors.muted }}>{t('dashboard.outstanding')}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16, padding: '10px 12px', borderRadius: radii.md, background: '#F0E6F8', border: `1px solid ${colors.border}` }}>
            <IconShield size={16} color={colors.purple} />
            <span style={{ fontSize: 12.5, color: colors.textSoft, flex: 1 }}>
              {t('feesPage.statSponsorships')}: <b style={{ color: colors.purple }}>{storeMonks.filter((m) => m.sponsor).length}</b>
            </span>
            <Link to="/admin/fees" style={{ textDecoration: 'none', fontSize: 12.5, fontWeight: 700, color: colors.primary }}>{t('common.viewAll')} →</Link>
          </div>
        </Card>
      </div>

      <div className="dashboard-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card pad={18}>
          <CardHeader title={t('dashboard.activityTitle')} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {activities.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: radii.md, background: colors.surfaceAlt, border: `1px solid ${colors.border}` }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: i < 2 ? colors.primary : colors.border, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: colors.text }}>{t(`dashboard.${a.key}`)}</p>
                  <span style={{ fontSize: 11, color: colors.muted }}>{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card pad={18}>
          <CardHeader title={t('dashboard.eventsTitle')} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {events.map((e, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 12px', borderRadius: radii.md, background: colors.surfaceAlt, border: `1px solid ${colors.border}` }}>
                <span style={{ width: 38, height: 38, borderRadius: radii.md, background: colors.primarySoft, color: colors.primary, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>
                  {e.date.split(' ')[1] || e.date.split(' ')[0]}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: colors.text }}>{t(`dashboard.${e.key}`)}</p>
                  <span style={{ fontSize: 11, color: colors.muted }}>{e.date}</span>
                </div>
                <span style={{ padding: '3px 8px', borderRadius: radii.round, background: colors.warningSoft, color: colors.warning, fontSize: 10, fontWeight: 700, whiteSpace: 'nowrap' }}>
                  {t(`dashboard.${e.tagKey}`)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <p style={{ marginTop: 18, fontSize: 11, color: colors.muted, display: 'flex', alignItems: 'center', gap: 6 }}>
        <IconClock size={12} /> Thar Manjushree School · {t('app.admin')} · {t('dashboard.statAdmissions')}: {totals.pendingAdmissions}
      </p>
    </div>
  )
}
