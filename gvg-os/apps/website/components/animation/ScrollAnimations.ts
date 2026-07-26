"use client";

import type { RefObject } from "react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import { EARTH_SCROLL_END } from "@/lib/cinematic";
import { GLOBAL_ROUTE } from "@/lib/globalRoute";

type EarthSpinOptions = {
  section: HTMLElement;
  /** Mutable rotation proxy; Scene02 reads `.value` into Three */
  rotationY: { value: number };
};

/** Pin section and scrub earth Y rotation 0 → 2π */
export function createEarthScrollSpin({
  section,
  rotationY,
}: EarthSpinOptions): gsap.core.Tween {
  registerGsapPlugins();
  rotationY.value = 0;

  return gsap.to(rotationY, {
    value: Math.PI * 2,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: EARTH_SCROLL_END,
      scrub: true,
      pin: true,
      anticipatePin: 1,
    },
  });
}

type GlobalRouteOptions = {
  section: HTMLElement;
  hopLabels: HTMLElement[];
  arcs: SVGPathElement[];
  glows: SVGPathElement[];
  pulses: HTMLElement[];
};

/**
 * Per hop: Golden Arc → Glow → Pulse, then next hop.
 */
export function createGlobalRouteTimeline({
  section,
  hopLabels,
  arcs,
  glows,
  pulses,
}: GlobalRouteOptions): gsap.core.Timeline {
  registerGsapPlugins();

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: `+=${GLOBAL_ROUTE.length * 800}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
    },
  });

  hopLabels.forEach((label, i) => {
    const arc = arcs[i];
    const glow = glows[i];
    const pulse = pulses[i];

    tl.to(label, { opacity: 1, duration: 0.35 }, i);

    if (arc) {
      const length = arc.getTotalLength();
      gsap.set(arc, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
      });
      tl.to(arc, { strokeDashoffset: 0, duration: 0.55, ease: "power2.out" }, i);
    }

    if (glow) {
      gsap.set(glow, { opacity: 0 });
      tl.to(glow, { opacity: 0.85, duration: 0.35 }, i + 0.35);
    }

    if (pulse) {
      gsap.set(pulse, { scale: 0.4, opacity: 0 });
      tl.to(
        pulse,
        { scale: 1.4, opacity: 0.9, duration: 0.25, ease: "power2.out" },
        i + 0.55,
      ).to(pulse, { scale: 1, opacity: 0.55, duration: 0.2 }, i + 0.75);
    }
  });

  return tl;
}

export function createAiDataTimeline(
  section: HTMLElement,
  stages: {
    particles: HTMLElement | null;
    numbers: HTMLElement | null;
    charts: HTMLElement | null;
    connections: HTMLElement | null;
    bars: HTMLElement[];
  },
): gsap.core.Timeline {
  registerGsapPlugins();

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=2800",
      scrub: true,
      pin: true,
      anticipatePin: 1,
    },
  });

  if (stages.particles) {
    gsap.set(stages.particles, { opacity: 0 });
    tl.to(stages.particles, { opacity: 1, duration: 1 });
  }
  if (stages.numbers) {
    gsap.set(stages.numbers, { opacity: 0, y: 24 });
    tl.to(stages.numbers, { opacity: 1, y: 0, duration: 0.8 });
  }
  if (stages.charts) {
    gsap.set(stages.charts, { opacity: 0 });
    tl.to(stages.charts, { opacity: 1, duration: 0.4 });
    if (stages.bars.length) {
      gsap.set(stages.bars, { scaleX: 0 });
      tl.to(stages.bars, { scaleX: 1, stagger: 0.12, duration: 0.55, ease: "power2.out" }, "<");
    }
  }
  if (stages.connections) {
    gsap.set(stages.connections, { opacity: 0 });
    tl.to(stages.connections, { opacity: 1, duration: 0.7 });
  }

  return tl;
}

export function killScrollTriggers(trigger?: RefObject<HTMLElement | null>) {
  registerGsapPlugins();
  ScrollTrigger.getAll().forEach((st) => {
    if (!trigger?.current || st.trigger === trigger.current) st.kill();
  });
}
