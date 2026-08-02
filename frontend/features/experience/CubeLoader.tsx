"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

/** The teal cube — same look as the R3F smoke-test cube. */
function LoaderCube() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.8;
    ref.current.rotation.y += delta * 1.1;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color="#1a7a6d"
        roughness={0.35}
        metalness={0.3}
        emissive="#0c3b34"
        emissiveIntensity={0.45}
      />
    </mesh>
  );
}

/**
 * Full-screen preloader for the home page: a rotating teal cube with a
 * live loading percentage beside it. Fades out once it reaches 100%.
 */
export function CubeLoader() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const start = performance.now();
    const durationMs = 2200;
    let raf = 0;
    const tick = (now: number) => {
      const value = Math.min(100, ((now - start) / durationMs) * 100);
      setProgress(Math.round(value));
      if (value < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setFading(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!fading) return;
    const t = setTimeout(() => setGone(true), 700);
    return () => clearTimeout(t);
  }, [fading]);

  if (gone) return null;

  return (
    <div
      role="status"
      aria-label={`Loading ${progress}%`}
      className={`fixed inset-0 z-[9999] flex items-center justify-center gap-4 bg-[#050a14] transition-opacity duration-700 sm:gap-8 ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="h-36 w-36 sm:h-48 sm:w-48">
        {mounted ? (
          <Canvas camera={{ position: [4, 4, 4] }} dpr={[1, 1.5]} gl={{ alpha: true }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.4} />
            <LoaderCube />
          </Canvas>
        ) : null}
      </div>

      <div className="flex flex-col">
        <span className="font-[family-name:var(--font-display)] text-6xl font-semibold tabular-nums leading-none text-white sm:text-8xl">
          {progress}
          <span className="text-[var(--color-gold)]">%</span>
        </span>
        <span className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
          Loading
        </span>
      </div>
    </div>
  );
}

export default CubeLoader;
