'use client'

import { useStreamingChat } from '@/hooks/useStreamingChat'
import { ChatMessage } from '@/components/ChatMessage'
import { ThinkingIndicator } from '@/components/ThinkingIndicator'
import { StopButton } from '@/components/StopButton'
import { ErrorMessage } from '@/components/ErrorMessage'
import { EmptyState } from '@/components/EmptyState'
import { MessageSkeleton } from '@/components/MessageSkeleton'
import { NpmPackageCard } from '@/components/tools/NpmPackageCard'
import { NpmPackageResult } from '@/tools/npmPackage'
import {
  ToolInputStreaming,
  ToolInputAvailable,
  ToolOutputError,
} from '@/components/tools/ToolStates'
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
    error,
    handleRetry,
    isRetrying,
    fillInput,
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

  const handleExampleClick = (text: string) => {
    fillInput(text)
  }

  return (
    <div 
      className="flex flex-col bg-zinc-950 text-white relative"
      style={{ height: '100dvh' }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 
        border-b border-zinc-800 bg-zinc-900 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            error ? 'bg-red-400' : 'bg-green-400 animate-pulse'
          }`} />
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
        className="flex-1 overflow-y-auto px-4 py-6 
          overscroll-none -webkit-overflow-scrolling-touch"
      >
        {/* Empty state */}
        {messages.length === 0 && !isLoading && (
          <EmptyState onExampleClick={handleExampleClick} />
        )}

        {/* Skeleton on first load */}
        {messages.length === 0 && isLoading && (
          <MessageSkeleton />
        )}

        {/* Messages */}
        {messages.map((message) => (
          <div key={message.id}>
            {message.role === 'user' ? (
              <ChatMessage message={message} />
            ) : (
              <>
                {message.content &&
                  typeof message.content === 'string' &&
                  message.content.trim() && (
                    <ChatMessage message={message} />
                  )}

                {(message.toolInvocations as Array<{
                  toolCallId: string
                  toolName: string
                  state: 'partial-call' | 'call' | 'result'
                  args?: Record<string, string>
                  result?: Record<string, unknown> & {
                    error?: string
                    name?: string
                  }
                }> | undefined)?.map((tool) => {
                  if (tool.state === 'partial-call') {
                    return (
                      <div key={tool.toolCallId} 
                        className="flex justify-start mb-2">
                        <ToolInputStreaming />
                      </div>
                    )
                  }
                  if (tool.state === 'call') {
                    return (
                      <div key={tool.toolCallId} 
                        className="flex justify-start mb-2">
                        <ToolInputAvailable
                          packageName={tool.args?.packageName ?? '...'}
                        />
                      </div>
                    )
                  }
                  if (tool.state === 'result') {
                    if (tool.result?.error || !tool.result?.name) {
                      return (
                        <div key={tool.toolCallId}
                          className="flex justify-start mb-2">
                          <ToolOutputError
                            packageName={tool.args?.packageName}
                            errorMessage={tool.result?.error as string}
                          />
                        </div>
                      )
                    }
                    return (
                      <div key={tool.toolCallId}
                        className="flex justify-start mb-2">
                        <NpmPackageCard
                          data={tool.result as unknown as NpmPackageResult}
                        />
                      </div>
                    )
                  }
                  return null
                })}
              </>
            )}
          </div>
        ))}

        {/* Thinking indicator */}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex justify-start mb-4">
            <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center 
              justify-center text-white text-xs font-bold mr-2 mt-1 flex-shrink-0">
              AI
            </div>
            <ThinkingIndicator />
          </div>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <ErrorMessage
            message={error.message}
            onRetry={handleRetry}
            isRetrying={isRetrying}
          />
        )}

        <div ref={bottomRef} />
      </div>

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-28 right-4 w-9 h-9 rounded-full 
            bg-zinc-700 hover:bg-zinc-600 border border-zinc-600 
            text-zinc-200 shadow-lg transition-all flex items-center 
            justify-center text-lg z-10"
          aria-label="Scroll to latest message"
        >
          ↓
        </button>
      )}

      {/* Stop button */}
      {isLoading && (
        <div className="flex justify-center py-2 flex-shrink-0">
          <StopButton onStop={stop} />
        </div>
      )}

      {/* Input area */}
      <div className="px-4 pb-safe pt-2 border-t border-zinc-800 
        bg-zinc-900 flex-shrink-0"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
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
              disabled:opacity-50 max-h-32 overflow-y-auto
              text-base"
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
          Built by Sandesh Dhakal · FE-06 · Powered by OpenRouter
        </p>
      </div>
    </div>
  )
}
