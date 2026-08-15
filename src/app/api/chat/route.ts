import { streamText } from 'ai'
import { DEFAULT_MODEL, SYSTEM_PROMPT, GENERATION_CONFIG } from '@/lib/ai-config'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = await streamText({
    model: DEFAULT_MODEL,
    system: SYSTEM_PROMPT,
    messages,
    maxTokens: GENERATION_CONFIG.maxTokens,
    temperature: GENERATION_CONFIG.temperature,
  })

  return result.toDataStreamResponse()
}
