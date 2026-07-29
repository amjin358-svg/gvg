"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { HOME_COPY, SCENE_SCROLL } from "@/lib/cinematicHomeContent";

function AICore({ progress }: { progress: MutableRefObject<number> }) {
  const core = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const count = 900;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 0.4 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    const p = progress.current;
    const t = state.clock.elapsedTime;
    if (core.current) {
      const s = 0.25 + Math.min(1, Math.max(0, (p - 0.55) / 0.35)) * 0.95;
      core.current.scale.setScalar(s);
      core.current.rotation.y = t * 0.4;
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.25;
      ring.current.rotation.x = 0.6 + p * 0.3;
    }
  });

  return (
    <group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#f0d080"
          size={0.03}
          transparent
          opacity={0.75}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.55, 2]} />
        <meshStandardMaterial
          color="#1a1208"
          emissive="#c9a227"
          emissiveIntensity={1.4}
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[1.35, 0.02, 12, 80]} />
        <meshBasicMaterial color="#e0b84a" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

/**
 * Scene 05 — AI Universe · particles → data → glass dashboards → AI Core.
 */
export function Scene05AI() {
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLDivElement>(null);
  const boards = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !title.current || !boards.current) return;
      const cards = gsap.utils.toArray<HTMLElement>(boards.current.children);
      gsap.set(title.current, { opacity: 0, y: 40, force3D: true });
      gsap.set(cards, { opacity: 0, y: 50, rotateX: 18, force3D: true });

      const tl = gsap.timeline({
        defaults: { ease: "none", force3D: true },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${SCENE_SCROLL.ai}`,
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            progress.current = self.progress;
          },
        },
      });

      tl.to(cards, { opacity: 1, y: 0, rotateX: 0, stagger: 0.08, duration: 0.4 }, 0.15)
        .to(cards, { opacity: 0.15, scale: 0.92, duration: 0.25 }, 0.62)
        .to(title.current, { opacity: 1, y: 0, duration: 0.28 }, 0.68);
    },
    { scope: root },
  );

  const metrics = ["98.4%", "Δ +12.6", "24/7", "1.2B", "∞", "CORE"];

  return (
    <section ref={root} className="cx-scene cx-scene--ai" aria-label="AI Universe">
      <div className="cx-scene__stage">
        <Canvas
          className="cx-ai__canvas"
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[2, 2, 3]} intensity={1.2} color="#ffd9a0" />
          <AICore progress={progress} />
        </Canvas>
        <div ref={boards} className="cx-ai__boards">
          {metrics.map((m) => (
            <article key={m} className="cx-glass-card">
              <span>{m}</span>
            </article>
          ))}
        </div>
        <div ref={title} className="cx-ai__title">
          <h2>{HOME_COPY.aiTitle}</h2>
          <p>{HOME_COPY.aiSub}</p>
        </div>
      </div>
    </section>
  );
}
