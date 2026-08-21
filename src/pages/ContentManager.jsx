import { useRef, useState } from 'react'
import { useLanguage } from '../i18n.jsx'
import { useAppStore } from '../store.jsx'
import { colors, radii } from '../theme.js'
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

const inputStyle = {
  width: '100%',
  padding: '8px 11px',
  borderRadius: radii.sm,
  border: `1px solid ${colors.border}`,
  background: colors.surface,
  color: colors.text,
  fontSize: 12.5,
  fontFamily: 'inherit',
  outline: 'none',
  boxSizing: 'border-box',
}

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
    <div className="content-manager-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
      <Card pad={18}>
        <CardHeader title={t('cms.pagesTab')} subtitle={`${t('cms.pickPage')}: ${pageNames[page]}`} />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
          {Object.keys(pageFields).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              style={{
                padding: '7px 14px',
                borderRadius: radii.round,
                border: `1px solid ${page === p ? colors.primary : colors.border}`,
                background: page === p ? colors.primary : colors.surface,
                color: page === p ? '#fff' : colors.textSoft,
                fontSize: 12.5,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {pageNames[p]}
            </button>
          ))}
        </div>

        <div style={{ overflowX: 'auto', borderRadius: radii.md, border: `1px solid ${colors.border}` }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5, minWidth: 720 }}>
            <thead>
              <tr style={{ background: colors.surfaceAlt }}>
                <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: 11, fontWeight: 700, color: colors.muted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{t('cms.field')}</th>
                <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: 11, fontWeight: 700, color: colors.muted }}>{t('cms.english')}</th>
                <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: 11, fontWeight: 700, color: colors.muted }}>{t('cms.nepali')}</th>
                <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: 11, fontWeight: 700, color: colors.muted }}>{t('cms.tibetan')}</th>
              </tr>
            </thead>
            <tbody>
              {pageFields[page].map((f) => (
                <tr key={f} style={{ borderTop: `1px solid ${colors.border}` }}>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: colors.textSoft, whiteSpace: 'nowrap' }}>{friendly[f] || f}</td>
                  {langList.map((lang) => (
                    <td key={lang} style={{ padding: '8px' }}>
                      <textarea
                        value={field(f)[lang] || ''}
                        onChange={(e) => setPageField(page, f, lang, e.target.value)}
                        rows={f.toLowerCase().includes('body') ? 3 : 1}
                        style={{ ...inputStyle, resize: 'vertical' }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
          <Button onClick={save}>{t('cms.save')}</Button>
        </div>
        {saved && <Toast message={t('cms.saved')} onClose={() => setSaved(false)} />}
      </Card>

      <Card pad={18}>
        <CardHeader title={t('cms.preview')} subtitle={pageNames[page]} />
        <div style={{ borderRadius: radii.lg, overflow: 'hidden', border: `1px solid ${colors.border}`, background: `linear-gradient(120deg, ${colors.sidebar}, ${colors.primaryDark})`, padding: 22, color: '#fff' }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>{field('heroTitle')?.en || field('introTitle')?.en || field('name')?.en}</h3>
          <p style={{ margin: '8px 0 0', fontSize: 12.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.8)' }}>
            {field('heroSubtitle')?.en || field('introBody')?.en || field('bioBody')?.en || ''}
          </p>
        </div>
        <p style={{ margin: '14px 0 0', fontSize: 12, color: colors.muted, lineHeight: 1.6 }}>
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {announcements.map((a) => (
          <div key={a.id} style={{ borderRadius: radii.lg, border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: colors.surfaceAlt, borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontWeight: 800, color: colors.primary, fontSize: 12.5 }}>{a.date}</span>
              <span style={{ flex: 1, fontSize: 12.5, color: colors.muted }}>{a.en?.title || t('cms.announcementTitle')}</span>
              <Button size="sm" tone="danger" icon={<IconTrash size={14} />} onClick={() => deleteAnnouncement(a.id)}>
                {t('cms.delete')}
              </Button>
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1, minWidth: 160 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: colors.muted }}>{t('common.date')}</span>
                  <input type="date" value={a.date} onChange={(e) => updateAnnouncement(a.id, { date: e.target.value })} style={inputStyle} />
                </label>
              </div>
              {langList.map((lang) => (
                <div key={lang} style={{ marginBottom: 10, padding: 12, borderRadius: radii.md, background: colors.surfaceAlt, border: `1px solid ${colors.border}` }}>
                  <Badge tone={lang === 'en' ? 'info' : lang === 'ne' ? 'accent' : 'primary'}>
                    {lang === 'en' ? t('cms.english') : lang === 'ne' ? t('cms.nepali') : t('cms.tibetan')}
                  </Badge>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
                    <input
                      placeholder={t('cms.announcementTitle')}
                      value={a[lang]?.title || ''}
                      onChange={(e) => updateAnnouncement(a.id, { [lang]: { ...a[lang], title: e.target.value } })}
                      style={{ ...inputStyle, flex: 1, minWidth: 180 }}
                    />
                    <textarea
                      placeholder={t('cms.announcementBody')}
                      value={a[lang]?.body || ''}
                      onChange={(e) => updateAnnouncement(a.id, { [lang]: { ...a[lang], body: e.target.value } })}
                      rows={2}
                      style={{ ...inputStyle, flex: 2, minWidth: 260, resize: 'vertical' }}
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

      <div style={{ marginBottom: 18, padding: 16, borderRadius: radii.lg, border: `1px dashed ${colors.border}`, background: colors.surfaceAlt }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Input label={t('cms.photoTitle')} value={newPhoto.title} onChange={(v) => setNewPhoto((p) => ({ ...p, title: v }))} style={{ flex: 1, minWidth: 160 }} />
          <Select
            label={t('cms.photoCategory')}
            value={newPhoto.category}
            onChange={(v) => setNewPhoto((p) => ({ ...p, category: v }))}
            options={['festival', 'ceremony', 'school'].map((c) => ({ value: c, label: t(`galleryPage.${c}`) }))}
          />
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12, alignItems: 'flex-end' }}>
          <Input label={t('cms.photoUrl')} value={newPhoto.url} onChange={(v) => setNewPhoto((p) => ({ ...p, url: v }))} style={{ flex: 2, minWidth: 220 }} />
          <Button tone="outline" icon={<IconEdit size={14} />} onClick={() => fileRef.current?.click()}>
            {t('cms.chooseFile')}
          </Button>
          <Button icon={<IconPlus size={15} />} onClick={add}>
            {t('cms.addPhoto')}
          </Button>
          <input ref={fileRef} type="file" accept="image/*" onChange={onFile} style={{ display: 'none' }} />
        </div>
        {newPhoto.url && (
          <div style={{ marginTop: 12 }}>
            <img src={newPhoto.url} alt="preview" style={{ height: 110, borderRadius: radii.md, border: `1px solid ${colors.border}`, objectFit: 'cover' }} />
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
        {gallery.map((g) => (
          <div key={g.id} style={{ borderRadius: radii.lg, border: `1px solid ${colors.border}`, overflow: 'hidden', background: colors.surface }}>
            <div style={{ position: 'relative' }}>
              <img src={g.url} alt={g.title} loading="lazy" style={{ width: '100%', height: 130, objectFit: 'cover', display: 'block', background: colors.surfaceAlt }} />
              <span style={{ position: 'absolute', top: 8, right: 8 }}>
                <Button size="sm" tone="danger" icon={<IconTrash size={13} />} onClick={() => deletePhoto(g.id)}>
                  {t('cms.delete')}
                </Button>
              </span>
            </div>
            <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <input value={g.title} onChange={(e) => updatePhoto(g.id, { title: e.target.value })} style={inputStyle} />
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
        <p style={{ textAlign: 'center', color: colors.muted, fontSize: 13, padding: '30px 0' }}>{t('cms.noPhotos')}</p>
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

      <div style={{ padding: 16, borderRadius: radii.lg, border: `1px dashed ${colors.border}`, background: colors.surfaceAlt }}>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button
            icon={<IconPlus size={15} />}
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Choose Image'}
          </Button>
          {uploading && <span style={{ fontSize: 13, color: colors.muted }}>Uploading to Cloudinary...</span>}
        </div>

        {error && (
          <p style={{ margin: '10px 0 0', fontSize: 12.5, color: colors.danger, fontWeight: 600 }}>{error}</p>
        )}

        {imageUrl && (
          <div style={{ marginTop: 14 }}>
            <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 700, color: colors.textSoft }}>Latest upload preview:</p>
            <img src={imageUrl} alt="uploaded" style={{ maxHeight: 200, borderRadius: radii.md, border: `1px solid ${colors.border}`, objectFit: 'contain' }} />
            <p style={{ margin: '8px 0 0', fontSize: 11, color: colors.muted, wordBreak: 'break-all' }}>{imageUrl}</p>
          </div>
        )}
      </div>

      {uploadedImages.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 700, color: colors.text }}>Uploaded Images</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
            {uploadedImages.map((img) => (
              <div key={img.id} style={{ borderRadius: radii.md, border: `1px solid ${colors.border}`, overflow: 'hidden', background: colors.surface }}>
                <img src={img.url} alt={img.name} style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: 8 }}>
                  <p style={{ margin: 0, fontSize: 11, color: colors.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{img.name}</p>
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

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
        {tabs.map((tb) => (
          <button
            key={tb.key}
            type="button"
            onClick={() => setTab(tb.key)}
            style={{
              padding: '9px 18px',
              borderRadius: radii.md,
              border: `1px solid ${tab === tb.key ? colors.primary : colors.border}`,
              background: tab === tb.key ? colors.primary : colors.surface,
              color: tab === tb.key ? '#fff' : colors.textSoft,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
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
