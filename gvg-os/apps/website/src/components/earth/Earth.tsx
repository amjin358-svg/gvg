"use client";

import { useRef, type MutableRefObject } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, BackSide, type Group } from "three";
import { MOVIE_ACCENT, movieAsset } from "@/lib/cinematic";
import { EarthCountryMarkers } from "@/components/earth/EarthCountryMarkers";
import { EarthTradeNetwork } from "@/components/earth/EarthTradeNetwork";

type EarthProps = {
  /** External scroll-driven Y rotation (radians) */
  rotationYRef?: MutableRefObject<{ value: number }>;
  /** Orbital rings for Earth scene */
  showOrbits?: boolean;
  /** Blink country markers with labels */
  showCountries?: boolean;
  /** Golden trade arcs + city lights */
  showTradeNetwork?: boolean;
  /** Auto-spin when not scrub-driven */
  autoSpin?: number;
};

/**
 * Photoreal Earth with Blue Marble day map + night lights emissive.
 */
export function Earth({
  rotationYRef,
  showOrbits = false,
  showCountries = false,
  showTradeNetwork = false,
  autoSpin = 0.002,
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
      orbits.current.rotation.y += delta * 0.14;
      orbits.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group>
      <group ref={group}>
        <mesh>
          <sphereGeometry args={[1.6, 96, 96]} />
          <meshStandardMaterial
            map={dayMap}
            roughnessMap={topoMap}
            roughness={0.72}
            metalness={0.08}
            emissiveMap={nightMap}
            emissive="#ffd9a0"
            emissiveIntensity={0.78}
          />
        </mesh>
        {/* Thin white mist rim — slight glow */}
        <mesh>
          <sphereGeometry args={[1.618, 64, 64]} />
          <meshBasicMaterial
            color="#f2f7ff"
            transparent
            opacity={0.28}
            depthWrite={false}
            side={BackSide}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.628, 64, 64]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.1}
            depthWrite={false}
          />
        </mesh>
        {/* Soft wireframe veil */}
        <mesh>
          <sphereGeometry args={[1.605, 36, 36]} />
          <meshBasicMaterial
            color={MOVIE_ACCENT}
            wireframe
            transparent
            opacity={0.04}
          />
        </mesh>
        {showTradeNetwork ? <EarthTradeNetwork /> : null}
        {showCountries ? <EarthCountryMarkers /> : null}
      </group>

      {showOrbits ? (
        <group ref={orbits}>
          {[1.95, 2.2, 2.45].map((r, i) => (
            <mesh key={r} rotation={[Math.PI / 2.6 + i * 0.35, 0.4 * i, 0.2]}>
              <torusGeometry args={[r, 0.0035 + i * 0.0012, 10, 128]} />
              <meshBasicMaterial
                color={i === 1 ? "#F0C14D" : MOVIE_ACCENT}
                transparent
                opacity={0.38 - i * 0.07}
              />
            </mesh>
          ))}
        </group>
      ) : null}
    </group>
  );
}

export default Earth;
