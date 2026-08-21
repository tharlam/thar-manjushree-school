export const transactions = [
  { id: 'T-101', type: 'fee', name: 'Ngawang Lhamo', monk: 'Ngawang Lhamo', amount: 180, date: '2026-08-01', note: 'Monthly fee installment' },
  { id: 'T-102', type: 'sponsorship', name: 'Chenrezig Foundation', monk: '', amount: 1200, date: '2026-07-28', note: 'Annual sponsorship grant' },
  { id: 'T-103', type: 'donation', name: 'Anonymous Devotee', monk: '', amount: 350, date: '2026-07-25', note: 'Festival offering' },
  { id: 'T-104', type: 'fee', name: 'Tenzin Dorje', monk: 'Tenzin Dorje', amount: 180, date: '2026-07-30', note: 'Monthly fee settled' },
  { id: 'T-105', type: 'donation', name: 'Kailash Trust', monk: '', amount: 800, date: '2026-07-20', note: 'Food program support' },
]

export const donations = transactions.filter((t) => t.type !== 'fee')
