import { useMemo, useState } from 'react'
import { useField, usePage, PageHero, Section } from './shared.jsx'
import { OpenFigure } from '../../components/cards.jsx'
import { useLanguage } from '../../i18n.jsx'
import { useAppStore } from '../../store.jsx'
import { cn } from '../../lib/cn.js'

function Photo({ item, categoryLabel }) {
  const [failed, setFailed] = useState(false)
  return (
    <OpenFigure
      className="reveal"
      media={
        failed ? (
          <div className="flex h-[230px] items-center justify-center bg-linear-to-br from-ink to-pine text-[60px] font-black text-white/85">
            ✦
          </div>
        ) : (
          <img src={item.url} alt={item.title} loading="lazy" onError={() => setFailed(true)} className="h-[230px]" />
        )
      }
      caption={item.title}
      meta={
        <span className="mt-2 inline-block rounded-full bg-pine-soft px-[11px] py-0.5 text-[11px] font-extrabold tracking-[0.6px] text-pine uppercase">
          {categoryLabel}
        </span>
      }
    />
  )
}

export default function Gallery() {
  const f = usePage('gallery')
  const { t } = useLanguage()
  const { gallery, loading } = useAppStore()
  const introTitle = useField('gallery', 'introTitle')
  const introBody = useField('gallery', 'introBody')

  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => (filter === 'all' ? gallery : gallery.filter((g) => g.category === filter)), [filter, gallery])

  const cats = ['all', 'festival', 'ceremony', 'school']
  const catLabel = (c) =>
    c === 'all' ? f('filterAll') : c === 'festival' ? f('filterFestival') : c === 'ceremony' ? f('filterCeremony') : c === 'school' ? f('filterSchool') : ''

  return (
    <div>
      <PageHero title={introTitle} subtitle={introBody} kicker={f('heroKicker')} />

      <Section>
        {loading ? (
          <div className="loading-overlay">
            <div className="spinner-lg spinner"></div>
            <span>{t('common.loading') || 'Loading...'}</span>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-center gap-2.5">
              <span className="text-[12.5px] font-bold text-muted">{f('categoryLabel')}:</span>
              {cats.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  className={cn(
                    'cursor-pointer rounded-full px-4 py-2 text-[12.5px] font-bold',
                    filter === c ? 'border border-pine bg-pine text-white' : 'border border-line bg-surface text-body',
                  )}
                >
                  {catLabel(c)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-4.5 gap-y-6">
              {filtered.map((g) => (
                <Photo key={g.id} item={g} categoryLabel={catLabel(g.category) || g.category} />
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="py-[30px] text-center text-[13.5px] text-muted">{t('common.noResults') || 'No results'}</p>
            )}
          </>
        )}
      </Section>
    </div>
  )
}
