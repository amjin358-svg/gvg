import { gsap, registerMotionPlugins } from "./gsap";

export type TransitionKind = "fade" | "slide-up" | "slide-left" | "scale" | "wipe";

/**
 * Transition — section / view transitions.
 */
export function transitionIn(
  target: gsap.TweenTarget,
  kind: TransitionKind = "fade",
  vars: gsap.TweenVars = {},
) {
  registerMotionPlugins();
  const from = transitionFrom(kind);
  return gsap.fromTo(target, from, {
    ...fromReset(kind),
    duration: 0.7,
    ease: "power3.out",
    ...vars,
  });
}

export function transitionOut(
  target: gsap.TweenTarget,
  kind: TransitionKind = "fade",
  vars: gsap.TweenVars = {},
) {
  registerMotionPlugins();
  return gsap.to(target, {
    ...transitionFrom(kind),
    duration: 0.45,
    ease: "power2.in",
    ...vars,
  });
}

export function crossfade(from: gsap.TweenTarget, to: gsap.TweenTarget, duration = 0.6) {
  registerMotionPlugins();
  const tl = gsap.timeline();
  tl.to(from, { autoAlpha: 0, duration }, 0);
  tl.fromTo(to, { autoAlpha: 0 }, { autoAlpha: 1, duration }, 0);
  return tl;
}

function transitionFrom(kind: TransitionKind): gsap.TweenVars {
  switch (kind) {
    case "slide-up":
      return { y: 40, autoAlpha: 0 };
    case "slide-left":
      return { x: 48, autoAlpha: 0 };
    case "scale":
      return { scale: 0.94, autoAlpha: 0 };
    case "wipe":
      return { clipPath: "inset(0 0 100% 0)", autoAlpha: 1 };
    case "fade":
    default:
      return { autoAlpha: 0 };
  }
}

function fromReset(kind: TransitionKind): gsap.TweenVars {
  switch (kind) {
    case "slide-up":
      return { y: 0, autoAlpha: 1 };
    case "slide-left":
      return { x: 0, autoAlpha: 1 };
    case "scale":
      return { scale: 1, autoAlpha: 1 };
    case "wipe":
      return { clipPath: "inset(0 0 0% 0)", autoAlpha: 1 };
    case "fade":
    default:
      return { autoAlpha: 1 };
  }
}
