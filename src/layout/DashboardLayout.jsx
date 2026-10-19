import { Suspense, useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import RouteFallback from '../components/RouteFallback.jsx'
import { useAdminAuth } from '../auth/AdminAuth.jsx'
import { useLanguage } from '../i18n.jsx'
import { cn } from '../lib/cn.js'
import {
  IconDashboard,
  IconMonks,
  IconAttendance,
  IconSettings,
  IconSearch,
  IconGlobe,
  IconBell,
  IconChevron,
  IconLogout,
  IconUser,
  IconBuilding,
  IconUsers,
  IconCalendar,
} from '../components/icons.jsx'

const navGroups = [
  {
    labelKey: 'nav.groupOperational',
    items: [
      { path: '/admin/monks', labelKey: 'nav.monks', icon: IconMonks },
      { path: '/admin/attendance', labelKey: 'nav.attendance', icon: IconAttendance },
    ],
  },
  {
    labelKey: 'nav.groupAdministration',
    items: [
      { path: '/admin/admissions', labelKey: 'nav.admissions', icon: IconUser },
      { path: '/admin/houses', labelKey: 'nav.houses', icon: IconBuilding },
    ],
  },
  {
    labelKey: 'nav.groupContent',
    items: [
      { path: '/admin/content', labelKey: 'nav.content', icon: IconSettings },
      { path: '/admin/events', labelKey: 'nav.events', icon: IconCalendar },
    ],
  },
  {
    labelKey: 'nav.groupSystem',
    items: [
      { path: '/admin/users', labelKey: 'nav.users', icon: IconUsers },
      { path: '/admin/settings', labelKey: 'nav.settings', icon: IconSettings },
      { path: '/admin/notifications', labelKey: 'nav.notifications', icon: IconBell },
    ],
  },
]

function NotificationsDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const [items, setItems] = useState(() => [
    { id: 1, text: 'New monk admitted to Level 3', time: '2h', read: false },
    { id: 2, text: 'Monthly fee of Tenzin Dorje settled', time: '5h', read: false },
    { id: 3, text: 'Philosophy debate session scheduled', time: '1d', read: true },
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
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative inline-flex size-10 cursor-pointer items-center justify-center rounded-md border border-line bg-surface text-body transition-colors hover:bg-surface-alt"
      >
        <IconBell size={18} />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-danger px-1 text-[10px] font-extrabold text-white">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute top-[calc(100%+8px)] right-0 z-[60] w-[300px] overflow-hidden rounded-lg border border-line bg-surface shadow-pop animate-fade-up">
          <div className="flex items-center justify-between border-b border-line px-3.5 py-3">
            <span className="text-[13px] font-bold text-ink">Notifications</span>
            <button
              type="button"
              onClick={() => setItems((it) => it.map((x) => ({ ...x, read: true })))}
              className="cursor-pointer border-none bg-transparent text-xs font-semibold text-info"
            >
              Mark all as read
            </button>
          </div>
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                'flex items-center gap-2.5 border-b border-line px-3.5 py-2.5',
                item.read ? 'bg-surface' : 'bg-pine-soft',
              )}
            >
              <span className={cn('size-2 shrink-0 rounded-full', item.read ? 'bg-line' : 'bg-pine')} />
              <div>
                <p className="m-0 text-[13px] text-ink">{item.text}</p>
                <span className="text-[11px] text-muted">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ProfileBadge() {
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
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex cursor-pointer items-center gap-2.5 rounded-lg border border-line bg-surface px-2 py-1.5"
      >
        <span className="inline-flex size-[34px] items-center justify-center rounded-full bg-linear-to-br from-pine to-ink text-xs font-extrabold text-white">
          {initials}
        </span>
        <span className="hidden text-left leading-tight sm:block">
          <span className="block text-[13px] font-bold text-ink">Lama Tsering Norbu</span>
          <span className="block text-[11px] text-muted">Head Administrator</span>
        </span>
        <span className={cn('inline-flex text-muted transition-transform duration-150', open && 'rotate-180')}>
          <IconChevron size={14} color="currentColor" />
        </span>
      </button>
      {open && (
        <div className="absolute top-[calc(100%+8px)] right-0 z-[60] w-[230px] overflow-hidden rounded-lg border border-line bg-surface shadow-pop animate-fade-up">
          <div className="flex items-center gap-3 border-b border-line p-4">
            <span className="inline-flex size-[42px] items-center justify-center rounded-full bg-linear-to-br from-pine to-ink text-sm font-extrabold text-white">
              {initials}
            </span>
            <div>
              <p className="m-0 text-[13px] font-bold text-ink">Lama Tsering Norbu</p>
              <p className="mt-0.5 mb-0 text-xs text-muted">Head Administrator</p>
            </div>
          </div>
          <div className="p-1.5">
            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-2.5 rounded-sm border-none bg-transparent px-2.5 py-[9px] text-[13px] text-ink"
            >
              <IconUser size={16} color="currentColor" />
              Edit profile
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full cursor-pointer items-center gap-2.5 rounded-sm border-none bg-transparent px-2.5 py-[9px] text-[13px] text-danger"
            >
              <IconLogout size={16} />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const sideLinkClass = ({ isActive }) =>
  cn(
    'flex items-center gap-3 rounded-md border-l-[3px] px-3.5 text-[13.5px] no-underline transition-[background,color]',
    isActive
      ? 'border-sage bg-pine font-bold text-white'
      : 'border-transparent font-medium text-[#F6E8D8]/[0.82] hover:bg-white/5',
  )

export default function DashboardLayout() {
  const { t } = useLanguage()
  const [search, setSearch] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-mint font-sans">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="admin-overlay fixed inset-0 z-[39] bg-black/40"
        />
      )}

      <aside
        className={cn('admin-sidebar fixed top-0 bottom-0 left-0 z-40 flex w-[250px] flex-col bg-ink text-[#F3EFE4] shadow-[4px_0_20px_rgba(0,0,0,0.18)] transition-transform duration-[250ms]', sidebarOpen && 'open')}
      >
        <div className="border-b border-white/[0.12] px-5 pt-[22px] pb-[18px]">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-[42px] shrink-0 items-center justify-center rounded-lg border border-sage/40 bg-linear-to-br from-pine to-[#285848] text-xl font-extrabold text-sage-light">
              TMS
            </span>
            <div className="leading-tight">
              <span className="block text-sm font-bold text-white">Tharlam</span>
              <span className="block text-xs font-semibold text-sage-light">Manjushree School</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-3">
          <NavLink
            to="/admin"
            end
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              cn(sideLinkClass({ isActive }), 'my-[10px] mb-1.5 py-[11px]')
            }
          >
            <IconDashboard size={18} />
            <span>{t('nav.dashboard')}</span>
          </NavLink>

          {navGroups.map((group) => (
            <div key={group.labelKey}>
              <p className="mx-3.5 mt-4 mb-1.5 text-[10.5px] font-bold tracking-[1px] text-[#F6E8D8]/50 uppercase">
                {t(group.labelKey)}
              </p>
              {group.items.map(({ path, labelKey, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) => cn(sideLinkClass({ isActive }), 'mb-[3px] py-[10px]')}
                >
                  <Icon size={18} />
                  <span>{t(labelKey)}</span>
                </NavLink>
              ))}
            </div>
          ))}

          <Link
            to="/"
            className="mt-4 flex items-center gap-3 rounded-md border-l-[3px] border-transparent bg-white/[0.06] px-3.5 py-[11px] text-[13.5px] font-semibold text-sage-light no-underline"
          >
            <IconGlobe size={18} color="#98B898" />
            <span>{t('nav.publicSite')}</span>
          </Link>
        </nav>

        <div className="border-t border-white/[0.12] p-3.5">
          <p className="m-0 text-center text-[11px] text-[#F3EFE4]/50">
            All rights reserved. · © {new Date().getFullYear()}
          </p>
        </div>
      </aside>

      <div className="admin-main ml-[250px] flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3.5 border-b border-line bg-white/92 px-6 py-3 backdrop-blur-[8px]">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="admin-hamburger hidden size-10 shrink-0 cursor-pointer items-center justify-center rounded-md border border-line bg-surface text-lg text-ink"
          >
            ☰
          </button>

          <div className="relative max-w-[420px] min-w-0 flex-1">
            <span className="absolute top-1/2 left-3 inline-flex -translate-y-1/2 text-muted">
              <IconSearch size={16} />
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Quick search…"
              className="w-full rounded-md border border-line bg-surface-alt py-[9px] pr-3.5 pl-9 text-[13px] font-sans text-ink outline-none"
            />
          </div>

          <div className="ml-auto flex items-center gap-2.5">
            <NotificationsDropdown />
            <ProfileBadge />
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
