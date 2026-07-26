"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { CanvasSafe } from "@/components/three/CanvasSafe";
import { FloatingObjects } from "@/components/three/FloatingObjects";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

const CARDS = [
  { title: "Source", body: "Discover suppliers across key markets." },
  { title: "Quote", body: "Landed-cost clarity before you commit." },
  { title: "Ship", body: "Orders, warehouses, and logistics as one flow." },
  { title: "Scale", body: "Enterprise portals with AI assistance." },
];

/**
 * Scene 4｜Marketplace
 * Camera flies in · glass cards rise · 3D tilt on hover
 */
export function Scene04Marketplace() {
  const root = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current) return;

      const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
      gsap.set(cards, { opacity: 0, y: 90, rotateX: 28, z: -80 });
      if (titleRef.current) gsap.set(titleRef.current, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=2200",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      if (titleRef.current) {
        tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.6 });
      }

      tl.to(cards, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        z: 0,
        stagger: 0.22,
        duration: 0.85,
        ease: "power3.out",
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--navy market-scene" aria-label="Marketplace">
        <div className="market-scene__canvas" aria-hidden>
          <CanvasSafe camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[4, 3, 2]} intensity={1.1} />
            <FloatingObjects />
          </CanvasSafe>
        </div>

        <div className="market-scene__content">
          <h2 ref={titleRef}>Marketplace</h2>
          <p className="market-scene__sub">Glass · Float · 3D Tilt</p>
          <div className="marketplace-grid">
            {CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="market-card"
                style={{ transformStyle: "preserve-3d" }}
                whileHover={{
                  scale: 1.05,
                  rotateX: 8,
                  rotateY: 6,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
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
