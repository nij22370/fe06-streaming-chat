import { NpmPackageResult } from '@/tools/npmPackage'

interface NpmPackageCardProps {
  data: NpmPackageResult
}

function formatDownloads(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return n.toString()
}

export function NpmPackageCard({ data }: NpmPackageCardProps) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900 
      overflow-hidden my-3 max-w-sm w-full">
      
      {/* Header */}
      <div className="px-4 py-3 bg-zinc-800 border-b border-zinc-700 
        flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-red-500 flex items-center 
            justify-center text-white text-xs font-bold flex-shrink-0">
            npm
          </div>
          <span className="font-mono font-semibold text-zinc-100 text-sm">
            {data.name}
          </span>
        </div>
        <span className="text-xs font-mono text-violet-400 bg-violet-400/10 
          px-2 py-0.5 rounded-full">
          v{data.version}
        </span>
      </div>

      {/* Description */}
      <div className="px-4 py-3 border-b border-zinc-700/50">
        <p className="text-zinc-300 text-sm leading-relaxed">
          {data.description}
        </p>
      </div>

      {/* Stats row */}
      <div className="px-4 py-3 grid grid-cols-3 gap-3 border-b border-zinc-700/50">
        <div className="text-center">
          <div className="text-zinc-100 font-semibold text-sm">
            {data.weeklyDownloads > 0 
              ? formatDownloads(data.weeklyDownloads) 
              : '—'}
          </div>
          <div className="text-zinc-500 text-xs mt-0.5">weekly dl</div>
        </div>
        <div className="text-center border-x border-zinc-700/50">
          <div className="text-zinc-100 font-semibold text-sm truncate px-1">
            {data.license}
          </div>
          <div className="text-zinc-500 text-xs mt-0.5">license</div>
        </div>
        <div className="text-center">
          <div className="text-zinc-100 font-semibold text-sm truncate px-1">
            {data.author ?? '—'}
          </div>
          <div className="text-zinc-500 text-xs mt-0.5">author</div>
        </div>
      </div>

      {/* Links */}
      {(data.homepage || data.repository) && (
        <div className="px-4 py-2.5 flex gap-3">
          {data.homepage && (
            <a
              href={data.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-violet-400 hover:text-violet-300 
                transition-colors"
            >
              Homepage ↗
            </a>
          )}
          {data.repository && (
            <a
              href={data.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-violet-400 hover:text-violet-300 
                transition-colors"
            >
              Repository ↗
            </a>
          )}
          <a
            href={`https://www.npmjs.com/package/${data.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-500 hover:text-zinc-300 
              transition-colors ml-auto"
          >
            View on npm ↗
          </a>
        </div>
      )}
    </div>
  )
}
