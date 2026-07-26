"use client";

import { useRef } from "react";
import SplitType from "split-type";
import { Earth } from "@/components/three/Earth";
import { Stars } from "@/components/three/Stars";
import { CanvasSafe } from "@/components/three/CanvasSafe";
import { revertSplit } from "@/components/animation/SplitText";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

function OpeningWorld() {
  return (
    <>
      <color attach="background" args={["#020b1c"]} />
      <fog attach="fog" args={["#020b1c", 6, 16]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[-3, 2, 4]} intensity={1.6} color="#9ec5ff" />
      <pointLight position={[2, 1, 3]} intensity={1.2} color="#C8A35F" />
      <Stars />
      <Earth showOrbits autoSpin={0.0035} />
    </>
  );
}

/**
 * Scene 1｜Opening (≈5–8s)
 * First eye: cosmos + Earth + gold orbits — then full brand + taglines.
 */
export function Scene01Logo() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLHeadingElement>(null);
  const brand = useRef<HTMLParagraphElement>(null);
  const lineA = useRef<HTMLParagraphElement>(null);
  const lineB = useRef<HTMLParagraphElement>(null);
  const hint = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (
        !root.current ||
        !stage.current ||
        !logo.current ||
        !brand.current ||
        !lineA.current ||
        !lineB.current ||
        !hint.current
      ) {
        return;
      }

      gsap.set(stage.current, { opacity: 0, scale: 0.72 });
      gsap.set([brand.current, lineA.current, lineB.current, hint.current], {
        opacity: 0,
        y: 18,
      });

      const split = new SplitType(logo.current, { types: "chars" });
      const chars = split.chars?.length ? split.chars : logo.current;
      gsap.set(chars, { opacity: 0, y: 40, scale: 0.6 });

      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .to(stage.current, { opacity: 1, scale: 1, duration: 2.4 }, 0)
        .to(
          chars,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            stagger: 0.1,
            ease: "power3.out",
          },
          2.2,
        )
        .to(brand.current, { opacity: 1, y: 0, duration: 0.9 }, 3.6)
        .to(lineA.current, { opacity: 1, y: 0, duration: 0.75 }, 4.5)
        .to(lineB.current, { opacity: 1, y: 0, duration: 0.75 }, 5.05)
        .to(hint.current, { opacity: 1, y: 0, duration: 0.7 }, 6.0);

      return () => {
        revertSplit(split);
      };
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--cosmos opening-scene" aria-label="Opening">
        <div className="galaxy-backdrop" aria-hidden>
          <div className="galaxy-backdrop__nebula" />
          <div className="galaxy-backdrop__stars galaxy-backdrop__stars--far" />
          <div className="galaxy-backdrop__stars galaxy-backdrop__stars--near" />
          <div className="galaxy-backdrop__dust" />
        </div>
        <div ref={stage} className="opening-scene__stage">
          <CanvasSafe
            camera={{ position: [0, 0, 5.4], fov: 42 }}
            fallback={<div className="opening-scene__fallback" aria-hidden />}
          >
            <OpeningWorld />
          </CanvasSafe>
          <div className="opening-scene__glow" aria-hidden />
        </div>

        <div className="opening-scene__copy">
          <h1 ref={logo} className="logo opening-scene__logo">
            Global Vista Group
          </h1>
          <p ref={brand} className="opening-scene__brand">
            Connecting Global Business
          </p>
          <p ref={lineA} className="opening-scene__tag">
            Connecting Markets.
          </p>
          <p ref={lineB} className="opening-scene__tag opening-scene__tag--second">
            Creating Value.
          </p>
        </div>

        <div ref={hint} className="opening-scene__hint" aria-hidden>
          <span className="opening-scene__mouse" />
          <span>Scroll</span>
        </div>
      </section>
    </div>
  );
}

export default Scene01Logo;
