"use client";

import { useRef } from "react";
import Link from "next/link";
import { BRAND_GOLD, CLASSIC_GOLD } from "@/lib/cinematic";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

export function Ending() {
  const root = useRef<HTMLElement>(null);
  const smileRef = useRef<SVGPathElement>(null);
  const nodeRef = useRef<SVGCircleElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const smile = smileRef.current;
      const node = nodeRef.current;
      if (!root.current || !smile || !node) return;

      const length = smile.getTotalLength();
      gsap.set(smile, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
      });
      gsap.set(node, { scale: 0, transformOrigin: "50% 50%", opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        })
        .to(smile, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.inOut",
        })
        .to(
          node,
          { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.6)" },
          "-=0.35",
        );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="scene scene--black scene-stub">
      <div className="ending-mark">
        <svg
          className="ending-smile"
          viewBox="0 0 240 90"
          width="240"
          height="90"
          aria-hidden
        >
          {/* ______ .-' / () \ '-.______ */}
          <path
            ref={smileRef}
            d="M 12 28 C 48 78, 192 78, 228 28"
            fill="none"
            stroke={BRAND_GOLD}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 12 28 C 48 78, 192 78, 228 28"
            fill="none"
            stroke={CLASSIC_GOLD}
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.25"
            style={{ filter: "blur(3px)" }}
          />
          <circle ref={nodeRef} cx="120" cy="62" r="8" fill={CLASSIC_GOLD} />
        </svg>
        <h2>GVG</h2>
        <p style={{ marginTop: "1rem" }}>Connecting Markets. Creating Value.</p>
        <p style={{ marginTop: "2rem" }}>
          <Link href="/marketplace">Enter Marketplace →</Link>
        </p>
      </div>
    </section>
  );
}

export default Ending;
