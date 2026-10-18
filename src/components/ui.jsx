/* eslint-disable react-refresh/only-export-components */
import { colors } from '../theme.js'
import { cn } from '../lib/cn.js'
import { IconSearch, IconCheck, IconX } from './icons.jsx'

const tagPalette = {
  success: 'bg-success-soft text-success',
  danger: 'bg-danger-soft text-danger',
  warning: 'bg-warning-soft text-warning',
  info: 'bg-info-soft text-info',
  neutral: 'bg-[#EFECE6] text-body',
  accent: 'bg-sage-soft text-[#A0651A]',
  primary: 'bg-pine-soft text-pine',
  purple: 'bg-[#F0E6F8] text-purple',
  teal: 'bg-[#E0F4F6] text-teal',
}

export function Badge({ tone = 'neutral', children, dot }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-[3px] text-xs font-semibold whitespace-nowrap',
        tagPalette[tone] || tagPalette.neutral,
      )}
    >
      {dot && <span className="size-[7px] rounded-full bg-current" />}
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

export function Card({ children, style, className, pad = 20, hover }) {
  return (
    <div
      className={cn(
        'rounded-lg border border-line bg-surface shadow-card transition-[box-shadow,transform]',
        hover && 'hover:shadow-pop hover:-translate-y-0.5',
        className,
      )}
      style={{ padding: pad, ...style }}
    >
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, right }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        <h3 className="m-0 text-base font-bold text-ink">{title}</h3>
        {subtitle && <p className="mt-1 mb-0 text-[13px] text-muted">{subtitle}</p>}
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
      className={cn(
        'relative flex flex-col gap-2.5 rounded-lg border border-line bg-surface p-[18px] text-left font-sans shadow-card transition-[box-shadow,transform]',
        onClick && 'cursor-pointer hover:shadow-pop hover:-translate-y-0.5',
      )}
      style={{ borderColor: active ? color : undefined, borderTop: `3px solid ${color}` }}
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[13px] font-semibold text-body">
          <span
            className="inline-flex size-[30px] items-center justify-center rounded-sm"
            style={{ background: `${color}1A`, color }}
          >
            {icon}
          </span>
          {label}
        </span>
      </div>
      <span className="text-[28px] font-extrabold tracking-[-0.5px] text-ink">{value}</span>
      {delta != null && (
        <span className={cn('text-xs font-semibold', delta >= 0 ? 'text-success' : 'text-danger')}>
          {delta >= 0 ? '▲' : '▼'} {Math.abs(delta)}% {hint || ''}
        </span>
      )}
    </button>
  )
}

export function ProgressBar({ value, color = colors.accent, height = 8, style, className }) {
  return (
    <div className={cn('overflow-hidden rounded-full bg-line', className)} style={{ height, ...style }}>
      <div
        className="h-full rounded-full transition-[width] duration-[400ms] ease-out"
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }}
      />
    </div>
  )
}

const buttonTones = {
  primary: 'border-pine bg-pine text-white',
  accent: 'border-sage bg-sage text-white',
  success: 'border-success bg-success text-white',
  danger: 'border-danger bg-danger text-white',
  outline: 'border-line bg-surface text-ink',
  ghost: 'border-transparent bg-transparent text-body',
}

const buttonSizes = {
  sm: 'px-2.5 py-1.5',
  md: 'px-4 py-[9px]',
  lg: 'px-5 py-[11px]',
}

export function Button({ children, onClick, tone = 'primary', size = 'md', disabled, type = 'button', icon, style, className }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border text-[13px] font-semibold font-sans transition-[filter,box-shadow] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-55',
        buttonTones[tone] || buttonTones.primary,
        buttonSizes[size] || buttonSizes.md,
        className,
      )}
      style={style}
    >
      {icon}
      {children}
    </button>
  )
}

export function Input({ label, value, onChange, placeholder, type = 'text', style, className, icon }) {
  return (
    <label className={cn('flex min-w-[180px] flex-1 flex-col gap-1.5', className)} style={style}>
      {label && <span className="text-xs font-semibold text-body">{label}</span>}
      <div className="relative flex items-center">
        {icon && <span className="absolute left-2.5 inline-flex text-muted">{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'w-full rounded-md border border-line bg-surface py-[9px] pr-3 text-[13px] font-sans text-ink outline-none transition-[border-color,box-shadow] focus:border-pine focus:ring-[3px] focus:ring-pine/15',
            icon ? 'pl-[34px]' : 'pl-3',
          )}
        />
      </div>
    </label>
  )
}

export function Select({ label, value, onChange, options, style, className }) {
  return (
    <label className={cn('flex min-w-[150px] flex-col gap-1.5', className)} style={style}>
      {label && <span className="text-xs font-semibold text-body">{label}</span>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer rounded-md border border-line bg-surface px-3 py-[9px] text-[13px] font-sans text-ink outline-none focus:border-pine"
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

export function Textarea({ label, value, onChange, placeholder, rows = 4, hint, style, className }) {
  return (
    <label className={cn('flex flex-col gap-1.5', className)} style={style}>
      {label && <span className="text-xs font-semibold text-body">{label}</span>}
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full resize-y rounded-md border border-line bg-surface px-3 py-[9px] text-[13px] font-sans leading-[1.6] text-ink outline-none transition-[border-color,box-shadow] focus:border-pine focus:ring-[3px] focus:ring-pine/15"
      />
      {hint && <span className="text-[11.5px] text-muted">{hint}</span>}
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
      className="flex cursor-pointer items-center gap-2.5 border-none bg-transparent p-0 text-left text-[13px] font-sans text-ink"
    >
      <span
        className="relative h-[21px] w-[38px] rounded-full transition-[background] duration-200"
        style={{ background: checked ? colors.success : colors.border }}
      >
        <span
          className="absolute top-0.5 size-[17px] rounded-full bg-white shadow-card transition-[left] duration-200"
          style={{ left: checked ? 19 : 2 }}
        />
      </span>
      {label}
    </button>
  )
}

export function Toast({ message, tone = 'success', onClose }) {
  return (
    <div
      className={cn(
        'fixed right-6 bottom-6 z-[1000] flex items-center gap-2.5 rounded-md px-4 py-3 text-[13px] font-semibold font-sans text-white shadow-pop animate-toast-in',
        tone === 'success' ? 'bg-success' : 'bg-danger',
      )}
    >
      <IconCheck size={16} color="#fff" />
      <span>{message}</span>
      <button onClick={onClose} className="inline-flex cursor-pointer border-none bg-transparent p-0.5 text-white">
        <IconX size={14} color="#fff" />
      </button>
    </div>
  )
}

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-[22px] flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="m-0 text-[22px] font-extrabold tracking-[-0.3px] text-ink">{title}</h2>
        {subtitle && <p className="mt-[5px] mb-0 text-[13px] text-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2.5">{actions}</div>}
    </div>
  )
}

export function EmptyState({ icon, text }) {
  return (
    <div className="flex flex-col items-center gap-2.5 py-10 text-muted">
      <span className="opacity-60">{icon || <IconSearch size={34} />}</span>
      <span className="text-[13px]">{text}</span>
    </div>
  )
}
