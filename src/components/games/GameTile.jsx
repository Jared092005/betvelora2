import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useLanguage } from '../../i18n/LanguageContext'
import { useLibrary } from '../../library/LibraryContext'

function GameTile({ game, live = false, aspect = 'aspect-[4/3]', favoriteSide = 'right', from }) {
  const { t } = useLanguage()
  const [imageFailed, setImageFailed] = useState(false)
  const { isFavorite, toggleFavorite, addRecent } = useLibrary()
  const location = useLocation()
  const resolvedFavoriteSide = live && favoriteSide === 'right' ? 'left' : favoriteSide
  const returnTo = from || location.state?.from || `${location.pathname}${location.search}`
  const favorite = isFavorite(game.id)
  const gamePath = game.id ? `/games/${game.id}` : '/casino'

  const openGame = () => addRecent(game)

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[#111116] transition-all duration-300 hover:-translate-y-1 hover:border-red-600/50 hover:shadow-xl hover:shadow-red-950/20 active:scale-90 active:duration-100 lg:active:scale-100"
      data-purpose="game-card"
    >
      <Link
        to={gamePath}
        state={{ from: returnTo }}
        onClick={openGame}
        aria-label={`${t('View game')} ${game.name}`}
        className="absolute inset-0 z-[5] lg:hidden"
      />

      <div className={`relative ${aspect} overflow-hidden bg-[#16161d]`}>
        {game.image && !imageFailed ? (
          <img
            src={game.image}
            alt={game.name}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1b1b24] to-[#0d0d12] text-2xl font-black text-white/20">
            {game.name?.slice(0, 2).toUpperCase()}
          </div>
        )}
        <Link
          to={gamePath}
          state={{ from: returnTo }}
          onClick={openGame}
          aria-label={`${t('View game')} ${game.name}`}
          className="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-transparent opacity-80" />

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/50 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
          <Link
            to={gamePath}
            state={{ from: returnTo }}
            onClick={openGame}
            className="cursor-pointer rounded-lg bg-[#d91528] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-950/50 transition-colors hover:bg-[#bd1122]"
          >
            {t('Play Now')}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => toggleFavorite(game)}
          aria-label={favorite ? `Quitar ${game.name} de favoritos` : `Añadir ${game.name} a favoritos`}
          aria-pressed={favorite}
          className={[
            'absolute top-2.5 z-20 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border bg-black/60 backdrop-blur-md transition',
            resolvedFavoriteSide === 'left' ? 'left-2.5' : 'right-2.5',
            favorite
              ? 'border-red-500/50 text-red-500'
              : 'border-white/20 text-zinc-400 hover:border-red-500/50 hover:text-red-500',
          ].join(' ')}
        >
          <i className={`${favorite ? 'fa-solid' : 'fa-regular'} fa-heart text-xs`} aria-hidden="true" />
        </button>

        {live && (
          <span className="absolute right-2.5 top-2.5 z-20 flex items-center space-x-1 rounded-full bg-[#d91528] px-2 py-0.5 text-[10px] font-bold text-white shadow-md shadow-red-950/60">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            <span>LIVE</span>
          </span>
        )}
      </div>

      <div className="p-3">
        <h3 className="truncate text-sm font-semibold text-white transition-colors group-hover:text-red-400">{game.name}</h3>
        <p className="mt-0.5 text-[11px] text-zinc-400">{game.provider}</p>
      </div>
    </div>
  )
}

export default GameTile
