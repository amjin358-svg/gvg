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
