"use client";

import React, { useRef, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimationContext, AnimationContextState } from './AnimationContext';
import { presets, CustomAnimation } from './animationPresets';

gsap.registerPlugin(ScrollTrigger);

interface AnimationConfig {
  duration: number;
  start: string;
  end: string;
  ease: string;
}

export interface AnimateOnScrollProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  config?: Partial<AnimationConfig>;
  disabled?: boolean;
  debug?: boolean;
  once?: boolean;
  scrub?: boolean | number;
}

const DEFAULT_CONFIG: AnimationConfig = {
  duration: 0.8,
  start: 'top 85%',
  end: 'bottom 60%',
  ease: 'power3.out',
};

export const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  as: Component = 'div',
  className = '',
  config = {},
  disabled = false,
  debug = false,
  once = true,
  scrub = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const finalConfig = useMemo(() => ({ ...DEFAULT_CONFIG, ...config }), [config]);

  const registerElementForAnimation = useCallback((element: HTMLElement, customAnimation?: CustomAnimation) => {
    if (disabled || !element) return;

    let animation: CustomAnimation;

    if (customAnimation) {
      animation = customAnimation;
    } else {
      const variant = (element.dataset.variant as keyof typeof presets) || 'fade';
      animation = presets[variant] || presets.fade;
    }

    const { from, to } = animation;

    const customDuration = element.dataset.duration ? parseFloat(element.dataset.duration) : finalConfig.duration;
    const customEase = element.dataset.ease || finalConfig.ease;
    const stagger = element.dataset.stagger ? parseFloat(element.dataset.stagger) : 0;
    const targets = element.dataset.splitTarget ? gsap.utils.toArray(element.dataset.splitTarget, element) : element;

    const scrollTriggerConfig: ScrollTrigger.Vars = {
      trigger: element,
      start: finalConfig.start,
      end: finalConfig.end,
      markers: debug,
      invalidateOnRefresh: true,
    };

    if (scrub) {
      scrollTriggerConfig.scrub = scrub;
    } else {
      scrollTriggerConfig.toggleActions = once ? 'play none none none' : 'play reverse play reverse';
    }

    gsap.fromTo(targets, from, {
      ...to,
      duration: customDuration,
      ease: customEase,
      stagger,
      scrollTrigger: scrollTriggerConfig,
    });
  }, [disabled, finalConfig, debug, once, scrub]);

  const contextValue: AnimationContextState = {
    config: { once, debug, start: finalConfig.start },
    register: registerElementForAnimation,
  };

  return (
    <AnimationContext.Provider value={contextValue}>
      <Component ref={containerRef} className={className}>
        {children}
      </Component>
    </AnimationContext.Provider>
  );
};
