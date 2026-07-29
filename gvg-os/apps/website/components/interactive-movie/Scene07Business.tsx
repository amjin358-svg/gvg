"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, useScroll } from "@react-three/drei";
import * as THREE from "three";
import { SERVICE_BEATS } from "@/lib/cinematicHomeContent";
import { pageProgress, smoothstep } from "./scrollMath";

/**
 * Scene 07 — Business Services cinematic montage.
 */
export default function Scene07Business() {
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);
  const cards = useRef<(THREE.Group | null)[]>([]);

  useFrame(() => {
    const p = pageProgress(scroll.offset, 6);
    const active = p > 0.01 && p < 0.995;
    if (group.current) group.current.visible = active;
    if (!active) return;

    const n = SERVICE_BEATS.length;
    cards.current.forEach((card, i) => {
      if (!card) return;
      const start = i / n;
      const local = smoothstep(start, start + 0.12, p);
      const exit = i === n - 1 ? 1 : 1 - smoothstep(start + 0.12, start + 0.22, p);
      const show = local * Math.max(exit, i === n - 1 ? 1 : 0.15);
      card.visible = show > 0.02;
      card.scale.setScalar(0.9 + local * 0.12);
      card.position.y = THREE.MathUtils.lerp(-0.4, 0.15, local);
      card.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.material && "opacity" in (mesh.material as THREE.Material)) {
          (mesh.material as THREE.MeshBasicMaterial).transparent = true;
          (mesh.material as THREE.MeshBasicMaterial).opacity = Math.min(1, show);
        }
      });
    });
  });

  return (
    <group ref={group} visible={false}>
      {SERVICE_BEATS.map((beat, i) => (
        <group
          key={beat}
          ref={(el) => {
            cards.current[i] = el;
          }}
          position={[0, 0, 1.5]}
        >
          <mesh>
            <planeGeometry args={[5.2, 2.2]} />
            <meshBasicMaterial color="#0c1420" transparent opacity={0.7} depthWrite={false} />
          </mesh>
          <Text
            position={[0, 0.45, 0.03]}
            fontSize={0.18}
            letterSpacing={0.22}
            anchorX="center"
            color="#e0b84a"
          >
            {String(i + 1).padStart(2, "0")}
          </Text>
          <Text
            position={[0, -0.15, 0.03]}
            fontSize={0.48}
            letterSpacing={0.08}
            anchorX="center"
            color="#ffffff"
            maxWidth={5}
            textAlign="center"
          >
            {beat}
          </Text>
        </group>
      ))}
    </group>
  );
}
