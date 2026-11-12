import { Link } from 'react-router-dom'

import { useLanguage } from '../../i18n/LanguageContext'
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
}) {
  const { t } = useLanguage()

  return (
    <section data-purpose={`${title.toLowerCase().replace(/\s+/g, '-')}-row`}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-bold tracking-wide text-white">{t(title)}</h2>
          {count && (
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-xs text-zinc-400">
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

      <GamesCatalog
        games={games}
        live={live}
        loading={loading}
        error={error}
        onRetry={onRetry}
        emptyMessage={emptyMessage}
      />
    </section>
  )
}

export default GameSection
