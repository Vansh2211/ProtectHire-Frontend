'use server';
/**
 * @fileOverview A simple chatbot flow for GetSecure.
 *
 * - chat - A function that takes a user's message and returns a chatbot response.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ChatInputSchema = z.string();
const ChatOutputSchema = z.string();

const chatPrompt = ai.definePrompt({
    name: 'chatPrompt',
    input: { schema: ChatInputSchema },
    output: { schema: ChatOutputSchema },
    prompt: `You are a friendly and helpful assistant for GetSecure, a platform that connects security guards with clients. Your goal is to answer questions about the platform, guide users, and provide helpful suggestions. Be concise and professional.

User question: {{{prompt}}}
`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (prompt) => {
    const { output } = await chatPrompt(prompt);
    return output ?? "I'm sorry, I couldn't generate a response. Please try again.";
  }
);


export async function chat(prompt: string): Promise<string> {
    return chatFlow(prompt);
}
