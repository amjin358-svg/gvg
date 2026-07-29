"use client";

import { useMemo, useRef, type MutableRefObject, Suspense } from "react";
import { CanvasSafe } from "@/components/three/CanvasSafe";
import { Earth } from "@/components/three/Earth";
import { Stars } from "@/components/three/Stars";
import { createEarthScrollSpin } from "@/components/animation/ScrollAnimations";
import { EARTH_SCROLL_END } from "@/lib/cinematic";
import { MOVIE_V5 } from "@/lib/movieContent";
import { registerGsapPlugins, useGSAP } from "@/lib/gsap";

function EarthStage({
  rotationYRef,
}: {
  rotationYRef: MutableRefObject<{ value: number }>;
}) {
  return (
    <>
      <fog attach="fog" args={["#01040c", 9, 20]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[-4, 2.5, 5]} intensity={2.0} color="#cfe3ff" />
      <directionalLight position={[3, -1, -2]} intensity={0.3} color="#1a3a6e" />
      <pointLight position={[2.2, 1.2, 3.2]} intensity={0.75} color="#7EB6FF" />
      <Stars />
      <Suspense fallback={null}>
        <Earth
          rotationYRef={rotationYRef}
          autoSpin={0.0016}
          showOrbits
          showCountries
        />
      </Suspense>
    </>
  );
}

/**
 * Scene 2｜Earth — continuous spin + one-line light-blue title
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
        <div className="earth-scene__star-script" aria-hidden />
        <div className="earth-scene__stage" aria-hidden>
          <CanvasSafe
            camera={{ position: [0, 0.15, 5.0], fov: 40 }}
            dpr={[1, 1.35]}
            fallback={<div className="opening-scene__fallback" />}
          >
            <EarthStage rotationYRef={rotationYRef} />
          </CanvasSafe>
        </div>
        <div className="earth-scene__copy">
          <p className="earth-scene__eyebrow">{MOVIE_V5.earth.eyebrow}</p>
          <h2 className="earth-scene__title">{MOVIE_V5.earth.title}</h2>
          <p>{MOVIE_V5.earth.body}</p>
        </div>
      </section>
    </div>
  );
}

export default Scene02Earth;
