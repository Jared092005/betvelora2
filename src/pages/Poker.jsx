import CatalogPage from '../components/catalog/CatalogPage'

const filters = [
  { key: 'all', label: 'All games', source: { category: 'poker' } },
  { key: 'holdem', label: "Texas Hold'em", source: { category: 'poker', search: 'holdem' } },
  { key: 'omaha', label: 'Omaha', source: { category: 'poker', search: 'omaha' } },
  { key: 'favorites', label: 'Favorites', local: 'favorites', hidden: true },
]

const sidebar = {
  brandCategory: 'poker',
}

function Poker() {
  return (
    <CatalogPage
      title="POKER"
      icon="fa-solid fa-diamond"
      searchPlaceholder="Search game..."
      filters={filters}
      source={{ category: 'poker' }}
      sidebar={sidebar}
      emptyMessage="No poker games are available right now."
    />
  )
}

export default Poker
