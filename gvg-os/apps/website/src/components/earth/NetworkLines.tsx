"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { BRAND_GOLD, CLASSIC_GOLD } from "@/lib/cinematic";
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

/** Soft additive gold glow for tube shells */
const glowVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const glowFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float fresnel = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.2);
    float pulse = 0.85 + 0.15 * sin(uTime * 1.6);
    float alpha = fresnel * uIntensity * pulse;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

type GlowTubeProps = {
  curve: THREE.Curve<THREE.Vector3>;
  radius?: number;
};

/**
 * Pipeline: LineGeometry → TubeGeometry → Glow Shader
 */
function GlowTube({ curve, radius = 0.018 }: GlowTubeProps) {
  const glowMat = useRef<THREE.ShaderMaterial>(null);
  const lineRef = useRef<Line2 | null>(null);
  const { size } = useThree();

  const line = useMemo(() => {
    const pts = curve.getPoints(64);
    const positions: number[] = [];
    pts.forEach((p) => {
      positions.push(p.x, p.y, p.z);
    });

    // 1) LineGeometry — crisp core stroke
    const geometry = new LineGeometry();
    geometry.setPositions(positions);

    const material = new LineMaterial({
      color: BRAND_GOLD,
      linewidth: 2.5,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    });
    material.resolution.set(size.width, size.height);

    const obj = new Line2(geometry, material);
    obj.computeLineDistances();
    return obj;
  }, [curve, size.width, size.height]);

  // 2) TubeGeometry — volumetric body along the same path
  const tubeArgs = useMemo(
    () => [curve, 64, radius, 12, false] as const,
    [curve, radius],
  );
  const glowTubeArgs = useMemo(
    () => [curve, 64, radius * 2.4, 16, false] as const,
    [curve, radius],
  );

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(CLASSIC_GOLD) },
      uIntensity: { value: 0.85 },
      uTime: { value: 0 },
    }),
    [],
  );

  useFrame(({ clock }) => {
    if (glowMat.current) {
      glowMat.current.uniforms.uTime!.value = clock.elapsedTime;
    }
    const mat = lineRef.current?.material as LineMaterial | undefined;
    mat?.resolution.set(size.width, size.height);
  });

  return (
    <group>
      {/* 1 — LineGeometry core */}
      <primitive
        object={line}
        ref={(obj: Line2 | null) => {
          lineRef.current = obj;
        }}
      />

      {/* 2 — TubeGeometry body */}
      <mesh>
        <tubeGeometry args={tubeArgs} />
        <meshBasicMaterial
          color={BRAND_GOLD}
          transparent
          opacity={0.45}
          depthWrite={false}
        />
      </mesh>

      {/* 3 — Glow Shader shell */}
      <mesh>
        <tubeGeometry args={glowTubeArgs} />
        <shaderMaterial
          ref={glowMat}
          vertexShader={glowVertex}
          fragmentShader={glowFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function curvesFromGlobalRoute() {
  const list: THREE.QuadraticBezierCurve3[] = [];
  for (let i = 0; i < GLOBAL_ROUTE.length - 1; i++) {
    const a = GLOBAL_ROUTE[i]!;
    const b = GLOBAL_ROUTE[i + 1]!;
    const start = latLonToVec3(a.lat, a.lon);
    const end = latLonToVec3(b.lat, b.lon);
    const mid = start
      .clone()
      .add(end)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(2.2);
    list.push(new THREE.QuadraticBezierCurve3(start, mid, end));
  }
  return list;
}

/** Revenue ●────● Market / Inventory / CRM ladder in local space */
export function crmNetworkCurves(): THREE.LineCurve3[] {
  const L = new THREE.Vector3(-1.4, 1.2, 0);
  const R1 = new THREE.Vector3(1.4, 1.2, 0);
  const M = new THREE.Vector3(-1.4, 0, 0);
  const R2 = new THREE.Vector3(1.4, 0, 0);
  const B = new THREE.Vector3(-1.4, -1.2, 0);
  const R3 = new THREE.Vector3(1.4, -1.2, 0);

  const segments: [THREE.Vector3, THREE.Vector3][] = [
    [L, R1],
    [L, M],
    [M, R2],
    [M, B],
    [B, R3],
  ];

  return segments.map(([a, b]) => new THREE.LineCurve3(a, b));
}

type NetworkLinesProps = {
  /** `globe` = Scene02/03 arcs; `crm` = Revenue→CRM ladder */
  mode?: "globe" | "crm";
};

/**
 * Connection FX: LineGeometry → TubeGeometry → Glow Shader
 */
export function NetworkLines({ mode = "globe" }: NetworkLinesProps) {
  const curves = useMemo(() => {
    if (mode === "crm") return crmNetworkCurves();
    return curvesFromGlobalRoute();
  }, [mode]);

  return (
    <group>
      {curves.map((curve, i) => (
        <GlowTube
          key={`${mode}-${i}`}
          curve={curve}
          radius={mode === "crm" ? 0.03 : 0.012}
        />
      ))}
      {mode === "crm"
        ? [
            [-1.4, 1.2, 0],
            [1.4, 1.2, 0],
            [-1.4, 0, 0],
            [1.4, 0, 0],
            [-1.4, -1.2, 0],
            [1.4, -1.2, 0],
          ].map(([x, y, z], i) => (
            <mesh key={i} position={[x!, y!, z!]}>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshBasicMaterial color={CLASSIC_GOLD} />
            </mesh>
          ))
        : null}
    </group>
  );
}

export default NetworkLines;
