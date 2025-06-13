import { useState } from 'react'
import { SearchBar } from './components/SearchBar'
import ThemeToggle from './components/ThemeToggle'
import UserProfile from './components/UserProfile'
import './index.css'
import type { GitHubUser } from './types'

export default function App() {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (username: string) => {
    try {
      setError(null)
      const res = await fetch(`https://api.github.com/users/${username}`)
      if (!res.ok) throw new Error('User not found')
      const data: GitHubUser = await res.json()
      setUser(data)
    } catch (e) {
      setUser(null)
      setError('No user found')
    }
  }

  return (
    <main className='w-2xl h-max absolute inset-0 m-auto space-y-10'>
      <section className='w-full flex justify-between items-center'>
        <h2 className='text-primary-text text-preset-1 font-bold'>DevFinder</h2>
        <ThemeToggle />
      </section>

      <SearchBar onSearch={handleSearch} />

      {error && <p className='text-center text-red-500 text-preset-4'>{error}</p>}

      <UserProfile user={user} />
    </main>
  )
}
