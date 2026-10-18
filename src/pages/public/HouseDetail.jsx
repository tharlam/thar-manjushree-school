import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppStore } from '../../store.jsx'
import { PageHero, Section, Photo } from './shared.jsx'
import { CardEyebrow, CardTitle, CardBody, OpenCard, Panel } from '../../components/cards.jsx'
import { Button, Toast, EmptyState } from '../../components/ui.jsx'
import { MascotCard, SloganQuiz } from '../../components/house/widgets.jsx'
import { HouseEditor } from '../../components/house/HouseEditor.jsx'
import { houses } from '../../data/index.js'

const GALLERY_TABS = [
  { key: 'events', label: 'Events' },
  { key: 'sports', label: 'Sports' },
  { key: 'daily', label: 'Daily Life' },
]

export default function HouseDetail() {
  const { houseId } = useParams()
  const { houseDetails } = useAppStore()

  const house = houses.find((h) => h.id === houseId)
  const detail = house ? houseDetails?.[house.id] : null

  const [editOpen, setEditOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [tab, setTab] = useState('events')

  if (!house || !detail) {
    return (
      <div className="py-24">
        <EmptyState text="That house could not be found." />
        <div className="flex justify-center">
          <Link to="/houses" className="no-underline">
            <Button tone="primary">Back to House System</Button>
          </Link>
        </div>
      </div>
    )
  }

  const accent = house.color
  const vibe = detail.vibe || {}
  const gallery = detail.gallery || {}
  const activeGallery = gallery[tab] || []

  return (
    <div>
      <div style={{ borderBottom: `4px solid ${accent}` }}>
        <PageHero
          title={house.name}
          subtitle={vibe.tagline || house.motto}
          kicker={house.element}
        >
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <Link to="/houses" className="no-underline">
              <Button tone="outline" className="bg-white/95">
                ← All Houses
              </Button>
            </Link>
            <Button tone="primary" style={{ background: accent, borderColor: accent }} onClick={() => setEditOpen(true)}>
              Edit Section
            </Button>
          </div>
        </PageHero>
      </div>

      {/* 1. House Identity — photo + description only */}
      <Section eyebrow="The Vibe" title="House Identity">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <Photo
            src={vibe.banner}
            alt={`${house.name} banner`}
            ratio="4 / 3"
            radius={16}
            fallbackLabel={`${house.name} photograph`}
          />
          <CardBody className="text-[15.5px] leading-[1.85]">{vibe.description}</CardBody>
        </div>
      </Section>

      {/* 2. Leadership Team — profiles only, no contact details */}
      <Section eyebrow="The Captains" title="Leadership Team" className="border-t border-line bg-surface-alt">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {(detail.captains || []).map((c) => (
            <OpenCard key={c.name}>
              <div className="flex items-center gap-4">
                <div className="w-[76px] shrink-0">
                  <Photo src={c.photo} alt={c.name} ratio="1 / 1" radius={12} fallbackLabel={c.name.split(' ')[0]} />
                </div>
                <div className="min-w-0">
                  <CardTitle>{c.name}</CardTitle>
                  <p className="mt-1 mb-0 text-[11px] font-bold tracking-[1.4px] uppercase" style={{ color: accent }}>
                    {c.role}
                  </p>
                </div>
              </div>
              <CardBody className="mt-3">{c.bio}</CardBody>
            </OpenCard>
          ))}
        </div>
      </Section>

      {/* 3. Records & Achievements — "Trophy Case" */}
      <Section eyebrow="Trophy Case" title="Records & Achievements">
        <p className="mx-auto mt-0 mb-7 max-w-[640px] text-center text-[14.5px] text-muted">{detail.records?.summary}</p>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Panel pad={24}>
            <CardEyebrow color={accent}>House Cup History</CardEyebrow>
            <ol className="m-0 mt-4 list-none p-0">
              {(detail.records?.cupWins || []).map((w) => (
                <li key={w.year} className="flex gap-4 border-b border-line py-3.5 last:border-b-0">
                  <span
                    className="inline-flex size-[46px] shrink-0 items-center justify-center rounded-md font-heading text-[15px] font-bold"
                    style={{ background: `${accent}1A`, color: accent }}
                  >
                    {w.year}
                  </span>
                  <div>
                    <p className="m-0 text-[13.5px] font-bold text-ink">{w.title}</p>
                    <p className="mt-0.5 mb-0 text-[12.5px] text-body">{w.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Panel>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
            {(detail.records?.trophies || []).map((t) => (
              <Photo key={t.id} src={t.url} alt={t.title} ratio="4 / 3" radius={12} fallbackLabel={t.title} />
            ))}
          </div>
        </div>
      </Section>

      {/* 4. Gallery & Media — "Visuals" */}
      <Section eyebrow="Visuals" title="Gallery & Media" className="border-t border-line bg-surface-alt">
        <div className="mb-6 flex justify-center gap-2">
          {GALLERY_TABS.map((tb) => (
            <button
              key={tb.key}
              type="button"
              onClick={() => setTab(tb.key)}
              className="cursor-pointer rounded-full border px-4 py-2 text-[12.5px] font-semibold transition-colors"
              style={
                tab === tb.key
                  ? { background: accent, borderColor: accent, color: '#fff' }
                  : { background: 'transparent', borderColor: 'var(--color-line)', color: 'var(--color-body)' }
              }
            >
              {tb.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
          {activeGallery.map((img) => (
            <Photo key={img.id} src={img.url} alt={img.title} ratio="4 / 3" radius={12} fallbackLabel={img.title} />
          ))}
        </div>

        {gallery.video && (
          <div className="relative mt-8 overflow-hidden rounded-lg shadow-card">
            <Photo src={gallery.video.poster} alt={gallery.video.title} ratio="16 / 9" radius={16} fallbackLabel="Highlight reel" />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/35 text-center text-white">
              <span className="flex size-[62px] items-center justify-center rounded-full bg-white/92 text-ink">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7 5l12 7-12 7z" />
                </svg>
              </span>
              <p className="mt-3 mb-0 text-[13.5px] font-bold">{gallery.video.title}</p>
              <p className="m-0 text-[11.5px] text-white/80">Highlight reel · {gallery.video.duration}</p>
            </div>
          </div>
        )}
      </Section>

      {/* 5. Get Involved */}
      <Section
        eyebrow="Get Involved"
        title="More Than Just a House"
        subtitle={`Meet ${house.name}'s mascot and put your knowledge to the test with a quick slogan quiz.`}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <MascotCard mascot={detail.interactive?.mascot} accent={accent} />
          <SloganQuiz quiz={detail.interactive?.quiz} accent={accent} />
        </div>
      </Section>

      {editOpen && (
        <HouseEditor
          key={house.id}
          house={house}
          detail={detail}
          onClose={() => setEditOpen(false)}
          onSaved={(h) => setToast(`${h.name} updated — live preview saved.`)}
        />
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}
