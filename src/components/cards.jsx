import { useState } from 'react'
import { Link } from 'react-router-dom'
import { colors, hairline } from '../theme.js'
import { cn } from '../lib/cn.js'

const cardBase = 'relative flex flex-col rounded-lg border border-line bg-surface shadow-card'
const cardHover = 'transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-sage/50 hover:shadow-[0_10px_28px_rgba(15,42,42,0.08)]'
const eyebrowType = 'text-[11px] font-bold tracking-[1.8px] uppercase'

export function Hairline({ variant = 'soft', style }) {
  return <span aria-hidden="true" className="block h-px w-full" style={{ background: hairline[variant] || hairline.soft, ...style }} />
}

export function CardEyebrow({ children, color = colors.accent, align = 'left', className, style }) {
  return (
    <div className={cn('flex items-center gap-2', align === 'center' ? 'justify-center' : 'justify-start', className)} style={style}>
      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full" style={{ background: color }} />
      <span className={cn(eyebrowType, 'leading-[1.4] text-muted')}>{children}</span>
    </div>
  )
}

export function CardTitle({ children, as: Title = 'h3', className, style }) {
  return <Title className={cn('m-0 font-heading text-[19px] leading-[1.3] font-bold tracking-[-0.2px] text-ink', className)} style={style}>{children}</Title>
}

export function CardBody({ children, className, style }) {
  return (
    <p className={cn('m-0 text-[13.75px] leading-[1.78] text-body [text-wrap:pretty]', className)} style={style}>{children}</p>
  )
}

export function GhostNumeral({ children, style }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-3.5 bottom-2 font-heading text-[56px] leading-none font-bold text-line select-none"
      style={style}
    >
      {children}
    </span>
  )
}

/* Standard content card. */
export function ArchCard({ children, hover, className, style }) {
  return (
    <div className={cn(cardBase, 'gap-2.5 p-6', hover && cardHover, className)} style={style}>
      {children}
    </div>
  )
}

/* Editorial card — same clean surface, kept as an alias. */
export function RailCard({ children, hover, className, style }) {
  return (
    <div className={cn(cardBase, 'gap-1.5 p-6', hover && cardHover, className)} style={style}>
      {children}
    </div>
  )
}

/* Plain content card. */
export function NotchCard({ children, hover, className, style }) {
  return (
    <div className={cn(cardBase, 'gap-2.5 p-6', hover && cardHover, className)} style={style}>
      {children}
    </div>
  )
}

/* Content card with a name/monogram header. */
export function SealCard({ children, className, style }) {
  return (
    <div className={cn(cardBase, 'gap-2.5 p-6', className)} style={style}>
      {children}
    </div>
  )
}

export function QuoteCard({ quote, name, role, className, style }) {
  return (
    <figure
      className={cn(cardBase, 'quote-card p-6', className)}
      style={{ margin: 0, ...style }}
    >
      <blockquote className="m-0 text-[15px] leading-[1.85] text-body italic [text-wrap:pretty]">
        {quote}
      </blockquote>
      <figcaption className="mt-[18px] border-t border-line pt-3.5">
        <p className="m-0 text-[13.5px] font-bold text-ink">{name}</p>
        <p className={cn('mt-[3px] mb-0 text-sage', eyebrowType)}>{role}</p>
      </figcaption>
    </figure>
  )
}

/* Open column. */
export function OpenCard({ children, hover, className, style }) {
  return (
    <div className={cn(cardBase, 'gap-2.5 p-6', hover && cardHover, className)} style={style}>
      {children}
    </div>
  )
}

export function LinkRow({ to, href, onClick, children, accent = colors.accent, cta = 'Open', className, style }) {
  const body = (
    <>
      <span className="min-w-0 flex-1">{children}</span>
      <span className="link-row-cta" style={{ '--row-accent': accent }}>
        {cta}
        <span className="link-row-arrow">&rarr;</span>
      </span>
    </>
  )

  const rowClassName = cn(
    'link-row relative flex items-center gap-[18px] border-t border-b border-line py-[18px] font-sans text-inherit no-underline',
    className,
  )

  if (to) {
    return (
      <Link className={rowClassName} to={to} style={style} onClick={onClick}>
        {body}
      </Link>
    )
  }
  if (href) {
    return (
      <a className={rowClassName} href={href} style={style} onClick={onClick}>
        {body}
      </a>
    )
  }
  return (
    <div className={rowClassName} style={style} onClick={onClick}>
      {body}
    </div>
  )
}

/* Numbers separated by hairlines. */
export function StatBand({ stats, className, style }) {
  return (
    <div className={cn('stat-band grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))]', className)} style={style}>
      {stats.map((s) => (
        <div key={s.label} className="stat-band-item">
          <p className="stat-band-value" style={s.color ? { color: s.color } : undefined}>
            {s.value}
          </p>
          <p className="stat-band-label">{s.label}</p>
        </div>
      ))}
    </div>
  )
}

/* A list drawn with marks and hairlines. */
export function CheckList({ items, accent = colors.accent, ordered = false, className, style }) {
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag className={cn('m-0 list-none p-0', className)} style={style}>
      {items.map((item, i) => (
        <li key={i} className="check-list-item" style={{ '--tick-accent': accent }}>
          <span aria-hidden="true" className="check-list-mark">
            {ordered ? String(i + 1).padStart(2, '0') : '\u2713'}
          </span>
          <span className="flex-1">{item}</span>
        </li>
      ))}
    </Tag>
  )
}

/* Disclosure rows. */
export function Accordion({ items, initial = 0, questionKey = 'q', answerKey = 'a', className, style }) {
  const [open, setOpen] = useState(initial)
  return (
    <div className={cn('mx-auto max-w-[800px]', className)} style={style}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item[questionKey]} className="accordion-item">
            <button type="button" className="accordion-q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
              <span className="flex-1">{item[questionKey]}</span>
              <span className="accordion-mark" aria-hidden="true">
                +
              </span>
            </button>
            <div className={cn('accordion-a', isOpen && 'open')}>
              <p>{item[answerKey]}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* An image with the caption set below it. */
export function OpenFigure({ media, caption, meta, className, style }) {
  return (
    <figure className={cn('open-figure', className)} style={{ margin: 0, ...style }}>
      <div className="open-figure-media">{media}</div>
      {(caption || meta) && (
        <figcaption className="open-figure-cap">
          {caption && <p className="open-figure-title">{caption}</p>}
          {meta}
        </figcaption>
      )}
    </figure>
  )
}

/* A bordered surface for forms, maps, or detail blocks. */
export function Panel({ children, pad, className, style }) {
  return (
    <div
      className={cn(cardBase, className)}
      style={{ padding: pad ?? 32, ...style }}
    >
      {children}
    </div>
  )
}
