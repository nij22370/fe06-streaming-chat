import { streamText } from 'ai'
import { DEFAULT_MODEL, SYSTEM_PROMPT, GENERATION_CONFIG } from '@/lib/ai-config'
import { getNpmPackageInfo } from '@/tools/npmPackage'

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = await streamText({
    model: DEFAULT_MODEL,
    system: SYSTEM_PROMPT + `

You have access to a tool called getNpmPackageInfo.
Use it automatically whenever the user asks about any npm package, 
library, or dependency — even casually (e.g. "tell me about zustand", 
"what version is react on?", "how popular is axios?").
After the tool result, add a brief comment about the package.`,
    messages,
    maxTokens: GENERATION_CONFIG.maxTokens,
    temperature: GENERATION_CONFIG.temperature,
    tools: {
      getNpmPackageInfo,
    },
    maxSteps: 3,
  })

  return result.toDataStreamResponse()
}
