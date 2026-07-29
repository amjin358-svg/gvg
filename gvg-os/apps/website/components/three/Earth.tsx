"use client";

import { useRef, type MutableRefObject } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, type Group } from "three";
import { BRAND_GOLD, MOVIE_ACCENT, movieAsset } from "@/lib/cinematic";
import { EarthCountryMarkers } from "@/components/three/EarthCountryMarkers";

type EarthProps = {
  /** External scroll-driven Y rotation (radians) */
  rotationYRef?: MutableRefObject<{ value: number }>;
  /** Orbital rings for Earth scene */
  showOrbits?: boolean;
  /** Blink country markers with labels */
  showCountries?: boolean;
  /** Continuous spin (rad/frame baseline) — always applied for living globe */
  autoSpin?: number;
};

/**
 * Photoreal Earth with Blue Marble day map + night lights emissive.
 * Continuous auto-spin is always on; scroll scrub adds on top.
 */
export function Earth({
  rotationYRef,
  showOrbits = false,
  showCountries = false,
  autoSpin = 0.0016,
}: EarthProps) {
  const group = useRef<Group>(null);
  const orbits = useRef<Group>(null);
  const drift = useRef(0);
  const [dayMap, nightMap, topoMap] = useLoader(TextureLoader, [
    movieAsset("earthDay"),
    movieAsset("earthNight"),
    movieAsset("earthTopo"),
  ]);

  useFrame((_, delta) => {
    drift.current += autoSpin * (delta * 60);
    if (group.current) {
      const scrub = rotationYRef?.current.value ?? 0;
      group.current.rotation.y = scrub + drift.current;
    }
    if (orbits.current) {
      orbits.current.rotation.y += delta * 0.12;
      orbits.current.rotation.z += delta * 0.04;
    }
  });

  return (
    <group>
      <group ref={group}>
        <mesh>
          <sphereGeometry args={[1.6, 64, 64]} />
          <meshStandardMaterial
            map={dayMap}
            roughnessMap={topoMap}
            roughness={0.72}
            metalness={0.08}
            emissiveMap={nightMap}
            emissive="#ffd9a0"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.72, 48, 48]} />
          <meshBasicMaterial
            color="#6eb6ff"
            transparent
            opacity={0.1}
            depthWrite={false}
          />
        </mesh>
        {showCountries ? <EarthCountryMarkers /> : null}
      </group>

      {showOrbits ? (
        <group ref={orbits}>
          {[1.95, 2.2, 2.45].map((r, i) => (
            <mesh key={r} rotation={[Math.PI / 2.6 + i * 0.35, 0.4 * i, 0.2]}>
              <torusGeometry args={[r, 0.0035 + i * 0.0012, 8, 96]} />
              <meshBasicMaterial
                color={i === 1 ? BRAND_GOLD : MOVIE_ACCENT}
                transparent
                opacity={0.32 - i * 0.06}
              />
            </mesh>
          ))}
        </group>
      ) : null}
    </group>
  );
}

export default Earth;
