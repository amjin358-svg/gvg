import { gsap, registerMotionPlugins } from "./gsap";

export type ParallaxOptions = {
  y?: number;
  x?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
};

/**
 * Parallax — scroll-linked layer depth.
 */
export function parallax(target: gsap.TweenTarget, options: ParallaxOptions = {}) {
  registerMotionPlugins();
  const { y = 120, x = 0, start = "top bottom", end = "bottom top", scrub = true } = options;

  return gsap.to(target, {
    y,
    x,
    ease: "none",
    scrollTrigger: {
      trigger: target as Element,
      start,
      end,
      scrub,
    },
  });
}

export function parallaxLayers(
  layers: Array<{ target: gsap.TweenTarget; y?: number; x?: number }>,
  shared: Omit<ParallaxOptions, "y" | "x"> = {},
) {
  return layers.map((layer) =>
    parallax(layer.target, { ...shared, y: layer.y, x: layer.x }),
  );
}
