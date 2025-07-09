"use client";

import React, { useState, Suspense, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useAnimation } from '@/contexts/animation-context';

interface PerformancePanelProps {
  title: string;
  description: string;
  useSkeleton: boolean;
  SkeletonComponent: React.ComponentType;
  children: React.ReactNode;
}

export function PerformancePanel({
  title,
  description,
  useSkeleton,
  SkeletonComponent,
  children,
}: PerformancePanelProps) {
  const [isPending, startTransition] = useTransition();
  const [showContent, setShowContent] = useState(false);
  const [loadTime, setLoadTime] = useState<number | null>(null);

  // By consuming the context here, we ensure this component re-renders when the style changes.
  useAnimation();

  const handleLoad = () => {
    const startTime = performance.now();
    startTransition(() => {
      // Simulate network delay
      setTimeout(() => {
        const endTime = performance.now();
        setLoadTime(endTime - startTime);
        setShowContent(true);
      }, 1500); // 1.5 second delay
    });
  };

  const handleReset = () => {
    setShowContent(false);
    setLoadTime(null);
  };

  const fallback = useSkeleton ? <SkeletonComponent /> : (
    <div className="flex items-center justify-center h-full min-h-[300px]">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="min-h-[300px] border-2 border-dashed rounded-lg p-4 flex items-center justify-center bg-background/50">
          <Suspense fallback={fallback}>
            {showContent ? children : (isPending ? fallback : <div className="text-center text-muted-foreground">Click "Load Content" to start</div>)}
          </Suspense>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4">
        <div className="flex space-x-2">
            <Button onClick={handleLoad} disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Load Content
            </Button>
            <Button variant="outline" onClick={handleReset} disabled={isPending || !showContent}>
                Reset
            </Button>
        </div>
        {loadTime !== null && (
          <div className="text-sm text-muted-foreground p-2 rounded-md bg-muted w-full">
            <p>
              Simulated Load Time: <span className="font-bold text-foreground">{loadTime.toFixed(0)}ms</span>
            </p>
            <p>
              Perceived Experience: {useSkeleton ? 
              <span className="text-green-600 font-medium"> smoother, feels faster</span> : 
              <span className="text-red-600 font-medium"> abrupt, feels slower</span>}
            </p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
