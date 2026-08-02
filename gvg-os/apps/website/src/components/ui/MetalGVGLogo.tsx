"use client";

/**
 * Metal / gold-edge GVG mark — white core, gold rim, soft bloom via CSS.
 * Occupies ~65% of the awaken stage when scaled by GSAP.
 */
export function MetalGVGLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`cx-logo ${className}`.trim()} aria-label="GVG">
      <div className="cx-logo__bloom" aria-hidden />
      <svg
        className="cx-logo__svg"
        viewBox="0 0 640 220"
        role="img"
        aria-hidden
      >
        <defs>
          <linearGradient id="cx-logo-metal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#f5f7fa" />
            <stop offset="100%" stopColor="#d8dee8" />
          </linearGradient>
          <linearGradient id="cx-logo-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff1c2" />
            <stop offset="40%" stopColor="#e0b84a" />
            <stop offset="100%" stopColor="#a67c1a" />
          </linearGradient>
        </defs>
        <text
          x="50%"
          y="58%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="cx-logo__stroke"
          fill="none"
          stroke="url(#cx-logo-gold)"
          strokeWidth="7"
        >
          GVG
        </text>
        <text
          x="50%"
          y="58%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="cx-logo__fill"
          fill="url(#cx-logo-metal)"
        >
          GVG
        </text>
      </svg>
    </div>
  );
}
