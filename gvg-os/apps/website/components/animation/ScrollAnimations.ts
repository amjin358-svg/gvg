"use client";

import type { RefObject } from "react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import { EARTH_SCROLL_END, SCRUB_SMOOTH } from "@/lib/cinematic";
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
      scrub: SCRUB_SMOOTH,
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
  /** USA → Taiwan → Japan → Vietnam → Europe rail */
  railItems?: HTMLElement[];
  /** Final title after all hops connect */
  finale?: HTMLElement | null;
  /** World map plate that unfolds at the start */
  map?: HTMLElement | null;
};

/**
 * Scene 3 — pin · per hop Golden Arc → Glow → Pulse · supply-chain finale
 */
export function createGlobalRouteTimeline({
  section,
  hopLabels,
  arcs,
  glows,
  pulses,
  railItems = [],
  finale = null,
  map = null,
}: GlobalRouteOptions): gsap.core.Timeline {
  registerGsapPlugins();

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: `+=${GLOBAL_ROUTE.length * 900 + 600}`,
      scrub: SCRUB_SMOOTH,
      pin: true,
      anticipatePin: 1,
    },
  });

  if (railItems.length) {
    gsap.set(railItems, { opacity: 0.35, color: "rgba(245,245,245,0.45)" });
  }
  if (finale) gsap.set(finale, { opacity: 0, y: 24 });
  if (map) {
    gsap.set(map, { opacity: 0, scale: 1.06 });
    tl.to(map, { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" });
  }

  hopLabels.forEach((label, i) => {
    const arc = arcs[i];
    const glow = glows[i];
    const pulse = pulses[i];
    const rail = railItems[i];

    tl.to(label, { opacity: 1, duration: 0.35 }, i);

    if (rail) {
      tl.to(rail, { opacity: 1, color: "#C8A35F", duration: 0.35 }, i);
      railItems.forEach((item, ri) => {
        if (ri !== i) {
          tl.to(
            item,
            { opacity: 0.35, color: "rgba(245,245,245,0.45)", duration: 0.3 },
            i,
          );
        }
      });
    }

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

  if (finale) {
    tl.to(finale, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });
  }

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
    /** Optional rail labels: Particles → Numbers → Charts → Connections */
    railItems?: HTMLElement[];
  },
): gsap.core.Timeline {
  registerGsapPlugins();

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=3200",
      scrub: SCRUB_SMOOTH,
      pin: true,
      anticipatePin: 1,
    },
  });

  const rail = stages.railItems ?? [];
  const activateRail = (index: number) => {
    if (!rail.length) return;
    rail.forEach((el, i) => {
      tl.to(
        el,
        {
          opacity: i === index ? 1 : 0.35,
          color: i === index ? "#C8A35F" : "rgba(245,245,245,0.45)",
          duration: 0.35,
        },
        "<",
      );
    });
  };

  if (rail.length) {
    gsap.set(rail, { opacity: 0.35, color: "rgba(245,245,245,0.45)" });
  }

  // Particles → Numbers → Charts → Connections (crossfade cascade)
  if (stages.particles) {
    gsap.set(stages.particles, { opacity: 0 });
    tl.to(stages.particles, { opacity: 1, duration: 1 });
    activateRail(0);
  }
  if (stages.numbers) {
    gsap.set(stages.numbers, { opacity: 0, y: 24 });
    if (stages.particles) {
      tl.to(stages.particles, { opacity: 0.15, duration: 0.5 });
    }
    tl.to(stages.numbers, { opacity: 1, y: 0, duration: 0.8 }, "<");
    activateRail(1);
  }
  if (stages.charts) {
    if (stages.numbers) {
      tl.to(stages.numbers, { opacity: 0, duration: 0.45 });
    }
    if (stages.particles) {
      tl.to(stages.particles, { opacity: 0, duration: 0.45 }, "<");
    }
    gsap.set(stages.charts, { opacity: 0 });
    tl.to(stages.charts, { opacity: 1, duration: 0.5 }, "<");
    if (stages.bars.length) {
      gsap.set(stages.bars, { scaleX: 0 });
      tl.to(
        stages.bars,
        { scaleX: 1, stagger: 0.12, duration: 0.55, ease: "power2.out" },
        "<",
      );
    }
    activateRail(2);
  }
  if (stages.connections) {
    if (stages.charts) {
      tl.to(stages.charts, { opacity: 0, duration: 0.45 });
    }
    gsap.set(stages.connections, { opacity: 0 });
    tl.to(stages.connections, { opacity: 1, duration: 0.7 }, "<");
    activateRail(3);
  }

  return tl;
}

export function killScrollTriggers(trigger?: RefObject<HTMLElement | null>) {
  registerGsapPlugins();
  ScrollTrigger.getAll().forEach((st) => {
    if (!trigger?.current || st.trigger === trigger.current) st.kill();
  });
}
