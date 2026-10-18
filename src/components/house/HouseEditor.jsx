import { useState } from 'react'
import { Drawer } from '../Drawer.jsx'
import { Button, Input, Textarea } from '../ui.jsx'
import { Photo } from '../../pages/public/shared.jsx'
import { useAppStore } from '../../store.jsx'

/*
 * Frontend-mock CMS drawer.
 *
 * Edits the content that remains on the individual house page: the description,
 * banner photo and house captain profile. "Save Changes" writes to AppStore
 * (localStorage-backed live state) so the public page re-renders instantly — a
 * stand-in for a real backend CMS with role-based permissions.
 *
 * Mounted fresh by the parent each time it opens (keyed by house), so form
 * state is seeded straight from the current detail via the initializer.
 */
export function HouseEditor({ house, detail, onClose, onSaved }) {
  const { updateHouseDetail } = useAppStore()

  const [form, setForm] = useState(() => ({
    tagline: detail?.vibe?.tagline || '',
    description: detail?.vibe?.description || '',
    banner: detail?.vibe?.banner || '',
    captainName: detail?.captains?.[0]?.name || '',
    captainRole: detail?.captains?.[0]?.role || '',
    captainBio: detail?.captains?.[0]?.bio || '',
  }))

  if (!detail) return null

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }))

  const handleSave = () => {
    const captains = [...(detail.captains || [])]
    if (captains[0]) {
      captains[0] = {
        ...captains[0],
        name: form.captainName,
        role: form.captainRole,
        bio: form.captainBio,
      }
    }

    updateHouseDetail(house.id, {
      vibe: { tagline: form.tagline, description: form.description, banner: form.banner },
      captains,
    })
    onSaved?.(house)
    onClose?.()
  }

  return (
    <Drawer
      open
      onClose={onClose}
      title={`Edit ${house.name}`}
      subtitle="Frontend mock — changes save to local state for a live preview."
      footer={
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11.5px] text-muted">No backend yet — edits persist in this browser.</span>
          <div className="flex gap-2.5">
            <Button tone="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button tone="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-5">
        <section className="flex flex-col gap-3">
          <h4 className="m-0 text-[13px] font-bold tracking-[0.3px] uppercase" style={{ color: house.color }}>
            Vibe & Banner
          </h4>
          <Input label="Tagline" value={form.tagline} onChange={set('tagline')} placeholder="House tagline" />
          <Textarea label="Description" value={form.description} onChange={set('description')} rows={5} />
          <Input label="Banner photo URL" value={form.banner} onChange={set('banner')} placeholder="https://…" />
        </section>

        <section className="flex flex-col gap-3 border-t border-line pt-5">
          <h4 className="m-0 text-[13px] font-bold tracking-[0.3px] uppercase" style={{ color: house.color }}>
            House Captain
          </h4>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
            <Input label="Name" value={form.captainName} onChange={set('captainName')} />
            <Input label="Role" value={form.captainRole} onChange={set('captainRole')} />
          </div>
          <Textarea label="Bio" value={form.captainBio} onChange={set('captainBio')} rows={3} />
        </section>

        <section className="border-t border-line pt-5">
          <h4 className="m-0 mb-3 text-[13px] font-bold tracking-[0.3px] uppercase" style={{ color: house.color }}>
            Live Preview
          </h4>
          <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-card">
            <Photo src={form.banner} alt="" ratio="16 / 7" radius={0} fallbackLabel="Banner preview" />
            <div className="p-4">
              <p className="m-0 text-[11px] font-bold tracking-[1.4px] uppercase" style={{ color: house.color }}>
                {house.name}
              </p>
              <p className="mt-1.5 mb-0 font-heading text-[15px] font-bold text-ink">{form.tagline}</p>
              <p className="mt-1.5 mb-0 line-clamp-3 text-[12.5px] leading-[1.65] text-body">{form.description}</p>
              <p className="mt-3 mb-0 text-[12px] text-body">
                <span className="font-bold text-ink">Captain:</span> {form.captainName}
                {form.captainRole ? ` · ${form.captainRole}` : ''}
              </p>
            </div>
          </div>
        </section>
      </div>
    </Drawer>
  )
}
