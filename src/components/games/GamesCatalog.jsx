import { useLanguage } from '../../i18n/LanguageContext'
import GameTile from './GameTile'

function GamesSkeleton({ count, aspect, className }) {
  return (
    <div className={className} aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border border-white/10 bg-[#111116]"
        >
          <div className={`${aspect} animate-pulse bg-white/[0.05]`} />
          <div className="space-y-2 p-3">
            <div className="h-3 w-3/4 animate-pulse rounded bg-white/[0.07]" />
            <div className="h-2.5 w-1/3 animate-pulse rounded bg-white/[0.05]" />
          </div>
        </div>
      ))}
    </div>
  )
}

function GamesCatalog({
  games = [],
  live = false,
  aspect = 'aspect-[4/3]',
  favoriteSide = 'right',
  className = 'grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5',
  loading = false,
  error = null,
  onRetry,
  emptyTitle = 'No results found',
  emptyMessage,
}) {
  const { t } = useLanguage()

  if (loading && games.length === 0) {
    return <GamesSkeleton count={8} aspect={aspect} className={className} />
  }

  if (error && games.length === 0) {
    return (
      <div className="glass-panel flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-2xl p-8 text-center">
        <i className="fa-solid fa-triangle-exclamation text-3xl text-[#d91528]" aria-hidden="true" />
        <h3 className="text-lg font-bold text-white">{t('Could not load games')}</h3>
        <p className="max-w-sm text-sm text-zinc-400">
          {error.message || t('Check your connection and try again.')}
        </p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="account-btn-primary mt-2"
          >
            <i className="fa-solid fa-rotate-right text-xs" aria-hidden="true" />
            {t('Try again')}
          </button>
        )}
      </div>
    )
  }

  if (games.length === 0) {
    return (
      <div className="glass-panel flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-2xl p-8 text-center">
        <i className="fa-solid fa-magnifying-glass text-3xl text-[#d91528]" aria-hidden="true" />
        <h3 className="text-lg font-bold text-white">{t(emptyTitle)}</h3>
        <p className="max-w-sm text-sm text-zinc-400">
          {emptyMessage ? t(emptyMessage) : t('Try another name, category or provider.')}
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      {games.map((game, index) => (
        <GameTile
          key={game.id ?? `${game.name}-${index}`}
          game={game}
          live={game.live ?? live}
          aspect={aspect}
          favoriteSide={favoriteSide}
        />
      ))}
    </div>
  )
}

export default GamesCatalog
