import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import GameSection from '../components/home/GameSection'
import { useGame } from '../hooks/useGame'
import { useGames } from '../hooks/useGames'
import { useLanguage } from '../i18n/LanguageContext'
import { useLibrary } from '../library/LibraryContext'

function BalancePill({ t, className = '' }) {
  return (
    <div
      className={`flex items-center rounded-full border border-white/10 bg-[#101015] py-1 pl-2.5 pr-1 shadow-inner sm:pl-3.5 ${className}`}
    >
      <div className="mr-2 flex items-center space-x-1.5 sm:mr-3 sm:space-x-2">
        <i className="fa-solid fa-wallet text-xs text-zinc-300" aria-hidden="true" />
        <span className="whitespace-nowrap text-[11px] font-bold tracking-wide text-white sm:text-xs">0.00 €</span>
      </div>
      <Link
        to="/account/deposit"
        className="flex cursor-pointer items-center space-x-1 rounded-full bg-gradient-to-r from-[#d91528] to-[#b30e1f] px-2.5 py-1 text-[11px] font-bold text-white shadow-md shadow-red-950/60 transition-all duration-200 hover:brightness-110 sm:px-3 sm:text-xs"
      >
        <i className="fa-solid fa-plus text-[10px]" aria-hidden="true" />
        <span>{t('Deposit')}</span>
      </Link>
    </div>
  )
}

function Game() {
  const { id } = useParams()
  const location = useLocation()
  const { t } = useLanguage()
  const { isFavorite, toggleFavorite } = useLibrary()
  const backTo = location.state?.from || '/casino'
  const previewGame = location.state?.game ?? null
  const [isFullscreen, setIsFullscreen] = useState(false)
  const playerRef = useRef(null)
  const { game: fetchedGame, loading, error, reload } = useGame(id)
  const game = fetchedGame ?? previewGame
  const favorite = game ? isFavorite(game.id) : false
  const {
    games: providerGames,
    loading: relatedLoading,
    error: relatedError,
    reload: reloadRelated,
  } = useGames({
    brandId: game?.providerId,
    perPage: 31,
    enabled: Boolean(game?.providerId),
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = async () => {
    if (!playerRef.current) return

    if (document.fullscreenElement) {
      await document.exitFullscreen()
    } else {
      await playerRef.current.requestFullscreen?.()
    }
  }

  if (loading && !game) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-casino-pattern px-6 text-center text-white">
        <i className="fa-solid fa-spinner fa-spin text-3xl text-[#d91528]" aria-hidden="true" />
        <p className="text-sm text-zinc-400">{t('Loading...')}</p>
      </div>
    )
  }

  if (!game) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-casino-pattern px-6 text-center text-white">
        <i className="fa-solid fa-gamepad text-4xl text-zinc-600" aria-hidden="true" />
        <h1 className="text-2xl font-bold">{t('Game not found')}</h1>
        {error?.message && <p className="max-w-md text-sm text-zinc-400">{error.message}</p>}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button type="button" onClick={reload} className="account-btn-secondary">
            {t('Try again')}
          </button>
          <Link to={backTo} className="account-btn-primary">
            {t('Back')}
          </Link>
        </div>
      </div>
    )
  }

  const relatedGames = providerGames
    .filter((item) => item.id !== game.id)
    .slice(0, 30)

  return (
    <div className="min-h-screen bg-casino-pattern text-white">
      <header className="flex items-center justify-between gap-4 px-4 py-4 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            to={backTo}
            aria-label={t('Back')}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:bg-white/[0.08] hover:text-white"
          >
            <i className="fa-solid fa-arrow-left text-sm" aria-hidden="true" />
          </Link>
          <div className="hidden min-w-0 lg:block">
            <h1 className="truncate text-sm font-bold text-white">{game.name}</h1>
            <p className="truncate text-xs text-zinc-500">{game.provider}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => toggleFavorite(game)}
            aria-label={t('Favorite')}
            aria-pressed={favorite}
            className={
              favorite
                ? 'flex h-10 w-10 items-center justify-center rounded-full border border-red-500/50 bg-red-950/30 text-red-500'
                : 'flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:text-white'
            }
          >
            <i className={`${favorite ? 'fa-solid' : 'fa-regular'} fa-heart text-sm`} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? t('Exit fullscreen') : t('Fullscreen')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:text-white"
          >
            <i className={`fa-solid ${isFullscreen ? 'fa-compress' : 'fa-expand'} text-sm`} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={t('Help')}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:text-white lg:flex"
          >
            <i className="fa-regular fa-circle-question text-sm" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={t('Share')}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:text-white lg:flex"
          >
            <i className="fa-solid fa-share-nodes text-sm" aria-hidden="true" />
          </button>

          <BalancePill t={t} className="ml-1 max-[349px]:hidden" />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 pb-16 lg:px-8">
        <section
          ref={playerRef}
          className={`relative mx-auto flex min-h-[420px] w-full items-center justify-center overflow-hidden bg-black sm:min-h-[480px] lg:min-h-[520px] xl:min-h-[640px] ${
            isFullscreen ? 'rounded-none border-0' : 'rounded-2xl border border-white/10'
          }`}
        >
          {game.image ? (
            <img src={game.image} alt={game.name} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1b1b24] to-[#0d0d12] text-5xl font-black text-white/10">
              {game.name.slice(0, 2).toUpperCase()}
            </div>
          )}

          {(loading || error) && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/60 px-4 text-center">
              {error ? (
                <>
                  <i className="fa-solid fa-triangle-exclamation text-3xl text-[#d91528]" aria-hidden="true" />
                  <p className="text-sm text-zinc-300">{t('Could not load games')}</p>
                  <button type="button" onClick={reload} className="account-btn-secondary">
                    {t('Try again')}
                  </button>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-spinner fa-spin text-3xl text-[#d91528]" aria-hidden="true" />
                  <p className="text-sm text-zinc-400">{t('Loading...')}</p>
                </>
              )}
            </div>
          )}

          {isFullscreen && (
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={t('Exit fullscreen')}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-sm"
            >
              <i className="fa-solid fa-compress text-sm" aria-hidden="true" />
            </button>
          )}
        </section>

        <div className="mt-4 hidden justify-center max-[349px]:flex">
          <BalancePill t={t} />
        </div>

        <div className="mt-4 lg:hidden">
          <h1 className="text-lg font-bold text-white">{game.name}</h1>
          <p className="mt-0.5 text-xs text-zinc-500">{game.provider}</p>
        </div>

        {(relatedGames.length > 0 || relatedLoading || relatedError) && (
          <div className="mt-10">
            <GameSection
              title={`${t('More from')} ${game.provider}`}
              games={relatedGames}
              from={backTo}
              loading={relatedLoading}
              error={relatedError}
              onRetry={reloadRelated}
              emptyMessage="No related games are available right now."
            />
          </div>
        )}
      </main>
    </div>
  )
}

export default Game
