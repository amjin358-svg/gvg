"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, useScroll } from "@react-three/drei";
import * as THREE from "three";
import { HOME_COPY } from "@/lib/cinematicHomeContent";
import { pageProgress, smoothstep } from "./scrollMath";

function Towers({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const heights = useMemo(
    () => Array.from({ length: 18 }, () => 0.6 + Math.random() * 2.4),
    [],
  );

  useFrame(() => {
    const p = progressRef.current;
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      if (i >= heights.length) return;
      const mesh = child as THREE.Mesh;
      const target = heights[i]! * smoothstep(i * 0.03, i * 0.03 + 0.35, p);
      mesh.scale.y = THREE.MathUtils.lerp(mesh.scale.y || 0.01, Math.max(0.01, target), 0.12);
      mesh.position.y = mesh.scale.y / 2;
    });
  });

  return (
    <group ref={group}>
      {heights.map((_, i) => {
        const x = (i % 6) * 1.1 - 2.75;
        const z = Math.floor(i / 6) * 1.2 - 1.2;
        return (
          <mesh key={i} position={[x, 0, z]} scale={[0.45, 0.01, 0.45]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color="#0b1524"
              metalness={0.65}
              roughness={0.28}
              emissive="#c9a227"
              emissiveIntensity={0.12}
            />
          </mesh>
        );
      })}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#050a12" metalness={0.4} roughness={0.8} />
      </mesh>
    </group>
  );
}

/**
 * Scene 08 — Investment city rises · BUILD / INVEST / GROW.
 */
export default function Scene08Investment() {
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);
  const words = useRef<THREE.Group>(null);
  const pageP = useRef(0);

  useFrame(() => {
    const p = pageProgress(scroll.offset, 7);
    pageP.current = p;
    const active = p > 0.01 && p < 0.995;
    if (group.current) group.current.visible = active;
    if (!active) return;

    if (words.current) {
      HOME_COPY.investLines.forEach((_, i) => {
        const child = words.current!.children[i] as THREE.Object3D | undefined;
        if (!child) return;
        const local = smoothstep(0.35 + i * 0.15, 0.55 + i * 0.15, p);
        child.visible = local > 0.05;
        child.scale.setScalar(0.8 + local * 0.25);
        child.position.y = 1.6 - i * 0.85 + (1 - local) * -0.4;
      });
    }
  });

  return (
    <group ref={group} visible={false}>
      <fog attach="fog" args={["#03060c", 6, 18]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 8, 2]} intensity={1.25} color="#ffe6b0" />
      <Towers progressRef={pageP} />

      <group ref={words} position={[0, 0, 3]}>
        {HOME_COPY.investLines.map((w) => (
          <Text
            key={w}
            fontSize={0.7}
            letterSpacing={0.16}
            anchorX="center"
            anchorY="middle"
            color="#ffffff"
            outlineWidth={0.02}
            outlineColor="#e0b84a"
          >
            {w}
          </Text>
        ))}
      </group>
    </group>
  );
}
