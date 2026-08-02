"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, useScroll } from "@react-three/drei";
import * as THREE from "three";
import { CRAWL_LINES } from "@/lib/cinematicHomeContent";
import { pageProgress, smoothstep } from "@/components/cinematic/scrollMath";

/**
 * Scene 02 — Logo rises · Star Wars perspective crawl.
 */
export default function Scene02StarWars() {
  const scroll = useScroll();
  const logo = useRef<THREE.Group>(null);
  const crawl = useRef<THREE.Group>(null);

  const lines = useMemo(() => [...CRAWL_LINES], []);

  useFrame(() => {
    const p = pageProgress(scroll.offset, 1);
    const visible = p > 0.02 && p < 0.98;

    if (logo.current) {
      logo.current.visible = visible || pageProgress(scroll.offset, 0) > 0.5;
      const rise = smoothstep(0, 0.45, p);
      logo.current.position.y = THREE.MathUtils.lerp(0.15, 3.2, rise);
      logo.current.scale.setScalar(THREE.MathUtils.lerp(1.3, 0.45, rise));
      const matFade = 1 - smoothstep(0.35, 0.7, p);
      logo.current.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.material && "opacity" in (mesh.material as THREE.Material)) {
          (mesh.material as THREE.MeshBasicMaterial).transparent = true;
          (mesh.material as THREE.MeshBasicMaterial).opacity = matFade;
        }
      });
    }

    if (crawl.current) {
      crawl.current.visible = visible;
      // Slow crawl upward in perspective space
      crawl.current.position.y = THREE.MathUtils.lerp(-8.5, 14, p);
      const fadeIn = smoothstep(0.05, 0.2, p);
      const fadeOut = 1 - smoothstep(0.88, 1, p);
      crawl.current.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const m = (obj as THREE.Mesh).material as THREE.MeshBasicMaterial;
          if (m && "opacity" in m) {
            m.transparent = true;
            m.opacity = fadeIn * fadeOut;
          }
        }
      });
    }
  });

  return (
    <group>
      <group ref={logo} position={[0, 0.15, 0]}>
        <Text
          fontSize={1.2}
          letterSpacing={0.12}
          anchorX="center"
          anchorY="middle"
          color="#f5f7fa"
          outlineWidth={0.04}
          outlineColor="#e0b84a"
        >
          GVG
        </Text>
      </group>

      <group
        ref={crawl}
        position={[0, -8.5, -2]}
        rotation={[-0.95, 0, 0]}
      >
        {lines.map((line, i) => (
          <Text
            key={line}
            position={[0, -i * 1.15, 0]}
            fontSize={0.72}
            letterSpacing={0.1}
            anchorX="center"
            anchorY="middle"
            color="#ffffff"
            outlineWidth={0.028}
            outlineColor="#e0b84a"
            maxWidth={12}
            textAlign="center"
          >
            {line}
          </Text>
        ))}
      </group>
    </group>
  );
}
