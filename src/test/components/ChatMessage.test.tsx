import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ChatMessage } from '@/components/ChatMessage'
import { Message } from 'ai'

const makeMessage = (
  role: 'user' | 'assistant',
  content: string
): Message => ({
  id: 'test-id',
  role,
  content,
  createdAt: new Date(),
})

describe('ChatMessage', () => {
  it('renders user message content', () => {
    render(<ChatMessage message={makeMessage('user', 'Hello world')} />)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('renders assistant message content', () => {
    render(
      <ChatMessage message={makeMessage('assistant', 'I can help with that')} />
    )
    expect(screen.getByText('I can help with that')).toBeInTheDocument()
  })

  it('renders user message with correct alignment class', () => {
    const { container } = render(
      <ChatMessage message={makeMessage('user', 'Hi')} />
    )
    expect(container.firstChild).toHaveClass('justify-end')
  })

  it('renders assistant message with correct alignment class', () => {
    const { container } = render(
      <ChatMessage message={makeMessage('assistant', 'Hi')} />
    )
    expect(container.firstChild).toHaveClass('justify-start')
  })

  it('renders markdown in assistant messages', () => {
    render(
      <ChatMessage
        message={makeMessage('assistant', '**bold text**')}
      />
    )
    expect(screen.getByText('bold text')).toBeInTheDocument()
  })

  it('renders user message as plain text, not markdown', () => {
    render(
      <ChatMessage message={makeMessage('user', '**not bold**')} />
    )
    expect(screen.getByText('**not bold**')).toBeInTheDocument()
  })
})
