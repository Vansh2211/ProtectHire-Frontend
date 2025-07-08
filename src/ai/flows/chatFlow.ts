'use server';
/**
 * @fileOverview A simple chatbot flow for GetSecure.
 *
 * - chat - A function that takes a user's message and returns a chatbot response.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ChatInputSchema = z.object({
  message: z.string().describe("The user's message to the chatbot."),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.string().describe("The chatbot's response.");
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

const systemPrompt = `You are a friendly and helpful assistant for GetSecure, a platform that connects security guards with clients. Your goal is to answer questions about the platform, guide users, and provide helpful suggestions. Be concise and professional.`;

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const llmResponse = await ai.generate({
      model: 'googleai/gemini-1.5-flash-latest',
      prompt: input.message,
      system: systemPrompt,
    });
    
    return llmResponse.text ?? "I'm sorry, I couldn't generate a response. Please try again.";
  }
);


export async function chat(prompt: string): Promise<string> {
    return chatFlow({ message: prompt });
}
