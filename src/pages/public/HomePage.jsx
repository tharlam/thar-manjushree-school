import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n.jsx'
import { useAppStore } from '../../store.jsx'
import { colors, radii, shadows } from '../../theme.js'
import { useField, Section, Tile } from './shared.jsx'
import { classes as baseClasses } from '../../data/index.js'
import { usdValue, formatUsd } from '../../lib/currency.js'

function Hero() {
  const { t } = useLanguage()
  const heroTitle = useField('home', 'heroTitle')
  const heroSubtitle = useField('home', 'heroSubtitle')
  const ctaSupport = useField('home', 'ctaSupport')
  const ctaAdmissions = useField('home', 'ctaAdmissions')

  return (
    <div
      style={{
        position: 'relative',
        background: `linear-gradient(120deg, ${colors.sidebar} 0%, ${colors.primaryDark} 50%, ${colors.primary} 100%)`,
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, opacity: 0.07, fontSize: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, userSelect: 'none' }}>
        ད
      </div>
      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '84px 24px 80px', textAlign: 'center' }}>
        <p style={{ margin: '0 0 14px', fontSize: 12.5, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#E5B98B' }}>Boudhanath · Kathmandu · Nepal</p>
        <h1 style={{ margin: '0 auto', fontSize: 'clamp(30px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.15, maxWidth: 860, letterSpacing: '-0.5px' }}>
          {heroTitle}
        </h1>
        <p style={{ margin: '18px auto 0', fontSize: 16, lineHeight: 1.65, maxWidth: 700, color: 'rgba(255,255,255,0.85)' }}>{heroSubtitle}</p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 30 }}>
          <Link
            to="/donations"
            style={{ padding: '13px 26px', borderRadius: radii.md, background: colors.accent, color: '#fff', fontSize: 14.5, fontWeight: 700, textDecoration: 'none', boxShadow: shadows.pop }}
          >
            {ctaSupport || t('site.supportUs')}
          </Link>
          <Link
            to="/admissions"
            style={{ padding: '13px 26px', borderRadius: radii.md, border: '2px solid rgba(255,255,255,0.7)', color: '#fff', fontSize: 14.5, fontWeight: 700, textDecoration: 'none' }}
          >
            {ctaAdmissions || t('site.ctaAdmissions')}
          </Link>
        </div>
      </div>
    </div>
  )
}

function Impact() {
  const { t } = useLanguage()
  const { monks: storeMonks, admissions, donations, loading } = useAppStore()
  const totalMonks = storeMonks.length
  const pending = admissions.filter((a) => a.status === 'pending').length
  const donationTotal = donations.filter((d) => d.type !== 'fee').reduce((s, d) => s + usdValue(d.amount, d.currency), 0)

  const stats = [
    { label: t('homePage.statMonks'), value: loading ? '...' : totalMonks, color: colors.primary },
    { label: t('homePage.statClasses'), value: baseClasses.length, color: colors.accent },
    { label: t('homePage.statDonations'), value: loading ? '...' : formatUsd(donationTotal), color: colors.success },
    { label: t('homePage.statAdmissions'), value: loading ? '...' : pending, color: colors.info },
  ]

  return (
    <Section eyebrow={t('homePage.impactTitle')} subtitle={t('homePage.impactNote')} style={{ background: colors.surfaceAlt, borderTop: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14 }}>
        {stats.map((s) => (
          <Tile key={s.label} style={{ textAlign: 'center', borderTop: `3px solid ${s.color}`, padding: '24px 16px' }}>
            <p style={{ margin: 0, fontSize: 30, fontWeight: 800, color: colors.text, letterSpacing: '-0.5px' }}>{s.value}</p>
            <p style={{ margin: '6px 0 0', fontSize: 12.5, fontWeight: 600, color: colors.muted }}>{s.label}</p>
          </Tile>
        ))}
      </div>
    </Section>
  )
}

function Welcome() {
  const { t } = useLanguage()
  const welcomeTitle = useField('home', 'welcomeTitle')
  const welcomeBody = useField('home', 'welcomeBody')
  return (
    <Section>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18, alignItems: 'stretch' }}>
        <Tile style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <h3 style={{ margin: 0, fontSize: 21, fontWeight: 800, color: colors.text }}>{welcomeTitle}</h3>
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: colors.textSoft }}>{welcomeBody}</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
            <Link to="/tradition" style={{ color: colors.primary, fontWeight: 700, fontSize: 13.5, textDecoration: 'none' }}>{t('site.learnMore')} →</Link>
            <Link to="/curriculum" style={{ color: colors.accent, fontWeight: 700, fontSize: 13.5, textDecoration: 'none' }}>{t('site.viewAll')} →</Link>
          </div>
        </Tile>
        <Tile
          style={{
            minHeight: 220,
            background: `linear-gradient(150deg, ${colors.primarySoft} 0%, #FBF1E3 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
          }}
        >
          <span style={{ fontSize: 120, fontWeight: 900, color: colors.primary, opacity: 0.85, userSelect: 'none', lineHeight: 1 }}>ད</span>
        </Tile>
      </div>
    </Section>
  )
}

function Announcements() {
  const { t } = useLanguage()
  const { announcements, gallery } = useAppStore()
  const { lang } = useLanguage()
  const recent = announcements.slice(0, 4)

  const newsItems = [
    { key: 'e1', date: 'Aug 20', title: t('dashboard.ev2'), tag: t('dashboard.tagAcademic'), color: colors.info },
    { key: 'e2', date: 'Aug 27', title: t('dashboard.ev3'), tag: t('dashboard.tagMeeting'), color: colors.purple },
    { key: 'e3', date: 'Sep 05', title: t('dashboard.ev4'), tag: t('dashboard.tagCultural'), color: colors.accent },
  ]

  return (
    <Section eyebrow={t('homePage.announcementsTitle')} style={{ background: colors.surfaceAlt }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {recent.map((a) => (
            <Tile key={a.id} style={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', minWidth: 52, padding: '6px 4px', borderRadius: radii.sm, background: colors.primarySoft, color: colors.primary }}>
                  <span style={{ fontSize: 12, fontWeight: 800 }}>{a.date?.slice(5)}</span>
                  <span style={{ fontSize: 10 }}>{a.date?.slice(0, 4)}</span>
                </span>
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: colors.text }}>{a[lang]?.title || a.en?.title}</p>
                  <p style={{ margin: '5px 0 0', fontSize: 12.5, color: colors.textSoft, lineHeight: 1.5 }}>{a[lang]?.body || a.en?.body}</p>
                </div>
              </div>
            </Tile>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Tile style={{ padding: 18, borderLeft: `4px solid ${colors.accent}` }}>
            <p style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 800, color: colors.text }}>{t('homePage.newsTitle')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {newsItems.map((n) => (
                <div key={n.key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: radii.md, background: colors.surfaceAlt, border: `1px solid ${colors.border}` }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: colors.primary, whiteSpace: 'nowrap' }}>{n.date}</span>
                  <span style={{ flex: 1, fontSize: 12.5, fontWeight: 600, color: colors.text }}>{n.title}</span>
                  <span style={{ padding: '2px 9px', borderRadius: radii.round, background: `${n.color}18`, color: n.color, fontSize: 10.5, fontWeight: 700, whiteSpace: 'nowrap' }}>{n.tag}</span>
                </div>
              ))}
            </div>
          </Tile>
          <Tile style={{ padding: 18, borderLeft: `4px solid ${colors.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: colors.text }}>{gallery.length} {t('site.nav.gallery')}</p>
              <p style={{ margin: '4px 0 0', fontSize: 12.5, color: colors.muted }}>{t('site.brandLine')}</p>
            </div>
            <Link to="/gallery" style={{ padding: '9px 16px', borderRadius: radii.md, background: colors.primary, color: '#fff', fontSize: 12.5, fontWeight: 700, textDecoration: 'none' }}>
              {t('site.viewAll')}
            </Link>
          </Tile>
        </div>
      </div>
    </Section>
  )
}

export default function HomePage() {
  const { t } = useLanguage()
  return (
    <div>
      <Hero />
      <Impact />
      <Welcome />
      <Announcements />
      <div style={{ background: `linear-gradient(120deg, ${colors.sidebar}, ${colors.primaryDark})`, padding: '34px 20px', textAlign: 'center' }}>
        <p style={{ margin: '0 0 14px', fontSize: 20, fontWeight: 800, color: '#fff' }}>{t('site.supportUs')}</p>
        <Link to="/donations" style={{ display: 'inline-block', padding: '12px 26px', borderRadius: radii.md, background: colors.accent, color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
          {t('site.donateNow')}
        </Link>
      </div>
    </div>
  )
}
