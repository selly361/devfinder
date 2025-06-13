import { render, screen } from '@testing-library/react'
import UserProfile from '.'
import type { GitHubUser } from '../../types'

describe('<UserProfile />', () => {
  it('shows placeholder when no user is provided', () => {
    render(<UserProfile user={null} />)
    expect(screen.getByText(/Search for a GitHub user above/i)).toBeInTheDocument()
  })

  it('renders all user information when user is provided', () => {
    const user: GitHubUser = {
      avatar_url: 'https://example.com/avatar.png',
      name: 'Foo Bar',
      login: 'foobar',
      created_at: '2022-04-26T00:00:00Z',
      bio: 'Hello world',
      public_repos: 10,
      followers: 20,
      following: 5,
      location: 'Earth',
      twitter_username: 'foo',
      blog: 'https://foo.com',
      company: 'Bar Inc',
    }

    render(<UserProfile user={user} />)

    // Avatar and header
    expect(screen.getByAltText('Foo Bar avatar')).toBeInTheDocument()
    expect(screen.getByText('Foo Bar')).toBeInTheDocument()
    expect(screen.getByText('@foobar')).toBeInTheDocument()
    expect(screen.getByText(/Joined 26 Apr 2022/)).toBeInTheDocument()

    // Bio
    expect(screen.getByText('Hello world')).toBeInTheDocument()

    // Stats
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('20')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()

    // Links
    expect(screen.getByText('Earth')).toBeInTheDocument()
    expect(screen.getByText('@foo')).toBeInTheDocument()
    expect(screen.getByText('https://foo.com')).toBeInTheDocument()
    expect(screen.getByText('Bar Inc')).toBeInTheDocument()
  })

  it('falls back to defaults for missing optional fields', () => {
    const user: GitHubUser = {
      avatar_url: '',
      name: null,
      login: 'nobody',
      created_at: '2022-04-26T00:00:00Z',
      bio: null,
      public_repos: 0,
      followers: 0,
      following: 0,
      location: null,
      twitter_username: null,
      blog: null,
      company: null,
    }

    render(<UserProfile user={user} />)

    expect(screen.getByText('nobody')).toBeInTheDocument()

    expect(screen.getByText('This profile has no bio')).toBeInTheDocument()

    const placeholders = screen.getAllByText('Not Available')
    expect(placeholders).toHaveLength(4)
  })
})
