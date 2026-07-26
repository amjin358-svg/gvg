"use client";

import { useRef } from "react";
import SplitType from "split-type";
import { revertSplit } from "@/components/animation/SplitText";
import { registerGsapPlugins, useGSAP } from "@/lib/gsap";
import { createLogoIntro } from "@/components/animation/GSAPTimeline";

export function Scene01Logo() {
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!title.current) return;

      const split = new SplitType(title.current, { types: "chars" });
      createLogoIntro(split.chars?.length ? split.chars : title.current);

      return () => {
        revertSplit(split);
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="scene scene--black">
      <div
        style={{
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <h1 ref={title} className="logo">
          GVG
        </h1>
      </div>
    </section>
  );
}

export default Scene01Logo;
