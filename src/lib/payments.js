// Khalti checkout wrapper.
//
// The public key (VITE_KHALTI_PUBLIC_KEY) is safe to expose in the browser.
// Money never touches this code: Khalti redirects the user to their hosted
// checkout, and on success the returned token is verified server-side by the
// Supabase Edge Function "verify-donation" using the secret key.

export const khaltiConfigured = Boolean(import.meta.env.VITE_KHALTI_PUBLIC_KEY)

let scriptPromise = null

function loadKhaltiScript() {
  if (window.KhaltiCheckout) return Promise.resolve()
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = 'https://khalti.com/static/khalti-checkout.js'
      s.async = true
      s.onload = () => resolve()
      s.onerror = () => reject(new Error('KHALTI_LOAD_FAILED'))
      document.body.appendChild(s)
    })
  }
  return scriptPromise
}

export async function payWithKhalti({ amountNpr, onSuccess, onError, onClose }) {
  await loadKhaltiScript()
  const checkout = new window.KhaltiCheckout({
    publicKey: import.meta.env.VITE_KHALTI_PUBLIC_KEY,
    productIdentity: `thar-manjushree-${Date.now()}`,
    productName: 'Donation to Thar Manjushree School',
    productUrl: window.location.origin,
    amount: Math.round(amountNpr * 100), // paisa
    paymentPreference: ['KHALTI', 'EBANKING', 'MOBILE_BANKING', 'CONNECT_IPS', 'SCT'],
    onSuccess,
    onError,
    onClose,
  })
  checkout.show()
}
