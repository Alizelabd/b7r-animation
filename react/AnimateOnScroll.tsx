"use client";
import { useRef, useEffect, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

export type AnimationVariant =
  | 'fade'
  | 'fromTop'
  | 'fromBottom'
  | 'fromLeft'
  | 'fromRight'
  | 'pop'
  | 'rotateIn'
  | 'skewIn'
  | 'flip'
  | 'bounce'
  | 'zoomOut'
  | 'slideInLeft'
  | 'slideInRight'
  | 'scaleUp'
  | 'scaleDown';

  import React from 'react';

interface AnimationItemProps {
  sort: number;
  variant?: AnimationVariant;
  children: React.ReactNode;
  className?: string;
  duration?: number;
  ease?: string;
  delay?: number;
}

export const AnimationItem: React.FC<AnimationItemProps> = ({
  sort,
  variant = 'fade',
  children,
  className = '',
  duration,
  ease,
  delay,
}) => {
  return (
    <div
      className={`aos-item ${className}`}
      data-sort={sort}
      data-variant={variant}
      data-duration={duration}
      data-ease={ease}
      data-delay={delay}
      style={{ 
        opacity: 0, 
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        perspective: 1000
      }}
    >
      {children}
    </div>
  );
};


interface AnimationConfig {
  duration: number;
  stagger: number;
  start: string;
  ease: string;
  delay: number;
}

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  config?: Partial<AnimationConfig>;
  watch?: Array<unknown>;
  disabled?: boolean;
  resetOnLanguageChange?: boolean;
  debug?: boolean;
}

const DEFAULT_CONFIG: AnimationConfig = {
  duration: 0.6,
  stagger: 0.15,
  start: 'top 90%',
  ease: 'power2.out',
  delay: 0,
};

export const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  className = '',
  config = {},
  watch = [],
  disabled = false,
  resetOnLanguageChange = false,
  debug = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const isInitialized = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  // Get animation properties based on variant and direction
  const getAnimationVars = useCallback((variant: AnimationVariant, isRTL: boolean = false) => {
    const directionMultiplier = isRTL ? -1 : 1;
    
    const animations = {
      fade: {
        from: { opacity: 0 },
        to: { opacity: 1 }
      },
      fromTop: {
        from: { y: -60, opacity: 0 },
        to: { y: 0, opacity: 1 }
      },
      fromBottom: {
        from: { y: 60, opacity: 0 },
        to: { y: 0, opacity: 1 }
      },
      fromLeft: {
        from: { x: -60 * directionMultiplier, opacity: 0 },
        to: { x: 0, opacity: 1 }
      },
      fromRight: {
        from: { x: 60 * directionMultiplier, opacity: 0 },
        to: { x: 0, opacity: 1 }
      },
      slideInLeft: {
        from: { x: -100 * directionMultiplier, opacity: 0 },
        to: { x: 0, opacity: 1 }
      },
      slideInRight: {
        from: { x: 100 * directionMultiplier, opacity: 0 },
        to: { x: 0, opacity: 1 }
      },
      pop: {
        from: { scale: 0.8, opacity: 0 },
        to: { scale: 1, opacity: 1 }
      },
      scaleUp: {
        from: { scale: 0.5, opacity: 0 },
        to: { scale: 1, opacity: 1 }
      },
      scaleDown: {
        from: { scale: 1.3, opacity: 0 },
        to: { scale: 1, opacity: 1 }
      },
      rotateIn: {
        from: { rotation: -180, opacity: 0 },
        to: { rotation: 0, opacity: 1 }
      },
      skewIn: {
        from: { skewY: 5, opacity: 0 },
        to: { skewY: 0, opacity: 1 }
      },
      flip: {
        from: { rotationY: 90, opacity: 0 },
        to: { rotationY: 0, opacity: 1 }
      },
      bounce: {
        from: { y: -30, opacity: 0 },
        to: { y: 0, opacity: 1 }
      },
      zoomOut: {
        from: { scale: 1.1, opacity: 0 },
        to: { scale: 1, opacity: 1 }
      }
    };

    return animations[variant] || animations.fade;
  }, []);

  // Enhanced cleanup function
  const cleanup = useCallback(() => {
    try {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }

      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill(true);
        scrollTriggerRef.current = null;
      }

      // Clean up any remaining ScrollTriggers for this container
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill(true);
        }
      });

      if (debug) {
        console.log('🧹 Animation cleanup completed');
      }
    } catch (error) {
      console.error('❌ Error during animation cleanup:', error);
    }
  }, [debug]);

  // Reset animation state
  const resetAnimationState = useCallback(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll<HTMLElement>('.aos-item');
    
    elements.forEach(element => {
      // Reset to initial state
      gsap.set(element, {
        opacity: 0,
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        rotationY: 0,
        skewY: 0,
        clearProps: 'transform,opacity'
      });
    });

    if (debug) {
      console.log('🔄 Animation state reset for', elements.length, 'elements');
    }
  }, [debug]);

  // Initialize animations
  const initializeAnimations = useCallback(() => {
    if (!containerRef.current || disabled) return;

    try {
      const elements = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>('.aos-item')
      );

      if (elements.length === 0) {
        if (debug) console.log('⚠️ No animation elements found');
        return;
      }

      // Sort elements by sort attribute
      elements.sort((a, b) => {
        const sortA = parseInt(a.dataset.sort || '0', 10);
        const sortB = parseInt(b.dataset.sort || '0', 10);
        return sortA - sortB;
      });

      if (debug) {
        console.log('🎬 Initializing animations for', elements.length, 'elements');
      }

      // Detect RTL direction
      const isRTL = getComputedStyle(containerRef.current).direction === 'rtl';

      // Set initial states
      elements.forEach(element => {
        const variant = (element.dataset.variant as AnimationVariant) || 'fade';
        const { from } = getAnimationVars(variant, isRTL);
        gsap.set(element, { ...from, willChange: 'transform, opacity' });
      });

      // Create timeline
      timelineRef.current = gsap.timeline({
        paused: true,
        onComplete: () => {
          // Clear willChange after animation completes
          elements.forEach(element => {
            gsap.set(element, { willChange: 'auto' });
          });
          if (debug) console.log('✅ Animation sequence completed');
        }
      });

      // Add animations to timeline
      elements.forEach((element, index) => {
        const variant = (element.dataset.variant as AnimationVariant) || 'fade';
        const { to } = getAnimationVars(variant, isRTL);
        const customDuration = parseFloat(element.dataset.duration || finalConfig.duration.toString());
        const customEase = element.dataset.ease || finalConfig.ease;

        timelineRef.current!.to(element, {
          ...to,
          duration: customDuration,
          ease: variant === 'bounce' ? 'bounce.out' : customEase,
        }, index * finalConfig.stagger + finalConfig.delay);
      });

      // Create ScrollTrigger
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: containerRef.current,
        start: finalConfig.start,
        end: 'bottom top',
        toggleActions: 'play none none none',
        markers: debug,
        onEnter: () => {
          if (timelineRef.current) {
            timelineRef.current.play();
          }
        },
        onRefresh: () => {
          if (debug) console.log('🔄 ScrollTrigger refreshed');
        }
      });

      setIsReady(true);
      
      if (debug) {
        console.log('🚀 Animation system initialized successfully');
      }

    } catch (error) {
      console.error('❌ Error initializing animations:', error);
      setIsReady(false);
    }
  }, [disabled, finalConfig, getAnimationVars, debug]);

  // Main animation effect
  useGSAP(() => {
    if (!containerRef.current || disabled) return;

    // Small delay to ensure DOM is ready
    const initTimer = setTimeout(() => {
      cleanup();
      initializeAnimations();
      isInitialized.current = true;
    }, 50);

    return () => {
      clearTimeout(initTimer);
      cleanup();
    };
  }, {
    dependencies: [animationKey, disabled, ...watch],
    scope: containerRef,
  });

  // Handle language/content changes
  useEffect(() => {
    if (!isInitialized.current || !resetOnLanguageChange) return;

    const resetTimer = setTimeout(() => {
      if (debug) console.log('🌐 Content changed, reinitializing animations');
      
      cleanup();
      resetAnimationState();
      setAnimationKey(prev => prev + 1);
      
      // Refresh ScrollTrigger after DOM updates
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, 100);

    return () => clearTimeout(resetTimer);
  }, watch);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
      isInitialized.current = false;
    };
  }, [cleanup]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (scrollTriggerRef.current) {
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerClasses = `
    ${className}
    ${!isReady ? 'animate-pulse' : ''}
  `.trim();

  return (
    <div 
      ref={containerRef} 
      className={containerClasses}
      data-animation-container
      style={{ 
        minHeight: disabled ? 'auto' : '1px',
        overflow: 'hidden'
      }}
    >
      {children}
    </div>
  );
};