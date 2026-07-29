"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import {
  Color,
  MathUtils,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
} from "three";
import { GLOBAL_ROUTE } from "@/lib/globalRoute";

const EARTH_RADIUS = 1.6;
const MARKER_RADIUS = 1.68;

/** Convert geographic lat/lon to sphere position (Y-up). */
export function latLonToPosition(lat: number, lon: number, radius: number) {
  const phi = MathUtils.degToRad(90 - lat);
  const theta = MathUtils.degToRad(lon + 180);
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ] as const;
}

function CountryMarker({
  label,
  lat,
  lon,
  phase,
}: {
  label: string;
  lat: number;
  lon: number;
  phase: number;
}) {
  const glowRef = useRef<Mesh>(null);
  const coreRef = useRef<Mesh>(null);
  const pos = useMemo(
    () => latLonToPosition(lat, lon, MARKER_RADIUS),
    [lat, lon],
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + phase;
    // Continuous blink / pulse
    const pulse = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(t * 3.2));
    const scale = 0.85 + pulse * 0.55;
    if (glowRef.current) {
      glowRef.current.scale.setScalar(scale * 1.8);
      const mat = glowRef.current.material as MeshBasicMaterial;
      mat.opacity = 0.2 + pulse * 0.55;
    }
    if (coreRef.current) {
      coreRef.current.scale.setScalar(0.7 + pulse * 0.45);
      const mat = coreRef.current.material as MeshBasicMaterial;
      mat.opacity = 0.65 + pulse * 0.35;
    }
  });

  return (
    <group position={pos}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial
          color={new Color("#FFE6A8")}
          transparent
          opacity={0.45}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshBasicMaterial color="#FFF6D8" transparent opacity={0.95} />
      </mesh>
          <Html
            center
            distanceFactor={7.2}
            style={{ pointerEvents: "none", userSelect: "none" }}
            zIndexRange={[20, 0]}
          >
        <div className="earth-marker-label">
          <span className="earth-marker-label__dot" aria-hidden />
          <strong>{label}</strong>
        </div>
      </Html>
    </group>
  );
}

/**
 * Service-country markers that blink while Earth spins.
 */
export function EarthCountryMarkers() {
  const group = useRef<Group>(null);

  return (
    <group ref={group}>
      {GLOBAL_ROUTE.map((hop, i) => (
        <CountryMarker
          key={hop.id}
          label={hop.label}
          lat={hop.lat}
          lon={hop.lon}
          phase={i * 0.85}
        />
      ))}
    </group>
  );
}

export { EARTH_RADIUS };
export default EarthCountryMarkers;
