import { gsap, registerMotionPlugins, ScrollTrigger } from "./gsap";

export type ScrollDirectorOptions = {
  trigger: Element | string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
};

/**
 * Scroll Director — orchestrates scrubbed scroll-linked scenes.
 */
export class ScrollDirector {
  private timelines: gsap.core.Timeline[] = [];

  scene(options: ScrollDirectorOptions, build: (tl: gsap.core.Timeline) => void) {
    registerMotionPlugins();
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: options.trigger,
        start: options.start ?? "top top",
        end: options.end ?? "+=100%",
        scrub: options.scrub ?? true,
        pin: options.pin ?? false,
        markers: options.markers ?? false,
      },
    });
    build(tl);
    this.timelines.push(tl);
    return tl;
  }

  refresh() {
    registerMotionPlugins();
    ScrollTrigger.refresh();
  }

  destroy() {
    this.timelines.forEach((tl) => tl.kill());
    this.timelines = [];
  }
}

export function createScrollDirector() {
  return new ScrollDirector();
}
