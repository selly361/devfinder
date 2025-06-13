import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import App from './App'
import type { GitHubUser } from './types'

const mockUser: GitHubUser = {
  avatar_url: 'https://example.com/avatar.png',
  name: 'Foo Bar',
  login: 'foobar',
  created_at: '2021-09-01T00:00:00Z',
  bio: 'Hello world',
  public_repos: 10,
  followers: 20,
  following: 5,
  location: 'Earth',
  twitter_username: 'foo',
  blog: 'https://foo.com',
  company: 'Bar Inc',
}

describe('<App /> integration', () => {
  const getMatchMedia = (matches: boolean) => () =>
    ({
      matches,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as MediaQueryList)

  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: getMatchMedia(false),
    })

    vi.restoreAllMocks()
  })

  it('fetches & displays profile on successful search', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUser),
        })
      )
    )

    render(<App />)
    const user = userEvent.setup()

    await user.type(screen.getByPlaceholderText(/search GitHub username…/i), 'foobar')
    await user.click(screen.getByRole('button', { name: /search/i }))

    expect(await screen.findByText('Foo Bar')).toBeInTheDocument()
    expect(screen.getByText('@foobar')).toBeInTheDocument()
  })

  it('shows error message on 404', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: false }))
    )

    render(<App />)
    const user = userEvent.setup()

    await user.type(
      screen.getByPlaceholderText(/search GitHub username…/i),
      'doesnotexist'
    )
    await user.click(screen.getByRole('button', { name: /search/i }))

    expect(await screen.findByText('No user found')).toBeInTheDocument()

    expect(screen.getByText(/search for a GitHub user above/i)).toBeInTheDocument()
  })
})
