/**
 * Cloudflare Pages Function: serves the assistant at /api/assistant.
 * Set ANTHROPIC_API_KEY (secret) and SITE_ORIGIN in the Pages project settings.
 */
import { handleAssistant } from '../../server/orbelis.js'

export const onRequest = ({ request, env }) => handleAssistant(request, env)
