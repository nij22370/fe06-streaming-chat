import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ThinkingIndicator } from '@/components/ThinkingIndicator'

describe('ThinkingIndicator', () => {
  it('renders thinking text', () => {
    render(<ThinkingIndicator />)
    expect(screen.getByText('Thinking')).toBeInTheDocument()
  })

  it('renders three bouncing dots', () => {
    const { container } = render(<ThinkingIndicator />)
    const dots = container.querySelectorAll('.animate-bounce')
    expect(dots).toHaveLength(3)
  })
})
