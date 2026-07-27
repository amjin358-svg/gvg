"use client";

import { useRef } from "react";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V2 } from "@/lib/movieContent";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 1｜Opening — GVG logo punch, then Star Wars–style crawl
 * (closing brand text effect moved to the front).
 */
export function Scene01Logo() {
  const root = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLHeadingElement>(null);
  const crawlStage = useRef<HTMLDivElement>(null);
  const crawlText = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const crawl = MOVIE_V2.opening.crawl;

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !mark.current || !crawlText.current || !crawlStage.current) {
        return;
      }

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.set(mark.current, { opacity: 0, scale: 0.55 });
      gsap.set(crawlStage.current, { opacity: 0 });
      gsap.set(crawlText.current, { yPercent: 55, opacity: 1 });
      if (hint.current) gsap.set(hint.current, { opacity: 0, y: 10 });

      if (reduced) {
        gsap.set(mark.current, { opacity: 1, scale: 1 });
        gsap.set(crawlStage.current, { opacity: 1 });
        gsap.set(crawlText.current, { yPercent: 0 });
        if (hint.current) gsap.set(hint.current, { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=4200",
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1) GVG logo — fade / scale / punch / fly away (Star Wars title beat)
      tl.to(mark.current, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
      })
        .to(mark.current, {
          scale: 1.14,
          duration: 0.7,
          ease: "power2.inOut",
        })
        .to(mark.current, {
          opacity: 0,
          scale: 3.4,
          filter: "blur(6px)",
          duration: 1.1,
          ease: "power2.in",
        });

      // 2) Crawl rises into the vanishing point
      tl.to(
        crawlStage.current,
        {
          opacity: 1,
          duration: 0.55,
          ease: "power1.out",
        },
        "-=0.35",
      ).to(
        crawlText.current,
        {
          yPercent: -95,
          duration: 5.5,
          ease: "none",
        },
        "<0.15",
      );

      // Soft fade as crawl disappears into the distance
      tl.to(
        crawlStage.current,
        {
          opacity: 0,
          duration: 1.2,
          ease: "power1.in",
        },
        "-=1.4",
      );

      if (hint.current) {
        tl.to(
          hint.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.55",
        );
      }
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--black opening-scene" aria-label="Opening crawl">
        <div className="noise-overlay" aria-hidden />

        <div className="opening-scene__copy opening-scene__copy--logo">
          <h1 ref={mark} className="logo opening-scene__logo opening-scene__logo--gvg">
            {MOVIE_V2.opening.mark}
          </h1>
        </div>

        <div ref={crawlStage} className="star-crawl" aria-label="Opening prologue">
          <div className="star-crawl__fade" aria-hidden />
          <div className="star-crawl__perspective">
            <div ref={crawlText} className="star-crawl__text">
              <p className="star-crawl__episode">{crawl.episode}</p>
              <h2 className="star-crawl__title">
                {crawl.title.split("\n").map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </h2>
              <p className="star-crawl__title-zh">{crawl.titleZh}</p>
              {crawl.paragraphs.map((para) => (
                <p key={para.slice(0, 24)} className="star-crawl__para">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div ref={hint} className="opening-scene__hint" aria-hidden>
          <span className="opening-scene__mouse" />
          <span>{MOVIE_V2.opening.scroll}</span>
        </div>
      </section>
    </div>
  );
}

export default Scene01Logo;
