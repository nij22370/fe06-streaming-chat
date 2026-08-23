interface EmptyStateProps {
  onExampleClick: (text: string) => void
}

const EXAMPLES = [
  'Tell me about the zustand package',
  'What is the difference between useEffect and useLayoutEffect?',
  'Show me a TypeScript generic example',
  'What version is Next.js on?',
]

export function EmptyState({ onExampleClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full 
      text-center px-4">
      <div className="w-14 h-14 rounded-full bg-violet-600 flex items-center 
        justify-center text-white font-bold text-xl mb-4 flex-shrink-0">
        AI
      </div>
      <h2 className="text-zinc-200 font-semibold mb-1">
        Ask me anything
      </h2>
      <p className="text-zinc-500 text-sm mb-8 max-w-xs leading-relaxed">
        Frontend development, React, Next.js, TypeScript, or npm packages.
      </p>
      <div className="w-full max-w-sm space-y-2">
        <p className="text-xs text-zinc-600 mb-3 text-left">
          Try one of these:
        </p>
        {EXAMPLES.map((example) => (
          <button
            key={example}
            onClick={() => onExampleClick(example)}
            className="w-full text-left px-4 py-2.5 rounded-xl bg-zinc-800/50 
              hover:bg-zinc-800 border border-zinc-700/50 hover:border-zinc-600 
              text-zinc-300 text-sm transition-all"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  )
}
