import { gsap, registerMotionPlugins } from "./gsap";

export type TextSplitMode = "chars" | "words" | "lines";

/**
 * Text Reveal — split + stagger cinematic typography.
 */
export function prepareText(element: HTMLElement, mode: TextSplitMode = "words") {
  const text = element.textContent ?? "";
  element.setAttribute("aria-label", text);
  element.textContent = "";

  const parts =
    mode === "chars"
      ? Array.from(text)
      : mode === "lines"
        ? text.split(/\n/)
        : text.split(/(\s+)/);

  return parts.map((part) => {
    const span = document.createElement("span");
    span.className = "gv-text-unit inline-block will-change-transform";
    span.textContent = part === " " ? "\u00A0" : part;
    if (mode !== "chars" && /^\s+$/.test(part)) span.style.whiteSpace = "pre";
    element.appendChild(span);
    return span;
  });
}

export function textReveal(
  element: HTMLElement,
  mode: TextSplitMode = "words",
  vars: gsap.TweenVars = {},
) {
  registerMotionPlugins();
  const units = prepareText(element, mode);
  return gsap.from(units, {
    y: 24,
    opacity: 0,
    duration: 0.7,
    stagger: mode === "chars" ? 0.02 : 0.05,
    ease: "power3.out",
    ...vars,
  });
}
