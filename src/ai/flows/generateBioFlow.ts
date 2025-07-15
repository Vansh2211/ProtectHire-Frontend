
'use server';
/**
 * @fileOverview A flow for generating a professional bio for a security guard.
 * 
 * - generateBio - A function that takes a guard's experience and skills and returns a generated bio.
 * - GenerateBioInput - The input type for the generateBio function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { generate } from 'genkit/generate';

const GenerateBioInputSchema = z.object({
  experience: z.number().describe('The number of years of experience the guard has.'),
  skills: z.array(z.string()).describe('A list of skills the guard possesses.'),
});
export type GenerateBioInput = z.infer<typeof GenerateBioInputSchema>;

export async function generateBio(input: GenerateBioInput): Promise<string> {
  return generateBioFlow(input);
}

const generateBioPrompt = ai.definePrompt(
  {
    name: 'generateBioPrompt',
    input: { schema: GenerateBioInputSchema },
    output: { format: 'text' },
    model: 'googleai/gemini-1.5-flash-latest',
    prompt: `You are an expert at writing professional biographies for security personnel profiles.
    
    Based on the following information, write a compelling, professional, and concise bio (around 2-3 sentences, maximum 450 characters) for a security guard.
    
    Highlight their experience and key skills. Use a confident and reassuring tone.
    
    - Years of Experience: {{{experience}}}
    - Skills: {{#each skills}}- {{{this}}}{{/each}}
    
    Do not use markdown. Return only the text of the bio.
    `,
  },
);

const generateBioFlow = ai.defineFlow(
  {
    name: 'generateBioFlow',
    inputSchema: GenerateBioInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const response = await generateBioPrompt(input);
    return response.text ?? "A dedicated and professional security expert with valuable experience.";
  }
);
