"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, useScroll } from "@react-three/drei";
import * as THREE from "three";
import { HOME_COPY } from "@/lib/cinematicHomeContent";
import { pageProgress, smoothstep } from "./scrollMath";

/**
 * Scene 05 — AI Universe · particles → glass boards → AI Core.
 */
export default function Scene05AIUniverse() {
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const boards = useRef<THREE.Group>(null);
  const title = useRef<THREE.Group>(null);

  const count = 900;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 0.4 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const metrics = ["98.4%", "Δ +12.6", "24/7", "1.2B", "∞", "CORE"];

  useFrame((state) => {
    const p = pageProgress(scroll.offset, 4);
    const active = p > 0.01 && p < 0.995;
    if (group.current) group.current.visible = active;
    if (!active) return;

    const t = state.clock.elapsedTime;
    const coreIn = smoothstep(0.5, 0.85, p);
    const boardIn = smoothstep(0.12, 0.45, p);
    const boardOut = 1 - smoothstep(0.55, 0.75, p);

    if (core.current) {
      core.current.scale.setScalar(0.2 + coreIn * 1.0);
      core.current.rotation.y = t * 0.4;
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.25;
      ring.current.rotation.x = 0.55 + p * 0.25;
      ring.current.visible = coreIn > 0.1;
    }
    if (boards.current) {
      boards.current.visible = boardIn > 0.05;
      boards.current.scale.setScalar(0.85 + boardIn * 0.15);
      boards.current.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.material && "opacity" in (mesh.material as THREE.Material)) {
          (mesh.material as THREE.MeshBasicMaterial).opacity = 0.55 * boardIn * boardOut;
        }
      });
    }
    if (title.current) {
      const ti = smoothstep(0.65, 0.9, p);
      title.current.visible = ti > 0.05;
      title.current.position.y = THREE.MathUtils.lerp(-2.6, -2.0, ti);
      title.current.scale.setScalar(0.8 + ti * 0.2);
    }
  });

  return (
    <group ref={group} visible={false}>
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 2, 3]} intensity={1.2} color="#ffd9a0" />

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#f0d080"
          size={0.028}
          transparent
          opacity={0.7}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh ref={core}>
        <icosahedronGeometry args={[0.55, 2]} />
        <meshStandardMaterial
          color="#1a1208"
          emissive="#c9a227"
          emissiveIntensity={1.35}
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[1.35, 0.02, 12, 80]} />
        <meshBasicMaterial color="#e0b84a" transparent opacity={0.7} />
      </mesh>

      <group ref={boards} position={[0, 0.3, 1.5]}>
        {metrics.map((m, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          return (
            <group key={m} position={[(col - 1) * 2.1, (0.5 - row) * 1.3, 0]}>
              <mesh>
                <planeGeometry args={[1.8, 1]} />
                <meshBasicMaterial color="#101820" transparent opacity={0.55} depthWrite={false} />
              </mesh>
              <Text
                position={[0, 0, 0.02]}
                fontSize={0.28}
                anchorX="center"
                anchorY="middle"
                color="#ffffff"
                outlineWidth={0.008}
                outlineColor="#e0b84a"
              >
                {m}
              </Text>
            </group>
          );
        })}
      </group>

      <group ref={title} position={[0, -2.2, 2]}>
        <Text
          fontSize={0.42}
          letterSpacing={0.06}
          anchorX="center"
          anchorY="middle"
          color="#ffffff"
          maxWidth={8}
        >
          {HOME_COPY.aiTitle}
        </Text>
        <Text
          position={[0, -0.55, 0]}
          fontSize={0.22}
          letterSpacing={0.12}
          anchorX="center"
          anchorY="middle"
          color="#f0d080"
          maxWidth={8}
        >
          {HOME_COPY.aiSub}
        </Text>
      </group>
    </group>
  );
}
