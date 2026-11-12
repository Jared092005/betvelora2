const PLAYER_IDS = ['ID #8***0', 'ID #1***9', 'ID #6***2', 'ID #3***5', 'ID #9***1', 'ID #2***7', 'ID #5***4', 'ID #7***8']
const TIMES = ['12 min ago', '35 min ago', '1 hour ago', '2 hours ago', '3 hours ago', '4 hours ago', '5 hours ago', '6 hours ago']
const AMOUNTS = [148200, 95400, 68750, 52100, 47900, 39250, 31400, 24800]

export function buildTopWinners(games = [], limit = 8) {
  return games.slice(0, limit).map((game, index) => ({
    id: PLAYER_IDS[index % PLAYER_IDS.length],
    time: TIMES[index % TIMES.length],
    amount: AMOUNTS[index % AMOUNTS.length].toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    game: game.name,
    provider: game.provider,
    image: game.image,
  }))
}
