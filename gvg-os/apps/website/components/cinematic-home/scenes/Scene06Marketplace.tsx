"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { MARKET_CATEGORIES, SCENE_SCROLL } from "@/lib/cinematicHomeContent";

function ProductOrb({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const angle = (index / total) * Math.PI * 2;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const p = progress.current;
    const radius = 1.6 + Math.sin(t * 0.5 + index) * 0.12;
    const y = Math.sin(t * 0.7 + index) * 0.35;
    ref.current.position.set(Math.cos(angle + t * 0.15) * radius, y, Math.sin(angle + t * 0.15) * radius);
    ref.current.rotation.x = t * 0.4 + index;
    ref.current.rotation.y = t * 0.55;
    const appear = Math.min(1, Math.max(0, (p - index / total * 0.5) / 0.25));
    ref.current.scale.setScalar(0.2 + appear * 0.55);
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.55, 0.55, 0.55]} />
      <meshPhysicalMaterial
        color="#0c1422"
        metalness={0.7}
        roughness={0.15}
        transmission={0.35}
        thickness={0.6}
        transparent
        opacity={0.92}
        emissive="#c9a227"
        emissiveIntensity={0.18}
      />
    </mesh>
  );
}

function MarketRig({ progress }: { progress: MutableRefObject<number> }) {
  return (
    <group>
      {MARKET_CATEGORIES.map((_, i) => (
        <ProductOrb
          key={i}
          index={i}
          total={MARKET_CATEGORIES.length}
          progress={progress}
        />
      ))}
    </group>
  );
}

/**
 * Scene 06 — Floating marketplace · glass product orbs · categories.
 */
export function Scene06Marketplace() {
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLUListElement>(null);
  const progress = useRef(0);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !rail.current) return;
      const items = gsap.utils.toArray<HTMLElement>(rail.current.children);
      gsap.set(items, { opacity: 0, y: 24, force3D: true });

      gsap.timeline({
        defaults: { ease: "none", force3D: true },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${SCENE_SCROLL.market}`,
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            progress.current = self.progress;
          },
        },
      }).to(items, { opacity: 1, y: 0, stagger: 0.06, duration: 0.5 }, 0.1);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="cx-scene cx-scene--market" aria-label="Marketplace">
      <div className="cx-scene__stage">
        <Canvas
          className="cx-market__canvas"
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.4, 6], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.45} />
          <directionalLight position={[3, 4, 2]} intensity={1.1} color="#fff4d8" />
          <MarketRig progress={progress} />
        </Canvas>
        <ul ref={rail} className="cx-market__rail">
          {MARKET_CATEGORIES.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
