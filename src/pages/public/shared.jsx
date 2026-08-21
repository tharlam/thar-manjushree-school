/* eslint-disable react-refresh/only-export-components */
import { useLanguage } from '../../i18n.jsx'
import { useAppStore } from '../../store.jsx'
import { colors, font, radii, shadows } from '../../theme.js'

export function useField(page, field) {
  const { content } = useAppStore()
  const { lang } = useLanguage()
  const node = content?.pages?.[page]?.[field]
  if (!node) return ''
  return node[lang] || node.en || ''
}

export function PageHero({ title, subtitle, kicker }) {
  return (
    <div
      style={{
        background: `linear-gradient(120deg, ${colors.sidebar} 0%, ${colors.primaryDark} 55%, ${colors.primary} 100%)`,
        color: '#fff',
        padding: '52px 20px 46px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.08,
          fontSize: 220,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 900,
          color: '#fff',
          userSelect: 'none',
        }}
      >
        ད
      </div>
      <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto' }}>
        {kicker && (
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#E5B98B' }}>{kicker}</p>
        )}
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, letterSpacing: '-0.4px', lineHeight: 1.2 }}>{title}</h1>
        {subtitle && <p style={{ margin: '12px auto 0', fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', maxWidth: 660 }}>{subtitle}</p>}
      </div>
    </div>
  )
}

export function Section({ title, subtitle, children, style, eyebrow }) {
  return (
    <section style={{ padding: '36px 20px', ...style }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        {(eyebrow || title) && (
          <div style={{ marginBottom: 22, textAlign: 'center' }}>
            {eyebrow && <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 700, letterSpacing: '1.6px', textTransform: 'uppercase', color: colors.accent }}>{eyebrow}</p>}
            {title && <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: colors.text, letterSpacing: '-0.3px' }}>{title}</h2>}
            {subtitle && <p style={{ margin: '8px auto 0', fontSize: 14.5, color: colors.muted, maxWidth: 640, lineHeight: 1.6 }}>{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

export function ContentBlock({ page, titleField, bodyField, children }) {
  const title = useField(page, titleField)
  const body = useField(page, bodyField)
  return (
    <Section title={title} subtitle={body}>
      {children}
    </Section>
  )
}

export function Tile({ children, style }) {
  return (
    <div
      style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: radii.lg,
        boxShadow: shadows.card,
        padding: 20,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export const fieldStyles = {
  label: { display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 180 },
  labelText: { fontSize: 12, fontWeight: 600, color: colors.textSoft },
  input: {
    padding: '10px 12px',
    borderRadius: radii.md,
    border: `1px solid ${colors.border}`,
    background: colors.surface,
    color: colors.text,
    fontSize: 13.5,
    fontFamily: font.sans,
    outline: 'none',
    width: '100%',
    transition: 'border-color .15s ease, box-shadow .15s ease',
  },
  textarea: {
    padding: '10px 12px',
    borderRadius: radii.md,
    border: `1px solid ${colors.border}`,
    background: colors.surface,
    color: colors.text,
    fontSize: 13.5,
    fontFamily: font.sans,
    outline: 'none',
    width: '100%',
    resize: 'vertical',
    minHeight: 90,
  },
  submit: {
    padding: '11px 22px',
    borderRadius: radii.md,
    background: colors.primary,
    color: '#fff',
    border: 'none',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: font.sans,
  },
}
