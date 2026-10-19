import '@testing-library/jest-dom/vitest'
import { configure } from '@testing-library/react'

/* Lazy routes are transformed on demand under vitest, which is slower than a
   production bundle, so give async queries a wider window. */
configure({ asyncUtilTimeout: 8000 })

if (typeof window !== 'undefined') {
  window.scrollTo = () => {}
  window.HTMLElement.prototype.scrollIntoView = () => {}
}
