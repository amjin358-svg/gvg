"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, useScroll } from "@react-three/drei";
import * as THREE from "three";
import { pageProgress, smoothstep } from "@/components/cinematic/scrollMath";

/**
 * Scene 01 — Black → gold particles → metal GVG logo (~65%).
 */
export default function Scene01Logo() {
  const scroll = useScroll();
  const logo = useRef<THREE.Group>(null);
  const pts = useRef<THREE.Points>(null);
  const COUNT = 2200;

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      seeds[i * 3] = (Math.random() - 0.5) * 10;
      seeds[i * 3 + 1] = (Math.random() - 0.5) * 6;
      seeds[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return { positions, seeds };
  }, []);

  useFrame(() => {
    const p = pageProgress(scroll.offset, 0);
    const birth = smoothstep(0, 0.35, p);
    const merge = smoothstep(0.32, 0.75, p);
    const logoIn = smoothstep(0.4, 0.85, p);

    if (pts.current) {
      const arr = pts.current.geometry.attributes.position!.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        const alive = i / COUNT < birth ? 1 : 0;
        arr[i * 3] = seeds[i * 3]! * (1 - merge) * alive;
        arr[i * 3 + 1] = seeds[i * 3 + 1]! * (1 - merge) * alive;
        arr[i * 3 + 2] = seeds[i * 3 + 2]! * (1 - merge) * alive;
      }
      pts.current.geometry.attributes.position!.needsUpdate = true;
      const mat = pts.current.material as THREE.PointsMaterial;
      mat.opacity = 0.12 + birth * 0.7 * (1 - merge * 0.9);
      pts.current.rotation.y = p * 0.9;
      pts.current.visible = p < 0.98;
    }

    if (logo.current) {
      logo.current.visible = p > 0.28 && p < 1.001;
      const s = 0.35 + logoIn * 0.95;
      logo.current.scale.setScalar(s);
      logo.current.position.z = THREE.MathUtils.lerp(2.5, 0.2, logoIn);
    }
  });

  return (
    <group>
      <points ref={pts}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#e8c56a"
          size={0.032}
          sizeAttenuation
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <group ref={logo} position={[0, 0.15, 0.2]}>
        <Text
          fontSize={1.55}
          letterSpacing={0.12}
          anchorX="center"
          anchorY="middle"
          color="#f5f7fa"
          outlineWidth={0.045}
          outlineColor="#e0b84a"
          maxWidth={10}
        >
          GVG
        </Text>
        {/* Soft bloom plate */}
        <mesh position={[0, 0, -0.2]} scale={[4.2, 1.6, 1]}>
          <planeGeometry />
          <meshBasicMaterial
            color="#e0b84a"
            transparent
            opacity={0.12}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
}
