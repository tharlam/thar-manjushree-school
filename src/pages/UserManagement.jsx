import { useState } from 'react'
import { useLanguage } from '../i18n.jsx'
import { cn } from '../lib/cn.js'
import { Card, CardHeader, Badge, Button, PageHeader } from '../components/ui.jsx'
import { IconPlus } from '../components/icons.jsx'
import { adminProfiles } from '../data/index.js'

const roleNames = {
  profileRole: 'Head Administrator',
  roleTeacher: 'Head of Studies',
  roleAccountant: 'Finance Officer',
}

export default function UserManagement() {
  const { t } = useLanguage()
  const [adding, setAdding] = useState(false)
  const [active, setActive] = useState(adminProfiles.map((p) => p.id))

  const summary = [
    { label: t('userMgmt.users'), value: adminProfiles.length, tone: 'border-t-pine' },
    { label: t('common.active'), value: active.length, tone: 'border-t-success' },
  ]

  return (
    <div>
      <PageHeader
        title={t('userMgmt.title')}
        subtitle={t('userMgmt.subtitle')}
        actions={
          <Button icon={<IconPlus size={16} />} onClick={() => setAdding((v) => !v)}>Add User</Button>
        }
      />

      <div className="mb-[18px] grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-[14px]">
        {summary.map((s) => (
          <Card key={s.label} pad={16} className={cn('border-t-[3px]', s.tone)}>
            <p className="m-0 text-[12px] font-semibold text-muted">{s.label}</p>
            <p className="mt-[6px] mb-0 text-[26px] font-extrabold text-ink">{s.value}</p>
          </Card>
        ))}
      </div>

      {adding && (
        <Card pad={18} className="mb-[18px] border-l-[3px] border-l-pine">
          <p className="m-0 text-[13.5px] text-muted">
            Add a new admin account — name, email and role.
          </p>
          <div className="mt-3 flex gap-[10px]">
            <Button size="sm" tone="success" onClick={() => setAdding(false)}>{t('common.add')}</Button>
            <Button size="sm" tone="ghost" onClick={() => setAdding(false)}>{t('common.cancel')}</Button>
          </div>
        </Card>
      )}

      <Card pad={18}>
        <CardHeader title={t('userMgmt.users')} />
        <div className="flex flex-col">
          {adminProfiles.map((p) => {
            const isActive = active.includes(p.id)
            return (
              <div key={p.id} className="flex items-center gap-3.5 border-b border-line px-1 py-3">
                <span
                  className="inline-flex size-[40px] items-center justify-center rounded-full text-[12px] font-extrabold"
                  style={{ background: `${p.color}1A`, color: p.color }}
                >
                  {p.name.split(' ').map((x) => x[0]).slice(0, 2).join('')}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="m-0 text-[14px] font-bold text-ink">{p.name}</p>
                  <p className="mt-[2px] mb-0 text-[12px] text-muted">{p.email || `${p.id.toLowerCase()}@school.edu.np`}</p>
                </div>
                <div className="text-right">
                  <p className="m-0 text-[12.5px] font-semibold text-body">{roleNames[p.roleKey] || p.roleKey}</p>
                  <p className="mt-[2px] mb-0 text-[11px] text-muted">{p.permissions.join(' · ')}</p>
                </div>
                <Badge tone={isActive ? 'success' : 'neutral'} dot>{isActive ? t('statuses.active') : '—'}</Badge>
                <Button size="sm" tone="outline" onClick={() => setActive((a) => (isActive ? a.filter((x) => x !== p.id) : [...a, p.id]))}>
                  {isActive ? t('statuses.withdrawn') : t('statuses.active')}
                </Button>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
