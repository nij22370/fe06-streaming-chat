interface ErrorMessageProps {
  message?: string
  onRetry: () => void
  isRetrying?: boolean
}

export function ErrorMessage({ 
  message, 
  onRetry, 
  isRetrying = false 
}: ErrorMessageProps) {
  return (
    <div className="flex justify-start mb-4">
      <div className="w-7 h-7 rounded-full bg-red-800 flex items-center 
        justify-center text-white text-xs font-bold mr-2 mt-1 flex-shrink-0">
        !
      </div>
      <div className="max-w-[80%]">
        <div className="px-4 py-3 rounded-2xl rounded-tl-sm 
          bg-red-950/40 border border-red-800/40 text-sm">
          <p className="text-red-300 mb-1 font-medium">
            Response failed
          </p>
          <p className="text-zinc-400 text-xs leading-relaxed">
            {message ?? 
              'The AI failed to respond. Your message is saved — retry to continue.'}
          </p>
        </div>
        <button
          onClick={onRetry}
          disabled={isRetrying}
          className="mt-2 flex items-center gap-1.5 text-xs text-zinc-400 
            hover:text-zinc-200 transition-colors disabled:opacity-50 
            disabled:cursor-not-allowed group"
          aria-label="Retry last message"
        >
          <span className={`text-sm ${isRetrying ? 'animate-spin' : 
            'group-hover:rotate-180 transition-transform duration-300'}`}>
            ↻
          </span>
          {isRetrying ? 'Retrying...' : 'Retry last message'}
        </button>
      </div>
    </div>
  )
}
