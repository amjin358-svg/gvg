"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Animated GVG monogram — orbital ring draw-on plus a traveling node.
 * Used as the hero's logo animation (Logo動畫).
 */
export function AnimatedLogo({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="GVG Global Vista Group"
      initial={reduce ? false : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        <linearGradient id="gvg-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d4a017" />
          <stop offset="55%" stopColor="#1a7a6d" />
          <stop offset="100%" stopColor="#7fd9c9" />
        </linearGradient>
      </defs>

      <motion.circle
        cx="60"
        cy="60"
        r="52"
        fill="none"
        stroke="url(#gvg-ring)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />

      <motion.circle
        cx="60"
        cy="60"
        r="42"
        fill="none"
        stroke="rgba(127,217,201,0.35)"
        strokeWidth="1"
        strokeDasharray="3 6"
        initial={false}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 60px" }}
      />

      {/* Orbiting node */}
      <motion.g
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 60px" }}
      >
        <circle cx="60" cy="8" r="3.4" fill="#d4a017" />
      </motion.g>

      <motion.text
        x="60"
        y="60"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-display), sans-serif"
        fontSize="34"
        fontWeight="700"
        fill="#ffffff"
        letterSpacing="1"
        initial={reduce ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        GVG
      </motion.text>
    </motion.svg>
  );
}

export default AnimatedLogo;
