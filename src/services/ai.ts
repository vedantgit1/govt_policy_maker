// ============================================================
// NITI-AI Frontend Service
// This file NO LONGER holds any API keys.
// All AI calls are proxied through /api/ask-ai (server-side).
// API keys live in Vercel environment variables, never here.
// ============================================================

export const askIndiaAI = async (prompt: string, contextData: any): Promise<string> => {
  try {
    const response = await fetch('/api/ask-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, contextData }),
    });

    const data = await response.json();

    // Server returned an error message
    if (!response.ok || data.error) {
      console.error('NITI-AI proxy error:', data.error);
      return data.error || '⚠️ AI Service Unavailable. Please try again later.';
    }

    return data.reply || '⚠️ Received an empty response from the AI service.';
  } catch (networkError: any) {
    console.error('NITI-AI network error:', networkError);
    return `⚠️ Network Error: Unable to reach the NITI-AI service. ${networkError.message}`;
  }
};
