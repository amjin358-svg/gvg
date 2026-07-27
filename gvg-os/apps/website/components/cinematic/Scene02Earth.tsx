"use client";

import { useMemo, useRef, type MutableRefObject, Suspense } from "react";
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
      <fog attach="fog" args={["#01040c", 9, 20]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[-4, 2.5, 5]} intensity={2.1} color="#cfe3ff" />
      <directionalLight position={[3, -1, -2]} intensity={0.35} color="#1a3a6e" />
      <pointLight position={[2.2, 1.2, 3.2]} intensity={0.85} color="#C8A35F" />
      <Stars />
      <Suspense fallback={null}>
        <Earth rotationYRef={rotationYRef} autoSpin={0} showOrbits />
      </Suspense>
    </>
  );
}

/**
 * Scene 2｜Earth — Blue Marble materials, silky scrub spin
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
            camera={{ position: [0, 0.15, 5.0], fov: 40 }}
            fallback={<div className="opening-scene__fallback" />}
          >
            <EarthStage rotationYRef={rotationYRef} />
          </CanvasSafe>
        </div>
        <div className="earth-scene__copy">
          <p className="earth-scene__eyebrow">02 · Planetary View</p>
          <h2>One Planet. Infinite Markets.</h2>
          <p>
            從軌道俯瞰全球商流 — 緩慢轉動地球，感受跨境貿易網絡如何交織成一幅完整版圖。
          </p>
        </div>
      </section>
    </div>
  );
}

export default Scene02Earth;
