export const mainNav = [
  { label: 'Home', to: '/', end: true, icon: 'fa-solid fa-house' },
  { label: 'Casino', to: '/casino', icon: 'fa-solid fa-dice' },
  { label: 'Casino Live', to: '/casino-live', icon: 'fa-solid fa-video' },
  { label: 'Crash Games', to: '/crash-games', icon: 'fa-solid fa-rocket' },
  { label: 'Poker', to: '/poker', icon: 'fa-solid fa-diamond' },
  { label: 'Virtual', to: '/virtual', icon: 'fa-solid fa-gamepad' },
  { label: 'Promotions', to: '/promotions', icon: 'fa-solid fa-gift' },
]

export const sidebarNav = [
  { label: 'Lobby', to: '/', end: true, icon: 'fa-solid fa-gamepad' },
  { label: 'Popular Games', to: '/casino?filter=popular', icon: 'fa-solid fa-fire-flame-curved', tag: 'HOT' },
  { label: 'New Games', to: '/casino?filter=new', icon: 'fa-solid fa-wand-magic-sparkles' },
  { label: 'Slots', to: '/casino?filter=slots', icon: 'fa-solid fa-gem' },
  { label: 'Crash Games', to: '/crash-games', icon: 'fa-solid fa-rocket' },
  { label: 'Scratch', to: '/casino?filter=scratch', icon: 'fa-solid fa-ticket' },
  { label: 'Table Games', to: '/casino?filter=table', icon: 'fa-solid fa-table-cells-large' },
  { label: 'My Games', to: '/casino?filter=my', icon: 'fa-solid fa-clock-rotate-left' },
  { label: 'My Favorites', to: '/casino?filter=favorites', icon: 'fa-solid fa-heart' },
]

export const homeCategories = [
  { label: 'Betting', to: '/virtual' },
  { label: 'Casino', to: '/casino' },
  { label: 'Casino Live', to: '/casino-live' },
  { label: 'Crash Games', to: '/crash-games' },
  { label: 'Poker', to: '/poker' },
  { label: 'Scratch', to: '/casino?filter=scratch' },
  { label: 'Virtual', to: '/virtual' },
]

export const footerLinks = [
  { label: 'My Games', to: '/casino?filter=my' },
  { label: 'My Favorites', to: '/casino?filter=favorites' },
  { label: 'New Games', to: '/casino?filter=new' },
  { label: 'Popular Games', to: '/casino?filter=popular' },
]
