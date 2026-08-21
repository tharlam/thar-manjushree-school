// Verify a Khalti donation server-side, then record it.
//
// The client never talks to Khalti's API directly with the secret key.
// Instead it sends the checkout token + amount (paisa) to this function,
// which re-verifies the payment with Khalti and only then inserts a
// "completed" donation row using the service role (bypasses RLS).
//
// Env: KHALTI_SECRET_KEY (set via `supabase secrets set`).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  { auth: { persistSession: false } }
)

const KHALTI_SECRET = Deno.env.get('KHALTI_SECRET_KEY')

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function verifyKhalti(token, amountPaisa) {
  const res = await fetch('https://khalti.com/api/v2/payment/verify/', {
    method: 'POST',
    headers: {
      Authorization: `Key ${KHALTI_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, amount: amountPaisa }),
  })
  if (!res.ok) return null
  return res.json()
}

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  try {
    const body = await req.json()
    const { token, amountPaisa, name, email, note } = body

    if (!token || !Number(amountPaisa) || !name) throw new Error('MISSING_FIELDS')
    if (!KHALTI_SECRET) throw new Error('NOT_CONFIGURED')

    const verified = await verifyKhalti(token, Number(amountPaisa))
    if (!verified || verified.state?.name !== 'Completed') throw new Error('VERIFY_FAILED')

    const ref = String(verified.idx || verified.state?.idx || '')

    // Idempotency: a token that has already been recorded must not be
    // charged twice (e.g. a retried request after a network hiccup).
    const existing = await supabase
      .from('donations')
      .select('id')
      .eq('payment_ref', ref)
      .maybeSingle()
    if (existing.data) return json(200, { ok: true, alreadyRecorded: true, donation: existing.data })

    const { data, error } = await supabase
      .from('donations')
      .insert({
        type: 'donation',
        name: String(name).slice(0, 120),
        email: String(email || '').slice(0, 120),
        amount: Number(amountPaisa) / 100,
        currency: 'NPR',
        status: 'completed',
        payment_gateway: 'khalti',
        payment_ref: ref,
        note: String(note || '').slice(0, 1000),
        date: new Date().toISOString().slice(0, 10),
      })
      .select()
      .single()

    if (error) throw error
    return json(200, { ok: true, donation: data })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'ERROR'
    const status = message === 'NOT_CONFIGURED' ? 503 : 400
    return json(status, { ok: false, error: message })
  }
})
