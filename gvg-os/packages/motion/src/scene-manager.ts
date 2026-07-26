import { gsap, registerMotionPlugins } from "./gsap";

export type SceneDefinition = {
  id: string;
  element: Element | string;
  enter?: (el: Element) => gsap.core.Tween | gsap.core.Timeline | void;
  leave?: (el: Element) => gsap.core.Tween | gsap.core.Timeline | void;
};

/**
 * Scene Manager — register and activate named cinematic scenes.
 */
export class SceneManager {
  private scenes = new Map<string, SceneDefinition>();
  private activeId: string | null = null;

  register(scene: SceneDefinition) {
    this.scenes.set(scene.id, scene);
    return this;
  }

  unregister(id: string) {
    this.scenes.delete(id);
  }

  get active() {
    return this.activeId;
  }

  async goTo(id: string) {
    registerMotionPlugins();
    const next = this.scenes.get(id);
    if (!next) throw new Error(`Scene not found: ${id}`);

    if (this.activeId && this.activeId !== id) {
      const prev = this.scenes.get(this.activeId);
      if (prev) {
        const el = resolveEl(prev.element);
        if (el) prev.leave?.(el);
      }
    }

    const el = resolveEl(next.element);
    if (el) {
      gsap.set(el, { autoAlpha: 1 });
      next.enter?.(el);
    }
    this.activeId = id;
  }

  list() {
    return [...this.scenes.keys()];
  }

  clear() {
    this.scenes.clear();
    this.activeId = null;
  }
}

function resolveEl(target: Element | string): Element | null {
  return typeof target === "string" ? document.querySelector(target) : target;
}

export function createSceneManager() {
  return new SceneManager();
}
