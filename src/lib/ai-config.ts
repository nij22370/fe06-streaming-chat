/**
 * Central AI configuration module.
 * All model settings live here — change once, affects everywhere.
 * FE-07 will extend this file directly.
 */
import { createOpenRouter } from '@openrouter/ai-sdk-provider'

// OpenRouter provider — API key read from OPENROUTER_API_KEY env var (server-side only)
export const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
  compatibility: 'strict',
})

// Model — openai/gpt-4o-mini is a fast, capable, affordable chat model
export const DEFAULT_MODEL = openrouter('openai/gpt-4o-mini')

// System prompt — defines assistant behavior
export const SYSTEM_PROMPT = `You are a helpful AI assistant built by Sandesh Dhakal
as part of a Frontend AI Engineering capstone project.
You are knowledgeable, concise, and friendly.
You specialize in frontend development, React, Next.js, TypeScript, and general 
coding questions. Keep responses focused and practical.`

// Generation config
export const GENERATION_CONFIG = {
  maxTokens: 1000,
  temperature: 0.7,
}
