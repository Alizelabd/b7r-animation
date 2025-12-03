"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { AnimationItem, AnimationVariant } from './AnimationItem';
import gsap from 'gsap';

const getSplitText = (() => {
  let instance: any = null;
  return async () => {
    if (instance) return instance;
    const { SplitText } = await import('gsap/SplitText');
    gsap.registerPlugin(SplitText);
    instance = SplitText;
    return instance;
  };
})();

type TextAnimationType = 'chars' | 'words' | 'lines';

interface AnimateTextProps {
  children: string;
  as?: React.ElementType;
  className?: string;
  type?: TextAnimationType;
  variant?: AnimationVariant;
  stagger?: number;
  duration?: number;
  ease?: string;
}

export const AnimateText: React.FC<AnimateTextProps> = ({
  children,
  as = 'div',
  className,
  type = 'chars',
  stagger = type === 'chars' ? 0.02 : 0.08,
  variant = 'fromBottom',
  duration,
  ease,
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const splitTextRef = useRef<any>(null);
  const childClassName = `split-${type.slice(0, -1)}`;

  useGSAP(async () => {
    if (textRef.current && children) {
      const SplitText = await getSplitText();
      
      // Revert previous split if it exists
      if (splitTextRef.current) {
        splitTextRef.current.revert();
      }
      
      // Create new SplitText instance and store it in the ref
      splitTextRef.current = new SplitText(textRef.current, {
        type,
        [type + "Class"]: childClassName,
      });
    }
  }, { scope: textRef, dependencies: [children, type] });

  return (
    <AnimationItem
      ref={textRef}
      as={as}
      className={className}
      variant={variant}
      duration={duration}
      ease={ease}
      stagger={stagger}
      splitTarget={`.${childClassName}`}
    >
      {children}
    </AnimationItem>
  );
};
