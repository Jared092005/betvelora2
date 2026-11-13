import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { useLanguage } from '../../i18n/LanguageContext'
import GameTile from '../games/GameTile'
import GamesCatalog from '../games/GamesCatalog'

function GameSection({
  title,
  count,
  badge,
  viewAll,
  games,
  live = false,
  loading = false,
  error = null,
  onRetry,
  emptyMessage,
  from,
}) {
  const { t } = useLanguage()
  const scrollRef = useRef(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const hasGames = games.length > 0
  const hasArrows = games.length > 4

  useEffect(() => {
    const handleResize = () => {
      const container = scrollRef.current
      if (!container) return
      setCanScrollPrev(container.scrollLeft > 4)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollByCards = (direction) => {
    const container = scrollRef.current
    if (!container) return

    const card = container.querySelector('[data-purpose="game-card"]')
    if (!card) return

    const styles = window.getComputedStyle(container)
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0
    const step = (card.getBoundingClientRect().width + gap) * 2
    const maxScroll = Math.max(container.scrollWidth - container.clientWidth, 0)

    if (direction === 'next') {
      if (container.scrollLeft >= maxScroll - 4) {
        container.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: step, behavior: 'smooth' })
      }
    } else if (container.scrollLeft <= 4) {
      return
    } else {
      container.scrollBy({ left: -step, behavior: 'smooth' })
    }
  }

  return (
    <section data-purpose={`${title.toLowerCase().replace(/\s+/g, '-')}-row`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center space-x-2">
          <h2 className="truncate text-lg font-bold tracking-wide text-white">{t(title)}</h2>
          {count && (
            <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-xs text-zinc-400">
              {count}
            </span>
          )}
          {badge && (
            <span className="hidden items-center gap-1.5 whitespace-nowrap rounded-full border border-red-800/40 bg-red-950/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-400 md:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
              {t(badge)}
            </span>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {viewAll && (
            <Link
              to={viewAll}
              className="group inline-flex items-center space-x-1.5 rounded-full bg-[#d91528] px-3.5 py-1 text-xs font-semibold tracking-wider text-white shadow-md shadow-red-950/50 transition-all duration-200 hover:bg-[#bd1122]"
            >
              <span>{t('View all')}</span>
              <i className="fa-solid fa-chevron-right text-[10px] transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>

      {hasGames ? (
        <div className="relative">
          {hasArrows && (
            <>
              {canScrollPrev && (
                <button
                  type="button"
                  onClick={() => scrollByCards('prev')}
                  aria-label={t('Previous games')}
                  className="absolute -left-8 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-[#121218]/95 text-zinc-300 shadow-md shadow-black/40 transition hover:border-red-500/60 hover:text-white active:scale-95 lg:flex"
                >
                  <i className="fa-solid fa-chevron-left text-xs" aria-hidden="true" />
                </button>
              )}
              <button
                type="button"
                onClick={() => scrollByCards('next')}
                aria-label={t('Next games')}
                className="absolute -right-8 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-[#121218]/95 text-zinc-300 shadow-md shadow-black/40 transition hover:border-red-500/60 hover:text-white active:scale-95 lg:flex"
              >
                <i className="fa-solid fa-chevron-right text-xs" aria-hidden="true" />
              </button>
            </>
          )}

          <div
            ref={scrollRef}
            onScroll={(event) => setCanScrollPrev(event.currentTarget.scrollLeft > 4)}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-3 pt-2"
          >
            {games.map((game, index) => (
              <div
                key={game.id ?? `${game.name}-${index}`}
                className="w-[calc(50%-0.5rem)] shrink-0 snap-start md:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)]"
              >
                <GameTile game={game} live={game.live ?? live} from={from} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <GamesCatalog
          games={games}
          live={live}
          loading={loading}
          error={error}
          onRetry={onRetry}
          emptyMessage={emptyMessage}
        />
      )}
    </section>
  )
}

export default GameSection
