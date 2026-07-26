"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Earth } from "@/components/three/Earth";
import { Stars } from "@/components/three/Stars";
import { createEarthScrollSpin } from "@/components/animation/ScrollAnimations";
import { registerGsapPlugins, useGSAP } from "@/lib/gsap";

function EarthScene({
  rotationYRef,
}: {
  rotationYRef: React.MutableRefObject<{ value: number }>;
}) {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={1} />
      <directionalLight position={[3, 3, 3]} intensity={1.2} />
      <Earth rotationYRef={rotationYRef} />
      <Stars />
    </>
  );
}

export function Scene02Earth() {
  const root = useRef<HTMLElement>(null);
  const rotationYRef = useRef({ value: 0 });

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current) return;

      createEarthScrollSpin({
        section: root.current,
        rotationY: rotationYRef.current,
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="scene scene--black">
      <div className="earth-pin">
        <div className="earth-canvas">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <EarthScene rotationYRef={rotationYRef} />
          </Canvas>
        </div>
      </div>
    </section>
  );
}

export default Scene02Earth;
