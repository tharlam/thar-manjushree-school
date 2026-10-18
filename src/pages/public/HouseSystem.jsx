import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n.jsx'
import { useAppStore } from '../../store.jsx'
import { PageHero, Section } from './shared.jsx'
import { OpenCard } from '../../components/cards.jsx'
import { Button } from '../../components/ui.jsx'
import { Toast } from '../../components/ui.jsx'
import { HouseEditor } from '../../components/house/HouseEditor.jsx'
import { houses } from '../../data/index.js'

export default function HouseSystem() {
  const { t } = useLanguage()
  const { houseDetails } = useAppStore()
  const [editingId, setEditingId] = useState(null)
  const [toast, setToast] = useState(null)

  const editingHouse = houses.find((h) => h.id === editingId) || null
  const editingDetail = editingId ? houseDetails?.[editingId] : null

  return (
    <div>
      <PageHero
        title="House System"
        subtitle="Our student body is divided into four distinct houses. These houses encourage healthy teamwork, community cleaning duties, friendly academic quizzes, and traditional debating tournaments."
        kicker={t('site.nav.houses')}
      />

      <Section>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
          {houses.map((h) => {
            const detail = houseDetails?.[h.id]
            return (
              <OpenCard key={h.id} hover className="overflow-hidden">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1.5"
                  style={{ background: h.color }}
                />
                <div className="pt-1.5">
                  <p className="m-0 font-heading text-lg font-extrabold text-ink">{h.name}</p>
                  <p className="mt-0.5 mb-0 text-xs text-muted">{h.element}</p>
                </div>

                <p className="mt-3 mb-0 text-[13px] leading-[1.7] text-body">
                  {detail?.vibe?.tagline || h.motto}
                </p>

                <div className="mt-4 flex flex-col gap-[7px]">
                  <p className="m-0 text-[12.5px] text-body">
                    <span className="font-bold text-ink">Members</span> · {h.members} {t('housesPage.members').toLowerCase()}
                  </p>
                  <p className="m-0 text-[12.5px] text-body">
                    <span className="font-bold text-ink">Spiritual Symbol</span> · {h.symbol}
                  </p>
                  <p className="m-0 text-[12.5px] text-body">
                    <span className="font-bold text-ink">Core Virtue</span> · {h.virtue}
                  </p>
                  <p className="mt-1 mb-0 font-heading text-[13px] text-ink italic">&ldquo;{h.motto}&rdquo;</p>
                  <p className="mt-1 mb-0 text-[12.5px] text-body">
                    <span className="font-bold text-ink">{t('housesPage.captain')}</span> · {h.captain}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2.5 border-t border-line pt-4">
                  <Link to={`/houses/${h.id}`} className="flex-1 no-underline">
                    <Button tone="primary" size="sm" className="w-full whitespace-nowrap" style={{ background: h.color, borderColor: h.color }}>
                      Visit House
                    </Button>
                  </Link>
                  <Button tone="outline" size="sm" className="flex-1 whitespace-nowrap" onClick={() => setEditingId(h.id)}>
                    Edit Section
                  </Button>
                </div>
              </OpenCard>
            )
          })}
        </div>
      </Section>

      <HouseEditor
        key={editingId || 'none'}
        house={editingHouse}
        detail={editingDetail}
        onClose={() => setEditingId(null)}
        onSaved={(h) => setToast(`${h.name} updated — live preview saved.`)}
      />

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}
