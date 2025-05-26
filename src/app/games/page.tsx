'use client'

import React, { useEffect, useState } from 'react'

type Game = {
  id: number
  title: string
  genre: string
  publisher: string
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debounced
}

export default function Page() {
  const [games, setGames] = useState<Game[]>([])
  const [genre, setGenre] = useState('')
  const [publisher, setPublisher] = useState('')

  // Debounced values
  const debouncedGenre = useDebounce(genre, 300)
  const debouncedPublisher = useDebounce(publisher, 300)

  // Fetch when debounced input changes
  useEffect(() => {
    fetchGames(debouncedGenre, debouncedPublisher)
  }, [debouncedGenre, debouncedPublisher])

  const fetchGames = async (genreFilter?: string, publisherFilter?: string) => {
    let url = '/api/games'
    const params = new URLSearchParams()
    if (genreFilter) params.append('genre', genreFilter)
    if (publisherFilter) params.append('publisher', publisherFilter)
    if ([...params].length > 0) url += `?${params.toString()}`

    const res = await fetch(url)
    const data = await res.json()
    setGames(data)
  }

  return (
    <div className="flex flex-col h-screen p-6 space-y-4">
      <h1 className="text-2xl font-bold">Game List</h1>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search by genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <input
          type="text"
          placeholder="Search by publisher"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          className="border p-2 rounded flex-1"
        />
      </div>

      <div className="flex-1 overflow-y-auto border rounded p-4 w-full max-w-screen-md mx-auto">
        {games.length > 0 ? (
          <ul className="space-y-2">
            {games.map((game) => (
              <li key={game.id} className="border p-4 rounded shadow-sm break-words">
                <strong className="block text-lg font-semibold">{game.title}</strong>
                <div>Genre: {game.genre}</div>
                <div>Publisher: {game.publisher}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No games found.</p>
        )}
      </div>
    </div>
  )
}