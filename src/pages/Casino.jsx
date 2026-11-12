import CasinoSidebar from '../components/catalog/CasinoSidebar'
import CatalogPage from '../components/catalog/CatalogPage'

const filters = [
  { key: 'all', label: 'All games', source: { category: 'casino' } },
  { key: 'popular', label: 'Popular', source: { category: 'casino', mode: 'best' } },
  { key: 'slots', label: 'Slots', source: { type: 'slot' } },
  { key: 'new', label: 'New', source: { category: 'casino', mode: 'new' } },
  { key: 'scratch', label: 'Scratch', source: { type: 'scratch' }, hidden: true },
  { key: 'table', label: 'Table Games', source: { type: 'table_games' }, hidden: true },
  { key: 'favorites', label: 'Favorites', local: 'favorites', hidden: true },
  { key: 'my', label: 'My Games', local: 'recent', hidden: true },
]

function Casino() {
  return (
    <CatalogPage
      title="CASINO"
      icon="fa-solid fa-dice"
      searchPlaceholder="Search games..."
      filters={filters}
      source={{ category: 'casino' }}
      sidebar={{ brandCategory: 'casino' }}
      sidebarElement={(brands) => <CasinoSidebar brands={brands} />}
    />
  )
}

export default Casino
