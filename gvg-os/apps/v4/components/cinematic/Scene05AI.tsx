"use client";

import { useRef } from "react";
import { CanvasSafe } from "@/components/three/CanvasSafe";
import SplitType from "split-type";
import { createAiDataTimeline } from "@/components/animation/ScrollAnimations";
import { revertSplit } from "@/components/animation/SplitText";
import { AnimatedGrid } from "@/components/cinematic/AnimatedGrid";
import { NetworkLines } from "@/components/three/NetworkLines";
import { ParticleField } from "@/components/three/ParticleField";
import { AI_LAYER, BRAND_GOLD } from "@/lib/cinematic";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/** Particles resolve into these digits */
const DIGITS = ["0", "1", "8", "5", "3", "9"];

const KPIS = [
  { value: "99.7%", label: "AI", kind: "static" as const },
  { value: "0", label: "GDP", kind: "counter" as const },
  { value: "$18.5B", label: "ROI", kind: "static" as const },
];

/** Binary stream: bits fall into AI */
const BINARY_ROWS: Array<
  | { kind: "bits"; value: string; key: string }
  | { kind: "arrow"; key: string }
  | { kind: "label"; value: string; key: string }
> = [
  { kind: "bits", value: "001001010", key: "bits-a" },
  { kind: "arrow", key: "a1" },
  { kind: "arrow", key: "a2" },
  { kind: "arrow", key: "a3" },
  { kind: "arrow", key: "a4" },
  { kind: "bits", value: "110010101", key: "bits-b" },
  { kind: "arrow", key: "b1" },
  { kind: "arrow", key: "b2" },
  { kind: "arrow", key: "b3" },
  { kind: "label", value: "AI", key: "ai" },
];

/** Cascading ledger / signal IDs */
const DATA_CHAIN = [18394829, 18394841, 18395010];

/** Charts beat — block lengths relative to Growth (12) */
const CHART_METRICS = [
  { label: "Revenue", blocks: 10, max: 12 },
  { label: "ROI", blocks: 7, max: 12 },
  { label: "Growth", blocks: 12, max: 12 },
];

/** Canonical Scene05 cascade */
const STAGE_RAIL = ["Particles", "Numbers", "Charts", "Connections"] as const;

function formatCounter(value: number) {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M`;
  }
  return Math.round(value).toLocaleString("en-US");
}

export function Scene05AI() {
  const root = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);
  const connectionsRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const chainRefs = useRef<(HTMLDivElement | null)[]>([]);
  const digitRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const kpiRefs = useRef<(HTMLDivElement | null)[]>([]);
  const binaryRefs = useRef<(HTMLElement | null)[]>([]);
  const counterValueRef = useRef<HTMLElement | null>(null);
  const railRefs = useRef<(HTMLElement | null)[]>([]);
  const title = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current) return;

      let split: SplitType | null = null;
      if (title.current) {
        split = new SplitType(title.current, { types: "words,chars" });
        if (split.chars?.length) {
          gsap.from(split.chars, {
            opacity: 0,
            y: 24,
            duration: 0.7,
            stagger: 0.03,
            ease: "sine.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 80%",
            },
          });
        }
      }

      createAiDataTimeline(root.current, {
        particles: particlesRef.current,
        numbers: numbersRef.current,
        charts: chartsRef.current,
        connections: connectionsRef.current,
        bars: barRefs.current.filter(Boolean) as HTMLElement[],
        railItems: railRefs.current.filter(Boolean) as HTMLElement[],
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

      const binaryRows = binaryRefs.current.filter(Boolean) as HTMLElement[];
      const digits = digitRefs.current.filter(Boolean) as HTMLElement[];
      const kpis = kpiRefs.current.filter(Boolean) as HTMLElement[];
      const chain = chainRefs.current.filter(Boolean) as HTMLElement[];

      if (binaryRows.length) {
        gsap.set(binaryRows, { opacity: 0, y: -18 });
        gsap.to(binaryRows, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.14,
          ease: "sine.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (digits.length) {
        gsap.set(digits, { opacity: 0, y: 40, scale: 0.6 });
        gsap.to(digits, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "sine.out",
          delay: 1.2,
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (kpis.length) {
        gsap.set(kpis, { opacity: 0, y: 28 });
        gsap.to(kpis, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: "sine.out",
          delay: 1.8,
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            toggleActions: "play none none reverse",
          },
        });
      }

      const counterEl = counterValueRef.current;
      if (counterEl) {
        const counter = { value: 0 };
        gsap.to(counter, {
          value: 25000000,
          duration: 2,
          snap: "value",
          ease: "power1.out",
          delay: 2,
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            counterEl.textContent = formatCounter(counter.value);
          },
        });
      }

      if (chain.length) {
        gsap.set(chain, { opacity: 0, y: -24 });
        gsap.to(chain, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.45,
          ease: "sine.out",
          delay: 2.4,
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            toggleActions: "play none none reverse",
          },
        });
      }

      return () => {
        revertSplit(split);
      };
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--navy ai-scene">
      {/* Layer 1 — Animated Grid · Gradient · Noise */}
      <div
        className="ai-layer ai-layer--1"
        style={{ zIndex: AI_LAYER.atmosphere }}
        aria-hidden
      >
        <div className="ai-gradient" />
        <AnimatedGrid />
        <div className="noise-overlay" />
      </div>

      {/* Layer 2 — Particles */}
      <div
        ref={particlesRef}
        className="ai-layer ai-layer--2"
        style={{ zIndex: AI_LAYER.particles, opacity: 0 }}
      >
        <CanvasSafe camera={{ position: [0, 0, 6], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <ParticleField />
        </CanvasSafe>
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

      {/* Layer 4 — Glass Dashboard (plate under data widgets) */}
      <div
        className="ai-layer ai-layer--4 ai-glass-dashboard"
        style={{ zIndex: AI_LAYER.glass }}
        aria-hidden
      >
        <div className="ai-glass-dashboard__panel" />
      </div>

      {/* Layer 3 — Charts · Connections · Numbers */}
      <div
        className="ai-layer ai-layer--3"
        style={{ zIndex: AI_LAYER.data }}
      >
        <header className="ai-headline">
          <h2 ref={title} className="ai-headline__title">
            Artificial Intelligence
          </h2>
          <p className="ai-headline__for">for</p>
          <p className="ai-headline__sub">Global Business</p>
        </header>

        <div ref={numbersRef} className="ai-stage" style={{ opacity: 0 }}>
          <div className="ai-numbers-stack">
            <div className="ai-binary-flow" aria-label="Binary stream into AI">
              {BINARY_ROWS.map((row, i) => {
                if (row.kind === "bits") {
                  return (
                    <div
                      key={row.key}
                      ref={(el) => {
                        binaryRefs.current[i] = el;
                      }}
                      className="ai-binary-flow__bits"
                    >
                      {row.value}
                    </div>
                  );
                }
                if (row.kind === "label") {
                  return (
                    <div
                      key={row.key}
                      ref={(el) => {
                        binaryRefs.current[i] = el;
                      }}
                      className="ai-binary-flow__ai"
                    >
                      {row.value}
                    </div>
                  );
                }
                return (
                  <div
                    key={row.key}
                    ref={(el) => {
                      binaryRefs.current[i] = el;
                    }}
                    className="ai-binary-flow__arrow"
                    aria-hidden
                  >
                    ↓
                  </div>
                );
              })}
            </div>

            <div className="ai-digits" aria-label="Signal digits">
              {DIGITS.map((d, i) => (
                <span
                  key={`${d}-${i}`}
                  ref={(el) => {
                    digitRefs.current[i] = el;
                  }}
                  className="ai-digit"
                >
                  {d}
                </span>
              ))}
            </div>

            <div className="ai-kpis">
              {KPIS.map((kpi, i) => (
                <div
                  key={kpi.label}
                  ref={(el) => {
                    kpiRefs.current[i] = el;
                  }}
                  className="ai-kpi"
                >
                  <strong
                    ref={
                      kpi.kind === "counter"
                        ? (el) => {
                            counterValueRef.current = el;
                          }
                        : undefined
                    }
                  >
                    {kpi.value}
                  </strong>
                  <span>{kpi.label}</span>
                </div>
              ))}
            </div>

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
          </div>
        </div>

        <div ref={chartsRef} className="ai-stage" style={{ opacity: 0 }}>
          <div className="ai-metrics">
            {CHART_METRICS.map((metric, i) => (
              <div key={metric.label} className="ai-metric">
                <div className="ai-metric__label">{metric.label}</div>
                <div className="ai-metric__track" aria-hidden>
                  <div
                    ref={(el) => {
                      barRefs.current[i] = el;
                    }}
                    className="ai-metric__fill"
                    style={{ width: `${(metric.blocks / metric.max) * 100}%` }}
                  >
                    {"█".repeat(metric.blocks)}
                  </div>
                </div>
              </div>
            ))}
            <div className="ai-metric ai-metric--score">
              <div className="ai-metric__label">AI Score</div>
              <div className="ai-metric__score">98%</div>
            </div>
          </div>
        </div>

        <div ref={connectionsRef} className="ai-stage" style={{ opacity: 0 }}>
          <div
            className="ai-network"
            aria-label="Revenue Market Inventory CRM network"
          >
            <div className="ai-network__canvas">
              <CanvasSafe camera={{ position: [0, 0, 4.2], fov: 45 }}>
                <ambientLight intensity={0.4} />
                <NetworkLines mode="crm" />
              </CanvasSafe>
            </div>
            <ul className="ai-network__labels">
              <li className="ai-network__labels-left">Revenue</li>
              <li className="ai-network__labels-right ai-network__labels-right--top">
                Market
              </li>
              <li className="ai-network__labels-right ai-network__labels-right--mid">
                Inventory
              </li>
              <li className="ai-network__labels-right ai-network__labels-right--bot">
                CRM
              </li>
            </ul>
            <p className="ai-network__pipeline">
              LineGeometry → TubeGeometry → Glow Shader
            </p>
          </div>
        </div>

        <nav className="ai-stage-rail" aria-label="AI data beat stages">
          {STAGE_RAIL.map((label, i) => (
            <div key={label} className="ai-stage-rail__step">
              <span
                ref={(el) => {
                  railRefs.current[i] = el;
                }}
                className="ai-stage-rail__label"
              >
                {label}
              </span>
              {i < STAGE_RAIL.length - 1 ? (
                <span className="ai-stage-rail__arrow" aria-hidden>
                  ↓
                </span>
              ) : null}
            </div>
          ))}
        </nav>
      </div>

      {/* Layer 5 — Mouse Glow lives on InteractiveMovie (z-index 50) */}
      </section>
    </div>
  );
}

export default Scene05AI;
