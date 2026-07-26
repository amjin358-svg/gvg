"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { BRAND_GOLD } from "@/lib/cinematic";
import { GLOBAL_ROUTE } from "@/lib/globalRoute";

function latLonToVec3(lat: number, lon: number, radius = 1.65): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/** Arc tubes between global hops (static geometry; Scene03 also has SVG overlay) */
export function NetworkLines() {
  const curves = useMemo(() => {
    const list: THREE.QuadraticBezierCurve3[] = [];
    for (let i = 0; i < GLOBAL_ROUTE.length - 1; i++) {
      const a = GLOBAL_ROUTE[i]!;
      const b = GLOBAL_ROUTE[i + 1]!;
      const start = latLonToVec3(a.lat, a.lon);
      const end = latLonToVec3(b.lat, b.lon);
      const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(2.2);
      list.push(new THREE.QuadraticBezierCurve3(start, mid, end));
    }
    return list;
  }, []);

  return (
    <group>
      {curves.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 48, 0.012, 8, false]} />
          <meshBasicMaterial color={BRAND_GOLD} transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

export default NetworkLines;
