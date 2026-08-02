"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RiseTitleProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
  delay?: number;
  /** Reveal on mount (hero / above the fold). */
  immediate?: boolean;
  [key: string]: unknown;
};

/**
 * Bottom-up entrance for headlines — high-fashion reveal on scroll into view.
 */
export function RiseTitle({
  as: Tag = "h2",
  children,
  className = "",
  style,
  id,
  delay = 0,
  immediate = false,
  ...rest
}: RiseTitleProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || immediate) {
      const id = window.requestAnimationFrame(() => el.classList.add("is-in"));
      return () => window.cancelAnimationFrame(id);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      id={id}
      className={`rise-title ${className}`.trim()}
      style={{ ...style, transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default RiseTitle;
