'use server';
/**
 * @fileOverview An AI agent for generating React components and their skeletons.
 *
 * - generateComponent - A function that handles the component generation process.
 * - GenerateComponentInput - The input type for the generateComponent function.
 * - GenerateComponentOutput - The return type for the generateComponent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GenerateComponentInputSchema = z.object({
  description: z.string().describe('A detailed description of the UI component to generate.'),
});
export type GenerateComponentInput = z.infer<typeof GenerateComponentInputSchema>;

export const GenerateComponentOutputSchema = z.object({
  componentCode: z.string().describe('The full TypeScript code for the React component.'),
  skeletonCode: z.string().describe('The full TypeScript code for the corresponding skeleton component.'),
});
export type GenerateComponentOutput = z.infer<typeof GenerateComponentOutputSchema>;

export async function generateComponent(input: GenerateComponentInput): Promise<GenerateComponentOutput> {
  return generateComponentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateComponentPrompt',
  input: {schema: GenerateComponentInputSchema},
  output: {schema: GenerateComponentOutputSchema},
  prompt: `You are an expert Next.js and React developer specializing in creating beautiful and functional UI components with shadcn/ui and Tailwind CSS.

Your task is to generate two pieces of code based on the user's description:
1.  A React component written in TypeScript.
2.  A corresponding skeleton loading component for that component.

**Component Generation Rules:**
-   Use Next.js App Router conventions (e.g., 'use client' if necessary).
-   Use functional components and hooks.
-   Utilize shadcn/ui components from '@/components/ui/...' where appropriate (e.g., Card, Button, Input).
-   Use Tailwind CSS for styling.
-   For icons, use 'lucide-react'.
-   For images, use the 'next/image' component and 'https://placehold.co' for placeholder URLs. Add a 'data-ai-hint' attribute to images.
-   Do NOT include any import statements for React itself (e.g., 'import React from "react"').

**Skeleton Component Generation Rules:**
-   The skeleton should mimic the layout and structure of the main component.
-   Use the '<Skeleton />' component from '@/components/ui/skeleton'.
-   The skeleton component should be a stateless functional component.
-   Do NOT include any import statements for React itself.

**Input Description:**
"{{{description}}}"

Generate the code and provide it in the specified JSON output format. Only provide the code, no explanations or markdown backticks.
`,
});

const generateComponentFlow = ai.defineFlow(
  {
    name: 'generateComponentFlow',
    inputSchema: GenerateComponentInputSchema,
    outputSchema: GenerateComponentOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
