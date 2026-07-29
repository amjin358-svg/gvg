"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { SCENE_SCROLL } from "@/lib/cinematicHomeContent";
import { MetalGVGLogo } from "@/components/cinematic-home/ui/MetalGVGLogo";

function BirthParticles({ progress }: { progress: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 2400;
  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      seeds[i * 3] = (Math.random() - 0.5) * 10;
      seeds[i * 3 + 1] = (Math.random() - 0.5) * 6;
      seeds[i * 3 + 2] = (Math.random() - 0.5) * 8;
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
    }
    return { positions, seeds };
  }, []);

  useFrame(() => {
    const pts = ref.current;
    if (!pts) return;
    const p = progress.current;
    const arr = pts.geometry.attributes.position!.array as Float32Array;
    const merge = Math.min(1, Math.max(0, (p - 0.35) / 0.4));
    const birth = Math.min(1, p / 0.35);
    for (let i = 0; i < COUNT; i++) {
      const alive = i / COUNT < birth ? 1 : 0;
      const sx = seeds[i * 3]!;
      const sy = seeds[i * 3 + 1]!;
      const sz = seeds[i * 3 + 2]!;
      arr[i * 3] = sx * (1 - merge) * alive;
      arr[i * 3 + 1] = sy * (1 - merge) * alive;
      arr[i * 3 + 2] = sz * (1 - merge) * alive;
    }
    pts.geometry.attributes.position!.needsUpdate = true;
    const mat = pts.material as THREE.PointsMaterial;
    mat.opacity = 0.15 + birth * 0.7 * (1 - merge * 0.85);
    pts.rotation.y = p * 0.8;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#e8c56a"
        size={0.035}
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * Scene 01 — Black → gold particle birth → metal GVG logo (~65%).
 */
export function Scene01Awaken() {
  const root = useRef<HTMLElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !logo.current) return;
      gsap.set(logo.current, { opacity: 0, scale: 0.35, force3D: true });

      const tl = gsap.timeline({
        defaults: { ease: "none", force3D: true },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${SCENE_SCROLL.awaken}`,
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            progress.current = self.progress;
          },
        },
      });

      tl.to(logo.current, { opacity: 1, scale: 1, duration: 0.45 }, 0.42).to(
        logo.current,
        { scale: 1.06, duration: 0.35 },
        0.72,
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="cx-scene cx-scene--awaken" aria-label="Awaken">
      <div className="cx-scene__stage">
        <div className="cx-awaken__canvas">
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 6], fov: 45 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          >
            <BirthParticles progress={progress} />
          </Canvas>
        </div>
        <div ref={logo} className="cx-awaken__logo">
          <MetalGVGLogo />
        </div>
      </div>
    </section>
  );
}
