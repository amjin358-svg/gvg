"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function DustField({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 24;
      speeds[i] = 0.02 + Math.random() * 0.06;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, delta) => {
    const pts = ref.current;
    if (!pts) return;
    const arr = pts.geometry.attributes.position!.array as Float32Array;
    const step = Math.min(delta, 0.05);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1]! += speeds[i]! * step;
      if (arr[i * 3 + 1]! > 9) arr[i * 3 + 1] = -9;
    }
    pts.geometry.attributes.position!.needsUpdate = true;
    pts.rotation.y += delta * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#f0d080"
        size={0.028}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function SoftGrid() {
  const ref = useRef<THREE.GridHelper>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.position.z = ((ref.current.position.z + delta * 0.15) % 2) - 1;
  });
  return (
    <gridHelper
      ref={ref}
      args={[40, 40, "#3a2a10", "#1a1408"]}
      position={[0, -4.2, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

function VolumetricWash() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.x = Math.sin(t * 0.07) * 1.4;
    ref.current.position.y = Math.cos(t * 0.05) * 0.6;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.045 + Math.sin(t * 0.4) * 0.012;
  });
  return (
    <mesh ref={ref} position={[0, 0, -6]} scale={[18, 10, 1]}>
      <planeGeometry />
      <meshBasicMaterial
        color="#c9a227"
        transparent
        opacity={0.05}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/**
 * Always-alive ambient space plate — stars, dust, grid, soft gold wash.
 */
export function AmbientCanvas() {
  return (
    <div className="cx-ambient" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.4, 8], fov: 48, near: 0.1, far: 80 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#03060c"]} />
        <fog attach="fog" args={["#03060c", 12, 36]} />
        <Stars radius={60} depth={40} count={2200} factor={2.2} saturation={0} fade speed={0.25} />
        <DustField />
        <SoftGrid />
        <VolumetricWash />
        <ambientLight intensity={0.25} />
      </Canvas>
      <div className="cx-ambient__noise" />
      <div className="cx-ambient__vignette" />
      <div className="cx-ambient__gold" />
    </div>
  );
}
