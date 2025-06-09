import { FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '../../hooks/useTheme'

export default function ThemeToggle() {
  const { toggleTheme, theme } = useTheme()

  return (
    <button
      aria-label='Toggle theme'
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      onClick={toggleTheme}
      className='p-2 rounded-full bg-secondary-bg text-tertiary-text hover:brightness-110 transition'
    >
      {theme === 'light' ? (
        <FaMoon role='img' aria-label='moon icon' size={20} />
      ) : (
        <FaSun role='img' aria-label='sun icon' size={20} />
      )}
    </button>
  )
}
