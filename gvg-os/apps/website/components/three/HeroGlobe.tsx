"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Stars as DreiStars } from "@react-three/drei";
import type { Group, Mesh, Points } from "three";
import * as THREE from "three";

function latLonToVec3(lat: number, lon: number, r = 1.62) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function arcPoints(a: THREE.Vector3, b: THREE.Vector3, segments = 72) {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = new THREE.Vector3().lerpVectors(a, b, t);
    p.normalize().multiplyScalar(1.62 + Math.sin(t * Math.PI) * 0.34);
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

function CityLights() {
  const points = useMemo(() => {
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
      [55.75, 37.62],
      [39.9, 116.4],
      [37.57, 126.98],
      [13.75, 100.5],
    ];
    for (const [lat, lon] of cities) {
      const v = latLonToVec3(lat!, lon!, 1.605);
      positions.push(v.x, v.y, v.z);
    }
    // denser procedural night lights belt
    for (let i = 0; i < 420; i++) {
      const lat = (Math.random() - 0.35) * 70;
      const lon = Math.random() * 360 - 180;
      const v = latLonToVec3(lat, lon, 1.603 + Math.random() * 0.004);
      if (Math.abs(lat) < 55) positions.push(v.x, v.y, v.z);
    }
    return new Float32Array(positions);
  }, []);

  const ref = useRef<Points>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.55 + Math.sin(clock.elapsedTime * 1.6) * 0.2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffd9a0"
        size={0.028}
        transparent
        opacity={0.7}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function NetworkArcs() {
  const hubs = useMemo(() => HUBS.map((h) => latLonToVec3(h.lat, h.lon)), []);
  const routes = useMemo(
    () => ROUTES.map(([i, j]) => arcPoints(hubs[i]!, hubs[j]!)),
    [hubs],
  );
  const pulse = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!pulse.current) return;
    const t = clock.elapsedTime;
    pulse.current.children.forEach((child, i) => {
      const s = 1 + Math.sin(t * 2.4 + i) * 0.35;
      child.scale.setScalar(s);
    });
  });

  return (
    <group>
      <group ref={pulse}>
        {hubs.map((p, i) => (
          <mesh key={`hub-${i}`} position={p}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshBasicMaterial color="#7EB6FF" transparent opacity={0.95} />
          </mesh>
        ))}
      </group>
      {routes.map((pts, i) => (
        <Line
          key={`arc-${i}`}
          points={pts}
          color={i % 2 === 0 ? "#6EA8FF" : "#C8A35F"}
          lineWidth={1.35}
          transparent
          opacity={0.88}
        />
      ))}
    </group>
  );
}

export function HeroGlobe() {
  const group = useRef<Group>(null);
  const atmos = useRef<Mesh>(null);
  const wire = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.09;
    if (wire.current) wire.current.rotation.y -= delta * 0.03;
    if (atmos.current) {
      const mat = atmos.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.13 + Math.sin(performance.now() * 0.0011) * 0.035;
    }
  });

  return (
    <>
      <fog attach="fog" args={["#01040c", 8, 20]} />
      <ambientLight intensity={0.32} />
      <directionalLight position={[-4.2, 2.2, 3]} intensity={2.4} color="#b7d4ff" />
      <directionalLight position={[3.2, -1.2, 2]} intensity={0.7} color="#7a63ff" />
      <pointLight
        position={[-2.8, 0.4, 2.2]}
        intensity={4.2}
        color="#8ec0ff"
        distance={10}
      />
      <DreiStars
        radius={90}
        depth={55}
        count={6500}
        factor={3.8}
        saturation={0.55}
        fade
        speed={0.35}
      />
      <group ref={group} position={[0.55, -0.05, 0]} scale={1.22}>
        <mesh>
          <sphereGeometry args={[1.6, 96, 96]} />
          <meshStandardMaterial
            color="#07162f"
            roughness={0.48}
            metalness={0.42}
            emissive="#0c2a58"
            emissiveIntensity={0.55}
          />
        </mesh>
        <mesh ref={wire}>
          <sphereGeometry args={[1.608, 64, 64]} />
          <meshBasicMaterial
            color="#3d7cff"
            wireframe
            transparent
            opacity={0.1}
          />
        </mesh>
        <mesh ref={atmos}>
          <sphereGeometry args={[1.82, 64, 64]} />
          <meshBasicMaterial
            color="#4f8dff"
            transparent
            opacity={0.14}
            side={THREE.BackSide}
            depthWrite={false}
          />
        </mesh>
        <CityLights />
        <NetworkArcs />
      </group>
    </>
  );
}

export default HeroGlobe;
