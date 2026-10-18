// Currency helpers.
//
// Admin-entered fees and the original seeded prototype data are in USD.
// Aggregate statistics are shown as "~USD" using the fixed reference rate
// below (kept in one place so it is easy to update). Per-item amounts always
// show their native currency.

export const NPR_PER_USD = 135

export function isNpr(currency) {
  return currency === 'NPR'
}

// Convert any supported amount to USD-equivalent for aggregate stats.
export function usdValue(amount, currency) {
  const num = Number(amount) || 0
  return isNpr(currency) ? num / NPR_PER_USD : num
}

// Format a single item in its own currency.
export function formatAmount(amount, currency) {
  const num = Number(amount) || 0
  if (isNpr(currency)) return `Rs ${num.toLocaleString()}`
  return `~USD ${num.toLocaleString()}`
}

// Format an aggregate (already converted) USD figure.
export function formatUsd(num) {
  return `~USD ${(Number(num) || 0).toLocaleString()}`
}
