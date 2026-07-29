"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { BRAND } from "@/lib/constants";
import { AnimatedLogo } from "./AnimatedLogo";

const HeroCanvas = dynamic(
  () => import("./HeroCanvas").then((m) => m.HeroCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#0d2036,#050a14_70%)]" />
    ),
  },
);

type Beat = { kicker: string; title: string; sub: string; range: [number, number] };

const BEATS: Beat[] = [
  {
    kicker: "GLOBAL VISTA GROUP",
    title: "連接全球市場",
    sub: "Connect. Source. Ship. Scale.",
    range: [0.0, 0.24],
  },
  {
    kicker: "星際航行 · INTERSTELLAR",
    title: "跨越疆界的貿易",
    sub: "From every port to every market.",
    range: [0.26, 0.5],
  },
  {
    kicker: "全球連線 · NETWORK",
    title: "一個貿易作業系統",
    sub: "Suppliers · Buyers · Logistics — one OS.",
    range: [0.5, 0.76],
  },
];

function Caption({
  beat,
  progress,
}: {
  beat: Beat;
  progress: MotionValue<number>;
}) {
  const [start, end] = beat.range;
  const inA = start + (end - start) * 0.22;
  const outA = end - (end - start) * 0.18;
  const opacity = useTransform(
    progress,
    [start, inA, outA, end],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [start, inA, outA, end], [40, 0, 0, -40]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto max-w-3xl -translate-y-1/2 px-6 text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-gold)] sm:text-sm">
        {beat.kicker}
      </p>
      <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] sm:text-6xl">
        {beat.title}
      </h2>
      <p className="mt-4 text-base text-white/75 sm:text-lg">{beat.sub}</p>
    </motion.div>
  );
}

function StaticHero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#0d2036,#050a14_70%)] px-6 text-center text-white">
      <AnimatedLogo className="h-28 w-28" />
      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-gold)]">
        {BRAND.name}
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-6xl">
        {BRAND.product}
      </h1>
      <p className="mt-4 max-w-xl text-white/75">{BRAND.taglineZh}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a href={process.env.NEXT_PUBLIC_PORTAL_URL || "/portal"}>
          <Button size="lg" variant="primary">
            Explore catalog
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </a>
        <Link href="/experience">
          <Button size="lg" variant="soft">
            Interactive Movie
          </Button>
        </Link>
      </div>
    </section>
  );
}

export function HeroExperience() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  const logoOpacity = useTransform(scrollYProgress, [0, 0.16, 0.22], [1, 1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.22], [1, 0.7]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const finaleOpacity = useTransform(
    scrollYProgress,
    [0.78, 0.86, 1],
    [0, 1, 1],
  );
  const finaleY = useTransform(scrollYProgress, [0.78, 0.9], [40, 0]);

  if (reduce) return <StaticHero />;

  return (
    <section ref={sectionRef} className="relative h-[420vh] bg-[var(--color-ink)]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <HeroCanvas progress={progressRef} />
        </div>

        {/* Logo animation (Logo動畫) */}
        <motion.div
          style={{ opacity: logoOpacity, scale: logoScale }}
          className="pointer-events-none absolute left-1/2 top-[16%] -translate-x-1/2"
        >
          <AnimatedLogo className="h-24 w-24 sm:h-28 sm:w-28" />
        </motion.div>

        {/* Scroll story (滾動故事) */}
        {BEATS.map((beat) => (
          <Caption key={beat.kicker} beat={beat} progress={scrollYProgress} />
        ))}

        {/* Finale + CTAs */}
        <motion.div
          style={{ opacity: finaleOpacity, y: finaleY }}
          className="absolute inset-x-0 top-1/2 mx-auto max-w-3xl -translate-y-1/2 px-6 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-gold)]">
            {BRAND.shortName} · {BRAND.name}
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            {BRAND.product}
          </h1>
          <p className="mt-4 text-base text-white/80 sm:text-lg">
            {BRAND.taglineZh}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={process.env.NEXT_PUBLIC_PORTAL_URL || "/portal"}>
              <Button size="lg" variant="primary">
                Explore catalog
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </a>
            <Link href="/experience">
              <Button size="lg" variant="soft">
                Interactive Movie
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5" aria-hidden />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroExperience;
