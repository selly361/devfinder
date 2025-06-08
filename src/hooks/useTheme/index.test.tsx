import { renderHook, act } from '@testing-library/react'
import { useTheme } from '.'

describe('useTheme hook', () => {
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
    localStorage.clear()

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: getMatchMedia(false),
    })
    document.documentElement.removeAttribute('data-theme')
  })

  it('defaults to light when no stored theme and system prefers light', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('defaults to dark when system prefers dark and no stored theme', () => {
    window.matchMedia = getMatchMedia(true)
    const { result } = renderHook(() => useTheme())
    
    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('initializes from localStorage if value is stored', () => {
    localStorage.setItem('theme', 'dark')

    window.matchMedia = getMatchMedia(false)
    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('toggleTheme flips between light and dark', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')

    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.theme).toBe('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('setTheme can directly set theme and persists', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.setTheme('dark')
    })

    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })
})
