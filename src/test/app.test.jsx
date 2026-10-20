import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from '../App.jsx'

function renderAt(hash) {
  window.location.hash = hash
  return render(<App />)
}

afterEach(() => {
  cleanup()
  window.localStorage.clear()
})

describe('public routing', () => {
  it('renders the home page at the root route', async () => {
    renderAt('#/')

    expect(await screen.findByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders the house system page with a card per house', async () => {
    renderAt('#/houses')

    expect(await screen.findByRole('heading', { level: 1, name: 'House System' })).toBeInTheDocument()
    expect(await screen.findAllByRole('link', { name: /visit house/i })).toHaveLength(4)
  })

  it('redirects unknown routes back to the home page', async () => {
    renderAt('#/not-a-real-page')

    expect(await screen.findByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(window.location.hash).toBe('#/')
  })

  it('keeps the detail page off the list route', async () => {
    renderAt('#/houses/W')

    expect(await screen.findByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(window.location.hash).toBe('#/houses/W')
  })
})

describe('programs schedule tabs', () => {
  it('starts on the daily schedule and swaps content on click', async () => {
    renderAt('#/programs')

    expect(await screen.findByRole('heading', { name: 'Our Daily Routine at Tharlam Academy' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /monthly sports day/i }))

    expect(await screen.findByRole('heading', { name: 'Monthly Sports Day' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Our Daily Routine at Tharlam Academy' })).not.toBeInTheDocument()
  })

  it('shows the Friday activities list when its tab is chosen', async () => {
    renderAt('#/programs')

    fireEvent.click(await screen.findByRole('button', { name: /friday activity/i }))

    expect(await screen.findByRole('heading', { name: 'Weekly Friday Activities' })).toBeInTheDocument()
    expect(screen.getByText(/public speaking and presentation skills/i)).toBeInTheDocument()
  })
})

describe('admissions form', () => {
  it('blocks submission and reports missing required fields', async () => {
    renderAt('#/admissions')

    fireEvent.click(await screen.findByRole('button', { name: /submit application/i }))

    expect(await screen.findByText('Name is required')).toBeInTheDocument()
    expect(screen.getByText('Guardian name is required')).toBeInTheDocument()
    expect(screen.getByText('Age is required')).toBeInTheDocument()
    expect(screen.getByText('Phone is required')).toBeInTheDocument()
  })
})

describe('staff login', () => {
  it('sends unauthenticated visitors to the login screen', async () => {
    renderAt('#/admin')

    await waitFor(() => expect(window.location.hash).toBe('#/admin/login'))
  })

  it('reports that supabase auth is not configured when signing in', async () => {
    renderAt('#/admin/login')

    fireEvent.change(await screen.findByLabelText(/email/i), {
      target: { value: 'admin@tharmanjushree.edu.np' },
    })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'secret123' } })
    fireEvent.click(screen.getByRole('button', { name: /^sign in$/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/supabase is not configured/i)
    expect(window.location.hash).toBe('#/admin/login')
  })

  it('ignores the legacy localStorage staff session', async () => {
    window.localStorage.setItem(
      'tm.staff.session',
      JSON.stringify({ name: 'Staff Member', role: 'staff', signedInAt: new Date().toISOString() }),
    )

    renderAt('#/admin')

    await waitFor(() => expect(window.location.hash).toBe('#/admin/login'))
  })
})
