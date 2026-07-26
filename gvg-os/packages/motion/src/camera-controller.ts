import { gsap, registerMotionPlugins } from "./gsap";

export type CameraState = {
  x: number;
  y: number;
  z: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
};

export const defaultCamera: CameraState = {
  x: 0,
  y: 0,
  z: 0,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
};

/**
 * Camera Controller — 2.5D camera rig for scene roots.
 */
export class CameraController {
  constructor(private target: HTMLElement) {
    registerMotionPlugins();
    this.set(defaultCamera);
  }

  set(state: Partial<CameraState>) {
    const next = { ...defaultCamera, ...state };
    gsap.set(this.target, {
      ...next,
      transformPerspective: 1200,
      transformOrigin: "50% 50%",
    });
  }

  to(state: Partial<CameraState>, vars: gsap.TweenVars = {}) {
    return gsap.to(this.target, {
      ...state,
      transformPerspective: 1200,
      transformOrigin: "50% 50%",
      ease: vars.ease ?? "power2.out",
      duration: vars.duration ?? 1,
      ...vars,
    });
  }

  lookAt(offset: { x?: number; y?: number } = {}) {
    return this.to({ x: offset.x ?? 0, y: offset.y ?? 0, rotateY: (offset.x ?? 0) * 0.02 });
  }
}

export function createCameraController(target: HTMLElement) {
  return new CameraController(target);
}
