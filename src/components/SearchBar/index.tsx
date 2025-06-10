import { useState } from 'react'
import type { FormEvent } from 'react'
import { FaSearch } from 'react-icons/fa'

export type SearchBarProps = {
  onSearch: (username: string) => void
}

const GITHUB_USERNAME_REGEX = /^(?=.{1,39}$)(?!-)(?!.*--)[A-Za-z0-9-]+(?<!-)$/

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [error, setError] = useState<string | null>(null)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = query.trim()

    if (!trimmed) {
      setError('Please enter a username')
      return
    }

    if (!GITHUB_USERNAME_REGEX.test(trimmed)) {
      setError('Invalid GitHub username')
      return
    }

    setError(null)
    onSearch(trimmed)
  }

  return (
    <form
      onSubmit={submit}
      className={`h-16 w-full rounded-2xl bg-secondary-bg flex items-center px-4 ${
        error ? 'border border-red-500' : 'border-none'
      }`}
    >
      <FaSearch className='text-tertiary-text text-lg' />
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search GitHub username…'
        className={`
          flex-1  ml-4 text-primary-text placeholder-secondary-text text-preset-4
          outline-none
          rounded
        `}
      />
      <button type='submit' className='text-preset-5'>
        Search
      </button>
    </form>
  )
}
