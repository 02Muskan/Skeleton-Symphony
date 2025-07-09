"use client";

import React from 'react';
import CardSkeleton from '@/components/skeletons/card-skeleton';
import TableSkeleton from '@/components/skeletons/table-skeleton';
import { PerformancePanel } from '@/components/performance-panel';
import Header from '@/components/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimationCustomizer from '@/components/animation-customizer';
import { Separator } from '@/components/ui/separator';
import LayoutBuilder from '@/components/layout-builder';

const LazySampleCard = React.lazy(() => import('@/components/content/sample-card'));
const LazySampleTable = React.lazy(() => import('@/components/content/sample-table'));

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="container mx-auto px-4 md:px-8 pb-16">

        <section className="mb-12">
            <AnimationCustomizer />
        </section>

        <Separator className="my-12" />

        <section className="mb-12">
            <LayoutBuilder />
        </section>

        <Separator className="my-12" />

        <h2 className="text-3xl font-bold text-center mb-8 font-headline">Performance Comparison</h2>

        <Tabs defaultValue="card" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto">
            <TabsTrigger value="card">Card Component</TabsTrigger>
            <TabsTrigger value="table">Table Component</TabsTrigger>
          </TabsList>
          
          <TabsContent value="card" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <PerformancePanel
                title="With Skeleton"
                description="The UI feels responsive immediately, showing a placeholder while content loads."
                useSkeleton={true}
                SkeletonComponent={CardSkeleton}
              >
                <LazySampleCard />
              </PerformancePanel>
              
              <PerformancePanel
                title="Without Skeleton"
                description="The UI shows a generic spinner. The user waits for content with no context."
                useSkeleton={false}
                SkeletonComponent={CardSkeleton}
              >
                <LazySampleCard />
              </PerformancePanel>
            </div>
          </TabsContent>

          <TabsContent value="table" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <PerformancePanel
                title="With Skeleton"
                description="The table structure is visible instantly, preparing the user for the data."
                useSkeleton={true}
                SkeletonComponent={TableSkeleton}
              >
                <LazySampleTable />
              </PerformancePanel>
              
              <PerformancePanel
                title="Without Skeleton"
                description="A blank space or a spinner is shown, which can be disorienting for table data."
                useSkeleton={false}
                SkeletonComponent={TableSkeleton}
              >
                <LazySampleTable />
              </PerformancePanel>
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </main>
  );
}
