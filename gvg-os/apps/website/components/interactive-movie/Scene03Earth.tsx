"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, useScroll } from "@react-three/drei";
import * as THREE from "three";
import { Earth } from "@/components/three/Earth";
import { pageProgress, smoothstep } from "./scrollMath";

/**
 * Scene 03 — Fly through text into deep space · Earth approach.
 */
export default function Scene03Earth() {
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);
  const spin = useRef({ value: 0.2 });

  useFrame((_, delta) => {
    const p = pageProgress(scroll.offset, 2);
    const active = p > 0.01 && p < 0.995;
    if (group.current) group.current.visible = active;

    const approach = smoothstep(0.05, 0.95, p);
    spin.current.value = 0.2 + approach * Math.PI * 1.4;

    if (!active) return;

    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.lerp(0.38, 0.12, approach);
      group.current.position.z = THREE.MathUtils.lerp(-2, 0, approach);
    }
  });

  return (
    <group ref={group} visible={false}>
      <Stars radius={90} depth={55} count={1600} factor={2.3} saturation={0} fade speed={0.2} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 2, 4]} intensity={1.3} color="#fff5e0" />
      <directionalLight position={[-4, -1, -3]} intensity={0.3} color="#7eb6ff" />
      <Earth rotationYRef={spin} autoSpin={0.0012} showOrbits={false} />
    </group>
  );
}
