import { createGoogle } from '@ai-sdk/google';

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!apiKey) {
    console.error('GOOGLE_GENERATIVE_AI_API_KEY is not set in the environment variables.');
}

export const google = createGoogle({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
});