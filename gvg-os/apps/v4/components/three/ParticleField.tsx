"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BRAND_GOLD, NOISE_STRENGTH } from "@/lib/cinematic";

const COUNT = 1200;

export function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const { positions, base } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const base = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 6;
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      base[i3] = x;
      base[i3 + 1] = y;
      base[i3 + 2] = z;
    }
    return { positions, base };
  }, []);

  useFrame(({ clock }) => {
    const geo = points.current?.geometry;
    if (!geo) return;
    const attr = geo.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const t = clock.elapsedTime;
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      // Subtle noise offset at NOISE_STRENGTH
      arr[i3] = base[i3]! + Math.sin(t * 0.7 + i) * NOISE_STRENGTH * 8;
      arr[i3 + 1] = base[i3 + 1]! + Math.cos(t * 0.5 + i * 0.3) * NOISE_STRENGTH * 8;
      arr[i3 + 2] = base[i3 + 2]! + Math.sin(t * 0.4 + i * 0.2) * NOISE_STRENGTH * 4;
    }
    attr.needsUpdate = true;
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
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default ParticleField;
