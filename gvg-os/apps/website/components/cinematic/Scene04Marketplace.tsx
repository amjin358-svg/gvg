"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { CanvasSafe } from "@/components/three/CanvasSafe";
import { FloatingObjects } from "@/components/three/FloatingObjects";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V2 } from "@/lib/movieContent";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 4｜Product Center — homepage marketplace language
 */
export function Scene04Marketplace() {
  const root = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const cards = MOVIE_V2.market.cards;

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current) return;

      const els = cardRefs.current.filter(Boolean) as HTMLElement[];
      gsap.set(els, { opacity: 0, y: 90, rotateX: 28, z: -80 });
      if (titleRef.current) gsap.set(titleRef.current, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=2200",
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
        },
      });

      if (titleRef.current) {
        tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.75, ease: "power2.out" });
      }

      tl.to(els, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        z: 0,
        stagger: 0.18,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--navy market-scene" aria-label="Product Center">
        <div className="market-scene__plate" aria-hidden />
        <div className="market-scene__canvas" aria-hidden>
          <CanvasSafe camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.75} />
            <directionalLight position={[4, 3, 2]} intensity={1.05} color="#cfe3ff" />
            <FloatingObjects />
          </CanvasSafe>
        </div>

        <div className="market-scene__content">
          <div ref={titleRef}>
            <h2>{MOVIE_V2.market.title}</h2>
            <p className="market-scene__sub">{MOVIE_V2.market.sub}</p>
          </div>
          <div className="marketplace-grid">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="market-card"
                style={{ transformStyle: "preserve-3d" }}
                whileHover={{
                  rotateY: 10,
                  rotateX: 6,
                  scale: 1.04,
                }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
              >
                <div className="market-card__glow" aria-hidden />
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Scene04Marketplace;
