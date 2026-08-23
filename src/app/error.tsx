'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen 
      bg-zinc-950 text-white p-6">
      <div className="max-w-md w-full text-center">
        <div className="w-14 h-14 rounded-full bg-red-900/30 border border-red-800/50 
          flex items-center justify-center mx-auto mb-6">
          <span className="text-red-400 text-2xl">⚠</span>
        </div>
        <h1 className="text-xl font-semibold text-zinc-100 mb-2">
          Something went wrong
        </h1>
        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
          The application encountered an unexpected error. 
          Your conversation has not been lost.
        </p>
        {error.message && (
          <p className="text-xs text-zinc-600 font-mono bg-zinc-900 
            px-3 py-2 rounded-lg mb-6 text-left break-all">
            {error.message}
          </p>
        )}
        <button
          onClick={reset}
          className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 
            text-white text-sm font-medium transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
