"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function Dust({ count = 1200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 24;
      speeds[i] = 0.015 + Math.random() * 0.05;
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
    pts.rotation.y += delta * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#f0d080"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.45}
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
    ref.current.position.z = ((ref.current.position.z + delta * 0.12) % 2) - 1;
  });
  return (
    <gridHelper
      ref={ref}
      args={[48, 48, "#3a2a10", "#141008"]}
      position={[0, -4.5, 0]}
    />
  );
}

function VolumetricWash() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.x = Math.sin(t * 0.06) * 1.2;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.04 + Math.sin(t * 0.35) * 0.01;
  });
  return (
    <mesh ref={ref} position={[0, 0.5, -8]} scale={[20, 12, 1]}>
      <planeGeometry />
      <meshBasicMaterial
        color="#c9a227"
        transparent
        opacity={0.045}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/**
 * Always-alive cinematic plate — stars, dust, grid, gold wash, noise.
 * Renders behind the main InteractiveMovie ScrollControls canvas.
 */
export default function AmbientBackground() {
  return (
    <div className="im-ambient" aria-hidden>
      <Canvas
        dpr={[1, 1.35]}
        camera={{ position: [0, 0.3, 9], fov: 48, near: 0.1, far: 80 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#03060c"]} />
        <fog attach="fog" args={["#03060c", 14, 40]} />
        <Stars radius={70} depth={45} count={2000} factor={2.1} saturation={0} fade speed={0.22} />
        <Dust />
        <SoftGrid />
        <VolumetricWash />
        <ambientLight intensity={0.2} />
      </Canvas>
      <div className="im-ambient__noise" />
      <div className="im-ambient__vignette" />
      <div className="im-ambient__gold" />
    </div>
  );
}
