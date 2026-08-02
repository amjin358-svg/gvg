"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import type { Group, Mesh } from "three";
import { BRAND_GOLD } from "@/lib/cinematic";

/**
 * Floating glass / metal accents — MeshPhysicalMaterial instead of
 * heavy MeshTransmissionMaterial for smoother frame pacing.
 */
export function FloatingObjects() {
  const group = useRef<Group>(null);
  const a = useRef<Mesh>(null);
  const b = useRef<Mesh>(null);
  const c = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.12;
    if (a.current) {
      a.current.position.y = Math.sin(t * 0.7) * 0.22;
      a.current.rotation.x = t * 0.28;
      a.current.rotation.y = t * 0.4;
    }
    if (b.current) {
      b.current.position.y = Math.cos(t * 0.55) * 0.26;
      b.current.rotation.y = -t * 0.32;
    }
    if (c.current) {
      c.current.position.y = Math.sin(t * 0.9 + 1) * 0.18;
      c.current.rotation.z = t * 0.2;
    }
  });

  return (
    <group ref={group}>
      <Environment preset="warehouse" />
      <mesh ref={a} position={[-1.35, 0, 0]}>
        <icosahedronGeometry args={[0.52, 1]} />
        <meshPhysicalMaterial
          color="#eaf2ff"
          metalness={0.15}
          roughness={0.08}
          transmission={0.72}
          thickness={0.55}
          ior={1.4}
          transparent
          opacity={0.92}
          envMapIntensity={1.2}
        />
      </mesh>
      <mesh ref={b} position={[0.15, 0.15, -0.35]}>
        <torusGeometry args={[0.42, 0.14, 32, 64]} />
        <meshPhysicalMaterial
          color="#fff4df"
          metalness={0.35}
          roughness={0.12}
          transmission={0.55}
          thickness={0.35}
          transparent
          opacity={0.9}
          envMapIntensity={1.1}
        />
      </mesh>
      <mesh ref={c} position={[1.4, -0.08, 0.25]}>
        <boxGeometry args={[0.62, 0.62, 0.62]} />
        <meshStandardMaterial
          color="#152848"
          metalness={0.85}
          roughness={0.18}
          emissive={BRAND_GOLD}
          emissiveIntensity={0.18}
          envMapIntensity={1.3}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.05, 0.008, 8, 96]} />
        <meshBasicMaterial color={BRAND_GOLD} transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

export default FloatingObjects;
