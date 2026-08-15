/**
 * Central AI configuration module.
 * All model settings live here — change once, affects everywhere.
 * FE-07 will extend this file directly.
 */
import { google } from '@ai-sdk/google'

// Model — gemini-1.5-flash is free tier, fast, and capable for chat
export const DEFAULT_MODEL = google('gemini-1.5-flash')

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
