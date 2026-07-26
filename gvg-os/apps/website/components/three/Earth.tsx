"use client";

import { useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { BRAND_GOLD, BRAND_NAVY } from "@/lib/cinematic";

type EarthProps = {
  /** External scroll-driven Y rotation (radians) */
  rotationYRef?: MutableRefObject<{ value: number }>;
};

export function Earth({ rotationYRef }: EarthProps) {
  const group = useRef<Group>(null);

  useFrame(() => {
    if (!group.current) return;
    if (rotationYRef) {
      group.current.rotation.y = rotationYRef.current.value;
    } else {
      group.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshStandardMaterial
          color={BRAND_NAVY}
          roughness={0.45}
          metalness={0.35}
          emissive={BRAND_NAVY}
          emissiveIntensity={0.25}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.62, 32, 32]} />
        <meshBasicMaterial color={BRAND_GOLD} wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

export default Earth;
