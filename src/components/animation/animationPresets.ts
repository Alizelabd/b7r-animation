import { AnimationProps } from "gsap";

export interface CustomAnimation {
  from: AnimationProps;
  to: AnimationProps;
}

/*
	An object containing all predefined animations.
	Any developer can easily add new animations here.
	The key (e.g., 'fade') is the name of the animation (variant).
*/
export const presets: Record<string, CustomAnimation> = {
  fade: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  fromTop: {
    from: { y: -50, opacity: 0 },
    to: { y: 0, opacity: 1 },
  },
  fromBottom: {
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1 },
  },
  fromLeft: {
    from: { x: -50, opacity: 0 },
    to: { x: 0, opacity: 1 },
  },
  fromRight: {
    from: { x: 50, opacity: 0 },
    to: { x: 0, opacity: 1 },
  },
  pop: {
    from: { scale: 0.8, opacity: 0 },
    to: { scale: 1, opacity: 1 },
  },
  scaleUp: {
    from: { scale: 0.5, opacity: 0 },
    to: { scale: 1, opacity: 1 },
  },
  scaleDown: {
    from: { scale: 1.5, opacity: 0 },
    to: { scale: 1, opacity: 1 },
  },
  rotateIn: {
    from: { rotate: -90, opacity: 0 },
    to: { rotate: 0, opacity: 1 },
  },
  flipX: {
    from: { rotateY: 90, opacity: 0 },
    to: { rotateY: 0, opacity: 1 },
  },
  flipY: {
    from: { rotateX: 90, opacity: 0 },
    to: { rotateX: 0, opacity: 1 },
  },
  zoomOut: {
    from: { scale: 1.1, opacity: 0 },
    to: { scale: 1, opacity: 1 },
  },
};
