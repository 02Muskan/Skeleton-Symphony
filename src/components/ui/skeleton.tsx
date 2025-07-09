'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAnimation } from '@/contexts/animation-context';
import type { AnimationStyle } from '@/contexts/animation-context';
import React from 'react';

const animationVariants: Record<AnimationStyle, { animate: any; transition: any }> = {
  subtle: {
    animate: { scale: [1, 1.05, 1], opacity: [1, 0.7, 1] },
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
  playful: {
    animate: { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] },
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  },
  dramatic: {
    animate: {
      scale: [1, 1.1, 1],
      boxShadow: [
        '0px 0px 0px hsl(var(--primary) / 0.5)',
        '0px 0px 20px hsl(var(--primary) / 0.7)',
        '0px 0px 0px hsl(var(--primary) / 0.5)',
      ],
    },
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
  energetic: {
    animate: {
      scale: [1, 1.15, 1],
      opacity: [1, 0.8, 1],
      backgroundColor: [
        'hsl(var(--primary))',
        'hsl(var(--accent))',
        'hsl(var(--primary))',
      ],
    },
    transition: { duration: 1, repeat: Infinity, ease: 'linear' },
  },
  none: {
    animate: {},
    transition: { duration: 0 },
  },
};

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { style } = useAnimation();

  const selectedAnimation = animationVariants[style];

  return (
    <motion.div
      className={cn('rounded-md bg-muted', className)}
      animate={selectedAnimation.animate}
      transition={selectedAnimation.transition}
      {...props}
    />
  );
}

export { Skeleton };
