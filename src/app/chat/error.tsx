'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ChatError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Chat route error:', error)
  }, [error])

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-white">
      <header className="flex items-center justify-between px-4 py-3 
        border-b border-zinc-800 bg-zinc-900 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <h1 className="text-sm font-semibold text-zinc-100">
            AI Chat — FE-06
          </h1>
        </div>
      </header>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-sm w-full text-center">
          <div className="w-12 h-12 rounded-full bg-red-900/30 border 
            border-red-800/50 flex items-center justify-center mx-auto mb-4">
            <span className="text-red-400 text-xl">⚠</span>
          </div>
          <h2 className="text-lg font-semibold text-zinc-100 mb-2">
            Chat unavailable
          </h2>
          <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
            The chat failed to load. This is usually a temporary issue.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={reset}
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 
                text-white text-sm font-medium transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 
                text-zinc-300 text-sm font-medium transition-colors"
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
