"use client";

import { gsap, registerGsapPlugins } from "@/lib/gsap";

/** Scene01 logo beat: fade/scale in → punch → fade out */
export function createLogoIntro(target: gsap.TweenTarget): gsap.core.Timeline {
  registerGsapPlugins();
  const stagger = Array.isArray(target) ? 0.08 : 0;
  return gsap
    .timeline()
    .from(target, {
      opacity: 0,
      scale: 0.55,
      duration: 1.65,
      stagger,
      ease: "power2.out",
    })
    .to(target, {
      scale: 1.12,
      duration: 0.85,
      stagger: stagger ? 0.04 : 0,
      ease: "power2.inOut",
    })
    .to(target, {
      opacity: 0,
      duration: 0.9,
      stagger: stagger ? 0.03 : 0,
      ease: "power2.in",
    });
}
