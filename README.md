# FE-06: Streaming Chat Interface

Production-quality streaming chat built with Next.js 14, Vercel AI SDK, 
and Google Gemini (free tier).

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
- Google Gemini 1.5 Flash via @ai-sdk/google
- Tailwind CSS

## Run locally
cp .env.example .env.local
# Add your GOOGLE_GENERATIVE_AI_API_KEY to .env.local
npm install
npm run dev

## Architecture
- src/lib/ai-config.ts — model config (single source of truth)
- src/app/api/chat/route.ts — server route, API key never reaches client
- src/hooks/useStreamingChat.ts — chat state + auto-scroll logic
- src/components/ — ChatMessage, ThinkingIndicator, StopButton
- src/app/chat/page.tsx — main chat UI
