import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'velora-library'

const LibraryContext = createContext(null)

function readLibrary() {
  if (typeof window === 'undefined') return { favorites: [], recent: [] }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}')

    return {
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
      recent: Array.isArray(parsed.recent) ? parsed.recent : [],
    }
  } catch {
    return { favorites: [], recent: [] }
  }
}

function toStoredGame(game) {
  return {
    id: game.id,
    name: game.name,
    provider: game.provider,
    providerId: game.providerId,
    image: game.image,
    type: game.type,
    live: Boolean(game.live),
    slug: game.slug ?? '',
  }
}

export function LibraryProvider({ children }) {
  const [library, setLibrary] = useState(readLibrary)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(library))
  }, [library])

  const value = useMemo(
    () => ({
      favorites: library.favorites,
      recent: library.recent,
      isFavorite: (id) => library.favorites.some((game) => game.id === id),
      toggleFavorite: (game) =>
        setLibrary((current) => {
          const exists = current.favorites.some((item) => item.id === game.id)

          return {
            ...current,
            favorites: exists
              ? current.favorites.filter((item) => item.id !== game.id)
              : [toStoredGame(game), ...current.favorites],
          }
        }),
      addRecent: (game) =>
        setLibrary((current) => ({
          ...current,
          recent: [
            toStoredGame(game),
            ...current.recent.filter((item) => item.id !== game.id),
          ].slice(0, 24),
        })),
    }),
    [library],
  )

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLibrary() {
  const context = useContext(LibraryContext)

  if (!context) {
    throw new Error('useLibrary must be used within LibraryProvider')
  }

  return context
}
