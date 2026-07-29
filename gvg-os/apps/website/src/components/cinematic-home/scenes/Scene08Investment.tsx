"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { HOME_COPY, SCENE_SCROLL } from "@/lib/cinematicHomeContent";

function Towers({ progress }: { progress: MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const heights = useMemo(
    () => Array.from({ length: 18 }, () => 0.6 + Math.random() * 2.4),
    [],
  );

  useFrame((state) => {
    const p = progress.current;
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const target = heights[i]! * Math.min(1, Math.max(0, (p - i * 0.03) / 0.35));
      mesh.scale.y = THREE.MathUtils.lerp(mesh.scale.y || 0.01, Math.max(0.01, target), 0.12);
      mesh.position.y = mesh.scale.y / 2;
    });
    state.camera.position.x = THREE.MathUtils.lerp(-2.2, 2.4, p);
    state.camera.position.z = THREE.MathUtils.lerp(7.5, 4.2, p);
    state.camera.position.y = 2.2;
    state.camera.lookAt(0, 1.2, 0);
  });

  return (
    <group ref={group}>
      {heights.map((h, i) => {
        const x = (i % 6) * 1.1 - 2.75;
        const z = Math.floor(i / 6) * 1.2 - 1.2;
        return (
          <mesh key={i} position={[x, 0, z]} scale={[0.45, 0.01, 0.45]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color="#0b1524"
              metalness={0.65}
              roughness={0.28}
              emissive="#c9a227"
              emissiveIntensity={0.12}
            />
          </mesh>
        );
      })}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#050a12" metalness={0.4} roughness={0.8} />
      </mesh>
    </group>
  );
}

/**
 * Scene 08 — Investment city rises · BUILD / INVEST / GROW.
 */
export function Scene08Investment() {
  const root = useRef<HTMLElement>(null);
  const lines = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !lines.current) return;
      const words = gsap.utils.toArray<HTMLElement>(lines.current.children);
      gsap.set(words, { opacity: 0, y: 50, force3D: true });

      gsap.timeline({
        defaults: { ease: "none", force3D: true },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${SCENE_SCROLL.invest}`,
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            progress.current = self.progress;
          },
        },
      }).to(words, { opacity: 1, y: 0, stagger: 0.18, duration: 0.35 }, 0.35);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="cx-scene cx-scene--invest" aria-label="Investment">
      <div className="cx-scene__stage">
        <Canvas
          className="cx-invest__canvas"
          dpr={[1, 1.5]}
          camera={{ position: [-2.2, 2.2, 7.5], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <fog attach="fog" args={["#03060c", 6, 18]} />
          <ambientLight intensity={0.35} />
          <directionalLight position={[4, 8, 2]} intensity={1.3} color="#ffe6b0" />
          <Towers progress={progress} />
        </Canvas>
        <div ref={lines} className="cx-invest__words">
          {HOME_COPY.investLines.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
