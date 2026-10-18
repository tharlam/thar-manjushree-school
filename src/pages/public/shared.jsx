/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react'
import { useLanguage } from '../../i18n.jsx'
import { useAppStore } from '../../store.jsx'
import { layout, radii } from '../../theme.js'
import { cn } from '../../lib/cn.js'

export function useField(page, field) {
  const { content } = useAppStore()
  const { lang } = useLanguage()
  const node = content?.pages?.[page]?.[field]
  if (!node) return ''
  return node[lang] || node.en || ''
}

/* A premium image slot with an elegant fallback until real photography is supplied. */
export function Photo({ src, alt = '', ratio = '4 / 3', radius = radii.lg, className, style, imgStyle, fallbackLabel }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={cn(
        'media-fallback relative flex w-full items-center justify-center bg-linear-to-br from-ink via-pine to-[#24544D] shadow-card',
        className,
      )}
      style={{ aspectRatio: ratio, borderRadius: radius, ...style }}
    >
      {!failed && src ? (
        <>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            onLoad={() => setLoaded(true)}
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-opacity duration-500',
              loaded ? 'opacity-100' : 'opacity-0',
            )}
            style={{ borderRadius: radius, ...imgStyle }}
          />
        </>
      ) : (
        <div className="relative p-5 text-center text-white/92">
          <div className="relative">
            <div className="mx-auto my-2.5 h-0.5 w-[46px] bg-sage-light" />
            <div className="text-[12px] font-semibold tracking-[1.6px] text-white/75 uppercase">
              {fallbackLabel || 'Photograph coming soon'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function PageHero({ title, subtitle, kicker, media, children }) {
  return (
    <div className="relative overflow-hidden bg-linear-to-br from-ink via-pine to-[#285848] pt-16 pb-[60px] text-center text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_90%_at_50%_110%,rgba(136,184,152,0.28)_0%,rgba(136,184,152,0)_60%)]" />
      <div className="relative mx-auto max-w-[1240px] px-[22px]">
        {kicker && (
          <p className="mb-3 text-[12px] font-bold tracking-[2.4px] text-sage-light uppercase">
            {kicker}
          </p>
        )}
        <h1 className="m-0 font-heading text-[clamp(30px,4.6vw,46px)] leading-[1.15] font-bold tracking-[-0.3px]">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-[680px] text-[15.5px] leading-[1.7] font-normal text-white/86">
            {subtitle}
          </p>
        )}
        {children}
      </div>
      {media && <div className="pointer-events-none absolute -right-10 -bottom-15 opacity-25">{media}</div>}
    </div>
  )
}

export function Section({ id, title, subtitle, eyebrow, children, className, style, align = 'center', maxWidth = layout.maxWidth }) {
  return (
    <section id={id} className={cn('py-[54px]', id && 'scroll-mt-[84px]', className)} style={style}>
      <div className="mx-auto px-[22px]" style={{ maxWidth }}>
        {(eyebrow || title) && (
          <div className={cn('mb-7', align === 'left' ? 'text-left' : 'text-center')}>
            {eyebrow && (
              <p className="mb-2 text-[11.5px] font-bold tracking-[2px] text-sage uppercase">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="m-0 font-heading text-[clamp(24px,3.2vw,32px)] font-bold tracking-[-0.4px] text-ink">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto mt-3 max-w-[660px] text-[15px] leading-[1.7] font-normal text-muted">
                {subtitle}
              </p>
            )}
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

