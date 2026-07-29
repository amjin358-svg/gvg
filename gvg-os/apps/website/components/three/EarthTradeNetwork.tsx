"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import type { Points } from "three";

function latLonToVec3(lat: number, lon: number, r = 1.62) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function arcPoints(a: THREE.Vector3, b: THREE.Vector3, segments = 26) {
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
  { lat: 37.8, lon: -122.4 },
  { lat: 40.7, lon: -74.0 },
  { lat: 25.0, lon: 121.5 },
  { lat: 35.7, lon: 139.7 },
  { lat: 10.8, lon: 106.7 },
  { lat: 52.5, lon: 13.4 },
  { lat: 1.35, lon: 103.8 },
  { lat: -33.87, lon: 151.2 },
];

const ROUTES: [number, number][] = [
  [0, 2],
  [1, 5],
  [2, 3],
  [3, 4],
  [4, 5],
  [0, 5],
  [2, 6],
  [3, 7],
  [1, 2],
];

/** Golden city lights + trade arcs — matches reference night-Earth look */
export function EarthTradeNetwork() {
  const lightRef = useRef<Points>(null);

  const hubs = useMemo(() => HUBS.map((h) => latLonToVec3(h.lat, h.lon)), []);
  const routes = useMemo(
    () => ROUTES.map(([i, j]) => arcPoints(hubs[i]!, hubs[j]!)),
    [hubs],
  );

  const cityPositions = useMemo(() => {
    const positions: number[] = [];
    const cities = [
      [40.7, -74],
      [34.05, -118.25],
      [51.5, -0.12],
      [48.85, 2.35],
      [35.68, 139.69],
      [31.23, 121.47],
      [22.32, 114.17],
      [25.03, 121.57],
      [1.35, 103.82],
      [28.61, 77.21],
      [-23.55, -46.63],
      [39.9, 116.4],
      [37.57, 126.98],
      [13.75, 100.5],
      [-33.87, 151.2],
    ];
    for (const [lat, lon] of cities) {
      const v = latLonToVec3(lat!, lon!, 1.605);
      positions.push(v.x, v.y, v.z);
    }
    for (let i = 0; i < 70; i++) {
      const lat = (Math.random() - 0.35) * 70;
      const lon = Math.random() * 360 - 180;
      if (Math.abs(lat) < 55) {
        const v = latLonToVec3(lat, lon, 1.603 + Math.random() * 0.004);
        positions.push(v.x, v.y, v.z);
      }
    }
    return new Float32Array(positions);
  }, []);

  useFrame(({ clock }) => {
    if (!lightRef.current) return;
    const mat = lightRef.current.material as THREE.PointsMaterial;
    mat.opacity = 0.55 + Math.sin(clock.elapsedTime * 1.15) * 0.18;
  });

  return (
    <group>
      <points ref={lightRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[cityPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#ffd9a0"
          size={0.028}
          transparent
          opacity={0.72}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {hubs.map((p, i) => (
        <mesh key={`hub-${i}`} position={p}>
          <sphereGeometry args={[0.024, 10, 10]} />
          <meshBasicMaterial color="#ffe6a8" transparent opacity={0.95} />
        </mesh>
      ))}

      {routes.map((pts, i) => (
        <Line
          key={`arc-${i}`}
          points={pts}
          color={i % 2 === 0 ? "#F0C14D" : "#9ec5ff"}
          lineWidth={1.15}
          transparent
          opacity={0.82}
        />
      ))}
    </group>
  );
}

export default EarthTradeNetwork;
