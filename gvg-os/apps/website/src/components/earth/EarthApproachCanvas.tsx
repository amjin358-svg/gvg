"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import type { MutableRefObject } from "react";
import { Earth } from "@/components/earth/Earth";
import * as THREE from "three";

function Rig({ progress }: { progress: MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const spin = useRef({ value: 0 });

  useFrame((state) => {
    const p = progress.current;
    spin.current.value = p * Math.PI * 1.6;
    const cam = state.camera;
    cam.position.z = THREE.MathUtils.lerp(9.5, 3.4, p);
    cam.position.y = THREE.MathUtils.lerp(0.8, 0.15, p);
    cam.lookAt(0, 0, 0);
    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.lerp(0.35, 0.12, p);
    }
  });

  return (
    <group ref={group}>
      <Earth rotationYRef={spin} autoSpin={0.0015} showOrbits={false} />
    </group>
  );
}

export function EarthApproachCanvas({
  progress,
}: {
  progress: MutableRefObject<number>;
}) {
  return (
    <Canvas
      className="cx-earth__canvas"
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.8, 9.5], fov: 42, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#02050b"]} />
      <Stars radius={80} depth={50} count={1800} factor={2.4} saturation={0} fade speed={0.2} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 2, 4]} intensity={1.35} color="#fff5e0" />
      <directionalLight position={[-4, -1, -3]} intensity={0.35} color="#7eb6ff" />
      <Rig progress={progress} />
    </Canvas>
  );
}
