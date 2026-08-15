import { useChat } from 'ai/react'
import { useEffect, useRef, useState } from 'react'

export function useStreamingChat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    setMessages,
  } = useChat({
    api: '/api/chat',
    onError: (error) => {
      console.error('Chat error:', error)
    },
  })

  const bottomRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isAtBottom, setIsAtBottom] = useState(true)
  const [showScrollButton, setShowScrollButton] = useState(false)

  // Track if user has scrolled up
  const handleScroll = () => {
    const container = containerRef.current
    if (!container) return
    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight
    const atBottom = distanceFromBottom < 50
    setIsAtBottom(atBottom)
    setShowScrollButton(!atBottom)
  }

  // Auto-scroll only when user is already at bottom
  useEffect(() => {
    if (isAtBottom) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isAtBottom])

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    setIsAtBottom(true)
    setShowScrollButton(false)
  }

  const clearChat = () => setMessages([])

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    clearChat,
    bottomRef,
    containerRef,
    handleScroll,
    showScrollButton,
    scrollToBottom,
  }
}
