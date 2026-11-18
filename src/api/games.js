import { cached, CACHE_TTL, peekCache } from './cache'
import { API_BASE_URL, request } from './client'

const ORIGIN = new URL(API_BASE_URL).origin

function absoluteAsset(value) {
  if (!value) return ''

  try {
    return new URL(value, `${ORIGIN}/`).toString()
  } catch {
    return ''
  }
}

export function normalizeGame(item) {
  if (!item) return null

  return {
    id: item.Id,
    name: item.Name ?? 'Unknown game',
    slug: item.Slug ?? '',
    provider: item.GameBrand?.Name ?? 'Unknown provider',
    providerId: item.GameBrand?.Id ?? item.GameBrandfk ?? null,
    type: item.Type ?? '',
    typeLabel: item.Type ? item.Type.replaceAll('_', ' ') : '',
    categoryId: item.Categoryfk ?? null,
    image: absoluteAsset(item.Logo),
    live: item.Type === 'LIVE',
    devices: Array.isArray(item.Devices) ? item.Devices : [],
    status: item.Status ?? '',
    plays: item.Plays ?? 0,
    createdAt: item.CreatedAt ?? '',
  }
}

export function normalizeBrand(item) {
  if (!item) return null

  return {
    id: item.Id,
    name: item.Name ?? 'Provider',
    code: item.Code ?? '',
    logo: absoluteAsset(item.LogoWhite || item.LogoExternal || item.Logo),
    logoExternal: absoluteAsset(item.LogoExternal),
  }
}

function normalizeList(message) {
  const items = Array.isArray(message) ? message : message?.items ?? []
  return items.map(normalizeGame).filter(Boolean)
}

function buildGamesPath({ category, type, mode, brandId }) {
  if (type) return `/games/type/${type}`
  if (brandId && !category) return `/games/brand/${brandId}`
  if (mode === 'best' || mode === 'new') return `/games/category/${category}/${mode}`
  return `/games/category/${category ?? 'casino'}`
}

export function getGamesCacheKey({
  category,
  type,
  mode,
  brandId,
  search,
  page = 1,
  perPage = 24,
}) {
  return `games:${JSON.stringify({
    category: category ?? '',
    type: type ?? '',
    mode: mode ?? '',
    brandId: brandId ? String(brandId) : '',
    search: search?.trim() ?? '',
    page,
    perPage,
  })}`
}

export function peekGames({ category, type, mode, brandId, search, perPage = 24 }) {
  return peekCache(
    getGamesCacheKey({ category, type, mode, brandId, search, page: 1, perPage }),
  )
}

export async function fetchGames({
  category,
  type,
  mode,
  brandId,
  search,
  page = 1,
  perPage = 24,
} = {}) {
  const term = search?.trim() ?? ''
  const cacheKey = getGamesCacheKey({
    category,
    type,
    mode,
    brandId,
    search: term,
    page,
    perPage,
  })

  return cached(
    cacheKey,
    async () => {
      const message = await request(buildGamesPath({ category, type, mode, brandId }), {
        params: {
          page,
          per_page: perPage,
          search: term || undefined,
          brand_id: brandId || undefined,
        },
      })

      return {
        items: normalizeList(message),
        pagination: message?.pagination ?? null,
      }
    },
    CACHE_TTL.games,
  )
}

export function getBrandsCacheKey(category) {
  return `brands:${category ?? 'all'}`
}

export function peekBrands(category) {
  return peekCache(getBrandsCacheKey(category))
}

export async function fetchBrands(category) {
  const path = category ? `/games/category/${category}/brands` : '/games/brands'

  return cached(
    getBrandsCacheKey(category),
    async () => {
      const message = await request(path)
      const items = Array.isArray(message) ? message : message?.items ?? []
      return items.map(normalizeBrand).filter(Boolean)
    },
    CACHE_TTL.brands,
  )
}

export function peekGame(id) {
  return peekCache(`game:${id}`)
}

export async function fetchGame(id) {
  return cached(
    `game:${id}`,
    async () => {
      const message = await request(`/games/${id}`)
      return normalizeGame(message)
    },
    CACHE_TTL.game,
  )
}

const SEARCH_SOURCES = [
  { category: 'casino' },
  { category: 'casino_live' },
  { category: 'virtual' },
  { type: 'crash' },
]

export async function searchGames(search, { perPage = 8 } = {}) {
  const term = search?.trim()
  if (!term) return []

  return cached(
    `search:${JSON.stringify({ term, perPage })}`,
    async () => {
      const results = await Promise.allSettled(
        SEARCH_SOURCES.map((source) =>
          fetchGames({ ...source, search: term, page: 1, perPage }),
        ),
      )

      if (results.length > 0 && results.every((result) => result.status === 'rejected')) {
        throw results[0].reason
      }

      const seen = new Set()
      const games = []

      results.forEach((result) => {
        if (result.status !== 'fulfilled') return

        result.value.items.forEach((game) => {
          if (!game?.id || seen.has(game.id)) return
          seen.add(game.id)
          games.push(game)
        })
      })

      return games
    },
    CACHE_TTL.search,
  )
}
