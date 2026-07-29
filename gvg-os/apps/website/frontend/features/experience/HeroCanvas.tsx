"use client";

import { Suspense, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Text } from "@react-three/drei";
import * as THREE from "three";

/** Smooth Hermite interpolation, clamped to [0,1]. */
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

type ProgressRef = RefObject<number>;

const BRAND_GOLD = "#d4a017";
const BRAND_TEAL = "#1a7a6d";
const SPACE_BG = "#050a14";

/* ---------------------------------------------------------------- */
/* Interstellar flight — points streaking toward the camera (星際飛行) */
/* ---------------------------------------------------------------- */
function WarpStars({ progress }: { progress: ProgressRef }) {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 900;

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 44;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 2] = -60 * Math.random();
      speeds[i] = 0.4 + Math.random() * 0.9;
    }
    return { positions, speeds };
  }, []);

  useFrame((_, delta) => {
    const geo = ref.current?.geometry;
    if (!geo) return;
    const p = progress.current ?? 0;
    const boost = 1 + smoothstep(0.1, 0.55, p) * 16;
    const arr = geo.attributes.position!.array as Float32Array;
    const step = Math.min(delta, 0.05);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 2] += step * speeds[i]! * boost;
      if (arr[i * 3 + 2] > 9) {
        arr[i * 3 + 2] = -60;
        arr[i * 3] = (Math.random() - 0.5) * 44;
        arr[i * 3 + 1] = (Math.random() - 0.5) * 26;
      }
    }
    geo.attributes.position!.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#cfe6ff"
        size={0.07}
        sizeAttenuation
        transparent
        opacity={0.95}
        depthWrite={false}
      />
    </points>
  );
}

/* ---------------------------------------------------------------- */
/* 3D headline text (3D文字)                                          */
/* ---------------------------------------------------------------- */
function HeroText3D({ progress }: { progress: ProgressRef }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const grp = group.current;
    if (!grp) return;
    const p = progress.current ?? 0;
    const intro = smoothstep(0, 0.22, p);
    const exit = smoothstep(0.3, 0.5, p);
    grp.scale.setScalar(0.65 + intro * 0.5);
    grp.position.z = THREE.MathUtils.lerp(0, -10, exit);
    grp.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.12;
    grp.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.03;
    grp.visible = exit < 0.98;
  });

  return (
    <group ref={group}>
      <Text
        fontSize={2.6}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
        color={BRAND_GOLD}
        outlineWidth={0.02}
        outlineColor="#0a1628"
      >
        GVG
      </Text>
      <Text
        position={[0, -1.7, 0]}
        fontSize={0.42}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.24}
        color="#e9f0f7"
      >
        GLOBAL TRADE OS
      </Text>
    </group>
  );
}

/* ---------------------------------------------------------------- */
/* Global connection network (全球連線動畫)                           */
/* ---------------------------------------------------------------- */
const GLOBE_RADIUS = 2;

type City = { name: string; lat: number; lon: number };
const CITIES: City[] = [
  { name: "Shanghai", lat: 31.2, lon: 121.5 },
  { name: "Los Angeles", lat: 34.0, lon: -118.2 },
  { name: "Rotterdam", lat: 51.9, lon: 4.5 },
  { name: "Singapore", lat: 1.35, lon: 103.8 },
  { name: "Dubai", lat: 25.2, lon: 55.3 },
  { name: "Hamburg", lat: 53.5, lon: 10.0 },
  { name: "New York", lat: 40.7, lon: -74.0 },
  { name: "Tokyo", lat: 35.7, lon: 139.7 },
];
const ROUTES: [number, number][] = [
  [0, 1],
  [0, 2],
  [3, 4],
  [4, 5],
  [6, 2],
  [7, 1],
  [3, 0],
];

function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function TradeArc({ from, to, offset }: { from: City; to: City; offset: number }) {
  const dot = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const start = latLonToVec3(from.lat, from.lon, GLOBE_RADIUS);
    const end = latLonToVec3(to.lat, to.lon, GLOBE_RADIUS);
    const mid = start
      .clone()
      .add(end)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(GLOBE_RADIUS + 0.9 + start.distanceTo(end) * 0.15);
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [from, to]);

  const tubeArgs = useMemo(
    () => [curve, 48, 0.02, 8, false] as const,
    [curve],
  );

  useFrame((state) => {
    const mesh = dot.current;
    if (!mesh) return;
    const t = (state.clock.elapsedTime * 0.25 + offset) % 1;
    const pos = curve.getPointAt(t);
    mesh.position.copy(pos);
  });

  return (
    <group>
      <mesh>
        <tubeGeometry args={tubeArgs} />
        <meshBasicMaterial
          color={BRAND_GOLD}
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={dot}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#fff2cc" />
      </mesh>
    </group>
  );
}

function TradeGlobe({ progress }: { progress: ProgressRef }) {
  const group = useRef<THREE.Group>(null);

  const cityPoints = useMemo(
    () => CITIES.map((c) => latLonToVec3(c.lat, c.lon, GLOBE_RADIUS)),
    [],
  );

  useFrame((_, delta) => {
    const grp = group.current;
    if (!grp) return;
    const p = progress.current ?? 0;
    const grow = smoothstep(0.48, 0.8, p);
    grp.scale.setScalar(Math.max(0.0001, grow));
    grp.rotation.y += delta * 0.12;
    grp.visible = grow > 0.002;
  });

  return (
    <group ref={group} visible={false}>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshStandardMaterial
          color="#0b2540"
          emissive="#08203a"
          emissiveIntensity={0.5}
          roughness={0.85}
          metalness={0.15}
        />
      </mesh>
      <mesh scale={1.002}>
        <sphereGeometry args={[GLOBE_RADIUS, 32, 24]} />
        <meshBasicMaterial
          color={BRAND_TEAL}
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>
      <mesh scale={1.14}>
        <sphereGeometry args={[GLOBE_RADIUS, 32, 32]} />
        <meshBasicMaterial
          color={BRAND_TEAL}
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
      {cityPoints.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color="#ffe9a8" />
        </mesh>
      ))}
      {ROUTES.map(([a, b], i) => (
        <TradeArc
          key={i}
          from={CITIES[a]!}
          to={CITIES[b]!}
          offset={i / ROUTES.length}
        />
      ))}
    </group>
  );
}

/* ---------------------------------------------------------------- */
/* Camera dolly — galaxy zoom + settle (Galaxy Zoom)                 */
/* ---------------------------------------------------------------- */
function CameraRig({ progress }: { progress: ProgressRef }) {
  useFrame((state) => {
    const p = progress.current ?? 0;
    const zoom = smoothstep(0, 0.28, p);
    const settle = smoothstep(0.5, 0.85, p);
    const targetZ = 11 - zoom * 3 + settle * 0.4;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.06;
    state.camera.position.x +=
      (Math.sin(state.clock.elapsedTime * 0.15) * 0.35 - state.camera.position.x) * 0.04;
    state.camera.position.y +=
      (Math.cos(state.clock.elapsedTime * 0.12) * 0.2 - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function GalaxySpin({ progress }: { progress: ProgressRef }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    const grp = ref.current;
    if (!grp) return;
    const p = progress.current ?? 0;
    grp.rotation.y += delta * 0.02;
    grp.scale.setScalar(1 + smoothstep(0, 0.3, p) * 0.4);
  });
  return (
    <group ref={ref}>
      <Stars radius={80} depth={60} count={4200} factor={4} saturation={0.4} fade speed={0.6} />
    </group>
  );
}

export function HeroCanvas({ progress }: { progress: ProgressRef }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 11], fov: 60 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={[SPACE_BG]} />
      <fog attach="fog" args={[SPACE_BG, 14, 48]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 4, 8]} intensity={1.4} color="#dfeaff" />
      <pointLight position={[-6, -2, 2]} intensity={40} color={BRAND_TEAL} distance={30} />

      <CameraRig progress={progress} />
      <GalaxySpin progress={progress} />
      <WarpStars progress={progress} />

      <Suspense fallback={null}>
        <HeroText3D progress={progress} />
      </Suspense>

      <TradeGlobe progress={progress} />
    </Canvas>
  );
}

export default HeroCanvas;
