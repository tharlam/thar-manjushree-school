import { useEffect } from 'react'
import { IconX } from './icons.jsx'

/*
 * Reusable right-side drawer used by the frontend-mock CMS.
 * Mirrors the MobileNav pattern already used in PublicLayout.
 */
export function Drawer({ open, onClose, title, subtitle, children, footer, width = 'min(600px, 100vw)' }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div onClick={onClose} className="fixed inset-0 z-[120] flex justify-end bg-ink/50">
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="flex h-full flex-col bg-surface shadow-pop animate-slide-in-right"
        style={{ width }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-4">
          <div>
            <h3 className="m-0 font-heading text-[19px] font-bold tracking-[-0.2px] text-ink">{title}</h3>
            {subtitle && <p className="mt-1 mb-0 text-[12.5px] text-muted">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-[34px] shrink-0 cursor-pointer items-center justify-center rounded-md border border-line bg-surface text-body"
          >
            <IconX size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

        {footer && <div className="border-t border-line bg-surface-alt px-6 py-4">{footer}</div>}
      </div>
    </div>
  )
}
