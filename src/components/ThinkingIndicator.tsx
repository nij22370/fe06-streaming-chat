export function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 w-fit max-w-[80%] 
      rounded-2xl rounded-tl-sm bg-zinc-800 text-zinc-400">
      <span className="text-sm mr-1">Thinking</span>
      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce 
        [animation-delay:0ms]" />
      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce 
        [animation-delay:150ms]" />
      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce 
        [animation-delay:300ms]" />
    </div>
  )
}
