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

export async function fetchGames({
  category,
  type,
  mode,
  brandId,
  search,
  page = 1,
  perPage = 24,
  signal,
} = {}) {
  const message = await request(buildGamesPath({ category, type, mode, brandId }), {
    params: {
      page,
      per_page: perPage,
      search: search?.trim() || undefined,
      brand_id: brandId || undefined,
    },
    signal,
  })

  return {
    items: normalizeList(message),
    pagination: message?.pagination ?? null,
  }
}

export async function fetchBrands(category, { signal } = {}) {
  const path = category ? `/games/category/${category}/brands` : '/games/brands'
  const message = await request(path, { signal })
  const items = Array.isArray(message) ? message : message?.items ?? []
  return items.map(normalizeBrand).filter(Boolean)
}

const CATEGORY_IDS = {
  casino: 1,
  casino_live: 2,
  virtual: 3,
  poker: 4,
  crash: 5,
}

const brandGamesCache = new Map()

async function mapWithConcurrency(items, limit, mapper) {
  const results = new Array(items.length)
  let index = 0
  let failed = false

  const worker = async () => {
    while (index < items.length) {
      const currentIndex = index
      index += 1

      try {
        results[currentIndex] = await mapper(items[currentIndex])
      } catch {
        results[currentIndex] = []
        failed = true
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => worker()),
  )

  return { results, failed }
}

async function requestBrandPage(brandId, page, signal) {
  let lastError

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      return await request(`/games/brand/${brandId}`, {
        params: { page, per_page: 100 },
        signal,
      })
    } catch (error) {
      lastError = error
      if (error?.name === 'AbortError') throw error
      await new Promise((resolve) => setTimeout(resolve, 350))
    }
  }

  throw lastError
}

export async function fetchGamesByBrand(category, { signal } = {}) {
  const cacheKey = category ?? 'all'
  if (brandGamesCache.has(cacheKey)) return brandGamesCache.get(cacheKey)

  const brands = await fetchBrands(category, { signal })
  const categoryId = CATEGORY_IDS[category]

  const { results, failed } = await mapWithConcurrency(brands, 3, async (brand) => {
    const games = []
    let page = 1
    let lastPage = 1

    while (page <= lastPage) {
      const message = await requestBrandPage(brand.id, page, signal)
      const pageItems = Array.isArray(message) ? message : message?.items ?? []
      games.push(...pageItems)
      lastPage = message?.pagination?.last_page ?? 1
      page += 1
    }

    await new Promise((resolve) => setTimeout(resolve, 100))
    return games
  })

  const seen = new Set()
  const items = []

  for (const result of results) {
    for (const raw of result) {
      const game = normalizeGame(raw)
      if (!game?.id || seen.has(game.id)) continue
      if (categoryId && game.categoryId !== categoryId) continue
      seen.add(game.id)
      items.push(game)
    }
  }

  if (!failed) brandGamesCache.set(cacheKey, items)
  return items
}

export async function fetchGame(id, { signal } = {}) {
  const message = await request(`/games/${id}`, { signal })
  return normalizeGame(message)
}

const SEARCH_SOURCES = [
  { category: 'casino' },
  { category: 'casino_live' },
  { category: 'virtual' },
  { type: 'crash' },
]

export async function searchGames(search, { perPage = 8, signal } = {}) {
  const term = search?.trim()
  if (!term) return []

  const results = await Promise.allSettled(
    SEARCH_SOURCES.map((source) =>
      fetchGames({ ...source, search: term, page: 1, perPage, signal }),
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
}
