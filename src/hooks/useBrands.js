import { useEffect, useState } from 'react'

import { fetchBrands } from '../api/games'

export function useBrands(category, { enabled = true } = {}) {
  const [state, setState] = useState({ key: null, brands: [], error: null })
  const requestKey = JSON.stringify([category ?? 'all', enabled])

  useEffect(() => {
    if (!enabled) return undefined

    const controller = new AbortController()
    let cancelled = false

    fetchBrands(category, { signal: controller.signal })
      .then((result) => {
        if (cancelled) return
        setState({ key: requestKey, brands: result, error: null })
      })
      .catch((requestError) => {
        if (cancelled || requestError?.name === 'AbortError') return
        setState({ key: requestKey, brands: [], error: requestError })
      })

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [requestKey, category, enabled])

  const current =
    state.key === requestKey ? state : { key: requestKey, brands: [], error: null }

  return {
    brands: enabled ? current.brands : [],
    loading: enabled && state.key !== requestKey,
    error: enabled ? current.error : null,
  }
}
