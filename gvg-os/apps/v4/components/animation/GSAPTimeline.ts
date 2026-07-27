"use client";

import { gsap, registerGsapPlugins } from "@/lib/gsap";

/** Scene01 logo beat: fade/scale in → punch → fade out */
export function createLogoIntro(target: gsap.TweenTarget): gsap.core.Timeline {
  registerGsapPlugins();
  const stagger = Array.isArray(target) ? 0.08 : 0;
  return gsap
    .timeline()
    .from(target, { opacity: 0, scale: 0.4, duration: 2, stagger })
    .to(target, { scale: 1.2, duration: 1, stagger: stagger ? 0.05 : 0 })
    .to(target, { opacity: 0, stagger: stagger ? 0.04 : 0 });
}
