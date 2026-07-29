"use client";

import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";
import { pageProgress, smoothstep } from "./scrollMath";

/**
 * Single camera authority across all 9 ScrollControls pages.
 */
export default function CameraDirector() {
  const scroll = useScroll();

  useFrame((state) => {
    const o = scroll.offset;
    const cam = state.camera;

    // Defaults
    let x = 0;
    let y = 0.2;
    let z = 8;
    let lookY = 0;

    const p0 = pageProgress(o, 0);
    const p2 = pageProgress(o, 2);
    const p3 = pageProgress(o, 3);
    const p5 = pageProgress(o, 5);
    const p7 = pageProgress(o, 7);
    const p8 = pageProgress(o, 8);

    // Scene 01 push-in
    if (o < 1 / 9) {
      const logoIn = smoothstep(0.4, 0.85, p0);
      z = THREE.MathUtils.lerp(8, 6.4, logoIn);
      y = 0.15;
    }
    // Scene 02 hold
    else if (o < 2 / 9) {
      z = 6.6;
      y = 0.2;
    }
    // Scene 03 earth approach
    else if (o < 3 / 9) {
      const a = smoothstep(0.05, 0.95, p2);
      z = THREE.MathUtils.lerp(10, 3.7, a);
      y = THREE.MathUtils.lerp(0.9, 0.2, a);
    }
    // Scene 04 network
    else if (o < 4 / 9) {
      z = 5.2;
      y = 0.35;
    }
    // Scene 05 AI
    else if (o < 5 / 9) {
      z = 5.0;
      y = 0.15;
    }
    // Scene 06 market
    else if (o < 6 / 9) {
      z = THREE.MathUtils.lerp(6.2, 5.4, p5);
      y = 0.35;
    }
    // Scene 07 services
    else if (o < 7 / 9) {
      z = 5.5;
      y = 0.1;
    }
    // Scene 08 investment fly
    else if (o < 8 / 9) {
      x = THREE.MathUtils.lerp(-2.0, 2.2, p7);
      z = THREE.MathUtils.lerp(7.2, 4.5, p7);
      y = 2.1;
      lookY = 1.1;
    }
    // Scene 09 ending
    else {
      const e = smoothstep(0, 1, p8);
      z = THREE.MathUtils.lerp(6.5, 5.2, e);
      y = 0.2;
    }

    cam.position.x = THREE.MathUtils.lerp(cam.position.x, x, 0.12);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, y, 0.12);
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, z, 0.12);
    cam.lookAt(0, lookY, 0);
  });

  return null;
}
