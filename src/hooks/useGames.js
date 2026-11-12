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
  return { key, games: [], pagination: null, page: 1, error: null }
}

export function useGames({
  category,
  type,
  mode,
  brandId,
  search,
  perPage = 24,
  enabled = true,
} = {}) {
  const [state, setState] = useState(() => emptyGames(null))
  const [loadingMore, setLoadingMore] = useState(false)
  const [nonce, setNonce] = useState(0)
  const requestKey = JSON.stringify([category, type, mode, brandId, search, perPage, nonce])

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
      perPage,
      signal: controller.signal,
    })
      .then((result) => {
        if (cancelled) return
        setState({
          key: requestKey,
          games: dedupeGames(result.items),
          pagination: result.pagination,
          page: 1,
          error: null,
        })
      })
      .catch((requestError) => {
        if (cancelled || requestError?.name === 'AbortError') return
        setState({
          key: requestKey,
          games: [],
          pagination: null,
          page: 1,
          error: requestError,
        })
      })

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [requestKey, enabled, category, type, mode, brandId, search, perPage])

  const current = state.key === requestKey ? state : emptyGames(requestKey)

  const loadMore = useCallback(async () => {
    if (loadingMore || !current.pagination || current.page >= current.pagination.last_page) return

    setLoadingMore(true)

    try {
      const seen = new Set(current.games.map((game) => game.id))
      const collected = []
      let lastPagination = current.pagination
      let pageToLoad = current.page + 1
      let attempts = 0

      while (
        pageToLoad <= (lastPagination?.last_page ?? pageToLoad) &&
        collected.length < perPage &&
        attempts < 4
      ) {
        const result = await fetchGames({
          category,
          type,
          mode,
          brandId,
          search,
          page: pageToLoad,
          perPage,
        })

        lastPagination = result.pagination ?? lastPagination

        for (const game of result.items) {
          if (!game?.id || seen.has(game.id)) continue
          seen.add(game.id)
          collected.push(game)
          if (collected.length >= perPage) break
        }

        pageToLoad += 1
        attempts += 1

        if (!result.pagination) break
      }

      setState((previous) => {
        if (previous.key !== requestKey) return previous

        return {
          ...previous,
          games: [...previous.games, ...collected],
          pagination: lastPagination ?? previous.pagination,
          page: Math.max(previous.page, pageToLoad - 1),
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
    current.games,
    current.pagination,
    current.page,
    requestKey,
    category,
    type,
    mode,
    brandId,
    search,
    perPage,
  ])

  const reload = useCallback(() => setNonce((value) => value + 1), [])

  return {
    games: enabled ? current.games : [],
    loading: enabled && (state.key !== requestKey || loadingMore),
    error: enabled ? current.error : null,
    pagination: enabled ? current.pagination : null,
    total: enabled ? current.pagination?.total ?? current.games.length : 0,
    hasMore: enabled && Boolean(current.pagination && current.page < current.pagination.last_page),
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
