"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { SoftMouseGlow } from "@/components/cinematic-home/SoftMouseGlow";
import { useCinematicScroll } from "@/components/cinematic-home/useCinematicScroll";
import { Scene01Awaken } from "@/components/cinematic-home/scenes/Scene01Awaken";
import { Scene02Crawl } from "@/components/cinematic-home/scenes/Scene02Crawl";
import { Scene03Earth } from "@/components/cinematic-home/scenes/Scene03Earth";
import { Scene04Network } from "@/components/cinematic-home/scenes/Scene04Network";
import { Scene05AI } from "@/components/cinematic-home/scenes/Scene05AI";
import { Scene06Marketplace } from "@/components/cinematic-home/scenes/Scene06Marketplace";
import { Scene07Services } from "@/components/cinematic-home/scenes/Scene07Services";
import { Scene08Investment } from "@/components/cinematic-home/scenes/Scene08Investment";
import { SceneEnding } from "@/components/cinematic-home/scenes/SceneEnding";
import { HOME_COPY } from "@/lib/cinematicHomeContent";

const AmbientCanvas = dynamic(
  () =>
    import("@/components/cinematic-home/three/AmbientCanvas").then((m) => m.AmbientCanvas),
  { ssr: false },
);

/**
 * GVG Interactive Cinematic Homepage — continuous movie experience.
 */
export function CinematicHome() {
  useCinematicScroll(true);
  const reduce = useReducedMotion();

  return (
    <div className="cx-root">
      <AmbientCanvas />
      <SoftMouseGlow />

      <div className="cx-chrome" aria-hidden>
        <span className="cx-chrome__brand">{HOME_COPY.brand}</span>
        <motion.span
          className="cx-chrome__hint"
          animate={reduce ? undefined : { opacity: [0.35, 1, 0.35], y: [0, 4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          {HOME_COPY.scrollHint}
        </motion.span>
      </div>

      <Scene01Awaken />
      <Scene02Crawl />
      <Scene03Earth />
      <Scene04Network />
      <Scene05AI />
      <Scene06Marketplace />
      <Scene07Services />
      <Scene08Investment />
      <SceneEnding />
    </div>
  );
}

export default CinematicHome;
