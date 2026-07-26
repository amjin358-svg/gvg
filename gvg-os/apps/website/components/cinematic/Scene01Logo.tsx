"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { createLogoIntro } from "@/components/animation/GSAPTimeline";

export function Scene01Logo() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    const logo = logoRef.current;
    if (!section || !logo) return;

    const ctx = gsap.context(() => {
      createLogoIntro(logo);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="scene scene--black">
      <div
        style={{
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <h1 ref={logoRef} className="logo">
          GVG
        </h1>
      </div>
    </section>
  );
}

export default Scene01Logo;
