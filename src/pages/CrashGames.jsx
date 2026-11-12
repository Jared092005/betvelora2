import { useMemo } from 'react'

import CatalogPage from '../components/catalog/CatalogPage'
import { useGames } from '../hooks/useGames'

const filters = [
  { key: 'all', label: 'All games', source: { type: 'crash' } },
  { key: 'popular', label: 'Popular', source: { type: 'crash' } },
  { key: 'aviator', label: 'Aviator', source: { type: 'crash' }, keywords: ['aviator'] },
  { key: 'crash', label: 'Crash', source: { type: 'crash' }, keywords: ['crash'] },
  { key: 'mines', label: 'Mines', source: { type: 'crash' }, keywords: ['mines'] },
  { key: 'plinko', label: 'Plinko', source: { type: 'crash' }, keywords: ['plinko'] },
  { key: 'favorites', label: 'Favorites', local: 'favorites', hidden: true },
]

function CrashGames() {
  const { games } = useGames({ type: 'crash', perPage: 12 })
  const brands = useMemo(() => {
    const map = new Map()

    games.forEach((game) => {
      if (game.providerId === null || game.providerId === undefined) return
      if (!map.has(game.providerId)) {
        map.set(game.providerId, { id: game.providerId, name: game.provider })
      }
    })

    return [...map.values()]
  }, [games])

  return (
    <CatalogPage
      title="CRASH GAMES"
      icon="fa-solid fa-rocket"
      searchPlaceholder="Search crash games..."
      filters={filters}
      source={{ type: 'crash' }}
      sidebar={{ brands }}
      emptyMessage="No crash games are available right now."
    />
  )
}

export default CrashGames
