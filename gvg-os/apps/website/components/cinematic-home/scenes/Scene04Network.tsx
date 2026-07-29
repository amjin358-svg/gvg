"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { HOME_COPY, NETWORK_CITIES, SCENE_SCROLL } from "@/lib/cinematicHomeContent";

const NetworkCanvas = dynamic(
  () =>
    import("@/components/cinematic-home/three/NetworkCanvas").then((m) => m.NetworkCanvas),
  { ssr: false },
);

/**
 * Scene 04 — World lights · cities activate · golden arcs · GVG GLOBAL NETWORK.
 */
export function Scene04Network() {
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const labels = useRef<HTMLUListElement>(null);
  const progress = useRef(0);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !title.current || !labels.current) return;
      const items = gsap.utils.toArray<HTMLElement>(labels.current.children);
      gsap.set(title.current, { opacity: 0, y: 28, force3D: true });
      gsap.set(items, { opacity: 0, y: 16, force3D: true });

      const tl = gsap.timeline({
        defaults: { ease: "none", force3D: true },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${SCENE_SCROLL.network}`,
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            progress.current = self.progress;
          },
        },
      });

      tl.to(items, { opacity: 1, y: 0, stagger: 0.08, duration: 0.45 }, 0.08).to(
        title.current,
        { opacity: 1, y: 0, duration: 0.25 },
        0.55,
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="cx-scene cx-scene--network" aria-label="Global Network">
      <div className="cx-scene__stage">
        <NetworkCanvas progress={progress} />
        <ul ref={labels} className="cx-network__cities">
          {NETWORK_CITIES.map((c) => (
            <li key={c.id}>{c.name}</li>
          ))}
        </ul>
        <h2 ref={title} className="cx-network__title">
          {HOME_COPY.networkTitle}
        </h2>
      </div>
    </section>
  );
}
