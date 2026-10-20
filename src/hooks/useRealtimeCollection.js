import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase.js'

export default function useRealtimeCollection(tables, options = {}) {
  const { enabled = true, onEvent } = options
  const [subscribed, setSubscribed] = useState(false)
  const handlerRef = useRef(onEvent)
  const tableKey = Array.isArray(tables) ? tables.join(',') : String(tables || '')
  const active = Boolean(supabase) && enabled && tableKey.length > 0

  useEffect(() => {
    handlerRef.current = onEvent
  })

  useEffect(() => {
    if (!active) return undefined

    const channel = supabase.channel(`tms-realtime:${tableKey}`)

    tableKey.split(',').forEach((table) => {
      channel.on('postgres_changes', { event: '*', schema: 'public', table }, (payload) => {
        handlerRef.current?.({
          table,
          eventType: payload.eventType,
          row: payload.new,
          oldRow: payload.old,
        })
      })
    })

    channel.subscribe((status) => {
      setSubscribed(status === 'SUBSCRIBED')
    })

    return () => {
      setSubscribed(false)
      supabase.removeChannel(channel)
    }
  }, [active, tableKey])

  return { connected: active && subscribed }
}
