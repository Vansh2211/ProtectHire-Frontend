'use server';
/**
 * @fileOverview A flow for generating a professional bio for a security guard.
 *
 * - generateBio - A function that generates a bio based on experience and skills.
 * - GenerateBioInput - The input type for the generateBio function.
 */
import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';

const GenerateBioInputSchema = z.object({
  experience: z.number().describe('The number of years of experience the guard has.'),
  skills: z.array(z.string()).describe('A list of skills or certifications the guard has.'),
});

export type GenerateBioInput = z.infer<typeof GenerateBioInputSchema>;

const generateBioPrompt = ai.definePrompt({
    name: 'generateBioPrompt',
    input: { schema: GenerateBioInputSchema },
    model: googleAI('gemini-1.5-flash-latest'),
    prompt: `You are an expert at writing professional, concise, and compelling bios for security professionals.
    
    A security guard needs a bio for their profile on a hiring platform called "GetSecure".

    Generate a short bio (2-3 sentences, maximum 500 characters) for a security guard with the following attributes:
    - Experience: {{experience}} years
    - Skills/Certifications: {{#if skills}}{{#each skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}Not specified{{/if}}

    The tone should be professional, confident, and trustworthy. Highlight their experience and key skills to attract potential clients.
    Do not use markdown or any special formatting. Just return the plain text of the bio.
    `,
});

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


export async function generateBio(input: GenerateBioInput): Promise<string> {
    return generateBioFlow(input);
}
