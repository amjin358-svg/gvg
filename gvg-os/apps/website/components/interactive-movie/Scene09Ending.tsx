"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Text, useScroll } from "@react-three/drei";
import * as THREE from "three";
import { HOME_COPY } from "@/lib/cinematicHomeContent";
import { pageProgress, smoothstep } from "./scrollMath";

/**
 * Scene 09 — Dissolve → reform GVG · BUILD BEYOND BORDERS · ENTER CTA.
 */
export default function Scene09Ending() {
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);
  const dust = useRef<THREE.Points>(null);
  const logo = useRef<THREE.Group>(null);
  const copy = useRef<THREE.Group>(null);

  const COUNT = 1600;
  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      seeds[i * 3] = (Math.random() - 0.5) * 8;
      seeds[i * 3 + 1] = (Math.random() - 0.5) * 5;
      seeds[i * 3 + 2] = (Math.random() - 0.5) * 6;
      positions[i * 3] = seeds[i * 3]!;
      positions[i * 3 + 1] = seeds[i * 3 + 1]!;
      positions[i * 3 + 2] = seeds[i * 3 + 2]!;
    }
    return { positions, seeds };
  }, []);

  const portal = process.env.NEXT_PUBLIC_PORTAL_URL || "/portal";

  useFrame(() => {
    const p = pageProgress(scroll.offset, 8);
    const active = p > 0.01;
    if (group.current) group.current.visible = active;
    if (!active) return;

    const reform = smoothstep(0.15, 0.65, p);
    const copyIn = smoothstep(0.55, 0.85, p);

    if (dust.current) {
      const arr = dust.current.geometry.attributes.position!.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        arr[i * 3] = seeds[i * 3]! * (1 - reform);
        arr[i * 3 + 1] = seeds[i * 3 + 1]! * (1 - reform);
        arr[i * 3 + 2] = seeds[i * 3 + 2]! * (1 - reform);
      }
      dust.current.geometry.attributes.position!.needsUpdate = true;
      const mat = dust.current.material as THREE.PointsMaterial;
      mat.opacity = 0.75 * (1 - reform * 0.95);
    }

    if (logo.current) {
      logo.current.visible = reform > 0.08;
      logo.current.scale.setScalar(0.35 + reform * 0.95);
    }

    if (copy.current) {
      copy.current.visible = copyIn > 0.05;
      copy.current.position.y = THREE.MathUtils.lerp(-1.8, -1.35, copyIn);
    }
  });

  return (
    <group ref={group} visible={false}>
      <points ref={dust}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#e8c56a"
          size={0.03}
          transparent
          opacity={0.7}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <group ref={logo} position={[0, 0.35, 0]}>
        <Text
          fontSize={1.35}
          letterSpacing={0.12}
          anchorX="center"
          anchorY="middle"
          color="#f5f7fa"
          outlineWidth={0.04}
          outlineColor="#e0b84a"
        >
          GVG
        </Text>
        <mesh position={[0, 0, -0.15]} scale={[3.8, 1.4, 1]}>
          <planeGeometry />
          <meshBasicMaterial
            color="#e0b84a"
            transparent
            opacity={0.1}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      <group ref={copy} position={[0, -1.5, 1]}>
        <Text
          fontSize={0.28}
          letterSpacing={0.18}
          anchorX="center"
          anchorY="middle"
          color="#f0d080"
          maxWidth={10}
        >
          {HOME_COPY.tagline}
        </Text>
        <Html center position={[0, -0.7, 0]} style={{ pointerEvents: "auto" }}>
          <div className="im-ending-cta">
            <a className="im-glass-btn" href={portal}>
              {HOME_COPY.endingCta}
            </a>
            <a className="im-ending-link" href="./experience/">
              Watch Interactive Movie
            </a>
          </div>
        </Html>
      </group>
    </group>
  );
}
