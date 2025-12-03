"use client";

import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { useGSAP } from '@gsap/react';
import { useAnimation } from './AnimationContext';
import { presets, CustomAnimation } from './animationPresets';

export interface AnimationItemProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  duration?: number;
  ease?: string;
  stagger?: number;
  splitTarget?: string;
  variant?: keyof typeof presets;
  custom?: CustomAnimation;
}

export const AnimationItem = forwardRef<HTMLElement, AnimationItemProps>(({
  as: Component = 'div',
  children,
  className,
  custom,
  ...rest
}, ref) => {
  const internalRef = useRef<HTMLElement>(null);
  useImperativeHandle(ref, () => internalRef.current!, []);

  const { register } = useAnimation();

  useGSAP(() => {
    if (internalRef.current) {
      register(internalRef.current, custom);
    }
  }, { scope: internalRef, dependencies: [register, custom] });

  const dataAttributes = Object.entries(rest).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      const kebabKey = `data-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      acc[kebabKey] = value;
    }
    return acc;
  }, {} as Record<string, any>);

  return (
    <Component ref={internalRef} className={className} {...dataAttributes}>
      {children}
    </Component>
  );
});

AnimationItem.displayName = 'AnimationItem';
