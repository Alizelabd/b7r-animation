"use client";

import { createContext, useContext } from 'react';
import { CustomAnimation } from './animationPresets';

export interface AnimationContextState {
  config: {
    once: boolean;
    debug: boolean;
    start: string;
  };
  register: (element: HTMLElement, customAnimation?: CustomAnimation) => void;
}

export const AnimationContext = createContext<AnimationContextState | null>(null);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimateOnScroll provider');
  }
  return context;
};
