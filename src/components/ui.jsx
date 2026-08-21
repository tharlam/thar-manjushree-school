/* eslint-disable react-refresh/only-export-components */
import { colors, font, radii, shadows } from '../theme.js'
import { IconSearch, IconCheck, IconX } from './icons.jsx'

const tagPalette = {
  success: { bg: colors.successSoft, fg: colors.success },
  danger: { bg: colors.dangerSoft, fg: colors.danger },
  warning: { bg: colors.warningSoft, fg: colors.warning },
  info: { bg: colors.infoSoft, fg: colors.info },
  neutral: { bg: '#EFECE6', fg: colors.textSoft },
  accent: { bg: colors.accentSoft, fg: '#A0651A' },
  primary: { bg: colors.primarySoft, fg: colors.primary },
  purple: { bg: '#F0E6F8', fg: colors.purple },
  teal: { bg: '#E0F4F6', fg: colors.teal },
}

export function Badge({ tone = 'neutral', children, dot }) {
  const t = tagPalette[tone] || tagPalette.neutral
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '3px 10px',
        borderRadius: radii.round,
        fontSize: 12,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        background: t.bg,
        color: t.fg,
      }}
    >
      {dot && <span style={{ width: 7, height: 7, borderRadius: '50%', background: t.fg }} />}
      {children}
    </span>
  )
}

export function statusTone(status) {
  switch (status) {
    case 'enrolled':
    case 'present':
    case 'paid':
    case 'active':
      return 'success'
    case 'pending':
    case 'late':
    case 'partial':
    case 'due':
      return 'warning'
    case 'graduated':
    case 'absent':
      return 'info'
    case 'withdrawn':
      return 'danger'
    default:
      return 'neutral'
  }
}

export function Card({ children, style, pad = 20, hover }) {
  return (
    <div
      style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: radii.lg,
        boxShadow: shadows.card,
        padding: pad,
        transition: 'box-shadow .18s ease, transform .18s ease',
        ...(hover ? { ':hover': { boxShadow: shadows.pop, transform: 'translateY(-2px)' } } : null),
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
      <div>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: colors.text }}>{title}</h3>
        {subtitle && <p style={{ margin: '4px 0 0', fontSize: 13, color: colors.muted }}>{subtitle}</p>}
      </div>
      {right}
    </div>
  )
}

export function StatCard({ label, value, delta, icon, color, onClick, active, hint }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={hint}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: 18,
        borderRadius: radii.lg,
        background: colors.surface,
        border: `1px solid ${active ? color : colors.border}`,
        borderTop: `3px solid ${color}`,
        boxShadow: shadows.card,
        textAlign: 'left',
        cursor: onClick ? 'pointer' : 'default',
        fontFamily: font.sans,
        transition: 'box-shadow .18s ease, transform .18s ease',
        ':hover': onClick ? { boxShadow: shadows.pop, transform: 'translateY(-2px)' } : null,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: colors.textSoft, fontSize: 13, fontWeight: 600 }}>
          <span style={{ display: 'inline-flex', width: 30, height: 30, borderRadius: radii.sm, alignItems: 'center', justifyContent: 'center', background: `${color}1A`, color }}>
            {icon}
          </span>
          {label}
        </span>
      </div>
      <span style={{ fontSize: 28, fontWeight: 800, color: colors.text, letterSpacing: '-0.5px' }}>{value}</span>
      {delta != null && (
        <span style={{ fontSize: 12, fontWeight: 600, color: delta >= 0 ? colors.success : colors.danger }}>
          {delta >= 0 ? '▲' : '▼'} {Math.abs(delta)}% {hint || ''}
        </span>
      )}
    </button>
  )
}

export function ProgressBar({ value, color = colors.accent, height = 8, style }) {
  return (
    <div style={{ background: colors.border, borderRadius: radii.round, height, overflow: 'hidden', ...style }}>
      <div style={{ width: `${Math.min(100, Math.max(0, value))}%`, height: '100%', background: color, borderRadius: radii.round, transition: 'width .4s ease' }} />
    </div>
  )
}

export function Button({ children, onClick, tone = 'primary', size = 'md', disabled, type = 'button', icon, style }) {
  const tones = {
    primary: { bg: colors.primary, fg: '#fff', border: colors.primary },
    accent: { bg: colors.accent, fg: '#fff', border: colors.accent },
    success: { bg: colors.success, fg: '#fff', border: colors.success },
    danger: { bg: colors.danger, fg: '#fff', border: colors.danger },
    outline: { bg: colors.surface, fg: colors.text, border: colors.border },
    ghost: { bg: 'transparent', fg: colors.textSoft, border: 'transparent' },
  }
  const t = tones[tone] || tones.primary
  const sizes = { sm: '6px 10px', md: '9px 16px', lg: '11px 20px' }
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: sizes[size] || sizes.md,
        borderRadius: radii.md,
        background: t.bg,
        color: t.fg,
        border: `1px solid ${t.border}`,
        fontSize: 13,
        fontWeight: 600,
        fontFamily: font.sans,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        transition: 'filter .15s ease, box-shadow .15s ease',
        ':hover': { filter: 'brightness(1.05)' },
        ...style,
      }}
    >
      {icon}
      {children}
    </button>
  )
}

export function Input({ label, value, onChange, placeholder, type = 'text', style, icon }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 180, ...style }}>
      {label && <span style={{ fontSize: 12, fontWeight: 600, color: colors.textSoft }}>{label}</span>}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {icon && <span style={{ position: 'absolute', left: 10, color: colors.muted, display: 'inline-flex' }}>{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: icon ? '9px 12px 9px 34px' : '9px 12px',
            borderRadius: radii.md,
            border: `1px solid ${colors.border}`,
            background: colors.surface,
            color: colors.text,
            fontSize: 13,
            fontFamily: font.sans,
            outline: 'none',
            transition: 'border-color .15s ease, box-shadow .15s ease',
            ':focus': { borderColor: colors.primary, boxShadow: `0 0 0 3px ${colors.primary}22` },
          }}
        />
      </div>
    </label>
  )
}

export function Select({ label, value, onChange, options, style }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 150, ...style }}>
      {label && <span style={{ fontSize: 12, fontWeight: 600, color: colors.textSoft }}>{label}</span>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: '9px 12px',
          borderRadius: radii.md,
          border: `1px solid ${colors.border}`,
          background: colors.surface,
          color: colors.text,
          fontSize: 13,
          fontFamily: font.sans,
          outline: 'none',
          cursor: 'pointer',
          ':focus': { borderColor: colors.primary },
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontFamily: font.sans,
        color: colors.text,
        fontSize: 13,
        padding: 0,
        textAlign: 'left',
      }}
    >
      <span
        style={{
          width: 38,
          height: 21,
          borderRadius: radii.round,
          background: checked ? colors.success : colors.border,
          position: 'relative',
          transition: 'background .2s ease',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2,
            left: checked ? 19 : 2,
            width: 17,
            height: 17,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: shadows.card,
            transition: 'left .2s ease',
          }}
        />
      </span>
      {label}
    </button>
  )
}

export function Toast({ message, tone = 'success', onClose }) {
  const t = tone === 'success' ? { bg: colors.success, icon: '#fff' } : { bg: colors.danger, icon: '#fff' }
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 16px',
        borderRadius: radii.md,
        background: t.bg,
        color: t.icon,
        boxShadow: shadows.pop,
        fontSize: 13,
        fontWeight: 600,
        fontFamily: font.sans,
        animation: 'toastIn .25s ease',
      }}
    >
      <IconCheck size={16} color={t.icon} />
      <span>{message}</span>
      <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: t.icon, display: 'inline-flex', padding: 2 }}>
        <IconX size={14} color={t.icon} />
      </button>
    </div>
  )
}

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 22, flexWrap: 'wrap' }}>
      <div>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: colors.text, letterSpacing: '-0.3px' }}>{title}</h2>
        {subtitle && <p style={{ margin: '5px 0 0', fontSize: 13, color: colors.muted }}>{subtitle}</p>}
      </div>
      {actions && <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>{actions}</div>}
    </div>
  )
}

export function EmptyState({ icon, text }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '40px 0', color: colors.muted }}>
      <span style={{ opacity: 0.6 }}>{icon || <IconSearch size={34} />}</span>
      <span style={{ fontSize: 13 }}>{text}</span>
    </div>
  )
}

export const th = {
  iconBtn: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 38,
    borderRadius: radii.md,
    border: `1px solid ${colors.border}`,
    background: colors.surface,
    color: colors.textSoft,
    cursor: 'pointer',
    transition: 'background .15s ease',
    ':hover': { background: colors.surfaceAlt },
  },
  chip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '9px 14px',
    borderRadius: radii.md,
    border: `1px solid ${colors.border}`,
    background: colors.surface,
    color: colors.text,
    fontSize: 13,
    fontWeight: 600,
    fontFamily: font.sans,
    cursor: 'pointer',
  },
}
