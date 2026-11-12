import CatalogPage from '../components/catalog/CatalogPage'

const filters = [
  { key: 'all', label: 'All games', source: { category: 'virtual' } },
  { key: '1x2-gaming', label: '1x2 Gaming', source: { category: 'virtual', brandId: 5 } },
  { key: 'favorites', label: 'Favorites', local: 'favorites', hidden: true },
]

const sidebar = {
  brandCategory: 'virtual',
}

function Virtual() {
  return (
    <CatalogPage
      title="VIRTUAL"
      icon="fa-solid fa-futbol"
      searchPlaceholder="Search game..."
      filters={filters}
      source={{ category: 'virtual' }}
      sidebar={sidebar}
      emptyMessage="No virtual games are available right now."
    />
  )
}

export default Virtual
