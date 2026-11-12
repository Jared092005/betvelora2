import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useBrands } from '../../hooks/useBrands'
import { useGames } from '../../hooks/useGames'
import { useLanguage } from '../../i18n/LanguageContext'
import { useLibrary } from '../../library/LibraryContext'
import { buildTopWinners } from '../../utils/winners'
import GamesCatalog from '../games/GamesCatalog'
import CatalogMobileFilters from './CatalogMobileFilters'
import CatalogSidebar from './CatalogSidebar'
import LoadMore from './LoadMore'
import TopWinners from './TopWinners'

const SIDEBAR_FILTERS = [
  { key: 'all', label: 'All games' },
  { key: 'favorites', label: 'Favorites' },
]

function matchesKeywords(game, keywords) {
  if (!keywords?.length) return true
  const name = game.name?.toLowerCase() ?? ''
  return keywords.some((keyword) => name.includes(keyword.toLowerCase()))
}

function CatalogPage({
  title,
  icon,
  searchPlaceholder = 'Search games...',
  filters = [],
  source = {},
  perPage = 30,
  sidebar = {},
  sidebarElement,
  live = false,
  aspect = 'aspect-[4/3]',
  favoriteSide = 'right',
  emptyMessage,
}) {
  const { t } = useLanguage()
  const { favorites, recent } = useLibrary()
  const [searchParams, setSearchParams] = useSearchParams()
  const filterKey = searchParams.get('filter') || filters[0]?.key || 'all'
  const brandId = searchParams.get('brand') || ''
  const urlQuery = searchParams.get('q') || ''
  const [searchState, setSearchState] = useState({ url: urlQuery, value: urlQuery })
  const query = searchState.url === urlQuery ? searchState.value : urlQuery
  const setQuery = (value) => setSearchState({ url: urlQuery, value })

  useEffect(() => {
    if (query === urlQuery) return undefined

    const timer = window.setTimeout(() => {
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current)
          const value = query.trim()
          if (value) next.set('q', value)
          else next.delete('q')
          return next
        },
        { replace: true },
      )
    }, 400)

    return () => window.clearTimeout(timer)
  }, [query, urlQuery, setSearchParams])

  const activeFilter = filters.find((item) => item.key === filterKey) ?? filters[0] ?? null
  const localList = activeFilter?.local
  const effectiveSource = { ...source, ...(activeFilter?.source ?? {}) }
  const search = urlQuery.trim() || effectiveSource.search || ''
  const pageSize = activeFilter?.perPage ?? perPage

  const { games, loading, error, total, hasMore, loadMore, reload } = useGames({
    ...effectiveSource,
    brandId: brandId || effectiveSource.brandId || undefined,
    search: search || undefined,
    perPage: pageSize,
    enabled: !localList,
  })

  const clientGames = useMemo(
    () => games.filter((game) => matchesKeywords(game, activeFilter?.keywords)),
    [games, activeFilter],
  )

  const derivedBrands = useMemo(() => {
    const map = new Map()

    games.forEach((game) => {
      if (game.providerId === null || game.providerId === undefined) return
      if (!map.has(game.providerId)) {
        map.set(game.providerId, { id: game.providerId, name: game.provider })
      }
    })

    return [...map.values()]
  }, [games])

  const { brands: categoryBrands } = useBrands(sidebar.brandCategory, {
    enabled: Boolean(sidebar.brandCategory),
  })

  const sidebarBrands =
    sidebar.brands ?? (sidebar.brandCategory ? categoryBrands : derivedBrands)

  const shownGames =
    localList === 'favorites' ? favorites : localList === 'recent' ? recent : clientGames

  const isLocal = Boolean(localList)
  const topWinners = isLocal ? [] : buildTopWinners(games)

  const emptyTitle =
    localList === 'favorites'
      ? 'No favorites yet'
      : localList === 'recent'
        ? 'No recently played games yet'
        : 'No results found'

  const emptyDescription =
    localList === 'favorites'
      ? 'Tap the heart on a game to keep it here.'
      : localList === 'recent'
        ? 'Games you open will appear here.'
        : emptyMessage

  const resultsLabel =
    !isLocal && total > 0
      ? `Showing ${shownGames.length} of ${total} available games`
      : null

  const setFilterKey = (key) => {
    setQuery('')
    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current)
        next.set('filter', key)
        next.delete('q')
        return next
      },
      { replace: true },
    )
  }

  return (
    <div className="flex min-w-0 flex-1 bg-casino-pattern">
      {sidebarElement
        ? typeof sidebarElement === 'function'
          ? sidebarElement(sidebarBrands)
          : sidebarElement
        : (
          <CatalogSidebar
            title={title}
            filters={SIDEBAR_FILTERS}
            groups={sidebar.groups}
            brandCategory={sidebar.brandCategory}
            brands={sidebarBrands}
          />
        )}

      <main className="min-w-0 flex-1 px-4 py-6 lg:px-8" data-purpose="catalog-page">
        <div className="mx-auto max-w-7xl space-y-8">
          <TopWinners items={topWinners} />

          <section>
            <div className="mb-6 flex flex-col gap-4 pt-2 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-red-600">
                  <i className={`${icon} text-2xl`} aria-hidden="true" />
                </span>
                <h1 className="text-2xl font-black tracking-wider text-white">{t(title)}</h1>
              </div>

              <div className="relative w-full md:w-64">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" x2="16.65" y1="21" y2="16.65" />
                  </svg>
                </span>
                <input
                  className="w-full rounded-full border border-white/10 bg-[#101016]/90 py-2 pl-10 pr-4 text-xs text-white placeholder-zinc-500 transition focus:border-[#d91528] focus:outline-none focus:ring-1 focus:ring-[#d91528]"
                  placeholder={t(searchPlaceholder)}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  aria-label={searchPlaceholder}
                />
              </div>
            </div>

            <CatalogMobileFilters
              filters={filters}
              activeFilterKey={activeFilter?.key}
              brands={sidebarBrands}
              activeBrand={brandId}
            />

            <div className="mb-6 hidden items-center gap-2 overflow-x-auto pb-1 lg:flex">
              {filters
                .filter((item) => !item.hidden)
                .map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setFilterKey(item.key)}
                    className={
                      activeFilter?.key === item.key
                        ? 'flex-shrink-0 cursor-pointer rounded-full bg-[#d91528] px-4 py-1.5 text-xs font-semibold text-white shadow-md shadow-red-950/50 transition-all'
                        : 'flex-shrink-0 cursor-pointer rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-zinc-400 transition-all hover:bg-white/[0.07] hover:text-white'
                    }
                  >
                    {t(item.label)}
                  </button>
                ))}
            </div>

            <GamesCatalog
              games={shownGames}
              live={live}
              aspect={aspect}
              favoriteSide={favoriteSide}
              loading={!isLocal && loading}
              error={isLocal ? null : error}
              onRetry={reload}
              emptyTitle={emptyTitle}
              emptyMessage={emptyDescription}
            />

            <LoadMore
              label={resultsLabel}
              hasMore={!isLocal && hasMore}
              loading={loading}
              onLoadMore={loadMore}
            />
          </section>
        </div>
      </main>
    </div>
  )
}

export default CatalogPage
