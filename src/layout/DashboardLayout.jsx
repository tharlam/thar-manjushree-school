import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n.jsx'
import { useAdminAuth } from '../auth/AdminAuth.jsx'
import { colors, font, radii, shadows } from '../theme.js'
import {
  IconDashboard,
  IconMonks,
  IconClasses,
  IconAttendance,
  IconFees,
  IconSettings,
  IconSearch,
  IconGlobe,
  IconBell,
  IconChevron,
  IconLogout,
  IconUser,
} from '../components/icons.jsx'

const navItems = [
  { path: '/admin', key: 'nav.dashboard', icon: IconDashboard },
  { path: '/admin/monks', key: 'nav.monks', icon: IconMonks },
  { path: '/admin/classes', key: 'nav.classes', icon: IconClasses },
  { path: '/admin/attendance', key: 'nav.attendance', icon: IconAttendance },
  { path: '/admin/fees', key: 'nav.fees', icon: IconFees },
  { path: '/admin/content', key: 'nav.content', icon: IconSettings },
  { path: '/admin/settings', key: 'nav.settings', icon: IconSettings },
]

const langMeta = {
  en: { label: 'English', flag: 'EN' },
  ne: { label: 'नेपाली', flag: 'ने' },
  bo: { label: 'བོད་ཡིག', flag: 'བོ' },
}

function LanguageDropdown({ compact }) {
  const { lang, setLang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const current = langMeta[lang] || langMeta.en

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          borderRadius: radii.md,
          border: `1px solid ${colors.border}`,
          background: colors.surface,
          color: colors.text,
          fontFamily: font.sans,
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'border-color .15s ease',
          ':hover': { borderColor: colors.accent },
        }}
      >
        <IconGlobe size={16} color={colors.primary} />
        {!compact && <span>{t('header.language')}</span>}
        <span style={{ color: colors.textSoft, fontWeight: 700 }}>{current.flag}</span>
        <IconChevron size={14} color={colors.muted} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s ease' }} />
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            zIndex: 60,
            minWidth: 190,
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: radii.lg,
            boxShadow: shadows.pop,
            padding: 6,
            animation: 'fadeUp .15s ease',
          }}
        >
          <p style={{ margin: '6px 10px', fontSize: 11, fontWeight: 700, color: colors.muted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {t('header.language')}
          </p>
          {['en', 'ne', 'bo'].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => {
                setLang(code)
                setOpen(false)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '8px 10px',
                borderRadius: radii.sm,
                background: lang === code ? colors.primarySoft : 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: colors.text,
                fontFamily: font.sans,
                fontSize: 13,
                fontWeight: lang === code ? 700 : 500,
                ':hover': { background: lang === code ? colors.primarySoft : colors.surfaceAlt },
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <span style={{ display: 'inline-flex', width: 24, height: 24, borderRadius: '50%', background: colors.bg, alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
                  {langMeta[code].flag}
                </span>
                {langMeta[code].label}
              </span>
              {lang === code && <span style={{ color: colors.primary, fontSize: 12, fontWeight: 800 }}>●</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function NotificationsDropdown() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const [items, setItems] = useState(() => [
    { id: 1, textKey: 'dashboard.act1', time: '2h', read: false },
    { id: 2, textKey: 'dashboard.act2', time: '5h', read: false },
    { id: 3, textKey: 'dashboard.act3', time: '1d', read: true },
  ])

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const unread = items.filter((i) => !i.read).length

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: radii.md,
          border: `1px solid ${colors.border}`,
          background: colors.surface,
          color: colors.textSoft,
          cursor: 'pointer',
          ':hover': { background: colors.surfaceAlt },
        }}
      >
        <IconBell size={18} />
        {unread > 0 && (
          <span
            style={{
              position: 'absolute',
              top: -4,
              right: -4,
              minWidth: 17,
              height: 17,
              padding: '0 4px',
              borderRadius: radii.round,
              background: colors.danger,
              color: '#fff',
              fontSize: 10,
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            zIndex: 60,
            width: 300,
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: radii.lg,
            boxShadow: shadows.pop,
            overflow: 'hidden',
            animation: 'fadeUp .15s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderBottom: `1px solid ${colors.border}` }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{t('header.notifications')}</span>
            <button
              type="button"
              onClick={() => setItems((it) => it.map((x) => ({ ...x, read: true })))}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.info, fontSize: 12, fontWeight: 600 }}
            >
              {t('header.markRead')}
            </button>
          </div>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                background: item.read ? colors.surface : colors.primarySoft,
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.read ? colors.border : colors.primary, flexShrink: 0 }} />
              <div>
                <p style={{ margin: 0, fontSize: 13, color: colors.text }}>{t(item.textKey)}</p>
                <span style={{ fontSize: 11, color: colors.muted }}>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ProfileBadge() {
  const { t } = useLanguage()
  const { logout } = useAdminAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const initials = 'TN'

  const handleSignOut = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          padding: '5px 8px',
          borderRadius: radii.lg,
          border: `1px solid ${colors.border}`,
          background: colors.surface,
          cursor: 'pointer',
        }}
      >
        <span
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
            color: '#fff',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 800,
          }}
        >
          {initials}
        </span>
        <span style={{ textAlign: 'left', lineHeight: 1.2 }}>
          <span style={{ display: 'block', fontSize: 13, fontWeight: 700, color: colors.text }}>{t('app.profileName')}</span>
          <span style={{ display: 'block', fontSize: 11, color: colors.muted }}>{t('app.profileRole')}</span>
        </span>
        <IconChevron size={14} color={colors.muted} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s ease' }} />
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            zIndex: 60,
            width: 230,
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: radii.lg,
            boxShadow: shadows.pop,
            overflow: 'hidden',
            animation: 'fadeUp .15s ease',
          }}
        >
          <div style={{ padding: 16, borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                color: '#fff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 800,
              }}
            >
              {initials}
            </span>
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: colors.text }}>{t('app.profileName')}</p>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: colors.muted }}>{t('app.profileRole')}</p>
            </div>
          </div>
          <div style={{ padding: 6 }}>
            <button type="button" style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 10px', borderRadius: radii.sm, border: 'none', background: 'transparent', cursor: 'pointer', color: colors.text, fontSize: 13 }}>
              <IconUser size={16} color={colors.textSoft} />
              {t('settingsPage.editProfile')}
            </button>
            <button type="button" onClick={handleSignOut} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 10px', borderRadius: radii.sm, border: 'none', background: 'transparent', cursor: 'pointer', color: colors.danger, fontSize: 13 }}>
              <IconLogout size={16} />
              {t('app.backToLogin')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function DashboardLayout() {
  const { t } = useLanguage()
  const [search, setSearch] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: colors.bg, fontFamily: font.sans }}>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="admin-overlay"
          style={{ position: 'fixed', inset: 0, zIndex: 39, background: 'rgba(0,0,0,0.4)' }}
        />
      )}

      <aside
        className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: 250,
          background: `linear-gradient(180deg, ${colors.sidebar} 0%, ${colors.primaryDark} 100%)`,
          color: '#F6E8D8',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 40,
          boxShadow: '4px 0 20px rgba(0,0,0,0.18)',
          transition: 'transform .25s ease',
        }}
      >
        <div style={{ padding: '22px 20px 18px', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                width: 42,
                height: 42,
                borderRadius: radii.lg,
                background: `linear-gradient(135deg, ${colors.accent}, #C7701F)`,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                fontWeight: 800,
                color: '#fff',
                flexShrink: 0,
              }}
            >
              ད
            </span>
            <div style={{ lineHeight: 1.25 }}>
              <span style={{ display: 'block', fontSize: 14, fontWeight: 800, color: '#fff' }}>Tharlam</span>
              <span style={{ display: 'block', fontSize: 12, color: '#E5B98B', fontWeight: 600 }}>Manjushree School</span>
            </div>
          </div>
        </div>

        <p
          style={{
            margin: '18px 20px 8px',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: 'rgba(246, 232, 216, 0.55)',
          }}
        >
          {t('app.admin')}
        </p>

        <nav style={{ flex: 1, overflowY: 'auto', padding: '0 12px 12px' }}>
          {navItems.map(({ path, key, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/admin'}
              onClick={() => setSidebarOpen(false)}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '11px 14px',
                marginBottom: 4,
                borderRadius: radii.md,
                textDecoration: 'none',
                fontSize: 13.5,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#fff' : 'rgba(246, 232, 216, 0.82)',
                background: isActive ? colors.sidebarActive : 'transparent',
                borderLeft: isActive ? `3px solid ${colors.accent}` : '3px solid transparent',
                transition: 'background .15s ease, color .15s ease',
              })}
            >
              <Icon size={18} color={undefined} />
              <span>{t(key)}</span>
            </NavLink>
          ))}

          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '11px 14px',
              marginTop: 8,
              borderRadius: radii.md,
              textDecoration: 'none',
              fontSize: 13.5,
              fontWeight: 600,
              color: '#E5B98B',
              background: 'rgba(255,255,255,0.06)',
              borderLeft: '3px solid transparent',
            }}
          >
            <IconGlobe size={18} color="#E5B98B" />
            <span>{t('nav.publicSite')}</span>
          </Link>
        </nav>

        <div style={{ padding: 14, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          <p style={{ margin: 0, fontSize: 11, color: 'rgba(246, 232, 216, 0.5)', textAlign: 'center' }}>
            {t('site.footer.rights')} · © {new Date().getFullYear()}
          </p>
        </div>
      </aside>

      <div style={{ flex: 1, marginLeft: 250, display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className="admin-main">
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '12px 24px',
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(8px)',
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="admin-hamburger"
            style={{
              display: 'none',
              width: 40,
              height: 40,
              borderRadius: radii.md,
              border: `1px solid ${colors.border}`,
              background: colors.surface,
              color: colors.text,
              cursor: 'pointer',
              fontSize: 18,
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            ☰
          </button>

          <div style={{ position: 'relative', flex: 1, maxWidth: 420 }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: colors.muted, display: 'inline-flex' }}>
              <IconSearch size={16} />
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('header.quickSearch')}
              style={{
                width: '100%',
                padding: '9px 14px 9px 36px',
                borderRadius: radii.md,
                border: `1px solid ${colors.border}`,
                background: colors.surfaceAlt,
                fontSize: 13,
                fontFamily: font.sans,
                color: colors.text,
                outline: 'none',
              }}
            />
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
            <LanguageDropdown />
            <NotificationsDropdown />
            <ProfileBadge />
          </div>
        </header>

        <main style={{ flex: 1, padding: 24, overflow: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
