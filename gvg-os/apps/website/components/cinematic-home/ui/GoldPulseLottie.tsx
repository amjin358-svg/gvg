"use client";

import Lottie from "lottie-react";

/** Minimal gold pulse mark — lightweight Lottie accent (no network fetch). */
const GOLD_PULSE = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 120,
  h: 120,
  nm: "gold-pulse",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "ring",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [55], e: [15] },
            { t: 60, s: [15] },
          ],
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [60, 60, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [70, 70, 100], e: [130, 130, 100] },
            { t: 60, s: [130, 130, 100] },
          ],
        },
      },
      ao: 0,
      shapes: [
        {
          ty: "el",
          p: { a: 0, k: [0, 0] },
          s: { a: 0, k: [80, 80] },
          nm: "ellipse",
        },
        {
          ty: "st",
          c: { a: 0, k: [0.88, 0.72, 0.29, 1] },
          o: { a: 0, k: 100 },
          w: { a: 0, k: 3 },
          nm: "stroke",
        },
        { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0,
    },
  ],
} as const;

export function GoldPulseLottie({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <Lottie animationData={GOLD_PULSE} loop style={{ width: 72, height: 72 }} />
    </div>
  );
}
