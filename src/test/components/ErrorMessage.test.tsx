import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { ErrorMessage } from '@/components/ErrorMessage'

describe('ErrorMessage', () => {
  it('renders default error message', () => {
    render(<ErrorMessage onRetry={vi.fn()} />)
    expect(screen.getByText(/response failed/i)).toBeInTheDocument()
  })

  it('renders custom error message', () => {
    render(
      <ErrorMessage
        message="Network error occurred"
        onRetry={vi.fn()}
      />
    )
    expect(
      screen.getByText('Network error occurred')
    ).toBeInTheDocument()
  })

  it('renders retry button', () => {
    render(<ErrorMessage onRetry={vi.fn()} />)
    expect(
      screen.getByRole('button', { name: /retry last message/i })
    ).toBeInTheDocument()
  })

  it('calls onRetry when retry button clicked', async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()
    render(<ErrorMessage onRetry={onRetry} />)
    await user.click(
      screen.getByRole('button', { name: /retry last message/i })
    )
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('disables retry button when isRetrying is true', () => {
    render(<ErrorMessage onRetry={vi.fn()} isRetrying={true} />)
    expect(
      screen.getByRole('button', { name: /retry last message/i })
    ).toBeDisabled()
  })

  it('shows retrying text when isRetrying', () => {
    render(<ErrorMessage onRetry={vi.fn()} isRetrying={true} />)
    expect(screen.getByText(/retrying/i)).toBeInTheDocument()
  })
})
