"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";

const FloatingObjects = dynamic(
  () =>
    import("@/components/three/FloatingObjects").then((m) => m.FloatingObjects),
  { ssr: false },
);

const CARDS = [
  { title: "Source", body: "Discover suppliers across key markets." },
  { title: "Quote", body: "Landed-cost clarity before you commit." },
  { title: "Ship", body: "Orders, warehouses, and logistics as one flow." },
  { title: "Scale", body: "Enterprise portals with AI assistance." },
];

export function Scene04Marketplace() {
  return (
    <section className="scene scene--navy">
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.55,
        }}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[4, 3, 2]} intensity={1.1} />
          <FloatingObjects />
        </Canvas>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--gv-secondary)",
            marginBottom: "0.5rem",
          }}
        >
          Marketplace
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "var(--gv-muted)",
            marginBottom: "1.5rem",
          }}
        >
          Floating · Rotate · Glass · Reflection
        </p>
        <div className="marketplace-grid">
          {CARDS.map((card) => (
            <motion.div
              key={card.title}
              className="market-card"
              whileHover={{
                rotateY: 15,
                rotateX: 10,
                scale: 1.08,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Scene04Marketplace;
