"use client";

import { gsap, registerGsapPlugins } from "@/lib/gsap";

/** Scene01 logo beat: fade/scale in → punch → fade out */
export function createLogoIntro(target: gsap.TweenTarget): gsap.core.Timeline {
  registerGsapPlugins();
  return gsap
    .timeline()
    .from(target, { opacity: 0, scale: 0.4, duration: 2 })
    .to(target, { scale: 1.2, duration: 1 })
    .to(target, { opacity: 0 });
}
