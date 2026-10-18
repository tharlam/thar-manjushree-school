import { Suspense, useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n.jsx'
import { cn } from '../lib/cn.js'
import { IconChevron, IconX } from '../components/icons.jsx'
import RouteFallback from '../components/RouteFallback.jsx'

const navItems = [
  { path: '/', key: 'site.nav.home', end: true },
  { path: '/about', key: 'site.nav.about' },
  { path: '/programs', key: 'site.nav.programs' },
  { path: '/houses', key: 'site.nav.houses' },
  { path: '/teachers', key: 'site.nav.teachers' },
  { path: '/admissions', key: 'site.nav.admissions' },
  { path: '/events', key: 'site.nav.events' },
  { path: '/gallery', key: 'site.nav.gallery' },
  { path: '/donate', key: 'site.nav.donations' },
  { path: '/contact', key: 'site.nav.contact' },
]

const topNav = [
  { type: 'link', path: '/', key: 'site.nav.home', end: true },
  {
    type: 'dropdown',
    labelKey: 'site.nav.about',
    children: [
      { path: '/about', key: 'site.nav.about' },
      { path: '/houses', key: 'site.nav.houses' },
      { path: '/teachers', key: 'site.nav.teachers' },
    ],
  },
  {
    type: 'dropdown',
    labelKey: 'site.nav.programs',
    children: [
      { path: '/programs', key: 'site.nav.programs' },
      { path: '/events', key: 'site.nav.events' },
    ],
  },
  { type: 'link', path: '/admissions', key: 'site.nav.admissions' },
  { type: 'link', path: '/gallery', key: 'site.nav.gallery' },
  {
    type: 'dropdown',
    labelKey: 'site.nav.donations',
    children: [
      { path: '/donate', key: 'site.nav.donations' },
      { path: '/contact', key: 'site.nav.contact' },
    ],
  },
]

const langMeta = {
  en: { label: 'English', flag: 'EN' },
  ne: { label: 'नेपाली', flag: 'ने' },
  bo: { label: 'བོད་ཡིག', flag: 'བོ' },
}

export function LanguageSelector({ compact }) {
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
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t('header.language')}
        className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-line bg-surface px-3 py-2 text-[13px] font-semibold font-sans text-ink transition-[border-color] hover:border-sage"
      >
        <span className="font-bold text-body">{current.flag}</span>
        {!compact && <span className="text-ink">{current.label}</span>}
        <IconChevron size={12} className="text-muted" />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+8px)] right-0 z-[60] min-w-[190px] rounded-lg border border-line bg-surface p-1.5 shadow-pop animate-fade-up">
          <p className="mx-2.5 my-1.5 text-[11px] font-bold tracking-[0.5px] text-muted uppercase">
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
              className={cn(
                'flex w-full cursor-pointer items-center justify-between rounded-sm border-none px-2.5 py-2 text-[13px] font-sans text-ink',
                lang === code ? 'bg-pine-soft font-bold' : 'bg-transparent font-medium',
              )}
            >
              <span className="inline-flex items-center gap-2.5">
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-surface-alt text-[11px] font-bold">
                  {langMeta[code].flag}
                </span>
                {langMeta[code].label}
              </span>
              {lang === code && <span className="inline-flex size-1.5 rounded-full bg-pine" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function DesktopNav() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(null)
  const rootRef = useRef(null)

  useEffect(() => {
    const onClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(null)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const linkClass = ({ isActive }) =>
    cn(
      'inline-flex cursor-pointer items-center gap-1.5 rounded-full px-[13px] py-2 text-[13px] whitespace-nowrap no-underline transition-[background,color]',
      isActive
        ? 'bg-pine-soft font-bold text-pine ring-1 ring-pine/15'
        : 'bg-transparent font-medium text-body hover:bg-pine-soft/60 hover:text-pine',
    )

  return (
    <nav ref={rootRef} className="flex flex-1 items-center justify-center gap-0.5">
      {topNav.map((item) => {
        if (item.type === 'link') {
          return (
            <NavLink key={item.path} to={item.path} end={item.end} className={linkClass}>
              {t(item.key)}
            </NavLink>
          )
        }
        const isOpen = open === item.labelKey
        return (
          <div key={item.labelKey} className="relative">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : item.labelKey)}
              aria-expanded={isOpen}
              className={cn(
                'inline-flex cursor-pointer items-center gap-1.5 rounded-full border-none px-[13px] py-2 text-[13px] font-sans whitespace-nowrap transition-[background,color]',
                isOpen
                  ? 'bg-pine-soft font-bold text-pine ring-1 ring-pine/15'
                  : 'bg-transparent font-medium text-body hover:bg-pine-soft/60 hover:text-pine',
              )}
            >
              {t(item.labelKey)}
              <IconChevron size={12} className={cn('transition-transform duration-150', isOpen && 'rotate-180')} />
            </button>
            {isOpen && (
              <div className="absolute top-[calc(100%+8px)] left-0 z-[60] min-w-[210px] rounded-lg border border-line bg-surface p-1.5 shadow-pop animate-fade-up">
                {item.children.map((child) => (
                  <NavLink
                    key={child.path}
                    to={child.path}
                    onClick={() => setOpen(null)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center rounded-sm px-3 py-2.5 text-[13px] whitespace-nowrap no-underline',
                        isActive ? 'bg-pine-soft font-bold text-pine' : 'bg-transparent font-medium text-ink hover:bg-pine-soft/60',
                      )
                    }
                  >
                    <span className="mr-2 size-1.5 shrink-0 rounded-full bg-line" />
                    {t(child.key)}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}

function MobileNav({ open, onClose }) {
  const { t } = useLanguage()
  return (
    <>
      {open && (
        <div onClick={onClose} className="fixed inset-0 z-[70] flex justify-end bg-ink/50">
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-[min(320px,85vw)] flex-col gap-1 overflow-y-auto bg-surface p-5 px-[18px] shadow-pop animate-slide-in-right"
          >
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-[15px] font-extrabold text-ink">{t('site.menu')}</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex size-[34px] cursor-pointer items-center justify-center rounded-md border border-line bg-surface text-body"
              >
                <IconX size={16} />
              </button>
            </div>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-[11px] text-sm no-underline',
                    isActive ? 'bg-pine-soft font-bold text-pine' : 'bg-transparent font-medium text-ink',
                  )
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
            <div className="mt-3.5 flex items-center justify-between">
              <LanguageSelector compact />
              <Link to="/admin" onClick={onClose} className="text-[13px] font-bold text-sage no-underline">
                {t('site.staffLogin')} →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const LOGO_CANDIDATES = ['/images/logo.svg', '/images/logo.png', '/images/logo.webp']
const BRAND_ABBR = 'TMS'
const BRAND_FULL = 'Tharlam Manjushree School'

export function Brand({ size = 44, showText = false }) {
  const [candidate, setCandidate] = useState(0)
  const [missing, setMissing] = useState(false)
  const src = LOGO_CANDIDATES[candidate]

  return (
    <Link
      to="/"
      aria-label={BRAND_FULL}
      title={BRAND_FULL}
      className="inline-flex shrink-0 items-center gap-[11px] no-underline"
    >
      <span
        className="inline-flex shrink-0 items-center justify-center overflow-hidden border border-sage/50 bg-linear-to-br from-ink to-pine shadow-[0_4px_14px_rgba(15,42,42,0.18)]"
        style={{ width: size, height: size, borderRadius: Math.round(size * 0.3) }}
      >
        {!missing && src ? (
          <img
            src={src}
            alt=""
            onError={() => {
              if (candidate < LOGO_CANDIDATES.length - 1) setCandidate(candidate + 1)
              else setMissing(true)
            }}
            className="block h-full w-full object-contain"
          />
        ) : (
          <span
            className="font-heading font-bold tracking-[0.5px] text-sage-light"
            style={{ fontSize: Math.round(size * 0.34), lineHeight: 1 }}
          >
            {BRAND_ABBR}
          </span>
        )}
      </span>
      {showText && (
        <span className="block font-heading text-base font-bold tracking-[0.4px] text-ink">{BRAND_ABBR}</span>
      )}
    </Link>
  )
}

export default function PublicLayout() {
  const { t, lang } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 960)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location.pathname, lang])

  const brand = <Brand />

  return (
    <div className="flex min-h-screen flex-col bg-mint font-sans">
      <header className="sticky top-0 z-50 border-b border-line bg-white/92 shadow-[0_2px_18px_rgba(15,42,42,0.06)] backdrop-blur-[10px]">
        <div className="h-[3px] bg-linear-to-r from-sage via-sage-light to-sage" />
        <div className="mx-auto flex max-w-[1240px] items-center gap-3.5 px-[22px] py-2.5">
          {brand}
          {isMobile ? (
            <div className="ml-auto flex items-center gap-2.5">
              <LanguageSelector compact />
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label={t('site.menu')}
                className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-line bg-surface px-3 py-2 text-[13px] font-semibold font-sans text-ink"
              >
                {t('site.menu')}
              </button>
            </div>
          ) : (
            <>
              <DesktopNav />
              <div className="flex items-center gap-2.5">
                <LanguageSelector />
                <Link
                  to="/donate"
                  className="rounded-full bg-linear-to-br from-sage to-sage-light px-[18px] py-[9px] text-[12.5px] font-extrabold whitespace-nowrap text-ink no-underline shadow-sage"
                >
                  {t('site.donateNow')}
                </Link>
                <Link
                  to="/admin"
                  className="rounded-full border border-line bg-surface px-3.5 py-2 text-[12.5px] font-bold whitespace-nowrap text-body no-underline"
                >
                  {t('site.staffLogin')}
                </Link>
              </div>
            </>
          )}
        </div>
      </header>

      <main className="flex-1">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>

      <footer className="bg-ink text-[#EAF6EE]">
        <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-7 px-[22px] pt-12 pb-5">
          <div>
            <div className="mb-3.5 flex items-center gap-[11px]">
              <span className="text-[15px] font-bold text-white">Thar Manjushree School</span>
            </div>
            <p className="m-0 text-[13px] leading-[1.7] text-[#EAF6EE]/70">{t('site.footer.about')}</p>
          </div>

          <div>
            <p className="mt-0 mb-3 text-xs font-bold tracking-[1.4px] text-sage-light uppercase">{t('site.footer.linksTitle')}</p>
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-[13px] text-[#EAF6EE]/75 no-underline transition-colors hover:text-sage-light"
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mt-0 mb-3 text-xs font-bold tracking-[1.4px] text-sage-light uppercase">{t('site.footer.contactTitle')}</p>
            <p className="mt-0 mb-1.5 text-[13px] text-[#EAF6EE]/75">Boudhanath, Kathmandu 44600, Nepal</p>
            <p className="mt-0 mb-1.5 text-[13px] text-[#EAF6EE]/75">+977 1 449 2210</p>
            <p className="mt-0 mb-3.5 text-[13px] text-[#EAF6EE]/75">admin@thar-manjushree.edu.np</p>
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-br from-sage to-sage-light px-[18px] py-[9px] text-[12.5px] font-extrabold text-ink no-underline shadow-sage"
            >
              {t('site.donateNow')} →
            </Link>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-2.5 px-[22px] py-3.5">
            <span className="text-xs text-[#EAF6EE]/55">
              © {new Date().getFullYear()} Thar Manjushree School · {t('site.footer.rights')}
            </span>
            <span className="text-xs text-[#EAF6EE]/55">{t('app.name')}</span>
          </div>
        </div>
      </footer>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  )
}
