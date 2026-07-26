"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import type { Group, Mesh } from "three";
import * as THREE from "three";
import { Stars } from "@/components/three/Stars";

/** Lat/lon → unit sphere position */
function latLonToVec3(lat: number, lon: number, r = 1.62) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function arcPoints(a: THREE.Vector3, b: THREE.Vector3, segments = 48) {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = new THREE.Vector3().lerpVectors(a, b, t);
    p.normalize().multiplyScalar(1.62 + Math.sin(t * Math.PI) * 0.32);
    points.push(p);
  }
  return points;
}

const HUBS = [
  { lat: 37.8, lon: -122.4 }, // USA West
  { lat: 40.7, lon: -74.0 }, // USA East
  { lat: 25.0, lon: 121.5 }, // Taiwan
  { lat: 35.7, lon: 139.7 }, // Japan
  { lat: 10.8, lon: 106.7 }, // Vietnam
  { lat: 52.5, lon: 13.4 }, // Europe
];

const ROUTES: [number, number][] = [
  [0, 2],
  [1, 5],
  [2, 3],
  [3, 4],
  [4, 5],
  [0, 5],
];

function NetworkArcs() {
  const hubs = useMemo(
    () => HUBS.map((h) => latLonToVec3(h.lat, h.lon)),
    [],
  );
  const routes = useMemo(
    () => ROUTES.map(([i, j]) => arcPoints(hubs[i]!, hubs[j]!)),
    [hubs],
  );

  return (
    <group>
      {hubs.map((p, i) => (
        <mesh key={`hub-${i}`} position={p}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color="#5B8CFF" />
        </mesh>
      ))}
      {routes.map((pts, i) => (
        <Line
          key={`arc-${i}`}
          points={pts}
          color={i % 2 === 0 ? "#6EA8FF" : "#C8A35F"}
          lineWidth={1.2}
          transparent
          opacity={0.85}
        />
      ))}
    </group>
  );
}

export function HeroGlobe() {
  const group = useRef<Group>(null);
  const atmos = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12;
    if (atmos.current) {
      const mat = atmos.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.14 + Math.sin(performance.now() * 0.0012) * 0.03;
    }
  });

  return (
    <>
      <color attach="background" args={["#02060f"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[-4, 2, 3]} intensity={2.2} color="#9ec5ff" />
      <directionalLight position={[3, -1, 2]} intensity={0.6} color="#6b5cff" />
      <pointLight position={[-2.5, 0.5, 2]} intensity={3.5} color="#7eb6ff" distance={8} />
      <Stars />
      <group ref={group} position={[0.35, -0.1, 0]} scale={1.15}>
        <mesh>
          <sphereGeometry args={[1.6, 64, 64]} />
          <meshStandardMaterial
            color="#0a1a3a"
            roughness={0.55}
            metalness={0.4}
            emissive="#0d2a5c"
            emissiveIntensity={0.45}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.605, 48, 48]} />
          <meshBasicMaterial color="#3d7cff" wireframe transparent opacity={0.12} />
        </mesh>
        <mesh ref={atmos}>
          <sphereGeometry args={[1.78, 48, 48]} />
          <meshBasicMaterial
            color="#4f8dff"
            transparent
            opacity={0.14}
            side={THREE.BackSide}
          />
        </mesh>
        <NetworkArcs />
      </group>
    </>
  );
}

export default HeroGlobe;
