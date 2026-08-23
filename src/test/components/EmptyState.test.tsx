import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { EmptyState } from '@/components/EmptyState'

describe('EmptyState', () => {
  it('renders heading', () => {
    render(<EmptyState onExampleClick={vi.fn()} />)
    expect(
      screen.getByRole('heading', { name: /ask me anything/i })
    ).toBeInTheDocument()
  })

  it('renders example prompt buttons', () => {
    render(<EmptyState onExampleClick={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(4)
  })

  it('calls onExampleClick with button text when clicked', async () => {
    const user = userEvent.setup()
    const onExampleClick = vi.fn()
    render(<EmptyState onExampleClick={onExampleClick} />)
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[0])
    expect(onExampleClick).toHaveBeenCalledWith(
      expect.any(String)
    )
  })
})
