import { useCallback, useEffect, useState } from 'react'

import { fetchGames, searchGames } from '../api/games'

function dedupeGames(items) {
  const seen = new Set()

  return items.filter((game) => {
    if (!game?.id || seen.has(game.id)) return false
    seen.add(game.id)
    return true
  })
}

function emptyGames(key) {
  return {
    key,
    items: [],
    pagination: null,
    apiPage: 0,
    displayCount: 0,
    error: null,
  }
}

export function useGames({
  category,
  type,
  mode,
  brandId,
  search,
  perPage = 24,
  apiPerPage = perPage,
  complete,
  enabled = true,
} = {}) {
  const fetchPageSize = Math.max(apiPerPage, perPage)
  const [state, setState] = useState(() => emptyGames(null))
  const [loadingMore, setLoadingMore] = useState(false)
  const [nonce, setNonce] = useState(0)
  const requestKey = JSON.stringify([
    category,
    type,
    mode,
    brandId,
    search,
    perPage,
    fetchPageSize,
    nonce,
  ])

  useEffect(() => {
    if (!enabled) return undefined

    const controller = new AbortController()
    let cancelled = false

    fetchGames({
      category,
      type,
      mode,
      brandId,
      search,
      page: 1,
      perPage: fetchPageSize,
      signal: controller.signal,
    })
      .then((result) => {
        if (cancelled) return
        const items = dedupeGames(result.items)

        setState({
          key: requestKey,
          items,
          pagination: result.pagination,
          apiPage: 1,
          displayCount: Math.min(perPage, items.length),
          error: null,
        })
      })
      .catch((requestError) => {
        if (cancelled || requestError?.name === 'AbortError') return
        setState({
          key: requestKey,
          items: [],
          pagination: null,
          apiPage: 0,
          displayCount: 0,
          error: requestError,
        })
      })

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [requestKey, enabled, category, type, mode, brandId, search, perPage, fetchPageSize])

  const current = state.key === requestKey ? state : emptyGames(requestKey)

  const loadMore = useCallback(async () => {
    if (loadingMore || !current.pagination) return

    const targetCount = current.displayCount + perPage

    if (current.items.length >= targetCount) {
      setState((previous) =>
        previous.key === requestKey
          ? { ...previous, displayCount: Math.min(targetCount, previous.items.length) }
          : previous,
      )
      return
    }

    setLoadingMore(true)

    try {
      const items = [...current.items]
      const seen = new Set(items.map((game) => game.id))
      let pagination = current.pagination
      let apiPage = current.apiPage
      let attempts = 0

      while (
        items.length < targetCount &&
        apiPage < (pagination?.last_page ?? apiPage) &&
        attempts < 6
      ) {
        apiPage += 1

        const result = await fetchGames({
          category,
          type,
          mode,
          brandId,
          search,
          page: apiPage,
          perPage: fetchPageSize,
        })

        pagination = result.pagination ?? pagination

        for (const game of result.items) {
          if (!game?.id || seen.has(game.id)) continue
          seen.add(game.id)
          items.push(game)
        }

        attempts += 1
        if (result.items.length === 0) break
      }

      const total = pagination?.total ?? items.length
      const lastPage = pagination?.last_page ?? apiPage

      if (items.length < total && apiPage >= lastPage && typeof complete === 'function') {
        const completed = await complete()

        for (const game of completed) {
          if (!game?.id || seen.has(game.id)) continue
          seen.add(game.id)
          items.push(game)
        }
      }

      setState((previous) => {
        if (previous.key !== requestKey) return previous

        return {
          ...previous,
          items,
          pagination,
          apiPage,
          displayCount: Math.min(targetCount, items.length),
          error: null,
        }
      })
    } catch (requestError) {
      setState((previous) =>
        previous.key === requestKey ? { ...previous, error: requestError } : previous,
      )
    } finally {
      setLoadingMore(false)
    }
  }, [
    loadingMore,
    current.displayCount,
    current.items,
    current.pagination,
    current.apiPage,
    requestKey,
    category,
    type,
    mode,
    brandId,
    search,
    perPage,
    fetchPageSize,
    complete,
  ])

  const reload = useCallback(() => setNonce((value) => value + 1), [])

  const total = current.pagination?.total ?? current.items.length
  const canComplete = typeof complete === 'function' && current.items.length < total
  const hasMore =
    enabled &&
    (current.displayCount < current.items.length ||
      current.apiPage < (current.pagination?.last_page ?? current.apiPage) ||
      canComplete)

  return {
    games: enabled ? current.items.slice(0, current.displayCount) : [],
    loading: enabled && (state.key !== requestKey || loadingMore),
    error: enabled ? current.error : null,
    pagination: enabled ? current.pagination : null,
    total: enabled ? current.pagination?.total ?? current.items.length : 0,
    hasMore,
    loadMore,
    reload,
  }
}

export function useGameSearch(term, { perPage = 8 } = {}) {
  const [state, setState] = useState({ key: null, games: [], error: null })
  const [nonce, setNonce] = useState(0)
  const value = term?.trim() ?? ''
  const requestKey = JSON.stringify([value, perPage, nonce])

  useEffect(() => {
    if (!value) return undefined

    const controller = new AbortController()
    let cancelled = false

    searchGames(value, { perPage, signal: controller.signal })
      .then((result) => {
        if (cancelled) return
        setState({ key: requestKey, games: result, error: null })
      })
      .catch((requestError) => {
        if (cancelled || requestError?.name === 'AbortError') return
        setState({ key: requestKey, games: [], error: requestError })
      })

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [requestKey, value, perPage])

  const current =
    state.key === requestKey ? state : { key: requestKey, games: [], error: null }
  const active = Boolean(value)

  return {
    games: active ? current.games : [],
    loading: active && state.key !== requestKey,
    error: active ? current.error : null,
    reload: () => setNonce((currentNonce) => currentNonce + 1),
  }
}
