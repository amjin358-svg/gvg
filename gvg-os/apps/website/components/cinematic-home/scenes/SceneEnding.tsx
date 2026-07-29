"use client";

import { useRef } from "react";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { HOME_COPY, SCENE_SCROLL } from "@/lib/cinematicHomeContent";
import { MetalGVGLogo } from "@/components/cinematic-home/ui/MetalGVGLogo";
import { GlassButton } from "@/components/cinematic-home/ui/GlassButton";
import { GoldPulseLottie } from "@/components/cinematic-home/ui/GoldPulseLottie";

/**
 * Ending — dissolve → reform GVG logo · BUILD BEYOND BORDERS · ENTER ecosystem.
 */
export function SceneEnding() {
  const root = useRef<HTMLElement>(null);
  const dust = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !dust.current || !logo.current || !copy.current) return;

      gsap.set(dust.current, { opacity: 1, scale: 1.2, force3D: true });
      gsap.set(logo.current, { opacity: 0, scale: 0.4, force3D: true });
      gsap.set(copy.current, { opacity: 0, y: 30, force3D: true });

      const tl = gsap.timeline({
        defaults: { ease: "none", force3D: true },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${SCENE_SCROLL.ending}`,
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(dust.current, { scale: 0.2, opacity: 0.15, duration: 0.4 }, 0)
        .to(logo.current, { opacity: 1, scale: 1, duration: 0.35 }, 0.28)
        .to(dust.current, { opacity: 0, duration: 0.2 }, 0.45)
        .to(copy.current, { opacity: 1, y: 0, duration: 0.25 }, 0.55);
    },
    { scope: root },
  );

  const portal = process.env.NEXT_PUBLIC_PORTAL_URL || "/portal";

  return (
    <section ref={root} className="cx-scene cx-scene--ending" aria-label="Ending">
      <div className="cx-scene__stage">
        <div ref={dust} className="cx-ending__dust" aria-hidden />
        <div ref={logo} className="cx-ending__logo">
          <MetalGVGLogo />
          <GoldPulseLottie className="cx-ending__pulse" />
        </div>
        <div ref={copy} className="cx-ending__copy">
          <p className="cx-ending__tag">{HOME_COPY.tagline}</p>
          <GlassButton href={portal}>{HOME_COPY.endingCta}</GlassButton>
          <a className="cx-ending__movie" href="./experience/">
            Watch Interactive Movie
          </a>
        </div>
      </div>
    </section>
  );
}
