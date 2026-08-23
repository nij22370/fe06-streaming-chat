# FE-06: Streaming Chat Interface

Production-quality streaming chat built with Next.js 14, Vercel AI SDK,
and OpenRouter.

## Features
- Token-by-token streaming via AI SDK streamText
- Thinking indicator before first token arrives
- Stop button that preserves partial response and re-enables input
- Smart auto-scroll — releases when user scrolls up, jump button appears
- Multi-turn conversation state
- API key lives server-side only (never exposed to client)
- Mobile-friendly responsive layout

## Stack
- Next.js 14 (App Router)
- Vercel AI SDK (streamText + useChat)
- OpenRouter (openai/gpt-4o-mini) via @openrouter/ai-sdk-provider
- Tailwind CSS

## Run locally
cp .env.example .env.local
# Add your OPENROUTER_API_KEY to .env.local
npm install
npm run dev

## Architecture
- src/lib/ai-config.ts — model config (single source of truth)
- src/app/api/chat/route.ts — server route, API key never reaches client
- src/hooks/useStreamingChat.ts — chat state + auto-scroll logic
- src/components/ — ChatMessage, ThinkingIndicator, StopButton
- src/app/chat/page.tsx — main chat UI

## Historical note
This project previously used Google Gemini via @ai-sdk/google
(GOOGLE_GENERATIVE_AI_API_KEY) and has since been migrated to OpenRouter.

## Tool Contract

### getNpmPackageInfo
Fetches metadata about an npm package from the registry.

**Trigger:** User asks about any npm package, library, or dependency.
Examples: "tell me about zustand", "what version is react?", 
"how popular is axios?"

**Input schema:**
- packageName: string — exact npm package name

**Return shape:**
- name: string
- version: string  
- description: string
- weeklyDownloads: number
- license: string
- homepage: string | null
- author: string | null
- repository: string | null

**Tool states rendered:**
1. partial-call → spinning indicator "Looking up npm package..."
2. call → spinning indicator with package name "Fetching [name] from npm..."
3. result (success) → NpmPackageCard component
4. result (error) → ToolOutputError component with red error card

**Error state:** Triggered when package name doesn't exist on npm registry.
Test with: "tell me about sandeshfakepackage999"
