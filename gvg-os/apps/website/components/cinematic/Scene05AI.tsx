"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { createAiDataTimeline } from "@/components/animation/ScrollAnimations";
import { BRAND_GOLD } from "@/lib/cinematic";
import { gsap, registerGsapPlugins } from "@/lib/gsap";

const ParticleField = dynamic(
  () => import("@/components/three/ParticleField").then((m) => m.ParticleField),
  { ssr: false },
);

const KPIS = [
  { value: "50+", label: "Markets" },
  { value: "10k+", label: "SKUs" },
  { value: "5k+", label: "Partners" },
];

/** Cascading ledger / signal IDs for the Numbers beat */
const DATA_CHAIN = [18394829, 18394841, 18395010];

const BAR_HEIGHTS = [45, 70, 55, 90, 65, 80, 50];

export function Scene05AI() {
  const sectionRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);
  const connectionsRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const chainRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      createAiDataTimeline(section, {
        particles: particlesRef.current,
        numbers: numbersRef.current,
        charts: chartsRef.current,
        connections: connectionsRef.current,
        bars: barRefs.current.filter(Boolean) as HTMLElement[],
      });

      const particles = particlesRef.current;
      if (particles) {
        gsap.to(particles, {
          y: -30,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      const chain = chainRefs.current.filter(Boolean) as HTMLElement[];
      if (chain.length) {
        gsap.set(chain, { opacity: 0, y: -24 });
        gsap.to(chain, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.45,
          ease: "sine.out",
          delay: 0.4,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="scene scene--navy">
      <div className="noise-overlay" />
      <div
        ref={particlesRef}
        style={{ position: "absolute", inset: 0, opacity: 0 }}
      >
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <ParticleField />
        </Canvas>
        {/* Soft gold glow layer */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: "20%",
            background: `radial-gradient(circle, ${BRAND_GOLD}33, transparent 70%)`,
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
      </div>

      <div
        ref={numbersRef}
        className="ai-stage"
        style={{ opacity: 0 }}
      >
        <div className="ai-data-chain" aria-label="Cascading data signals">
          {DATA_CHAIN.map((id, i) => (
            <div key={id} className="ai-data-chain__step">
              <div
                ref={(el) => {
                  chainRefs.current[i] = el;
                }}
                className="ai-data-chain__id"
              >
                {id}
              </div>
              {i < DATA_CHAIN.length - 1 ? (
                <div className="ai-data-chain__arrow" aria-hidden>
                  ↓
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <div className="ai-kpis">
          {KPIS.map((kpi) => (
            <div key={kpi.label} className="ai-kpi">
              <strong>{kpi.value}</strong>
              <span>{kpi.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div ref={chartsRef} className="ai-stage" style={{ opacity: 0 }}>
        <div className="ai-charts">
          {BAR_HEIGHTS.map((h, i) => (
            <div
              key={i}
              ref={(el) => {
                barRefs.current[i] = el;
              }}
              className="ai-bar"
              style={{ height: h }}
            />
          ))}
        </div>
      </div>

      <div ref={connectionsRef} className="ai-stage" style={{ opacity: 0 }}>
        <svg width="320" height="180" viewBox="0 0 320 180">
          {[
            [40, 90],
            [120, 40],
            [200, 120],
            [280, 60],
          ].map(([x, y], i, arr) => {
            const next = arr[i + 1];
            return (
              <g key={i}>
                {next ? (
                  <line
                    x1={x}
                    y1={y}
                    x2={next[0]}
                    y2={next[1]}
                    stroke={BRAND_GOLD}
                    strokeWidth="1.5"
                    opacity={0.7}
                  />
                ) : null}
                <circle cx={x} cy={y} r="6" fill={BRAND_GOLD} />
              </g>
            );
          })}
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: 0,
          right: 0,
          textAlign: "center",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--gv-muted)",
          fontSize: "0.75rem",
          zIndex: 2,
        }}
      >
        Particles · Numbers · Charts · Connections
      </div>
    </section>
  );
}

export default Scene05AI;
