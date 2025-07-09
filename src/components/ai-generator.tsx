'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Bot, Code, LayoutTemplate, Loader2, Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { generateComponent, GenerateComponentOutput } from '@/ai/flows/generate-component-flow';

const formSchema = z.object({
  description: z.string().min(10, {
    message: 'Please provide a more detailed description.',
  }),
});

export default function AIGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<GenerateComponentOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedCode(null);
    try {
      const result = await generateComponent(values);
      setGeneratedCode(result);
    } catch (error) {
      console.error('Error generating component:', error);
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description: 'There was a problem with the AI generator. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-3">
            <Wand2 className="w-8 h-8 text-primary" />
            <div>
                <CardTitle className="font-headline">Generate with AI</CardTitle>
                <CardDescription>Describe a UI component, and let AI build it for you.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Component Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., A user profile card with an avatar, name, username, and a follow button."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Bot />
                  Generate Component
                </>
              )}
            </Button>
          </form>
        </Form>

        {isLoading && (
            <div className="mt-8 text-center p-8 border-2 border-dashed rounded-lg">
                <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">The AI is thinking... Please wait a moment.</p>
            </div>
        )}

        {generatedCode && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 font-headline">Generated Code</h3>
            <Tabs defaultValue="component" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="component">
                  <Code className="mr-2" /> Component
                </TabsTrigger>
                <TabsTrigger value="skeleton">
                   <LayoutTemplate className="mr-2" /> Skeleton
                </TabsTrigger>
              </TabsList>
              <TabsContent value="component" className="mt-4">
                <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '0.5rem' }}>
                  {generatedCode.componentCode}
                </SyntaxHighlighter>
              </TabsContent>
              <TabsContent value="skeleton" className="mt-4">
                 <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '0.5rem' }}>
                  {generatedCode.skeletonCode}
                </SyntaxHighlighter>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
