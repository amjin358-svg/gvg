"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial } from "@react-three/drei";
import type { Group, Mesh } from "three";
import { BRAND_GOLD } from "@/lib/cinematic";

/**
 * Floating · Rotate · Glass · Reflection
 */
export function FloatingObjects() {
  const group = useRef<Group>(null);
  const a = useRef<Mesh>(null);
  const b = useRef<Mesh>(null);
  const c = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.15;
    }
    if (a.current) {
      a.current.position.y = Math.sin(t * 0.9) * 0.25;
      a.current.rotation.x = t * 0.35;
      a.current.rotation.y = t * 0.5;
    }
    if (b.current) {
      b.current.position.y = Math.cos(t * 0.7) * 0.3;
      b.current.rotation.y = -t * 0.4;
    }
    if (c.current) {
      c.current.position.y = Math.sin(t * 1.1 + 1) * 0.2;
      c.current.rotation.z = t * 0.25;
    }
  });

  return (
    <group ref={group}>
      <Environment preset="city" />
      <mesh ref={a} position={[-1.4, 0, 0]}>
        <icosahedronGeometry args={[0.55, 0]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.6}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.05}
          color="#e8f0ff"
        />
      </mesh>
      <mesh ref={b} position={[0.2, 0.2, -0.4]}>
        <torusGeometry args={[0.45, 0.16, 24, 48]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.4}
          color="#fff8e8"
          roughness={0.05}
        />
      </mesh>
      <mesh ref={c} position={[1.5, -0.1, 0.3]}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial
          color="#1a3358"
          metalness={0.7}
          roughness={0.15}
          emissive={BRAND_GOLD}
          emissiveIntensity={0.15}
        />
      </mesh>
      {/* Gold edge accent ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.01, 8, 64]} />
        <meshBasicMaterial color={BRAND_GOLD} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export default FloatingObjects;
