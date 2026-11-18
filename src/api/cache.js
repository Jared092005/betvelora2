const store = new Map()
const inFlight = new Map()
const MAX_ENTRIES = 120
const DEFAULT_TTL = 10 * 60 * 1000

export const CACHE_TTL = {
  games: 10 * 60 * 1000,
  brands: 30 * 60 * 1000,
  game: 10 * 60 * 1000,
  search: 2 * 60 * 1000,
}

export function cached(key, fetcher, ttl = DEFAULT_TTL) {
  const now = Date.now()
  const entry = store.get(key)

  if (entry && entry.expiresAt > now) {
    return Promise.resolve(entry.data)
  }

  if (entry) store.delete(key)
  if (inFlight.has(key)) return inFlight.get(key)

  const promise = Promise.resolve()
    .then(fetcher)
    .then((data) => {
      store.set(key, { data, expiresAt: Date.now() + ttl })

      if (store.size > MAX_ENTRIES) {
        const oldestKey = store.keys().next().value
        store.delete(oldestKey)
      }

      return data
    })
    .finally(() => {
      inFlight.delete(key)
    })

  inFlight.set(key, promise)
  return promise
}

export function peekCache(key) {
  const entry = store.get(key)

  if (!entry) return null

  if (entry.expiresAt <= Date.now()) {
    store.delete(key)
    return null
  }

  return entry.data
}

export function clearApiCache() {
  store.clear()
  inFlight.clear()
}
