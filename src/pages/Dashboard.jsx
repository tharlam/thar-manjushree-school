import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAppStore } from '../store.jsx'
import { colors } from '../theme.js'
import { cn } from '../lib/cn.js'
import { Card, CardHeader, StatCard, Badge, PageHeader, Button } from '../components/ui.jsx'
import { IconMonks, IconClasses, IconFees, IconUser, IconShield, IconClock } from '../components/icons.jsx'
import { classes as baseClasses, activities, events } from '../data/index.js'
import { usdValue, formatUsd, formatAmount } from '../lib/currency.js'

const activityLabels = {
  act1: 'New monk admitted to Level 3',
  act2: 'Monthly fee of Tenzin Dorje settled',
  act3: 'Philosophy debate session scheduled',
  act4: 'Donation of $1,200 received from sponsor',
  act5: 'Attendance log for Level 4 completed',
}

const eventLabels = {
  ev1: 'Monlam Prayer Festival',
  ev2: 'Philosophy Debate Finals',
  ev3: 'Parent-Teacher Meeting',
  ev4: 'Annual Thangka Exhibition',
}

const tagLabels = {
  tagReligious: 'Religious',
  tagAcademic: 'Academic',
  tagMeeting: 'Meeting',
  tagCultural: 'Cultural',
}

export default function Dashboard() {
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
    { key: 'monks', label: 'Total Monks', value: totals.totalMonks, delta: 4.2, color: colors.primary, icon: <IconMonks size={16} /> },
    { key: 'classes', label: 'Active Classes', value: totals.activeClasses, delta: 0, color: colors.accent, icon: <IconClasses size={16} /> },
    { key: 'donations', label: 'Donations This Month', value: formatUsd(totals.donationTotal), delta: 12.5, color: colors.success, icon: <IconFees size={16} /> },
    { key: 'admissions', label: 'Pending Admissions', value: totals.pendingAdmissions, delta: 8.3, color: colors.info, icon: <IconUser size={16} /> },
  ]

  const pendingQueue = admissions.filter((a) => a.status === 'pending').slice(0, 5)
  const recentDonations = [...donations].filter((d) => d.type !== 'fee').slice(0, 5)
  const enrollment = baseClasses.slice(0, 8)
  const maxStudents = Math.max(...enrollment.map((c) => c.students))

  return (
    <div>
      <PageHeader title="Dashboard Overview" subtitle="A live snapshot of the monastic community" />

      <div className="mb-[22px] grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-3.5">
        {statDefs.map((s) => (
          <StatCard key={s.key} label={s.label} value={s.value} delta={s.key === 'classes' ? undefined : s.delta} color={s.color} icon={s.icon} hint={s.key === 'classes' ? 'vs last month' : undefined} />
        ))}
      </div>

      <div className="dashboard-grid-2col mb-4 grid grid-cols-[1.4fr_1fr] gap-4">
        <Card pad={18}>
          <CardHeader title="Enrollment by Class" />
          <div className="flex h-[170px] items-end gap-2.5 pt-2">
            {enrollment.map((c) => (
              <div key={c.id} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                <span className="text-[11px] font-bold text-body">{c.students}</span>
                <div
                  title={`${c.name}: ${c.students}`}
                  className="w-full max-w-8 min-h-2 rounded-t-sm rounded-b-[2px]"
                  style={{
                    height: `${(c.students / maxStudents) * 120}px`,
                    background: `linear-gradient(180deg, ${c.color}, ${c.color}99)`,
                  }}
                />
                <span className="origin-top-left rotate-[-40deg] text-[9px] whitespace-nowrap text-muted">{c.name}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card pad={18}>
          <CardHeader title="Pending Admissions" subtitle="Click any card to preview details" />
          {pendingQueue.length === 0 ? (
            <p className="m-0 text-[13px] text-muted">No records found.</p>
          ) : (
            <div className="flex flex-col gap-2.5">
              {pendingQueue.map((a) => (
                <div key={a.id} className="flex items-center gap-2.5 rounded-md border border-line bg-surface-alt px-[11px] py-[9px]">
                  <span className="inline-flex size-[30px] items-center justify-center rounded-full bg-warning-soft text-[10px] font-extrabold text-warning">
                    {a.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="m-0 overflow-hidden text-[13px] font-bold text-ellipsis whitespace-nowrap text-ink">{a.name}</p>
                    <p className="mt-0.5 mb-0 text-[11px] text-muted">{a.classRequested} · {a.submittedAt}</p>
                  </div>
                  <Badge tone="warning" dot>Pending</Badge>
                </div>
              ))}
              <Link to="/admin/monks" className="no-underline">
                <Button tone="outline" className="w-full">View all</Button>
              </Link>
            </div>
          )}
        </Card>
      </div>

      <div className="dashboard-grid-2col mb-4 grid grid-cols-[1.4fr_1fr] gap-4">
        <Card pad={18}>
          <CardHeader title="Donation Records" subtitle="Recent Transactions" />
          <div className="flex max-h-[260px] flex-col gap-2.5 overflow-y-auto">
            {recentDonations.map((d) => (
              <div key={d.id} className="flex items-center gap-3 rounded-md border border-line bg-surface-alt px-3 py-[9px]">
                <span className="inline-flex size-8 items-center justify-center rounded-md bg-success-soft text-success">
                  <IconFees size={15} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="m-0 text-[13px] font-bold text-ink">{d.name}</p>
                  <p className="mt-0.5 mb-0 text-[11.5px] text-muted">{d.date} · {d.note || 'Donation'}</p>
                </div>
                <span className="text-[14px] font-extrabold text-success">{formatAmount(d.amount, d.currency)}</span>
              </div>
            ))}
            {recentDonations.length === 0 && <p className="m-0 text-[13px] text-muted">No records found.</p>}
          </div>
        </Card>

        <Card pad={18}>
          <CardHeader title="Fee Collection Overview" subtitle="Collected vs Outstanding" />
          <div className="flex h-[120px] items-end gap-3">
            <div className="flex-1">
              <div className="flex h-[90px] items-end justify-center rounded-md bg-linear-to-b from-[rgba(46,125,50,0.85)] to-[rgba(46,125,50,0.35)] pb-2">
                <span className="text-[12px] font-extrabold text-white">{formatUsd(totals.donationTotal + donations.filter((x) => x.type === 'fee').reduce((s, x) => s + usdValue(x.amount, x.currency), 0))}</span>
              </div>
              <p className="mt-1.5 mb-0 text-center text-[11px] text-muted">Collected</p>
            </div>
            <div className="flex-1">
              <div className="flex h-[45px] items-end justify-center rounded-md bg-linear-to-b from-[rgba(198,40,40,0.8)] to-[rgba(198,40,40,0.35)] pb-2">
                <span className="text-[12px] font-extrabold text-white">{formatUsd(totals.outstanding)}</span>
              </div>
              <p className="mt-1.5 mb-0 text-center text-[11px] text-muted">Outstanding</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2.5 rounded-md border border-line bg-[#F0E6F8] px-3 py-2.5">
            <IconShield size={16} color={colors.purple} />
            <span className="flex-1 text-[12.5px] text-body">
              Active Sponsorships: <b className="text-purple">{storeMonks.filter((m) => m.sponsor).length}</b>
            </span>
          </div>
        </Card>
      </div>

      <div className="dashboard-grid-2col mb-4 grid grid-cols-2 gap-4">
        <Card pad={18}>
          <CardHeader title="Recent Activity" />
          <div className="flex flex-col gap-2.5">
            {activities.map((a, i) => (
              <div key={i} className="flex items-center gap-2.5 rounded-md border border-line bg-surface-alt px-3 py-[9px]">
                <span className={cn('size-2 shrink-0 rounded-full', i < 2 ? 'bg-pine' : 'bg-line')} />
                <div className="min-w-0 flex-1">
                  <p className="m-0 text-[13px] font-semibold text-ink">{activityLabels[a.key] || a.key}</p>
                  <span className="text-[11px] text-muted">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card pad={18}>
          <CardHeader title="Upcoming Events" />
          <div className="flex flex-col gap-2.5">
            {events.map((e, i) => (
              <div key={i} className="flex items-center gap-3 rounded-md border border-line bg-surface-alt px-3 py-[9px]">
                <span className="inline-flex size-[38px] shrink-0 items-center justify-center rounded-md bg-pine-soft text-[11px] font-extrabold text-pine">
                  {e.date.split(' ')[1] || e.date.split(' ')[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="m-0 text-[13px] font-bold text-ink">{eventLabels[e.key] || e.key}</p>
                  <span className="text-[11px] text-muted">{e.date}</span>
                </div>
                <span className="rounded-full bg-warning-soft px-2 py-[3px] text-[10px] font-bold whitespace-nowrap text-warning">
                  {tagLabels[e.tagKey] || e.tagKey}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <p className="mt-4.5 flex items-center gap-1.5 text-[11px] text-muted">
        <IconClock size={12} /> Thar Manjushree School · Admin Portal · Pending Admissions: {totals.pendingAdmissions}
      </p>
    </div>
  )
}
