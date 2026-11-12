import { useEffect, useState } from 'react'

import { fetchGame } from '../api/games'

export function useGame(id) {
  const [state, setState] = useState({ id: null, game: null, loading: Boolean(id), error: null })
  const [nonce, setNonce] = useState(0)

  useEffect(() => {
    if (!id) return undefined

    const controller = new AbortController()

    fetchGame(id, { signal: controller.signal })
      .then((result) => {
        setState({ id, game: result, loading: false, error: null })
      })
      .catch((requestError) => {
        if (requestError?.name === 'AbortError') return
        setState({ id, game: null, loading: false, error: requestError })
      })

    return () => controller.abort()
  }, [id, nonce])

  const current =
    state.id === id ? state : { id, game: null, loading: Boolean(id), error: null }

  return {
    game: current.game,
    loading: current.loading,
    error: current.error,
    reload: () => {
      setState((previous) => ({ ...previous, loading: Boolean(id), error: null }))
      setNonce((value) => value + 1)
    },
  }
}
