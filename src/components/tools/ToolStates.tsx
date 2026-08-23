/**
 * Four tool part states — each answers a different user question:
 * 1. ToolInputStreaming — "What is it doing?"
 * 2. ToolInputAvailable — "What did it search for?"
 * 3. ToolOutputAvailable — handled by NpmPackageCard
 * 4. ToolOutputError — "What went wrong?"
 */

// State 1: Tool is being called, input still streaming
export function ToolInputStreaming() {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg 
      bg-zinc-800/50 border border-zinc-700/50 my-2 max-w-xs w-full">
      <div className="w-4 h-4 rounded-full border-2 border-violet-500 
        border-t-transparent animate-spin flex-shrink-0" />
      <span className="text-zinc-400 text-xs">
        Looking up npm package...
      </span>
    </div>
  )
}

// State 2: Input received, waiting for result
interface ToolInputAvailableProps {
  packageName: string
}

export function ToolInputAvailable({ packageName }: ToolInputAvailableProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg 
      bg-zinc-800/50 border border-zinc-700/50 my-2 max-w-xs w-full">
      <div className="w-4 h-4 rounded-full border-2 border-violet-500 
        border-t-transparent animate-spin flex-shrink-0" />
      <span className="text-zinc-400 text-xs">
        Fetching{' '}
        <span className="font-mono text-violet-400">{packageName}</span>
        {' '}from npm...
      </span>
    </div>
  )
}

// State 4: Tool execution failed
interface ToolOutputErrorProps {
  packageName?: string
  errorMessage?: string
}

export function ToolOutputError({ 
  packageName, 
  errorMessage 
}: ToolOutputErrorProps) {
  return (
    <div className="rounded-xl border border-red-800/50 bg-red-950/30 
      px-4 py-3 my-3 max-w-sm w-full">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-red-400 text-sm">⚠</span>
        <span className="text-red-400 text-sm font-medium">
          Package not found
        </span>
      </div>
      {packageName && (
        <p className="text-zinc-400 text-xs mb-1">
          Could not find{' '}
          <span className="font-mono text-zinc-300">
            {packageName}
          </span>{' '}
          on the npm registry.
        </p>
      )}
      {errorMessage && (
        <p className="text-zinc-500 text-xs">{errorMessage}</p>
      )}
      <p className="text-zinc-500 text-xs mt-2">
        Check the package name and try again.
      </p>
    </div>
  )
}
