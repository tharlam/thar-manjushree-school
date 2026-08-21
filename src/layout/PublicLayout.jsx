import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n.jsx'
import { colors, font, radii, shadows } from '../theme.js'

const navItems = [
  { path: '/', key: 'site.nav.home', end: true },
  { path: '/tradition', key: 'site.nav.tradition' },
  { path: '/founder', key: 'site.nav.founder' },
  { path: '/lineage', key: 'site.nav.lineage' },
  { path: '/curriculum', key: 'site.nav.curriculum' },
  { path: '/schedule', key: 'site.nav.schedule' },
  { path: '/admissions', key: 'site.nav.admissions' },
  { path: '/gallery', key: 'site.nav.gallery' },
  { path: '/donations', key: 'site.nav.donations' },
  { path: '/contact', key: 'site.nav.contact' },
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
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t('header.language')}
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
        }}
      >
        <span style={{ color: colors.textSoft, fontWeight: 700 }}>{current.flag}</span>
        {!compact && <span style={{ color: colors.text }}>{current.label}</span>}
        <span style={{ fontSize: 10, color: colors.muted }}>▼</span>
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

function MobileNav({ open, onClose }) {
  const { t } = useLanguage()
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, zIndex: 70, background: 'rgba(36,33,28,0.5)', display: 'flex', justifyContent: 'flex-end' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(320px, 85vw)',
              height: '100%',
              background: colors.surface,
              boxShadow: shadows.pop,
              padding: '20px 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              overflowY: 'auto',
              animation: 'slideInRight .2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: colors.text }}>{t('site.menu')}</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                style={{ width: 34, height: 34, borderRadius: radii.md, border: `1px solid ${colors.border}`, background: colors.surface, color: colors.textSoft, cursor: 'pointer', fontSize: 15 }}
              >
                ✕
              </button>
            </div>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={onClose}
                style={({ isActive }) => ({
                  padding: '11px 12px',
                  borderRadius: radii.md,
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? colors.primary : colors.text,
                  background: isActive ? colors.primarySoft : 'transparent',
                })}
              >
                {t(item.key)}
              </NavLink>
            ))}
            <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <LanguageSelector compact />
              <Link to="/admin" onClick={onClose} style={{ fontSize: 13, fontWeight: 700, color: colors.accent, textDecoration: 'none' }}>
                {t('site.staffLogin')} →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
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

  const brand = (
    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 11, textDecoration: 'none' }}>
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
      <span style={{ lineHeight: 1.2 }}>
        <span style={{ display: 'block', fontSize: 15, fontWeight: 800, color: colors.text }}>Thar Manjushree</span>
        <span style={{ display: 'block', fontSize: 11.5, color: colors.muted, fontWeight: 600 }}>{t('site.brandLine')}</span>
      </span>
    </Link>
  )

  return (
    <div style={{ minHeight: '100vh', background: colors.bg, fontFamily: font.sans, display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(255,255,255,0.94)',
          backdropFilter: 'blur(8px)',
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
          {brand}
          {isMobile ? (
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
              <LanguageSelector compact />
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label={t('site.menu')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 12px',
                  borderRadius: radii.md,
                  border: `1px solid ${colors.border}`,
                  background: colors.surface,
                  color: colors.text,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: font.sans,
                }}
              >
                <span style={{ fontSize: 15, lineHeight: 1 }}>☰</span>
                {t('site.menu')}
              </button>
            </div>
          ) : (
            <>
              <nav style={{ flex: 1, display: 'flex', justifyContent: 'center', overflowX: 'auto', gap: 2 }}>
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    style={({ isActive }) => ({
                      padding: '8px 10px',
                      borderRadius: radii.md,
                      textDecoration: 'none',
                      fontSize: 13,
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? colors.primary : colors.textSoft,
                      background: isActive ? colors.primarySoft : 'transparent',
                      whiteSpace: 'nowrap',
                    })}
                  >
                    {t(item.key)}
                  </NavLink>
                ))}
              </nav>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <LanguageSelector />
                <Link
                  to="/admin"
                  style={{
                    padding: '8px 14px',
                    borderRadius: radii.md,
                    background: colors.primary,
                    color: '#fff',
                    fontSize: 12.5,
                    fontWeight: 700,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t('site.staffLogin')}
                </Link>
              </div>
            </>
          )}
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer style={{ background: `linear-gradient(180deg, ${colors.sidebar} 0%, ${colors.primaryDark} 100%)`, color: '#F6E8D8', marginTop: 0 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '44px 20px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 28 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 14 }}>
              <span style={{ width: 40, height: 40, borderRadius: radii.lg, background: `linear-gradient(135deg, ${colors.accent}, #C7701F)`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#fff' }}>
                ད
              </span>
              <span style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Thar Manjushree School</span>
            </div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: 'rgba(246,232,216,0.75)' }}>{t('site.footer.about')}</p>
          </div>

          <div>
            <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#E5B98B' }}>{t('site.footer.linksTitle')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} style={{ color: 'rgba(246,232,216,0.8)', fontSize: 13, textDecoration: 'none' }}>
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#E5B98B' }}>{t('site.footer.contactTitle')}</p>
            <p style={{ margin: '0 0 6px', fontSize: 13, color: 'rgba(246,232,216,0.8)' }}>Boudhanath, Kathmandu 44600, Nepal</p>
            <p style={{ margin: '0 0 6px', fontSize: 13, color: 'rgba(246,232,216,0.8)' }}>+977 1 449 2210</p>
            <p style={{ margin: '0 0 14px', fontSize: 13, color: 'rgba(246,232,216,0.8)' }}>admin@thar-manjushree.edu.np</p>
            <Link
              to="/admin"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 14px',
                borderRadius: radii.md,
                border: '1px solid rgba(246,232,216,0.35)',
                color: '#fff',
                fontSize: 12.5,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              {t('site.staffLogin')} →
            </Link>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: 'rgba(246,232,216,0.6)' }}>© {new Date().getFullYear()} Thar Manjushree School · {t('site.footer.rights')}</span>
            <span style={{ fontSize: 12, color: 'rgba(246,232,216,0.6)' }}>{t('app.name')}</span>
          </div>
        </div>
      </footer>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  )
}
