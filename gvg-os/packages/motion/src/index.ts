/**
 * @gvg/motion — GVG OS cinematic motion system
 */

export { gsap, ScrollTrigger, registerMotionPlugins } from "./gsap";

export { ScrollDirector, createScrollDirector } from "./scroll-director";
export type { ScrollDirectorOptions } from "./scroll-director";

export { SceneManager, createSceneManager } from "./scene-manager";
export type { SceneDefinition } from "./scene-manager";

export {
  CameraController,
  createCameraController,
  defaultCamera,
} from "./camera-controller";
export type { CameraState } from "./camera-controller";

export { createTimeline, sequence, staggerIn } from "./timeline";
export type { MotionTimelineOptions } from "./timeline";

export { parallax, parallaxLayers } from "./parallax";
export type { ParallaxOptions } from "./parallax";

export { prepareText, textReveal } from "./text-reveal";
export type { TextSplitMode } from "./text-reveal";

export { transitionIn, transitionOut, crossfade } from "./transition";
export type { TransitionKind } from "./transition";

export { ParticleEngine, createParticleEngine } from "./particle-engine";
export type { Particle, ParticleEngineOptions } from "./particle-engine";

export const name = "@gvg/motion";
export const version = "0.1.0";
