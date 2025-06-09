import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import * as themeHook from '../../hooks/useTheme'
import ThemeToggle from '.'

describe('<ThemeToggle/>', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders moon icon in light mode and calls toggleTheme', async () => {
    const toggleMock = vi.fn()
    vi.spyOn(themeHook, 'useTheme').mockReturnValue({
      theme: 'light',
      toggleTheme: toggleMock,
      setTheme: vi.fn(),
    })

    const user = userEvent.setup()
    render(<ThemeToggle />)

    const btn = screen.getByRole('button', { name: /toggle theme/i })
    expect(btn).toHaveAttribute('title', 'Switch to dark mode')

    const moon = screen.getByRole('img', { name: 'moon icon' })
    expect(moon).toBeInTheDocument()

    await user.click(btn)
    expect(toggleMock).toHaveBeenCalledOnce()
  })

  it('renders sun icon in dark mode', () => {
    vi.spyOn(themeHook, 'useTheme').mockReturnValue({
      theme: 'dark',
      toggleTheme: () => {},
      setTheme: vi.fn(),
    })

    render(<ThemeToggle />)

    expect(
      screen.getByRole('button', { name: /toggle theme/i })
    ).toHaveAttribute('title', 'Switch to light mode')

    expect(
      screen.getByRole('img', { name: 'sun icon' })
    ).toBeInTheDocument()
  })
})

