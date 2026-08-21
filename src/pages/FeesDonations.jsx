import { useMemo, useState } from 'react'
import { useLanguage } from '../i18n.jsx'
import { colors, radii } from '../theme.js'
import { Card, CardHeader, Badge, Button, Input, Select, PageHeader, statusTone, EmptyState } from '../components/ui.jsx'
import { IconFees, IconShield, IconPlus } from '../components/icons.jsx'
import { useAppStore } from '../store.jsx'
import { usdValue, formatUsd, formatAmount } from '../lib/currency.js'

function IconDonation({ size = 16, color }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} stroke={color || 'currentColor'} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21c-5 0-9-3.6-9-8 0-3 2-5.5 4-6.5C8 4.5 10 3 12 3s4 1.5 5 3.5c2 1 4 3.5 4 6.5 0 4.4-4 8-9 8z" />
      <path d="M12 8v8M9 11h6" />
    </svg>
  )
}

const typeMeta = {
  fee: { labelKey: 'feesPage.fee', color: colors.info },
  sponsorship: { labelKey: 'feesPage.sponsorship', color: colors.purple },
  donation: { labelKey: 'feesPage.donation', color: colors.success },
}

export default function FeesDonations() {
  const { t } = useLanguage()
  const { donations: storeDonations, monks: storeMonks, addDonation } = useAppStore()
  const allMonks = storeMonks
  const [form, setForm] = useState({ type: 'fee', name: '', monk: '', amount: '', note: '' })
  const [error, setError] = useState('')

  const txns = storeDonations

  const stats = useMemo(() => {
    const collected = txns.filter((x) => x.type === 'fee').reduce((s, x) => s + usdValue(x.amount, x.currency), 0)
    const donations = txns.filter((x) => x.type !== 'fee').reduce((s, x) => s + usdValue(x.amount, x.currency), 0)
    const outstanding = allMonks.reduce((s, m) => s + Number(m.feeBalance || 0), 0)
    const sponsorships = allMonks.filter((m) => m.sponsor).length
    return { collected, donations, outstanding, sponsorships }
  }, [txns, allMonks])

  const submit = () => {
    const amount = Number(form.amount)
    if (!form.name.trim() || !amount || amount <= 0) {
      setError(t('common.noResults'))
      return
    }
    addDonation({
      type: form.type,
      name: form.name.trim(),
      monk: form.type === 'fee' ? form.monk : '',
      amount,
      date: new Date().toISOString().slice(0, 10),
      note: form.note.trim(),
    })
    setForm({ type: 'fee', name: '', monk: '', amount: '', note: '' })
    setError('')
  }

  const typeMetaL = (k) => typeMeta[k] || typeMeta.fee

  const statDefs = [
    { label: t('feesPage.statCollected'), value: formatUsd(stats.collected), color: colors.success, icon: <IconFees size={16} /> },
    { label: t('feesPage.statOutstanding'), value: formatUsd(stats.outstanding), color: colors.danger, icon: <IconDonation size={16} color={colors.danger} /> },
    { label: t('feesPage.statSponsorships'), value: stats.sponsorships, color: colors.purple, icon: <IconShield size={16} /> },
    { label: t('feesPage.statDonations'), value: formatUsd(stats.donations), color: colors.accent, icon: <IconDonation size={16} color={colors.accent} /> },
  ]

  return (
    <div>
      <PageHeader title={t('feesPage.title')} subtitle={t('feesPage.subtitle')} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 18 }}>
        {statDefs.map((s) => (
          <Card key={s.label} pad={16} style={{ borderTop: `3px solid ${s.color}` }}>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: colors.muted, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: s.color }}>{s.icon}</span>
              {s.label}
            </p>
            <p style={{ margin: '6px 0 0', fontSize: 26, fontWeight: 800, color: colors.text }}>{s.value}</p>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 16, marginBottom: 16 }}>
        <Card pad={18}>
          <CardHeader title={t('feesPage.addTitle')} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Select
              label={t('feesPage.transactionType')}
              value={form.type}
              onChange={(v) => setForm((f) => ({ ...f, type: v }))}
              options={['fee', 'sponsorship', 'donation'].map((k) => ({ value: k, label: t(`feesPage.${k}`) }))}
            />
            <Input
              label={t('feesPage.paidBy')}
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              placeholder={t('feesPage.enterName')}
            />
            {form.type === 'fee' && (
              <Select
                label={t('feesPage.monkOptional')}
                value={form.monk}
                onChange={(v) => setForm((f) => ({ ...f, monk: v }))}
                options={[{ value: '', label: t('feesPage.selectMonk') }, ...allMonks.map((m) => ({ value: m.name, label: m.name }))]}
              />
            )}
            <Input
              label={t('common.amount')}
              value={form.amount}
              onChange={(v) => setForm((f) => ({ ...f, amount: v }))}
              placeholder={t('feesPage.enterAmount')}
              type="number"
            />
            <Input
              label={t('common.note')}
              value={form.note}
              onChange={(v) => setForm((f) => ({ ...f, note: v }))}
              placeholder={t('feesPage.enterNote')}
            />
            {error && <p style={{ margin: 0, fontSize: 12, color: colors.danger }}>{error}</p>}
            <Button icon={<IconPlus size={15} />} onClick={submit}>{t('feesPage.submit')}</Button>
          </div>
        </Card>

        <Card pad={18}>
          <CardHeader title={t('feesPage.recent')} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 420, overflowY: 'auto' }}>
            {txns.map((x) => {
              const meta = typeMetaL(x.type)
              return (
                <div key={x.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: radii.md, background: colors.surfaceAlt, border: `1px solid ${colors.border}` }}>
                  <span style={{ width: 34, height: 34, borderRadius: radii.md, background: `${meta.color}1A`, color: meta.color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {x.type === 'fee' ? <IconFees size={15} /> : <IconDonation size={15} color={meta.color} />}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: colors.text }}>{x.name}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 11.5, color: colors.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {x.monk ? `${t('feesPage.fee')} · ${x.monk}` : t(`feesPage.${x.type}`)} · {x.date}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: meta.color }}>{formatAmount(x.amount, x.currency)}</p>
                    <Badge tone={x.type === 'fee' ? 'info' : x.type === 'sponsorship' ? 'purple' : 'success'}>{t(`feesPage.${x.type}`)}</Badge>
                  </div>
                </div>
              )
            })}
            {txns.length === 0 && <EmptyState text={t('feesPage.emptyLedger')} />}
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
        <Card pad={18}>
          <CardHeader title={t('feesPage.feeBalances')} />
          <div style={{ overflowX: 'auto', borderRadius: radii.md, border: `1px solid ${colors.border}` }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 560 }}>
              <thead>
                <tr style={{ background: colors.surfaceAlt }}>
                  {[t('common.name'), t('common.className'), t('feesPage.balance'), t('feesPage.sponsorBy'), t('common.status')].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: 11, fontWeight: 700, color: colors.muted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allMonks.filter((m) => m.status !== 'graduated' && m.status !== 'withdrawn').map((m) => {
                  const status = m.feeBalance > 200 ? 'due' : m.feeBalance > 0 ? 'partial' : 'paid'
                  return (
                    <tr key={m.id} style={{ borderTop: `1px solid ${colors.border}` }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600, color: colors.text }}>{m.name}</td>
                      <td style={{ padding: '10px 12px', color: colors.textSoft }}>{m.classId}</td>
                      <td style={{ padding: '10px 12px', fontWeight: 700, color: m.feeBalance > 0 ? colors.danger : colors.success }}>
                        {m.feeBalance > 0 ? formatUsd(m.feeBalance) : '✓'}
                      </td>
                      <td style={{ padding: '10px 12px', color: colors.textSoft }}>{m.sponsor || t('roster.noSponsor')}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <Badge tone={statusTone(status)} dot>{t(`statuses.${status}`)}</Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card pad={18}>
          <CardHeader title={t('feesPage.sponsorTitle')} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {allMonks.filter((m) => m.sponsor).map((m) => (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: radii.md, background: '#F0E6F8', border: `1px solid ${colors.border}` }}>
                <IconShield size={16} color={colors.purple} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: colors.text }}>{m.name}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 11.5, color: colors.muted }}>{t('feesPage.sponsorBy')} {m.sponsor}</p>
                </div>
                <Badge tone="success" dot>{t('statuses.active')}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
