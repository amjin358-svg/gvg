"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { CanvasSafe } from "@/components/three/CanvasSafe";
import { Earth } from "@/components/three/Earth";
import { Stars } from "@/components/three/Stars";
import { createEarthScrollSpin } from "@/components/animation/ScrollAnimations";
import { EARTH_SCROLL_END } from "@/lib/cinematic";
import { registerGsapPlugins, useGSAP } from "@/lib/gsap";

function EarthStage({
  rotationYRef,
}: {
  rotationYRef: MutableRefObject<{ value: number }>;
}) {
  return (
    <>
      <fog attach="fog" args={["#01040c", 8, 18]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[-3, 2, 4]} intensity={1.7} color="#9ec5ff" />
      <pointLight position={[2, 1, 3]} intensity={1.1} color="#C8A35F" />
      <Stars />
      <Earth rotationYRef={rotationYRef} autoSpin={0} />
    </>
  );
}

/**
 * Scene 2｜Earth (R3F)
 * Lights + Earth + Stars. ScrollTrigger spin end: +=3000
 */
export function Scene02Earth() {
  const root = useRef<HTMLDivElement>(null);
  const rotationY = useMemo(() => ({ value: 0 }), []);
  const rotationYRef = useRef(rotationY);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current) return;
      createEarthScrollSpin({
        section: root.current,
        rotationY: rotationYRef.current,
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section
        className="scene scene--cosmos earth-scene"
        aria-label="Earth"
        data-scroll-end={EARTH_SCROLL_END}
      >
        <div className="earth-scene__stage" aria-hidden>
          <CanvasSafe
            camera={{ position: [0, 0.2, 5.2], fov: 42 }}
            fallback={<div className="opening-scene__fallback" />}
          >
            <EarthStage rotationYRef={rotationYRef} />
          </CanvasSafe>
        </div>
        <div className="earth-scene__copy">
          <p className="earth-scene__eyebrow">Scene 02</p>
          <h2>Earth</h2>
          <p>Scroll to spin the globe across global markets.</p>
        </div>
      </section>
    </div>
  );
}

export default Scene02Earth;
