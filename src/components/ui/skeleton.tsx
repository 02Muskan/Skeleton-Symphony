'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AnimationContext } from '@/contexts/animation-context';
import type { AnimationStyle } from '@/contexts/animation-context';
import React from 'react';

const animationVariants: Record<AnimationStyle, any> = {
  subtle: {
    opacity: [0.7, 1, 0.7],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
  playful: {
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.01, 1],
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  },
  dramatic: {
    opacity: [0.4, 1, 0.4],
    transition: { duration: 1.2, repeat: Infinity, ease: 'circInOut' },
  },
  energetic: {
    opacity: [0.3, 1, 0.3],
    scale: [1, 1.02, 1],
    transition: { duration: 0.8, repeat: Infinity, ease: 'linear' },
  },
  none: {},
};

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const animationContext = React.useContext(AnimationContext);
  const style = animationContext ? animationContext.style : 'subtle';
  
  return (
    <motion.div
      className={cn('rounded-md bg-muted', className)}
      animate={animationVariants[style]}
      {...props}
    />
  )
}

export { Skeleton }
