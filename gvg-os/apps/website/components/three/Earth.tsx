"use client";

import { useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { BRAND_GOLD, BRAND_NAVY } from "@/lib/cinematic";

type EarthProps = {
  /** External scroll-driven Y rotation (radians) */
  rotationYRef?: MutableRefObject<{ value: number }>;
  /** Gold orbital rings for Opening scene */
  showOrbits?: boolean;
  /** Auto-spin when not scrub-driven */
  autoSpin?: number;
};

export function Earth({
  rotationYRef,
  showOrbits = false,
  autoSpin = 0.002,
}: EarthProps) {
  const group = useRef<Group>(null);
  const orbits = useRef<Group>(null);

  useFrame((_, delta) => {
    if (group.current) {
      if (rotationYRef) {
        group.current.rotation.y = rotationYRef.current.value;
      } else {
        group.current.rotation.y += autoSpin;
      }
    }
    if (orbits.current) {
      orbits.current.rotation.y += delta * 0.35;
      orbits.current.rotation.z += delta * 0.12;
    }
  });

  return (
    <group>
      <group ref={group}>
        <mesh>
          <sphereGeometry args={[1.6, 64, 64]} />
          <meshStandardMaterial
            color={BRAND_NAVY}
            roughness={0.45}
            metalness={0.35}
            emissive={BRAND_NAVY}
            emissiveIntensity={0.35}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.62, 32, 32]} />
          <meshBasicMaterial
            color={BRAND_GOLD}
            wireframe
            transparent
            opacity={0.18}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.78, 48, 48]} />
          <meshBasicMaterial
            color="#1a3a6e"
            transparent
            opacity={0.16}
            depthWrite={false}
          />
        </mesh>
      </group>

      {showOrbits ? (
        <group ref={orbits}>
          {[1.95, 2.2, 2.45].map((r, i) => (
            <mesh key={r} rotation={[Math.PI / 2.6 + i * 0.35, 0.4 * i, 0.2]}>
              <torusGeometry args={[r, 0.012 + i * 0.004, 16, 128]} />
              <meshBasicMaterial
                color={BRAND_GOLD}
                transparent
                opacity={0.55 - i * 0.12}
              />
            </mesh>
          ))}
        </group>
      ) : null}
    </group>
  );
}

export default Earth;
