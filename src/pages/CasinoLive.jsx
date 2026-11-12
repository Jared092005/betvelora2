import CatalogPage from '../components/catalog/CatalogPage'

const filters = [
  { key: 'all', label: 'All games', source: { category: 'casino_live' } },
  { key: 'popular', label: 'Popular', source: { category: 'casino_live', mode: 'best' } },
  { key: 'roulette', label: 'Roulette', source: { category: 'casino_live', search: 'roulette' } },
  { key: 'blackjack', label: 'Blackjack', source: { category: 'casino_live', search: 'blackjack' } },
  { key: 'baccarat', label: 'Baccarat', source: { category: 'casino_live', search: 'baccarat' } },
  {
    key: 'game-shows',
    label: 'Game Shows',
    source: { category: 'casino_live' },
    keywords: ['crazy time', 'monopoly', 'dream catcher', 'mega ball', 'lightning', 'game show'],
  },
  { key: 'favorites', label: 'Favorites', local: 'favorites', hidden: true },
]

const sidebar = {
  brandCategory: 'casino_live',
  groups: [
    {
      title: 'By Type',
      items: [
        { label: 'Roulette', filter: 'roulette' },
        { label: 'Blackjack', filter: 'blackjack' },
        { label: 'Baccarat', filter: 'baccarat' },
        { label: 'Game Shows', filter: 'game-shows' },
      ],
    },
  ],
}

function CasinoLive() {
  return (
    <CatalogPage
      title="CASINO LIVE"
      icon="fa-solid fa-video"
      searchPlaceholder="Search live table..."
      filters={filters}
      source={{ category: 'casino_live' }}
      perPage={30}
      sidebar={sidebar}
      live
      aspect="aspect-[16/10]"
      favoriteSide="left"
    />
  )
}

export default CasinoLive
