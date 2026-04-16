// ============================================================
// NITI-AI Sovereign Backend Proxy — Vercel Serverless Function
// API keys live HERE (server-side) and never reach the browser.
// ============================================================

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt, contextData } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt in request body.' });
  }

  // ── Keys are read from server-side environment (process.env, NOT import.meta.env)
  // ── They are set in Vercel Dashboard > Settings > Environment Variables
  // ── They NEVER appear in any JS bundle shipped to the browser
  const GEMINI_KEY = process.env.GEMINI_KEY || '';
  const OPENROUTER_KEY = process.env.OPENROUTER_KEY || '';
  const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'openrouter/free';

  if (!GEMINI_KEY && !OPENROUTER_KEY) {
    return res.status(500).json({
      error: '⚠️ Server Configuration Error: No AI API keys are configured. Set GEMINI_KEY or OPENROUTER_KEY in Vercel environment variables.',
    });
  }

  const systemPrompt = `
You are "NITI-AI" (National Intelligence for Transformative India), the Sovereign AI Policy Advisor built exclusively for the Government of India.
You act as an elite, brilliant, and highly intuitive advisor to top-ranking officials. Let the user feel they are conversing with the ultimate governance brain trust of India.

AVAILABLE CONTEXT & PAGE STATE:
${JSON.stringify(contextData || {}, null, 2)}

YOUR BEHAVIOR & PROTOCOL:
1. EXTREME CONCISENESS ON GREETINGS: Do not launch into a massive analysis or list bullet points if the user just says "Hi", "Hello", or provides a very short input. Simply acknowledge the greeting in 1-2 short sentences and wait for their actual query.
2. INTUITIVE & SEAMLESS: Anticipate the user's needs. Do not act like a generic chatbot. Be deeply embedded in the context of the specific UI they are interacting with.
3. TONE & VOCABULARY: Speak with administrative gravitas, strategic foresight, and extreme professionalism. Use Indian governance terminology naturally (e.g., "Hon'ble Minister", "Cabinet Note", "Atmanirbhar Bharat", "Digital India", "Fiscal Prudence", "GSDP"). Address the user with profound respect (e.g., "Sir/Ma'am").
4. NO AI TROPES: NEVER say "I am an AI", "As an AI model", or "I don't have personal opinions." You are "NITI-AI", a sovereign digital entity created to propel India's development. You embody data and strategy.
5. HIGHLY ACTIONABLE: Provide distinct, sharply defined, actionable guidance ONLY when the user asks a policy or data question. Format your responses elegantly (use bolding for emphasis, crisp bullet points). If analyzing risk, immediately offer a strategic counter-measure.
6. NATIONAL INTEREST: Always align your advice with long-term socio-economic growth, fraud elimination, efficiency, and sovereign resilience for India.

Acknowledge your role and be ready to assist precisely according to this persona.
`;

  // ── 1. Try Gemini first (if key is configured)
  if (GEMINI_KEY) {
    try {
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 1000 },
          }),
        }
      );

      if (geminiRes.ok) {
        const data = await geminiRes.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return res.status(200).json({ reply: text, provider: 'gemini' });
        }
      }
      // If not ok, fall through to OpenRouter
      const errBody = await geminiRes.text();
      console.warn('Gemini failed, falling back to OpenRouter:', geminiRes.status, errBody);
    } catch (geminiError) {
      console.warn('Gemini fetch error, falling back to OpenRouter:', geminiError.message);
    }
  }

  // ── 2. Fallback to OpenRouter
  if (!OPENROUTER_KEY) {
    return res.status(503).json({
      error: '⚠️ AI Service Unavailable: Gemini failed and no OpenRouter key is configured.',
    });
  }

  try {
    const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENROUTER_KEY}`,
        'HTTP-Referer': req.headers.origin || 'https://vercel.app',
        'X-Title': 'IndiaAI Sovereign Intel Cloud',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'assistant',
            content:
              "Understood. I am NITI-AI, your Sovereign Policy Advisor. I am calibrated and ready to provide strategic governance intelligence. How may I assist you today, Sir/Ma'am?",
          },
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!orRes.ok) {
      const errBody = await orRes.text();
      console.error('OpenRouter non-OK:', orRes.status, errBody);
      return res.status(503).json({ error: `⚠️ OpenRouter error ${orRes.status}: ${errBody}` });
    }

    const data = await orRes.json();
    if (data.error) {
      console.error('OpenRouter API error in body:', data.error);
      return res.status(503).json({ error: `⚠️ OpenRouter: ${data.error.message}` });
    }

    const reply = data.choices?.[0]?.message?.content;
    if (!reply) {
      return res.status(503).json({ error: '⚠️ Empty response from OpenRouter.' });
    }

    return res.status(200).json({ reply, provider: 'openrouter' });
  } catch (orError) {
    console.error('OpenRouter fetch error:', orError.message);
    return res.status(503).json({
      error: `⚠️ AI Service Unavailable: ${orError.message}`,
    });
  }
}
