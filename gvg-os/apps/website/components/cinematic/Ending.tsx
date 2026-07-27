"use client";

import { useRef } from "react";
import Link from "next/link";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V2 } from "@/lib/movieContent";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 9｜Ending — compact CTA close
 * (brand crawl / lockup text now plays in Scene 01 opening)
 */
export function Ending() {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !panel.current) return;

      gsap.set(panel.current, { opacity: 0, y: 24 });

      gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=1100",
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
        },
      }).to(panel.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      });
    },
    { scope: root },
  );

  const portal = process.env.NEXT_PUBLIC_PORTAL_URL || "/";

  return (
    <div ref={root}>
      <section className="scene scene--black ending-scene" aria-label="Ending">
        <div ref={panel} className="ending-scene__mark">
          <p className="scene-eyebrow">Continue</p>
          <h2 className="ending-scene__simple-title">{MOVIE_V2.ending.title}</h2>
          <p className="ending-scene__line">
            <strong>{MOVIE_V2.ending.line}</strong>
            <span>{MOVIE_V2.ending.lineZh}</span>
          </p>
          <div className="ending-scene__actions">
            <Link className="btn btn--glow ending-scene__cta" href={portal}>
              {MOVIE_V2.ending.ctaPrimary}
            </Link>
            <Link className="btn btn--ghost ending-scene__cta ending-scene__cta--ghost" href="/experience">
              {MOVIE_V2.ending.ctaAgain}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Ending;
