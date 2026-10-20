import { Fragment, useMemo } from 'react'
import useSupabaseQuery from '../hooks/useSupabaseQuery.js'
import { contentDefaults } from '../contentDefaults.js'
import { cn } from '../lib/cn.js'

const MEDIA_PATTERN = /^(https?:\/\/|\/|data:image\/|images\/)/i

function isMedia(value) {
  return typeof value === 'string' && MEDIA_PATTERN.test(value.trim())
}

function TextBlock({ field, text }) {
  const paragraphs = String(text)
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)

  return (
    <div
      data-field={field}
      className="prose prose-sm sm:prose max-w-none text-body prose-headings:font-heading prose-headings:text-ink prose-p:leading-[1.8] prose-a:text-pine"
    >
      {paragraphs.map((paragraph, index) => (
        <p key={index}>
          {paragraph.split('\n').map((line, lineIndex, lines) => (
            <Fragment key={lineIndex}>
              {line}
              {lineIndex < lines.length - 1 && <br />}
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  )
}

function MediaBlock({ field, src, label }) {
  return (
    <img
      data-field={field}
      src={src}
      alt={label || field}
      loading="lazy"
      decoding="async"
      className="my-4 block h-auto w-full rounded-lg bg-surface-alt object-cover shadow-card"
    />
  )
}

function ContentSkeleton() {
  return (
    <div className="animate-pulse space-y-3" aria-hidden="true">
      <div className="h-6 w-2/3 rounded-sm bg-line" />
      <div className="h-4 w-full rounded-sm bg-line" />
      <div className="h-4 w-5/6 rounded-sm bg-line" />
    </div>
  )
}

export default function PageContent({ pageSlug, lang = 'en', fields, className }) {
  const { data, loading, error } = useSupabaseQuery('page_content', {
    columns: 'field, lang, value',
    filters: [['page', 'eq', pageSlug]],
    enabled: Boolean(pageSlug),
  })

  const defaultFields = useMemo(() => contentDefaults.pages?.[pageSlug] || {}, [pageSlug])

  const remoteFields = useMemo(() => {
    const map = {}
    for (const row of data || []) {
      if (!row?.field) continue
      map[row.field] = { ...(map[row.field] || {}), [row.lang]: row.value }
    }
    return map
  }, [data])

  const resolved = useMemo(() => {
    const keys = fields && fields.length > 0 ? fields : Object.keys({ ...defaultFields, ...remoteFields })
    const out = {}
    for (const key of keys) {
      const fallback = defaultFields[key] || {}
      const remote = remoteFields[key] || {}
      out[key] = {
        en: remote.en ?? fallback.en ?? '',
        ne: remote.ne ?? fallback.ne ?? '',
        bo: remote.bo ?? fallback.bo ?? '',
      }
    }
    return out
  }, [fields, defaultFields, remoteFields])

  const activeLang = lang === 'ne' || lang === 'bo' ? lang : 'en'

  const blocks = useMemo(
    () =>
      Object.entries(resolved)
        .map(([field, value]) => ({ field, value: value[activeLang] || value.en || '' }))
        .filter((block) => block.value),
    [resolved, activeLang],
  )

  return (
    <div className={cn('w-full', className)}>
      {error && (
        <p role="alert" className="sr-only">
          {error}
        </p>
      )}
      {loading ? (
        <ContentSkeleton />
      ) : (
        <div className="flex flex-col gap-4">
          {blocks.map(({ field, value }) =>
            isMedia(value) ? (
              <MediaBlock key={field} field={field} src={value.trim()} label={field} />
            ) : (
              <TextBlock key={field} field={field} text={value} />
            ),
          )}
        </div>
      )}
    </div>
  )
}
