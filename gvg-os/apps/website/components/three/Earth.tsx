"use client";

import { useRef, type MutableRefObject } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, type Group } from "three";
import { BRAND_GOLD, MOVIE_ACCENT, movieAsset } from "@/lib/cinematic";
import { EarthCountryMarkers } from "@/components/three/EarthCountryMarkers";
import { EarthTradeNetwork } from "@/components/three/EarthTradeNetwork";

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
        {/* Atmosphere rim — horizon sunburst feel */}
        <mesh>
          <sphereGeometry args={[1.72, 64, 64]} />
          <meshBasicMaterial
            color="#6eb6ff"
            transparent
            opacity={0.14}
            depthWrite={false}
          />
        </mesh>
        {/* Soft wireframe veil */}
        <mesh>
          <sphereGeometry args={[1.63, 36, 36]} />
          <meshBasicMaterial
            color={MOVIE_ACCENT}
            wireframe
            transparent
            opacity={0.055}
          />
        </mesh>
        {showTradeNetwork ? <EarthTradeNetwork /> : null}
        {showCountries ? <EarthCountryMarkers /> : null}
      </group>

      {showOrbits ? (
        <group ref={orbits}>
          {[1.95, 2.2, 2.45].map((r, i) => (
            <mesh key={r} rotation={[Math.PI / 2.6 + i * 0.35, 0.4 * i, 0.2]}>
              {/* Thinner satellite orbit lines */}
              <torusGeometry args={[r, 0.0035 + i * 0.0012, 10, 128]} />
              <meshBasicMaterial
                color={i === 1 ? BRAND_GOLD : MOVIE_ACCENT}
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
