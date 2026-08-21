import { useMemo, useState } from 'react'
import { useField, PageHero, Section } from './shared.jsx'
import { colors, radii } from '../../theme.js'
import { useLanguage } from '../../i18n.jsx'
import { useAppStore } from '../../store.jsx'

function Photo({ item }) {
  const { t } = useLanguage()
  const [failed, setFailed] = useState(false)
  return (
    <figure
      style={{
        margin: 0,
        borderRadius: radii.lg,
        overflow: 'hidden',
        border: `1px solid ${colors.border}`,
        background: colors.surface,
        boxShadow: '0 1px 2px rgba(36,33,28,0.05), 0 4px 16px rgba(36,33,28,0.05)',
      }}
    >
      {failed ? (
        <div
          style={{
            height: 210,
            background: `linear-gradient(135deg, ${colors.primaryDark}, ${colors.primary})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.85)',
            fontSize: 64,
            fontWeight: 900,
          }}
        >
          ད
        </div>
      ) : (
        <img
          src={item.url}
          alt={item.title}
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ width: '100%', height: 210, objectFit: 'cover', display: 'block' }}
        />
      )}
      <figcaption style={{ padding: '12px 14px' }}>
        <p style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: colors.text }}>{item.title}</p>
        <span style={{ display: 'inline-block', marginTop: 6, padding: '2px 10px', borderRadius: radii.round, background: colors.primarySoft, color: colors.primary, fontSize: 11, fontWeight: 700 }}>
          {t(`galleryPage.${item.category}`) || item.category}
        </span>
      </figcaption>
    </figure>
  )
}

export default function Gallery() {
  const { t } = useLanguage()
  const { gallery, loading } = useAppStore()
  const introTitle = useField('gallery', 'introTitle')
  const introBody = useField('gallery', 'introBody')

  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => (filter === 'all' ? gallery : gallery.filter((g) => g.category === filter)), [filter, gallery])

  const cats = ['all', 'festival', 'ceremony', 'school']

  return (
    <div>
      <PageHero title={introTitle} subtitle={introBody} kicker={t('galleryPage.title')} />

      <Section>
        {loading ? (
          <div className="loading-overlay">
            <div className="spinner-lg spinner"></div>
            <span>{t('common.loading') || 'Loading...'}</span>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: colors.muted }}>{t('galleryPage.categoryLabel')}:</span>
              {cats.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: radii.round,
                    border: `1px solid ${filter === c ? colors.primary : colors.border}`,
                    background: filter === c ? colors.primary : colors.surface,
                    color: filter === c ? '#fff' : colors.textSoft,
                    fontSize: 12.5,
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {t(`galleryPage.${c}`)}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
              {filtered.map((g) => (
                <Photo key={g.id} item={g} />
              ))}
            </div>
            {filtered.length === 0 && (
              <p style={{ textAlign: 'center', fontSize: 13.5, color: colors.muted, padding: '30px 0' }}>{t('common.noResults')}</p>
            )}
          </>
        )}
      </Section>
    </div>
  )
}
