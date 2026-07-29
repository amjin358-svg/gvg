"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { SCENE_SCROLL } from "@/lib/cinematicHomeContent";

const EarthApproachCanvas = dynamic(
  () =>
    import("@/components/cinematic-home/three/EarthApproachCanvas").then(
      (m) => m.EarthApproachCanvas,
    ),
  { ssr: false },
);

/**
 * Scene 03 — Fly through text into deep space · ultra Earth approach.
 */
export function Scene03Earth() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const veil = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current) return;
      if (veil.current) gsap.set(veil.current, { opacity: 1 });

      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${SCENE_SCROLL.earth}`,
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            progress.current = self.progress;
          },
        },
      }).to(veil.current, { opacity: 0, duration: 0.25 }, 0);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="cx-scene cx-scene--earth" aria-label="Earth Approach">
      <div className="cx-scene__stage">
        <EarthApproachCanvas progress={progress} />
        <div ref={veil} className="cx-earth__veil" aria-hidden />
      </div>
    </section>
  );
}
