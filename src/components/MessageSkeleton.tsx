export function MessageSkeleton() {
  return (
    <div className="flex justify-start mb-4 animate-pulse">
      <div className="w-7 h-7 rounded-full bg-zinc-700 mr-2 
        mt-1 flex-shrink-0" />
      <div className="space-y-2 max-w-[80%] w-full">
        <div className="h-3 bg-zinc-800 rounded-full w-3/4" />
        <div className="h-3 bg-zinc-800 rounded-full w-full" />
        <div className="h-3 bg-zinc-800 rounded-full w-2/3" />
      </div>
    </div>
  )
}
