import { useMemo, useState } from 'react'
import { useLanguage } from '../i18n.jsx'
import { colors, radii } from '../theme.js'
import { Card, CardHeader, Badge, PageHeader, ProgressBar, Select } from '../components/ui.jsx'
import { IconClock, IconBook, IconCalendar } from '../components/icons.jsx'
import { classes, schedule, philosophy, syllabi } from '../data/index.js'

const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export default function ClassesCurriculum() {
  const { t } = useLanguage()
  const [dayFilter, setDayFilter] = useState('all')

  const filteredSchedule = useMemo(
    () => (dayFilter === 'all' ? schedule : schedule.filter((s) => s.dayKey === dayFilter)),
    [dayFilter]
  )

  return (
    <div>
      <PageHeader title={t('classesPage.title')} subtitle={t('classesPage.subtitle')} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 18 }}>
        {classes.map((c) => (
          <Card key={c.id} pad={16} style={{ borderLeft: `4px solid ${c.color}` }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: colors.text }}>{c.name}</p>
            <p style={{ margin: '4px 0', fontSize: 12, color: colors.muted }}>{c.teacher}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
              <Badge tone="neutral">{t('classesPage.students')}: {c.students}</Badge>
              <span style={{ fontSize: 11, color: colors.muted }}>{c.room}</span>
            </div>
          </Card>
        ))}
      </div>

      <Card pad={18} style={{ marginBottom: 16 }}>
        <CardHeader
          title={t('classesPage.scheduleTitle')}
          right={
            <Select
              value={dayFilter}
              onChange={setDayFilter}
              options={[{ value: 'all', label: t('common.all') }, ...dayKeys.map((k) => ({ value: k, label: t(`classesPage.${k}`) }))]}
            />
          }
        />
        <div style={{ overflowX: 'auto', borderRadius: radii.md, border: `1px solid ${colors.border}` }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 760 }}>
            <thead>
              <tr style={{ background: colors.surfaceAlt }}>
                {[t('classesPage.day'), t('classesPage.time'), t('classesPage.subject'), t('classesPage.level'), t('classesPage.teacher'), t('classesPage.room')].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: 11, fontWeight: 700, color: colors.muted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredSchedule.map((s, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${colors.border}` }}>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: colors.text, whiteSpace: 'nowrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <IconCalendar size={13} color={colors.accent} />
                      {t(`classesPage.${s.dayKey}`)}
                    </span>
                  </td>
                  <td style={{ padding: '11px 12px', color: colors.textSoft, whiteSpace: 'nowrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <IconClock size={13} color={colors.muted} />
                      {s.time}
                    </span>
                  </td>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: colors.text }}>{t(`subjects.${s.subjectKey}`)}</td>
                  <td style={{ padding: '11px 12px', color: colors.textSoft }}>{s.className}</td>
                  <td style={{ padding: '11px 12px', color: colors.textSoft }}>{s.teacher}</td>
                  <td style={{ padding: '11px 12px' }}>
                    <Badge tone="neutral">{s.room}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card pad={18}>
          <CardHeader title={t('classesPage.philosophyTitle')} subtitle={t('classesPage.progress')} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {philosophy.map((p) => (
              <div key={p.id} style={{ padding: '12px 14px', borderRadius: radii.md, background: colors.surfaceAlt, border: `1px solid ${colors.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 8 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, fontWeight: 700, color: colors.text }}>
                    <IconBook size={15} color={colors.primary} />
                    {t(`subjects.${p.titleKey}`)}
                  </span>
                  <Badge tone={p.progress >= 75 ? 'success' : p.progress >= 50 ? 'accent' : 'warning'}>{p.progress}%</Badge>
                </div>
                <ProgressBar value={p.progress} color={p.progress >= 75 ? colors.success : p.progress >= 50 ? colors.accent : colors.warning} />
                <div style={{ display: 'flex', gap: 14, marginTop: 8, fontSize: 11.5, color: colors.muted, flexWrap: 'wrap' }}>
                  <span>{t('classesPage.level')}: <b style={{ color: colors.textSoft }}>{p.level}</b></span>
                  <span>{t('classesPage.teacher')}: <b style={{ color: colors.textSoft }}>{p.teacher}</b></span>
                  <span>{t('classesPage.modules')}: <b style={{ color: colors.textSoft }}>{p.modules}</b></span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card pad={18}>
          <CardHeader title={t('classesPage.syllabiTitle')} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {syllabi.map((s) => (
              <div key={s.id} style={{ borderRadius: radii.md, border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
                <div style={{ padding: '12px 14px', background: `${s.color}12`, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 8, height: 34, borderRadius: 4, background: s.color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: colors.text }}>{t(`subjects.${s.titleKey}`)}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 11.5, color: colors.muted }}>
                      {s.code} · {t('classesPage.semester')}: {s.semester} · {s.credits} {t('classesPage.credits')}
                    </p>
                  </div>
                </div>
                <div style={{ padding: '10px 14px', background: colors.surface }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                    {s.modules.map((m) => (
                      <span key={m} style={{ padding: '2px 9px', borderRadius: radii.round, background: colors.surfaceAlt, border: `1px solid ${colors.border}`, fontSize: 11, color: colors.textSoft }}>
                        {m}
                      </span>
                    ))}
                  </div>
                  <p style={{ margin: 0, fontSize: 12, color: colors.textSoft, lineHeight: 1.5 }}>{t(`classesPage.${s.descriptionKey}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
