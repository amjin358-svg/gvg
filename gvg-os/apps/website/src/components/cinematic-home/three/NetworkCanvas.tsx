"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { MutableRefObject } from "react";
import { Earth } from "@/components/three/Earth";
import * as THREE from "three";
import { NETWORK_CITIES } from "@/lib/cinematicHomeContent";

function latLonToVec(lat: number, lon: number, r = 1.62) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function Arc({
  a,
  b,
  progress,
  index,
  total,
}: {
  a: THREE.Vector3;
  b: THREE.Vector3;
  progress: MutableRefObject<number>;
  index: number;
  total: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => {
    const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(2.15);
    return new THREE.QuadraticBezierCurve3(a, mid, b);
  }, [a, b]);
  const tubular = useMemo(() => new THREE.TubeGeometry(curve, 48, 0.012, 6, false), [curve]);

  useFrame(() => {
    if (!ref.current) return;
    const start = index / total;
    const local = Math.min(1, Math.max(0, (progress.current - start) / 0.35));
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.15 + local * 0.85;
    ref.current.scale.setScalar(0.85 + local * 0.2);
  });

  return (
    <mesh ref={ref} geometry={tubular}>
      <meshBasicMaterial color="#e0b84a" transparent opacity={0.2} depthWrite={false} />
    </mesh>
  );
}

function NetworkRig({ progress }: { progress: MutableRefObject<number> }) {
  const spin = useRef({ value: 0.4 });
  const points = useMemo(
    () => NETWORK_CITIES.map((c) => latLonToVec(c.lat, c.lon)),
    [],
  );

  useFrame((_, delta) => {
    spin.current.value += delta * 0.08;
  });

  return (
    <group rotation={[0.2, 0, 0]}>
      <Earth rotationYRef={spin} autoSpin={0} showTradeNetwork showCountries={false} />
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial color="#ffe29a" />
        </mesh>
      ))}
      {points.map((p, i) => {
        const next = points[(i + 1) % points.length]!;
        return (
          <Arc
            key={`arc-${i}`}
            a={p}
            b={next}
            progress={progress}
            index={i}
            total={points.length}
          />
        );
      })}
    </group>
  );
}

export function NetworkCanvas({ progress }: { progress: MutableRefObject<number> }) {
  return (
    <Canvas
      className="cx-network__canvas"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.4, 5.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 2, 3]} intensity={1.2} color="#fff2d6" />
      <NetworkRig progress={progress} />
    </Canvas>
  );
}
