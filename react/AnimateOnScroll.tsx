"use client";
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Variant = 
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
  | 'zoomOut';

interface AnimationItemProps {
  sort: number;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}

export const AnimationItem: React.FC<AnimationItemProps> = ({ 
  sort, 
  variant = 'fade', 
  children, 
  className 
}) => (
  <div
    className={cn('aos-item', className)}
    data-sort={sort}
    data-variant={variant}
    style={{ opacity: 0, willChange: 'transform, opacity' }}
  >
    {children}
  </div>
);

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  stagger?: number;
  start?: string;
  watch?: Array<unknown>;
}

export const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  className,
  duration = 0.4,
  stagger = 0.2,
  start = 'top 90%',
  watch = [],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const elements = Array.from(containerRef.current.querySelectorAll<HTMLElement>('.aos-item'))
      .sort((a, b) => (+a.dataset.sort! || 0) - (+b.dataset.sort! || 0));
    
    const setupAnimation = () => {
      timelineRef.current?.kill();
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          toggleActions: 'play none none none',
        }
      });

      elements.forEach((el, i) => {
        const variant = el.dataset.variant as Variant;
        
        const fromVars = getFromVars(variant);
        const toVars = getToVars(variant);
        
        tl.fromTo(el, fromVars, {
          ...toVars,
          duration,
          ease: 'power2.out',
        }, i * stagger);
      });

      return tl;
    };

    timelineRef.current = setupAnimation();

    return () => {
      timelineRef.current?.kill();
      ScrollTrigger.refresh();
    };
  }, {
    dependencies: [start, duration, stagger, ...watch],
    scope: containerRef,
  });

  const getFromVars = (variant: Variant): gsap.TweenVars => ({
    fade: { opacity: 0 },
    fromTop: { y: -250, opacity: 0 },
    fromBottom: { y: 100, opacity: 0 },
    fromLeft: { x: -150, opacity: 0 },
    fromRight: { x: 150, opacity: 0 },
    pop: { scale: 0.8, opacity: 0 },
    rotateIn: { rotation: -45, opacity: 0 },
    skewIn: { skewY: 10, opacity: 0 },
    flip: { rotationY: 90, opacity: 0 },
    bounce: { y: -250, opacity: 0 },
    zoomOut: { scale: 1.2, opacity: 0 },
  }[variant]);

  const getToVars = (variant: Variant): gsap.TweenVars => ({
    fade: { opacity: 1 },
    fromTop: { y: 0, opacity: 1 },
    fromBottom: { y: 0, opacity: 1 },
    fromLeft: { x: 0, opacity: 1 },
    fromRight: { x: 0, opacity: 1 },
    pop: { scale: 1, opacity: 1 },
    rotateIn: { rotation: 0, opacity: 1 },
    skewIn: { skewY: 0, opacity: 1 },
    flip: { rotationY: 0, opacity: 1 },
    bounce: { y: 0, opacity: 1, ease: 'bounce.out' },
    zoomOut: { scale: 0.8, opacity: 1 },
  }[variant]);

  return (
    <div ref={containerRef} className={cn('overflow-hidden', className)}>
      {children}
    </div>
  );
};