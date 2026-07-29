"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, useScroll } from "@react-three/drei";
import * as THREE from "three";
import { NETWORK_CITIES, HOME_COPY } from "@/lib/cinematicHomeContent";
import { Earth } from "@/components/earth/Earth";
import { latLonToVec, pageProgress, smoothstep } from "@/components/cinematic/scrollMath";

function Arc({
  a,
  b,
  index,
  total,
  progressRef,
}: {
  a: THREE.Vector3;
  b: THREE.Vector3;
  index: number;
  total: number;
  progressRef: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => {
    const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(2.15);
    return new THREE.QuadraticBezierCurve3(a, mid, b);
  }, [a, b]);
  const geom = useMemo(() => new THREE.TubeGeometry(curve, 40, 0.012, 6, false), [curve]);

  useFrame(() => {
    if (!ref.current) return;
    const start = index / total;
    const local = smoothstep(start, start + 0.35, progressRef.current);
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.12 + local * 0.82;
    ref.current.scale.setScalar(0.85 + local * 0.2);
  });

  return (
    <mesh ref={ref} geometry={geom}>
      <meshBasicMaterial color="#e0b84a" transparent opacity={0.15} depthWrite={false} />
    </mesh>
  );
}

/**
 * Scene 04 — Cities activate · golden arcs · GVG GLOBAL NETWORK.
 */
export default function Scene04GlobalNetwork() {
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);
  const title = useRef<THREE.Group>(null);
  const spin = useRef({ value: 0.5 });
  const pageP = useRef(0);

  const points = useMemo(
    () =>
      NETWORK_CITIES.map((c) => {
        const v = latLonToVec(c.lat, c.lon);
        return new THREE.Vector3(v.x, v.y, v.z);
      }),
    [],
  );

  useFrame((_, delta) => {
    const p = pageProgress(scroll.offset, 3);
    pageP.current = p;
    const active = p > 0.01 && p < 0.995;
    if (group.current) group.current.visible = active;
    if (!active) return;

    spin.current.value += delta * 0.08;

    if (title.current) {
      const t = smoothstep(0.55, 0.85, p);
      title.current.scale.setScalar(0.7 + t * 0.3);
      title.current.position.y = THREE.MathUtils.lerp(-2.4, -1.85, t);
      title.current.visible = t > 0.05;
    }
  });

  return (
    <group ref={group} visible={false}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 2, 3]} intensity={1.15} color="#fff2d6" />
      <group rotation={[0.2, 0, 0]}>
        <Earth rotationYRef={spin} autoSpin={0} showTradeNetwork />
        {points.map((pt, i) => (
          <mesh key={i} position={pt}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshBasicMaterial color="#ffe29a" />
          </mesh>
        ))}
        {points.map((pt, i) => (
          <Arc
            key={`a-${i}`}
            a={pt}
            b={points[(i + 1) % points.length]!}
            index={i}
            total={points.length}
            progressRef={pageP}
          />
        ))}
      </group>

      <group ref={title} position={[0, -2.2, 2.5]}>
        <Text
          fontSize={0.38}
          letterSpacing={0.14}
          anchorX="center"
          anchorY="middle"
          color="#ffffff"
          outlineWidth={0.015}
          outlineColor="#e0b84a"
          maxWidth={10}
        >
          {HOME_COPY.networkTitle}
        </Text>
      </group>
    </group>
  );
}
