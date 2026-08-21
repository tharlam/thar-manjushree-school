import { useState } from 'react'
import { useLanguage } from '../i18n.jsx'
import { colors, radii } from '../theme.js'
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

  const inputRow = { display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }

  return (
    <div>
      <PageHeader title={t('settingsPage.title')} subtitle={t('settingsPage.subtitle')} />

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card pad={18}>
          <CardHeader title={t('settingsPage.schoolInfo')} />
          <div style={inputRow}>
            <Input label={t('settingsPage.schoolName')} value={school.name} onChange={set('name')} style={{ flex: 2 }} />
            <Input label={t('settingsPage.established')} value={school.established} onChange={set('established')} style={{ flex: 1 }} />
          </div>
          <div style={inputRow}>
            <Input label={t('settingsPage.address')} value={school.address} onChange={set('address')} style={{ flex: 3 }} />
          </div>
          <div style={inputRow}>
            <Input label={t('settingsPage.phone')} value={school.phone} onChange={set('phone')} style={{ flex: 1 }} />
            <Input label={t('settingsPage.email')} value={school.email} onChange={set('email')} style={{ flex: 1.2 }} />
          </div>
          <div style={inputRow}>
            <Input label={t('settingsPage.principal')} value={school.principal} onChange={set('principal')} style={{ flex: 1 }} />
            <Input label={t('settingsPage.motto')} value={school.motto} onChange={set('motto')} style={{ flex: 1.4 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
            <Button onClick={showToast}>{t('common.save')}</Button>
          </div>
        </Card>

        <Card pad={18}>
          <CardHeader title={t('settingsPage.profileTitle')} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 56, height: 56, borderRadius: '50%', background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800 }}>
                TN
              </span>
              <div>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: colors.text }}>{t('app.profileName')}</p>
                <p style={{ margin: '3px 0 0', fontSize: 12.5, color: colors.muted }}>{t('app.profileRole')}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button size="sm" icon={<IconEdit size={14} />} onClick={showToast}>{t('settingsPage.editProfile')}</Button>
              <Button size="sm" tone="outline" icon={<IconDownload size={14} />} onClick={exportCsv}>{t('settingsPage.exportData')}</Button>
            </div>
            <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: 12 }}>
              <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 700, color: colors.textSoft }}>{t('settingsPage.adminProfiles')}</p>
              {adminProfiles.map((a) => (
                <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: `1px solid ${colors.border}` }}>
                  <span style={{ width: 30, height: 30, borderRadius: '50%', background: `${a.color}1A`, color: a.color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>
                    {a.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: colors.text }}>{a.name}</p>
                    <p style={{ margin: 0, fontSize: 11.5, color: colors.muted }}>{t(`settingsPage.${a.roleKey}`)}</p>
                  </div>
                  <span style={{ fontSize: 11, color: colors.muted, whiteSpace: 'nowrap' }}>{a.lastActive}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card pad={18} style={{ marginBottom: 16 }}>
        <CardHeader title={t('settingsPage.preferences')} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Toggle checked={prefs.notifyEnrollment} onChange={setP('notifyEnrollment')} label={t('settingsPage.notifyEnrollment')} />
            <Toggle checked={prefs.notifyAttendance} onChange={setP('notifyAttendance')} label={t('settingsPage.notifyAttendance')} />
            <Toggle checked={prefs.notifyFees} onChange={setP('notifyFees')} label={t('settingsPage.notifyFees')} />
            <Toggle checked={prefs.notifyDonations} onChange={setP('notifyDonations')} label={t('settingsPage.notifyDonations')} />
            <Toggle checked={prefs.publicDash} onChange={setP('publicDash')} label={t('settingsPage.publicDash')} />
            <Toggle checked={prefs.backup} onChange={setP('backup')} label={t('settingsPage.backup')} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
          <Button onClick={showToast}>{t('common.save')}</Button>
        </div>
      </Card>

      <Card pad={18} style={{ border: `1px solid ${colors.danger}44`, background: '#FDF6F5' }}>
        <CardHeader title={t('settingsPage.dangerZone')} />
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
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
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(36,33,28,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ width: '100%', maxWidth: 380, background: colors.surface, borderRadius: radii.lg, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', padding: 22 }}>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: colors.text }}>{t('settingsPage.confirmReset')}</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 18, justifyContent: 'flex-end' }}>
              <Button tone="outline" onClick={() => setConfirmReset(false)}>{t('common.cancel')}</Button>
              <Button tone="danger" onClick={() => { setConfirmReset(false); showToast() }}>{t('common.reset')}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
