import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center 
      bg-zinc-950 text-white p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center 
          justify-center text-white font-bold text-2xl mx-auto mb-6">
          AI
        </div>
        <h1 className="text-3xl font-bold mb-3">FE-06: Streaming Chat</h1>
        <p className="text-zinc-400 mb-8 text-sm leading-relaxed">
          A production-quality streaming chat interface built with 
          Next.js 14, Vercel AI SDK, and OpenRouter.
        </p>
        <Link
          href="/chat"
          className="px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 
            transition-colors text-white font-medium inline-block"
        >
          Open Chat →
        </Link>
      </div>
    </main>
  )
}
