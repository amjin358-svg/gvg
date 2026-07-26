"use client";

import { useRef } from "react";
import Link from "next/link";
import SplitType from "split-type";
import { revertSplit } from "@/components/animation/SplitText";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 9｜Ending
 * Everything retracts → GVG logo → Building the Future… → Start Your Journey
 */
export function Ending() {
  const root = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLHeadingElement>(null);
  const line = useRef<HTMLParagraphElement>(null);
  const cta = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !logo.current || !line.current || !cta.current) return;

      const split = new SplitType(logo.current, { types: "chars" });
      const chars = split.chars?.length ? split.chars : logo.current;

      gsap.set(chars, { opacity: 0, scale: 0.5, y: 30 });
      gsap.set([line.current, cta.current], { opacity: 0, y: 24 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=1600",
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        })
        .to(chars, {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
        })
        .to(line.current, { opacity: 1, y: 0, duration: 0.7 })
        .to(cta.current, { opacity: 1, y: 0, duration: 0.55 });

      return () => {
        revertSplit(split);
      };
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--black ending-scene" aria-label="Ending">
        <div className="ending-scene__mark">
          <h2 ref={logo} className="logo">
            GVG
          </h2>
          <p ref={line} className="ending-scene__line">
            Building the Future of Global Business.
          </p>
          <div ref={cta}>
            <Link className="ending-scene__cta" href="/marketplace">
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Ending;
