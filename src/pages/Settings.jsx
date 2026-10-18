import { useState } from 'react'
import { useLanguage } from '../i18n.jsx'
import { Card, CardHeader, Button, Input, Select, Toggle, Toast, PageHeader } from '../components/ui.jsx'
import { IconEdit, IconTrash, IconDownload } from '../components/icons.jsx'
import { adminProfiles } from '../data/index.js'

export default function Settings() {
  const { t } = useLanguage()

  const [school, setSchool] = useState({
    name: 'Tharlam Manjushree School',
    address: 'Boudhanath, Kathmandu 44600, Nepal',
    phone: '+977 1 449 2210',
    email: 'admin@tharlammanjushree.edu.np',
    principal: 'Lama Tsering Norbu',
    established: '1964',
    motto: 'Compassion, Wisdom, Discipline',
  })

  const [prefs, setPrefs] = useState({
    defaultLang: 'en',
    theme: 'light',
    academicYear: '2026/27',
    notifyEnrollment: true,
    notifyAttendance: true,
    notifyFees: true,
    notifyDonations: false,
    publicDash: false,
    backup: true,
  })

  const [toast, setToast] = useState(null)
  const [confirmReset, setConfirmReset] = useState(false)

  const showToast = () => {
    setToast(t('common.saved'))
    window.setTimeout(() => setToast(null), 2600)
  }

  const set = (key) => (v) => setSchool((s) => ({ ...s, [key]: v }))
  const setP = (key) => (v) => setPrefs((s) => ({ ...s, [key]: v }))

  const exportCsv = () => {
    const rows = adminProfiles.map((a) => [a.name, a.roleKey, a.permissions.join(';'), a.lastActive].join(','))
    const csv = ['Name,Role,Permissions,LastActive', ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'tms-export.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const inputRow = 'mb-3 flex flex-wrap gap-3'

  return (
    <div>
      <PageHeader title={t('settingsPage.title')} subtitle={t('settingsPage.subtitle')} />

      <div className="dashboard-grid-2col mb-4 grid grid-cols-[1.4fr_1fr] gap-4">
        <Card pad={18}>
          <CardHeader title={t('settingsPage.schoolInfo')} />
          <div className={inputRow}>
            <Input label={t('settingsPage.schoolName')} value={school.name} onChange={set('name')} className="flex-[2]" />
            <Input label={t('settingsPage.established')} value={school.established} onChange={set('established')} />
          </div>
          <div className={inputRow}>
            <Input label={t('settingsPage.address')} value={school.address} onChange={set('address')} className="flex-[3]" />
          </div>
          <div className={inputRow}>
            <Input label={t('settingsPage.phone')} value={school.phone} onChange={set('phone')} />
            <Input label={t('settingsPage.email')} value={school.email} onChange={set('email')} className="flex-[1.2]" />
          </div>
          <div className={inputRow}>
            <Input label={t('settingsPage.principal')} value={school.principal} onChange={set('principal')} />
            <Input label={t('settingsPage.motto')} value={school.motto} onChange={set('motto')} className="flex-[1.4]" />
          </div>
          <div className="mt-1 flex justify-end">
            <Button onClick={showToast}>{t('common.save')}</Button>
          </div>
        </Card>

        <Card pad={18}>
          <CardHeader title={t('settingsPage.profileTitle')} />
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-3.5">
              <span className="inline-flex size-14 items-center justify-center rounded-full bg-linear-to-br from-pine to-ink text-[18px] font-extrabold text-white">
                TN
              </span>
              <div>
                <p className="m-0 text-[15px] font-extrabold text-ink">{t('app.profileName')}</p>
                <p className="mt-[3px] mb-0 text-[12.5px] text-muted">{t('app.profileRole')}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" icon={<IconEdit size={14} />} onClick={showToast}>{t('settingsPage.editProfile')}</Button>
              <Button size="sm" tone="outline" icon={<IconDownload size={14} />} onClick={exportCsv}>{t('settingsPage.exportData')}</Button>
            </div>
            <div className="border-t border-line pt-3">
              <p className="mt-0 mb-2 text-[12px] font-bold text-body">{t('settingsPage.adminProfiles')}</p>
              {adminProfiles.map((a) => (
                <div key={a.id} className="flex items-center gap-2.5 border-b border-line py-2">
                  <span
                    className="inline-flex size-[30px] items-center justify-center rounded-full text-[11px] font-extrabold"
                    style={{ background: `${a.color}1A`, color: a.color }}
                  >
                    {a.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                  </span>
                  <div className="flex-1">
                    <p className="m-0 text-[13px] font-bold text-ink">{a.name}</p>
                    <p className="m-0 text-[11.5px] text-muted">{t(`settingsPage.${a.roleKey}`)}</p>
                  </div>
                  <span className="text-[11px] whitespace-nowrap text-muted">{a.lastActive}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card pad={18} className="mb-4">
        <CardHeader title={t('settingsPage.preferences')} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-3.5">
          <div className="flex flex-col gap-3">
            <Select
              label={t('settingsPage.defaultLang')}
              value={prefs.defaultLang}
              onChange={setP('defaultLang')}
              options={[{ value: 'en', label: t('header.english') }, { value: 'ne', label: t('header.nepali') }, { value: 'bo', label: t('header.tibetan') }]}
            />
            <Select
              label={t('settingsPage.theme')}
              value={prefs.theme}
              onChange={setP('theme')}
              options={[{ value: 'light', label: t('settingsPage.light') }, { value: 'dark', label: t('settingsPage.dark') }]}
            />
            <Input label={t('settingsPage.academicYear')} value={prefs.academicYear} onChange={setP('academicYear')} />
          </div>
          <div className="flex flex-col gap-2.5">
            <Toggle checked={prefs.notifyEnrollment} onChange={setP('notifyEnrollment')} label={t('settingsPage.notifyEnrollment')} />
            <Toggle checked={prefs.notifyAttendance} onChange={setP('notifyAttendance')} label={t('settingsPage.notifyAttendance')} />
            <Toggle checked={prefs.notifyFees} onChange={setP('notifyFees')} label={t('settingsPage.notifyFees')} />
            <Toggle checked={prefs.notifyDonations} onChange={setP('notifyDonations')} label={t('settingsPage.notifyDonations')} />
            <Toggle checked={prefs.publicDash} onChange={setP('publicDash')} label={t('settingsPage.publicDash')} />
            <Toggle checked={prefs.backup} onChange={setP('backup')} label={t('settingsPage.backup')} />
          </div>
        </div>
        <div className="mt-3.5 flex justify-end">
          <Button onClick={showToast}>{t('common.save')}</Button>
        </div>
      </Card>

      <Card pad={18} className="border-danger/25 bg-[#FDF6F5]">
        <CardHeader title={t('settingsPage.dangerZone')} />
        <div className="flex flex-wrap gap-3">
          <Button tone="danger" icon={<IconTrash size={15} />} onClick={() => setConfirmReset(true)}>
            {t('settingsPage.resetData')}
          </Button>
          <Button tone="outline" icon={<IconDownload size={15} />} onClick={exportCsv}>
            {t('settingsPage.exportData')}
          </Button>
        </div>
      </Card>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {confirmReset && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#24211C]/45 p-5">
          <div className="w-full max-w-[380px] rounded-lg bg-surface p-[22px] shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <p className="m-0 text-[15px] font-extrabold text-ink">{t('settingsPage.confirmReset')}</p>
            <div className="mt-4.5 flex justify-end gap-2.5">
              <Button tone="outline" onClick={() => setConfirmReset(false)}>{t('common.cancel')}</Button>
              <Button tone="danger" onClick={() => { setConfirmReset(false); showToast() }}>{t('common.reset')}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
