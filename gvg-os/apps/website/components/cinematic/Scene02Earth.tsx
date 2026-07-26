"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { Earth } from "@/components/three/Earth";
import { Stars } from "@/components/three/Stars";
import { createEarthScrollSpin } from "@/components/animation/ScrollAnimations";
import { gsap, registerGsapPlugins } from "@/lib/gsap";

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
  const sectionRef = useRef<HTMLElement>(null);
  const rotationYRef = useRef({ value: 0 });

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      createEarthScrollSpin({
        section,
        rotationY: rotationYRef.current,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="scene scene--black">
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

// Keep dynamic import helper for optional SSR-safe wrapping from parents
export const Scene02EarthDynamic = dynamic(
  () => Promise.resolve({ default: Scene02Earth }),
  { ssr: false },
);
