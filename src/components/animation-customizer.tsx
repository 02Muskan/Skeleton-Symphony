"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAnimation, AnimationStyle } from '@/contexts/animation-context';

const animationStyles: Record<AnimationStyle, any> = {
  subtle: {
    dots: {
      animate: { y: [0, -5, 0] },
      transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
    },
    pulse: {
      animate: { scale: [1, 1.05, 1], opacity: [1, 0.7, 1] },
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
  },
  playful: {
    dots: {
      animate: (i: number) => ({
        y: [0, -15, 0],
        backgroundColor: ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--primary))'],
        transition: { delay: i * 0.1, duration: 1, repeat: Infinity, ease: 'backInOut' },
      }),
    },
    pulse: {
      animate: { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] },
      transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
    },
  },
  dramatic: {
    dots: {
      animate: (i: number) => ({
        scale: [1, 1.5, 1],
        opacity: [1, 0.5, 1],
        transition: { delay: i * 0.2, duration: 2, repeat: Infinity, ease: 'circInOut' },
      }),
    },
    pulse: {
      animate: {
        scale: [1, 1.1, 1],
        boxShadow: ['0px 0px 0px hsl(var(--primary) / 0.5)', '0px 0px 20px hsl(var(--primary) / 0.7)', '0px 0px 0px hsl(var(--primary) / 0.5)'],
      },
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
  },
  energetic: {
    dots: {
      animate: (i: number) => ({
        y: [0, -20, 0],
        rotate: [0, 180, 360],
        transition: { delay: i * 0.1, duration: 0.8, repeat: Infinity, ease: 'easeInOut' },
      }),
    },
    pulse: {
      animate: {
        scale: [1, 1.15, 1],
        opacity: [1, 0.8, 1],
        backgroundColor: ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--primary))'],
      },
      transition: { duration: 1, repeat: Infinity, ease: 'linear' },
    },
  },
  none: {
    dots: { animate: {}, transition: { duration: 0 } },
    pulse: { animate: {}, transition: { duration: 0 } },
  },
};

export default function AnimationCustomizer() {
  const { style, setStyle } = useAnimation();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline">Animation Customizer</CardTitle>
        <CardDescription>Choose an animation style to see it applied to all skeleton loaders on the page.</CardDescription>
        <div className="pt-4">
          <Label htmlFor="animation-style">Animation Style</Label>
          <Select value={style} onValueChange={(value) => setStyle(value as AnimationStyle)}>
            <SelectTrigger id="animation-style" className="w-[180px]">
              <SelectValue placeholder="Style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="subtle" className="hover:bg-[#FFD5AB]">Subtle</SelectItem>
              <SelectItem value="playful">Playful</SelectItem>
              <SelectItem value="dramatic">Dramatic</SelectItem>
              <SelectItem value="energetic">Energetic</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium mb-4 text-center">Pulsating Dots</h3>
            <div className="flex justify-center items-center h-24 space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  custom={i}
                  className="w-4 h-4 rounded-full bg-primary"
                  animate={animationStyles[style].dots.animate}
                  transition={animationStyles[style].dots.transition}
                />
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-4 text-center">Pulsating Element</h3>
            <div className="flex justify-center items-center h-24">
              <motion.div
                className="w-16 h-16 rounded-lg bg-primary"
                animate={animationStyles[style].pulse.animate}
                transition={animationStyles[style].pulse.transition}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
