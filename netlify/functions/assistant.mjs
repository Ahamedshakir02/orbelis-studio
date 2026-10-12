/**
 * Netlify Function: serves the assistant at /api/assistant.
 * Set ANTHROPIC_API_KEY and SITE_ORIGIN in the site's environment variables.
 */
import { handleAssistant } from '../../server/orbelis.js'

export default (request) => handleAssistant(request, process.env)

export const config = { path: '/api/assistant' }
