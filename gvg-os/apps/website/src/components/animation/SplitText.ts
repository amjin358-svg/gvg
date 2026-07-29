"use client";

import SplitType from "split-type";
import { gsap } from "@/lib/gsap";

export { SplitType };

/** Minimal split helper for future text reveals */
export function splitWords(el: HTMLElement): HTMLSpanElement[] {
  const text = el.textContent ?? "";
  el.textContent = "";
  return text.split(/\s+/).filter(Boolean).map((word) => {
    const span = document.createElement("span");
    span.textContent = word;
    span.style.display = "inline-block";
    span.style.marginRight = "0.35em";
    el.appendChild(span);
    return span;
  });
}

/** SplitType factory with safe null handling */
export function createSplitType(
  el: HTMLElement | null,
  options?: ConstructorParameters<typeof SplitType>[1],
): SplitType | null {
  if (!el) return null;
  return new SplitType(el, options);
}

/**
 * Kill tweens on split nodes, then restore original DOM.
 * Always call from useGSAP cleanup: `return () => revertSplit(split)`.
 */
export function revertSplit(split: SplitType | null | undefined): void {
  if (!split) return;
  const targets = [
    ...(split.chars ?? []),
    ...(split.words ?? []),
    ...(split.lines ?? []),
  ];
  if (targets.length) gsap.killTweensOf(targets);
  split.revert();
}
