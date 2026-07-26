"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Globe2, Ship, Sparkles } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { BRAND } from "@/lib/constants";

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[var(--color-ink)] text-white">
      <div
        className="absolute inset-0 bg-[linear-gradient(135deg,#07111f_0%,#0b1f33_42%,#0d3d3a_78%,#163a2f_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 22%, rgba(26,122,109,0.55), transparent 34%), radial-gradient(circle at 78% 18%, rgba(184,115,51,0.28), transparent 30%), radial-gradient(circle at 70% 75%, rgba(56,189,248,0.18), transparent 35%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 78%)",
        }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -right-24 top-24 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(26,122,109,0.35),transparent_65%)]"
        aria-hidden
        animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.55, 0.8, 0.55] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -left-16 bottom-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(184,115,51,0.28),transparent_70%)]"
        aria-hidden
        animate={reduce ? undefined : { y: [0, -18, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="relative flex min-h-[100svh] flex-col justify-end pb-16 pt-28 sm:justify-center sm:pb-24 sm:pt-32">
        <motion.p
          className="font-[family-name:var(--font-display)] text-5xl font-semibold tracking-tight sm:text-7xl lg:text-8xl"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {BRAND.shortName}
          <span className="mt-2 block text-2xl font-medium tracking-[0.08em] text-white/70 sm:text-3xl lg:text-4xl">
            {BRAND.name}
          </span>
        </motion.p>

        <motion.h1
          className="mt-8 max-w-3xl font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {BRAND.product}
          <span className="mt-2 block text-xl font-normal text-white/75 sm:text-2xl">
            {BRAND.tagline}
          </span>
        </motion.h1>

        <motion.p
          className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.22 }}
        >
          Enterprise B2B and B2C trade OS for suppliers, manufacturers, buyers, and
          logistics partners — from RFQ to customs clearance.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center gap-3"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
        >
          <Link href="/products">
            <Button size="lg" variant="primary">
              Explore catalog
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </Link>
          <Link href="/rfq">
            <Button size="lg" variant="soft">
              Request a quote
            </Button>
          </Link>
        </motion.div>

        <motion.ul
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/65"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <li className="inline-flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-[var(--color-accent-soft)]" aria-hidden />
            Global procurement
          </li>
          <li className="inline-flex items-center gap-2">
            <Ship className="h-4 w-4 text-[var(--color-accent-soft)]" aria-hidden />
            Logistics & customs
          </li>
          <li className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[var(--color-accent-soft)]" aria-hidden />
            AI sourcing assistant
          </li>
        </motion.ul>
      </Container>
    </section>
  );
}
