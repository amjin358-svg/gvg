"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BRAND_GOLD } from "@/lib/cinematic";

const COUNT = 520;

/**
 * Lightweight particle field — rotate the whole cloud instead of
 * rewriting every vertex each frame (much smoother under scrub).
 */
export function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const r = 1.2 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.65;
      arr[i3 + 2] = r * Math.cos(phi) * 0.7;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.06;
    points.current.rotation.x += delta * 0.015;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        color={BRAND_GOLD}
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.78}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default ParticleField;
