import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase, supabaseError, SUPABASE_NOT_CONFIGURED } from '../lib/supabase.js'

const SUPPORTED_OPERATORS = new Set([
  'eq',
  'neq',
  'gt',
  'gte',
  'lt',
  'lte',
  'like',
  'ilike',
  'is',
  'in',
  'contains',
  'containedBy',
  'match',
  'not',
  'textSearch',
])

function serializeFilters(filters) {
  try {
    return JSON.stringify(filters ?? [])
  } catch {
    return null
  }
}

export default function useSupabaseQuery(table, options = {}) {
  const {
    columns = '*',
    filters = [],
    order,
    ascending = true,
    limit,
    enabled = true,
    realtime = false,
  } = options

  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(Boolean(enabled))
  const [version, setVersion] = useState(0)
  const channelRef = useRef(null)
  const filterKey = serializeFilters(filters)

  const refetch = useCallback(() => setVersion((v) => v + 1), [])

  useEffect(() => {
    if (!enabled || !supabase) return undefined

    let cancelled = false

    const run = async () => {
      setLoading(true)
      setError(null)
      try {
        let filterList = []
        if (filterKey === null) {
          throw new Error('Filters could not be serialized for the query.')
        }
        filterList = JSON.parse(filterKey)

        let query = supabase.from(table).select(columns)
        for (const filter of filterList) {
          const [column, operator = 'eq', value] = Array.isArray(filter)
            ? filter
            : [filter.column, filter.operator, filter.value]
          if (!column) continue
          if (!SUPPORTED_OPERATORS.has(operator)) {
            throw new Error(`Unsupported filter operator: ${operator}`)
          }
          query = query[operator](column, value)
        }
        if (order) query = query.order(order, { ascending })
        if (limit) query = query.limit(limit)

        const { data: rows, error: queryError } = await query
        if (cancelled) return
        if (queryError) {
          setData([])
          setError(supabaseError(queryError))
        } else {
          setData(rows ?? [])
        }
      } catch (e) {
        if (cancelled) return
        setData([])
        setError(supabaseError(e))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    run()

    if (realtime) {
      channelRef.current = supabase
        .channel(`useSupabaseQuery:${table}:${version}`)
        .on('postgres_changes', { event: '*', schema: 'public', table }, () => {
          if (!cancelled) setVersion((v) => v + 1)
        })
        .subscribe()
    }

    return () => {
      cancelled = true
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
        channelRef.current = null
      }
    }
  }, [table, columns, filterKey, order, ascending, limit, enabled, realtime, version])

  const inactive = !enabled || !supabase

  return {
    data: inactive ? [] : data,
    error: inactive ? (enabled ? SUPABASE_NOT_CONFIGURED : null) : error,
    loading: inactive ? false : loading,
    refetch,
  }
}
