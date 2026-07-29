"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, useScroll } from "@react-three/drei";
import * as THREE from "three";
import { MARKET_CATEGORIES } from "@/lib/cinematicHomeContent";
import { pageProgress, smoothstep } from "@/components/cinematic/scrollMath";

function ProductOrb({
  index,
  total,
  progressRef,
}: {
  index: number;
  total: number;
  progressRef: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const angle = (index / total) * Math.PI * 2;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const p = progressRef.current;
    const appear = smoothstep(index / total * 0.45, index / total * 0.45 + 0.25, p);
    const radius = 1.7 + Math.sin(t * 0.5 + index) * 0.12;
    const y = Math.sin(t * 0.7 + index) * 0.35;
    ref.current.position.set(
      Math.cos(angle + t * 0.15) * radius,
      y,
      Math.sin(angle + t * 0.15) * radius,
    );
    ref.current.rotation.x = t * 0.4 + index;
    ref.current.rotation.y = t * 0.55;
    ref.current.scale.setScalar(0.15 + appear * 0.55);
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.55, 0.55, 0.55]} />
      <meshPhysicalMaterial
        color="#0c1422"
        metalness={0.7}
        roughness={0.15}
        transmission={0.35}
        thickness={0.6}
        transparent
        opacity={0.92}
        emissive="#c9a227"
        emissiveIntensity={0.16}
      />
    </mesh>
  );
}

/**
 * Scene 06 — Floating marketplace · glass products · categories.
 */
export default function Scene06Marketplace() {
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);
  const labels = useRef<THREE.Group>(null);
  const pageP = useRef(0);

  useFrame(() => {
    const p = pageProgress(scroll.offset, 5);
    pageP.current = p;
    const active = p > 0.01 && p < 0.995;
    if (group.current) group.current.visible = active;
    if (!active) return;

    if (labels.current) {
      const t = smoothstep(0.15, 0.55, p);
      labels.current.visible = t > 0.05;
      labels.current.position.y = THREE.MathUtils.lerp(-2.8, -2.2, t);
    }
  });

  return (
    <group ref={group} visible={false}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 4, 2]} intensity={1.1} color="#fff4d8" />

      {MARKET_CATEGORIES.map((_, i) => (
        <ProductOrb
          key={i}
          index={i}
          total={MARKET_CATEGORIES.length}
          progressRef={pageP}
        />
      ))}

      <group ref={labels} position={[0, -2.4, 2]}>
        {MARKET_CATEGORIES.map((c, i) => (
          <Text
            key={c}
            position={[(i - (MARKET_CATEGORIES.length - 1) / 2) * 0.72, 0, 0]}
            fontSize={0.14}
            letterSpacing={0.06}
            anchorX="center"
            anchorY="middle"
            color="#ffffff"
            outlineWidth={0.006}
            outlineColor="#e0b84a"
          >
            {c}
          </Text>
        ))}
      </group>
    </group>
  );
}
