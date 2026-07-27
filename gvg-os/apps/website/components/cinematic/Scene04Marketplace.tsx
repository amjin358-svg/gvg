"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { CanvasSafe } from "@/components/three/CanvasSafe";
import { FloatingObjects } from "@/components/three/FloatingObjects";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

const CARDS = [
  {
    title: "Source",
    body: "嚴選全球供應商與品牌，建立可信賴的採購網絡。",
  },
  {
    title: "Quote",
    body: "透明落地成本與交期，決策前即掌握商業全貌。",
  },
  {
    title: "Ship",
    body: "訂單、倉儲與物流一體化，確保履約節奏精準。",
  },
  {
    title: "Scale",
    body: "企業級市集與 AI 助手，陪同業務規模化成長。",
  },
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
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
        },
      });

      if (titleRef.current) {
        tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.75, ease: "power2.out" });
      }

      tl.to(cards, {
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
      <section className="scene scene--navy market-scene" aria-label="Marketplace">
        <div className="market-scene__plate" aria-hidden />
        <div className="market-scene__canvas" aria-hidden>
          <CanvasSafe camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.75} />
            <directionalLight position={[4, 3, 2]} intensity={1.05} />
            <FloatingObjects />
          </CanvasSafe>
        </div>

        <div className="market-scene__content">
          <h2 ref={titleRef}>Marketplace</h2>
          <p className="market-scene__sub">精選商品 · 玻璃質感 · 立體互動</p>
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
