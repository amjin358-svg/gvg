"use client";

import { useRef } from "react";
import Link from "next/link";
import SplitType from "split-type";
import { revertSplit } from "@/components/animation/SplitText";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 9｜Ending — brand lockup with silky scrub
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

      gsap.set(chars, { opacity: 0, scale: 0.72, y: 22 });
      gsap.set([line.current, cta.current], { opacity: 0, y: 18 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=1600",
            scrub: SCRUB_SMOOTH,
            pin: true,
            anticipatePin: 1,
          },
        })
        .to(chars, {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.95,
          ease: "power3.out",
        })
        .to(line.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
        .to(cta.current, { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" });

      return () => {
        revertSplit(split);
      };
    },
    { scope: root },
  );

  const portal = process.env.NEXT_PUBLIC_PORTAL_URL || "/";

  return (
    <div ref={root}>
      <section className="scene scene--black ending-scene" aria-label="Ending">
        <div className="ending-scene__mark">
          <h2 ref={logo} className="logo">
            Global Vista Group
          </h2>
          <p ref={line} className="ending-scene__line">
            以高質感視野，連結全球市場與無限商機。
          </p>
          <div ref={cta} className="ending-scene__actions">
            <Link className="ending-scene__cta" href={portal}>
              進入企業官網
            </Link>
            <Link className="ending-scene__cta ending-scene__cta--ghost" href="/experience">
              再看一次
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Ending;
