import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { SearchBar } from '.'

describe('<SearchBar />', () => {
  const onSearch = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('does not call onSearch and shows error border when input is empty', async () => {
    render(<SearchBar onSearch={onSearch} />)
    const user = userEvent.setup()
    const btn = screen.getByRole('button', { name: /search/i })

    await user.click(btn)

    expect(onSearch).not.toHaveBeenCalled()

    const form = btn.closest('form')
    expect(form).toHaveClass('border-red-500')
  })

  it('does not call onSearch and shows error border for invalid username', async () => {
    render(<SearchBar onSearch={onSearch} />)
    const user = userEvent.setup()
    const input = screen.getByPlaceholderText(/search GitHub username…/i)
    const btn = screen.getByRole('button', { name: /search/i })

    await user.type(input, 'invalid--name')
    await user.click(btn)

    expect(onSearch).not.toHaveBeenCalled()

    const form = input.closest('form')
    expect(form).toHaveClass('border-red-500')
  })

  it('calls onSearch and removes error border for valid username', async () => {
    render(<SearchBar onSearch={onSearch} />)
    const user = userEvent.setup()
    const input = screen.getByPlaceholderText(/search GitHub username…/i)
    const btn = screen.getByRole('button', { name: /search/i })

    await user.type(input, 'valid-user')
    await user.click(btn)

    expect(onSearch).toHaveBeenCalledTimes(1)
    expect(onSearch).toHaveBeenCalledWith('valid-user')

    const form = input.closest('form')
    expect(form).toHaveClass('border-none')
  })

  it('trims whitespace before validation and search', async () => {
    render(<SearchBar onSearch={onSearch} />)
    const user = userEvent.setup()
    const input = screen.getByPlaceholderText(/search GitHub username…/i)
    const btn = screen.getByRole('button', { name: /search/i })

    await user.type(input, '  trimmed-user  ')
    await user.click(btn)

    expect(onSearch).toHaveBeenCalledWith('trimmed-user')
  })
})
