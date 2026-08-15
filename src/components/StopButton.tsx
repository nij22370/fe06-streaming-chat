interface StopButtonProps {
  onStop: () => void
}

export function StopButton({ onStop }: StopButtonProps) {
  return (
    <button
      onClick={onStop}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-700 
        hover:bg-zinc-600 text-zinc-200 text-sm transition-colors border border-zinc-600"
      aria-label="Stop generating"
    >
      <span className="w-3 h-3 rounded-sm bg-zinc-200 flex-shrink-0" />
      Stop generating
    </button>
  )
}
