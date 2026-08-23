import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { StopButton } from '@/components/StopButton'

describe('StopButton', () => {
  it('renders stop generating text', () => {
    render(<StopButton onStop={vi.fn()} />)
    expect(
      screen.getByRole('button', { name: /stop generating/i })
    ).toBeInTheDocument()
  })

  it('calls onStop when clicked', async () => {
    const user = userEvent.setup()
    const onStop = vi.fn()
    render(<StopButton onStop={onStop} />)
    await user.click(
      screen.getByRole('button', { name: /stop generating/i })
    )
    expect(onStop).toHaveBeenCalledTimes(1)
  })
})
