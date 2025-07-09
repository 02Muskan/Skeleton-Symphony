'use client';

import React, { createContext, useContext, useState } from 'react';

export type AnimationStyle = 'subtle' | 'playful' | 'dramatic' | 'energetic' | 'none';

interface AnimationContextType {
  style: AnimationStyle;
  setStyle: React.Dispatch<React.SetStateAction<AnimationStyle>>;
}

export const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [style, setStyle] = useState<AnimationStyle>('subtle');

  return (
    <AnimationContext.Provider value={{ style, setStyle }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}
