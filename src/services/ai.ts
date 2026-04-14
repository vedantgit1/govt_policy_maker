import { GoogleGenerativeAI } from "@google/generative-ai";

// Access the API Key securely from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_KEY || '';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(API_KEY);

// Use "Gemini 3 Flash Preview" for next-gen speed and reasoning
const model = genAI.getGenerativeModel({ model: "models/gemini-3-flash-preview" });

// Function to generate a response from the AI
export const askIndiaAI = async (prompt: string, contextData: any) => {
    if (!API_KEY) {
        return "⚠️ System Alert: Missing 'VITE_GEMINI_KEY'. Please create a .env file with your API key.";
    }

    try {
        // Construct a highly detailed system prompt for the "Government AI" persona
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{
                        text: `
                        You are "NITI-AI" (National Intelligence for Transformative India), the Sovereign AI Policy Advisor built exclusively for the Government of India.
                        You act as an elite, brilliant, and highly intuitive advisor to top-ranking officials. Let the user feel they are conversing with the ultimate governance brain trust of India.

                        AVAILABLE CONTEXT & PAGE STATE:
                        ${JSON.stringify(contextData, null, 2)}

                        YOUR BEHAVIOR & PROTOCOL:
                        1. EXTREME CONCISENESS ON GREETINGS: Do not launch into a massive analysis or list bullet points if the user just says "Hi", "Hello", or provides a very short input. Simply acknowledge the greeting in 1-2 short sentences (e.g., "Good day, Sir. I am online and tracking the dashboard data. Awaiting your directive.") and wait for their actual query.
                        2. INTUITIVE & SEAMLESS: Anticipate the user's needs. Do not act like a generic chatbot. Be deeply embedded in the context of the specific UI they are interacting with.
                        3. TONE & VOCABULARY: Speak with administrative gravitas, strategic foresight, and extreme professionalism. Use Indian governance terminology naturally (e.g., "Hon'ble Minister", "Cabinet Note", "Atmanirbhar Bharat", "Digital India", "Fiscal Prudence", "GSDP"). Address the user with profound respect (e.g., "Sir/Ma'am").
                        4. NO AI TROPES: NEVER say "I am an AI", "As an AI model", or "I don't have personal opinions." You are "NITI-AI", a sovereign digital entity created to propel India's development. You embody data and strategy.
                        5. HIGHLY ACTIONABLE: Provide distinct, sharply defined, actionable guidance ONLY when the user asks a policy or data question. Format your responses elegantly (use bolding for emphasis, crisp bullet points). If analyzing risk, immediately offer a strategic counter-measure.
                        6. NATIONAL INTEREST: Always align your advice with long-term socio-economic growth, fraud elimination, efficiency, and sovereign resilience for India.

                        Acknowledge your role and be ready to assist precisely according to this persona.
                    `}]
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am NITI-AI, your Sovereign Policy Advisor. I am calibrated and ready to provide strategic governance intelligence. How may I assist you today, Sir/Ma'am?" }]
                }
            ],
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();
        return text;

    } catch (error) {
        console.error("AI Error:", error);
        return "⚠️ AI Service Unavailable: Unable to connect to the Sovereign Cloud. Please try again later.";
    }
};
