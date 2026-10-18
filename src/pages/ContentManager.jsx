import { useRef, useState } from 'react'
import { useLanguage } from '../i18n.jsx'
import { useAppStore } from '../store.jsx'
import { cn } from '../lib/cn.js'
import { Card, CardHeader, Button, Input, Select, Badge, PageHeader, Toast } from '../components/ui.jsx'
import { IconPlus, IconTrash, IconEdit } from '../components/icons.jsx'
import { pageFields } from '../contentDefaults.js'
import uploadImage from '../uploadImage.js'

const langList = ['en', 'ne', 'bo']

const friendly = {
  heroTitle: 'Hero Title',
  heroSubtitle: 'Hero Subtitle',
  welcomeTitle: 'Welcome Title',
  welcomeBody: 'Welcome Body',
  ctaSupport: 'Support Button',
  ctaAdmissions: 'Admissions Button',
  introTitle: 'Intro Title',
  introBody: 'Intro Body',
  historyTitle: 'History Title',
  historyBody: 'History Body',
  philosophyTitle: 'Philosophy Title',
  philosophyBody: 'Philosophy Body',
  name: 'Founder Name',
  title: 'Founder Title',
  bioTitle: 'Biography Title',
  bioBody: 'Biography Body',
  visionTitle: 'Vision Title',
  visionBody: 'Vision Body',
  mastersTitle: 'Masters Title',
  mastersBody: 'Masters Body',
  modernTitle: 'Modern Title',
  modernBody: 'Modern Body',
  requirementsTitle: 'Requirements Title',
  requirementsBody: 'Requirements Body',
  processTitle: 'Process Title',
  processBody: 'Process Body',
  bankTitle: 'Bank Title',
  bankBody: 'Bank Body',
  transparencyTitle: 'Transparency Title',
  transparencyBody: 'Transparency Body',
}

const pageNames = {
  home: 'Home',
  tradition: 'Our Tradition',
  founder: 'Founder',
  lineage: 'Lineage & Masters',
  curriculum: 'Curriculum',
  schedule: 'Daily Schedule',
  admissions: 'Admissions',
  gallery: 'Gallery',
  donations: 'Donations',
  contact: 'Contact',
}

const inputClass =
  'w-full rounded-sm border border-line bg-surface px-[11px] py-2 text-[12.5px] font-sans text-ink outline-none'

function PageTextTab() {
  const { t } = useLanguage()
  const { content, setPageField } = useAppStore()
  const [page, setPage] = useState('home')
  const [saved, setSaved] = useState(false)

  const field = (name) => content?.pages?.[page]?.[name] || {}

  const save = () => {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2600)
  }

  return (
    <div className="content-manager-grid grid grid-cols-[2fr_1fr] gap-4">
      <Card pad={18}>
        <CardHeader title={t('cms.pagesTab')} subtitle={`${t('cms.pickPage')}: ${pageNames[page]}`} />

        <div className="mb-4.5 flex flex-wrap gap-2">
          {Object.keys(pageFields).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              className={cn(
                'cursor-pointer rounded-full border px-3.5 py-[7px] text-[12.5px] font-bold',
                page === p ? 'border-pine bg-pine text-white' : 'border-line bg-surface text-body',
              )}
            >
              {pageNames[p]}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-md border border-line">
          <table className="w-full min-w-[720px] border-collapse text-[12.5px]">
            <thead>
              <tr className="bg-surface-alt">
                <th className="px-3 py-2.5 text-left text-[11px] font-bold tracking-[0.4px] text-muted uppercase">{t('cms.field')}</th>
                <th className="px-3 py-2.5 text-left text-[11px] font-bold text-muted">{t('cms.english')}</th>
                <th className="px-3 py-2.5 text-left text-[11px] font-bold text-muted">{t('cms.nepali')}</th>
                <th className="px-3 py-2.5 text-left text-[11px] font-bold text-muted">{t('cms.tibetan')}</th>
              </tr>
            </thead>
            <tbody>
              {pageFields[page].map((f) => (
                <tr key={f} className="border-t border-line">
                  <td className="px-3 py-2.5 font-bold whitespace-nowrap text-body">{friendly[f] || f}</td>
                  {langList.map((lang) => (
                    <td key={lang} className="p-2">
                      <textarea
                        value={field(f)[lang] || ''}
                        onChange={(e) => setPageField(page, f, lang, e.target.value)}
                        rows={f.toLowerCase().includes('body') ? 3 : 1}
                        className={cn(inputClass, 'resize-y')}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
          <Button onClick={save}>{t('cms.save')}</Button>
        </div>
        {saved && <Toast message={t('cms.saved')} onClose={() => setSaved(false)} />}
      </Card>

      <Card pad={18}>
        <CardHeader title={t('cms.preview')} subtitle={pageNames[page]} />
        <div className="overflow-hidden rounded-lg border border-line bg-ink p-[22px] text-white">
          <h3 className="m-0 text-[17px] font-extrabold">{field('heroTitle')?.en || field('introTitle')?.en || field('name')?.en}</h3>
          <p className="mt-2 mb-0 text-[12.5px] leading-[1.55] text-white/80">
            {field('heroSubtitle')?.en || field('introBody')?.en || field('bioBody')?.en || ''}
          </p>
        </div>
        <p className="mt-3.5 mb-0 text-[12px] leading-[1.6] text-muted">
          {t('cms.saved')}
        </p>
      </Card>
    </div>
  )
}

function AnnouncementsTab() {
  const { t } = useLanguage()
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useAppStore()

  return (
    <Card pad={18}>
      <CardHeader
        title={t('cms.announcementsTab')}
        right={
          <Button size="sm" icon={<IconPlus size={15} />} onClick={() => addAnnouncement({ date: new Date().toISOString().slice(0, 10) })}>
            {t('cms.addAnnouncement')}
          </Button>
        }
      />

      <div className="flex flex-col gap-4">
        {announcements.map((a) => (
          <div key={a.id} className="overflow-hidden rounded-lg border border-line">
            <div className="flex items-center gap-3 border-b border-line bg-surface-alt px-4 py-2.5">
              <span className="text-[12.5px] font-extrabold text-pine">{a.date}</span>
              <span className="flex-1 text-[12.5px] text-muted">{a.en?.title || t('cms.announcementTitle')}</span>
              <Button size="sm" tone="danger" icon={<IconTrash size={14} />} onClick={() => deleteAnnouncement(a.id)}>
                {t('cms.delete')}
              </Button>
            </div>
            <div className="p-3.5">
              <div className="mb-2.5 flex flex-wrap gap-3">
                <label className="flex min-w-[160px] flex-1 flex-col gap-[5px]">
                  <span className="text-[11px] font-bold text-muted">{t('common.date')}</span>
                  <input type="date" value={a.date} onChange={(e) => updateAnnouncement(a.id, { date: e.target.value })} className={inputClass} />
                </label>
              </div>
              {langList.map((lang) => (
                <div key={lang} className="mb-2.5 rounded-md border border-line bg-surface-alt p-3">
                  <Badge tone={lang === 'en' ? 'info' : lang === 'ne' ? 'accent' : 'primary'}>
                    {lang === 'en' ? t('cms.english') : lang === 'ne' ? t('cms.nepali') : t('cms.tibetan')}
                  </Badge>
                  <div className="mt-2.5 flex flex-wrap gap-2.5">
                    <input
                      placeholder={t('cms.announcementTitle')}
                      value={a[lang]?.title || ''}
                      onChange={(e) => updateAnnouncement(a.id, { [lang]: { ...a[lang], title: e.target.value } })}
                      className={cn(inputClass, 'flex-1 min-w-[180px]')}
                    />
                    <textarea
                      placeholder={t('cms.announcementBody')}
                      value={a[lang]?.body || ''}
                      onChange={(e) => updateAnnouncement(a.id, { [lang]: { ...a[lang], body: e.target.value } })}
                      rows={2}
                      className={cn(inputClass, 'flex-[2] min-w-[260px] resize-y')}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function GalleryTab() {
  const { t } = useLanguage()
  const { gallery, addPhoto, updatePhoto, deletePhoto } = useAppStore()
  const [newPhoto, setNewPhoto] = useState({ title: '', url: '', category: 'school', file: null })
  const fileRef = useRef(null)

  const onFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setNewPhoto((p) => ({ ...p, file, url: URL.createObjectURL(file) }))
  }

  const add = async () => {
    if (!newPhoto.url.trim()) return
    await addPhoto({ title: newPhoto.title.trim() || t('galleryPage.title'), url: newPhoto.url.trim(), category: newPhoto.category, file: newPhoto.file })
    setNewPhoto({ title: '', url: '', category: 'school', file: null })
  }

  return (
    <Card pad={18}>
      <CardHeader title={t('cms.galleryTab')} />

      <div className="mb-4.5 rounded-lg border border-dashed border-line bg-surface-alt p-4">
        <div className="flex flex-wrap gap-3">
          <Input label={t('cms.photoTitle')} value={newPhoto.title} onChange={(v) => setNewPhoto((p) => ({ ...p, title: v }))} className="flex-1 min-w-[160px]" />
          <Select
            label={t('cms.photoCategory')}
            value={newPhoto.category}
            onChange={(v) => setNewPhoto((p) => ({ ...p, category: v }))}
            options={['festival', 'ceremony', 'school'].map((c) => ({ value: c, label: t(`galleryPage.${c}`) }))}
          />
        </div>
        <div className="mt-3 flex flex-wrap items-end gap-2.5">
          <Input label={t('cms.photoUrl')} value={newPhoto.url} onChange={(v) => setNewPhoto((p) => ({ ...p, url: v }))} className="flex-[2] min-w-[220px]" />
          <Button tone="outline" icon={<IconEdit size={14} />} onClick={() => fileRef.current?.click()}>
            {t('cms.chooseFile')}
          </Button>
          <Button icon={<IconPlus size={15} />} onClick={add}>
            {t('cms.addPhoto')}
          </Button>
          <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden" />
        </div>
        {newPhoto.url && (
          <div className="mt-3">
            <img src={newPhoto.url} alt="preview" className="h-[110px] rounded-md border border-line object-cover" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3.5">
        {gallery.map((g) => (
          <div key={g.id} className="overflow-hidden rounded-lg border border-line bg-surface">
            <div className="relative">
              <img src={g.url} alt={g.title} loading="lazy" className="block h-[130px] w-full bg-surface-alt object-cover" />
              <span className="absolute top-2 right-2">
                <Button size="sm" tone="danger" icon={<IconTrash size={13} />} onClick={() => deletePhoto(g.id)}>
                  {t('cms.delete')}
                </Button>
              </span>
            </div>
            <div className="flex flex-col gap-2 p-3">
              <input value={g.title} onChange={(e) => updatePhoto(g.id, { title: e.target.value })} className={inputClass} />
              <Select
                value={g.category}
                onChange={(v) => updatePhoto(g.id, { category: v })}
                options={['festival', 'ceremony', 'school'].map((c) => ({ value: c, label: t(`galleryPage.${c}`) }))}
              />
            </div>
          </div>
        ))}
      </div>
      {gallery.length === 0 && (
        <p className="py-[30px] text-center text-[13px] text-muted">{t('cms.noPhotos')}</p>
      )}
    </Card>
  )
}

function ImageUploadTab() {
  const fileRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')
  const [uploadedImages, setUploadedImages] = useState([])

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const url = await uploadImage(file)
      setImageUrl(url)
      setUploadedImages((prev) => [...prev, { url, name: file.name, id: Date.now() }])
    } catch {
      setError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <Card pad={18}>
      <CardHeader title="Image Upload" subtitle="Upload images to Cloudinary" />

      <div className="rounded-lg border border-dashed border-line bg-surface-alt p-4">
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            icon={<IconPlus size={15} />}
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Choose Image'}
          </Button>
          {uploading && <span className="text-[13px] text-muted">Uploading to Cloudinary...</span>}
        </div>

        {error && (
          <p className="mt-2.5 mb-0 text-[12.5px] font-semibold text-danger">{error}</p>
        )}

        {imageUrl && (
          <div className="mt-3.5">
            <p className="mt-0 mb-2 text-[12px] font-bold text-body">Latest upload preview:</p>
            <img src={imageUrl} alt="uploaded" className="max-h-[200px] rounded-md border border-line object-contain" />
            <p className="mt-2 mb-0 text-[11px] break-all text-muted">{imageUrl}</p>
          </div>
        )}
      </div>

      {uploadedImages.length > 0 && (
        <div className="mt-4.5">
          <p className="mt-0 mb-2.5 text-[13px] font-bold text-ink">Uploaded Images</p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3">
            {uploadedImages.map((img) => (
              <div key={img.id} className="overflow-hidden rounded-md border border-line bg-surface">
                <img src={img.url} alt={img.name} className="block h-[120px] w-full object-cover" />
                <div className="p-2">
                  <p className="m-0 overflow-hidden text-[11px] text-ellipsis whitespace-nowrap text-muted">{img.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}

export default function ContentManager() {
  const { t } = useLanguage()
  const [tab, setTab] = useState('pages')

  const tabs = [
    { key: 'pages', label: t('cms.pagesTab') },
    { key: 'announcements', label: t('cms.announcementsTab') },
    { key: 'gallery', label: t('cms.galleryTab') },
    { key: 'images', label: 'Image Upload' },
  ]

  return (
    <div>
      <PageHeader title={t('cms.title')} subtitle={t('cms.subtitle')} />

      <div className="mb-4.5 flex flex-wrap gap-2">
        {tabs.map((tb) => (
          <button
            key={tb.key}
            type="button"
            onClick={() => setTab(tb.key)}
            className={cn(
              'cursor-pointer rounded-md border px-4.5 py-[9px] text-[13px] font-bold',
              tab === tb.key ? 'border-pine bg-pine text-white' : 'border-line bg-surface text-body',
            )}
          >
            {tb.label}
          </button>
        ))}
      </div>

      {tab === 'pages' && <PageTextTab />}
      {tab === 'announcements' && <AnnouncementsTab />}
      {tab === 'gallery' && <GalleryTab />}
      {tab === 'images' && <ImageUploadTab />}
    </div>
  )
}
