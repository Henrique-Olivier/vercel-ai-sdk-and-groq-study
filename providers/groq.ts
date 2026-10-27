import { createGroq } from "@ai-sdk/groq";

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
    console.error('GROQ_API_KEY is not set in the environment variables.');
}

export const groqInstance = createGroq({
    apiKey: process.env.GROQ_API_KEY,
});