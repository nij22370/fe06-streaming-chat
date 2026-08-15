'use client'

import { useStreamingChat } from '@/hooks/useStreamingChat'
import { ChatMessage } from '@/components/ChatMessage'
import { ThinkingIndicator } from '@/components/ThinkingIndicator'
import { StopButton } from '@/components/StopButton'
import { FormEvent, KeyboardEvent } from 'react'

export default function ChatPage() {
  const {
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
  } = useStreamingChat()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    handleSubmit(e)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!isLoading && input.trim()) {
        handleSubmit(e as unknown as FormEvent<HTMLFormElement>)
      }
    }
  }

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-white relative">

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 
        border-b border-zinc-800 bg-zinc-900 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <h1 className="text-sm font-semibold text-zinc-100">
            AI Chat — FE-06
          </h1>
        </div>
        <button
          onClick={clearChat}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          Clear chat
        </button>
      </header>

      {/* Messages area */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-6"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-14 h-14 rounded-full bg-violet-600 flex items-center 
              justify-center text-white font-bold text-xl mb-4">
              AI
            </div>
            <h2 className="text-zinc-200 font-semibold mb-2">
              Ask me anything
            </h2>
            <p className="text-zinc-500 text-sm max-w-xs">
              Frontend development, React, Next.js, TypeScript, 
              or general coding questions.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {/* Thinking indicator — shows before first token */}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex justify-start mb-4">
            <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center 
              justify-center text-white text-xs font-bold mr-2 mt-1 flex-shrink-0">
              AI
            </div>
            <ThinkingIndicator />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-28 right-4 w-9 h-9 rounded-full bg-zinc-700 
            hover:bg-zinc-600 border border-zinc-600 text-zinc-200 shadow-lg 
            transition-all flex items-center justify-center text-lg"
          aria-label="Scroll to latest message"
        >
          ↓
        </button>
      )}

      {/* Stop button — visible while streaming */}
      {isLoading && (
        <div className="flex justify-center py-2 flex-shrink-0">
          <StopButton onStop={stop} />
        </div>
      )}

      {/* Input area */}
      <div className="px-4 pb-4 pt-2 border-t border-zinc-800 bg-zinc-900 flex-shrink-0">
        <form onSubmit={onSubmit} className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            placeholder="Ask something... (Enter to send, Shift+Enter for newline)"
            rows={1}
            disabled={isLoading}
            className="flex-1 resize-none bg-zinc-800 text-zinc-100 
              placeholder-zinc-500 rounded-xl px-4 py-3 text-sm 
              focus:outline-none focus:ring-1 focus:ring-violet-500 
              disabled:opacity-50 max-h-32 overflow-y-auto"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 
              disabled:opacity-40 disabled:cursor-not-allowed text-white 
              text-sm font-medium transition-colors flex-shrink-0"
          >
            Send
          </button>
        </form>
        <p className="text-xs text-zinc-600 mt-2 text-center">
          Built by Sandesh Dhakal · FE-06 · Powered by Gemini
        </p>
      </div>
    </div>
  )
}
