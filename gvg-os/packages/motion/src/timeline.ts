import { gsap, registerMotionPlugins } from "./gsap";

export type MotionTimelineOptions = gsap.TimelineVars;

/**
 * Timeline — cinematic timeline factory with GVG defaults.
 */
export function createTimeline(vars: MotionTimelineOptions = {}) {
  registerMotionPlugins();
  return gsap.timeline({
    defaults: { ease: "power2.out", duration: 0.8 },
    ...vars,
  });
}

export function sequence(
  steps: Array<(tl: gsap.core.Timeline) => void>,
  vars: MotionTimelineOptions = {},
) {
  const tl = createTimeline(vars);
  steps.forEach((step) => step(tl));
  return tl;
}

export function staggerIn(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars = {},
) {
  registerMotionPlugins();
  return gsap.from(targets, {
    y: 28,
    opacity: 0,
    duration: 0.7,
    stagger: 0.08,
    ease: "power3.out",
    ...vars,
  });
}
