import { useState } from 'react'

import GameSection from '../components/home/GameSection'
import HomeMobileFilters from '../components/home/HomeMobileFilters'
import HomePromos from '../components/home/HomePromos'
import HomeSidebar from '../components/home/HomeSidebar'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useGameSearch, useGames } from '../hooks/useGames'
import { useLanguage } from '../i18n/LanguageContext'

const HOME_SECTIONS = [
  {
    id: 'slots',
    title: 'Slots',
    viewAll: '/casino?filter=slots',
    source: { type: 'slot' },
    emptyMessage: 'No slot games are available right now.',
  },
  {
    id: 'crash-games',
    title: 'Crash Games',
    badge: 'HOT',
    viewAll: '/crash-games',
    source: { type: 'crash' },
    emptyMessage: 'No crash games are available right now.',
  },
  {
    id: 'casino-live',
    title: 'Casino Live',
    badge: 'LIVE',
    viewAll: '/casino-live',
    source: { category: 'casino_live' },
    live: true,
    emptyMessage: 'No live tables are available right now.',
  },
  {
    id: 'new-games',
    title: 'New Games',
    badge: 'Fresh',
    viewAll: '/casino?filter=new',
    source: { category: 'casino', mode: 'new' },
    emptyMessage: 'No new games are available right now.',
  },
]

function HomeSection({ section }) {
  const { games, loading, error, total, reload } = useGames({ ...section.source, perPage: 4 })

  return (
    <GameSection
      {...section}
      games={games.slice(0, 4)}
      count={total ? total.toLocaleString('en-US') : undefined}
      loading={loading}
      error={error}
      onRetry={reload}
    />
  )
}

function Home() {
  const { t } = useLanguage()
  const [query, setQuery] = useState('')
  const term = query.trim()
  const debouncedTerm = useDebouncedValue(term, 350)
  const {
    games: results,
    loading: searchLoading,
    error: searchError,
    reload: reloadSearch,
  } = useGameSearch(debouncedTerm, { perPage: 4 })

  const searching = term.length > 0
  const searchPending = searching && (debouncedTerm !== term || searchLoading)

  return (
    <div className="flex min-w-0 flex-1 bg-casino-pattern">
      <HomeSidebar />

      <main className="min-w-0 flex-1 overflow-y-auto px-6 py-6 lg:px-8" data-purpose="game-catalog">
        <div className="mx-auto max-w-7xl space-y-7">
          <section data-purpose="global-search-container">
            <div className="relative w-full shadow-lg">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" x2="16.65" y1="21" y2="16.65" />
                </svg>
              </div>
              <input
                className="w-full rounded-full border border-white/10 bg-[#101016]/90 py-2.5 pl-11 pr-5 text-sm text-zinc-100 placeholder-zinc-500 backdrop-blur-md transition duration-200 focus:border-[#d91528] focus:outline-none focus:ring-1 focus:ring-[#d91528]"
                placeholder={t('Search games, live dealers, providers...')}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Buscar juegos, dealers y proveedores"
              />
            </div>
          </section>

          <HomePromos />

          <HomeMobileFilters />

          {searching ? (
            <GameSection
              title="Search Results"
              count={searchPending || searchError ? undefined : `${results.length}`}
              viewAll="/casino"
              games={searchPending ? [] : results}
              loading={searchPending}
              error={searchError}
              onRetry={reloadSearch}
              emptyMessage="Try another name, category or provider."
            />
          ) : (
            HOME_SECTIONS.map((section) => <HomeSection key={section.id} section={section} />)
          )}
        </div>
      </main>
    </div>
  )
}

export default Home
