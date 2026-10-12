/**
 * Vercel Function: serves the assistant at /api/assistant.
 * Set ANTHROPIC_API_KEY and SITE_ORIGIN in the project's environment variables.
 */
import { handleAssistant } from '../server/orbelis.js'

export const POST = (request) => handleAssistant(request, process.env)
export const OPTIONS = POST
