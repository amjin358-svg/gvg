"use client";

import {
  Component,
  useEffect,
  useRef,
  useState,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { Canvas, type CanvasProps, useThree } from "@react-three/fiber";

type BoundaryState = { error: Error | null };

class WebGLBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  BoundaryState
> {
  state: BoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("[CanvasSafe]", error.message, info.componentStack);
  }

  render() {
    if (this.state.error) return this.props.fallback;
    return this.props.children;
  }
}

function detectWebGL(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

/** Pause the R3F loop when the canvas leaves the viewport. */
function VisibilityGate({
  active,
  children,
}: {
  active: boolean;
  children: ReactNode;
}) {
  const invalidate = useThree((s) => s.invalidate);
  const setFrameloop = useThree((s) => s.setFrameloop);

  useEffect(() => {
    if (active) {
      setFrameloop("always");
      invalidate();
    } else {
      setFrameloop("never");
    }
  }, [active, invalidate, setFrameloop]);

  return <>{children}</>;
}

type CanvasSafeProps = CanvasProps & {
  fallback?: ReactNode;
  className?: string;
  /** When false, WebGL loop sleeps (default: observe self). */
  pauseWhenOffscreen?: boolean;
};

/**
 * Client-only R3F Canvas with WebGL preflight + offscreen pause.
 */
export function CanvasSafe({
  children,
  fallback = null,
  className,
  pauseWhenOffscreen = true,
  dpr,
  gl,
  ...props
}: CanvasSafeProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"boot" | "ok" | "no-webgl">("boot");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setState(detectWebGL() ? "ok" : "no-webgl");
  }, []);

  useEffect(() => {
    if (!pauseWhenOffscreen || !hostRef.current) return;
    const el = hostRef.current;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { rootMargin: "120px 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [pauseWhenOffscreen, state]);

  if (state !== "ok") {
    return (
      <div ref={hostRef} className={className} style={{ width: "100%", height: "100%" }}>
        {fallback ?? <div className="canvas-safe-fallback" />}
      </div>
    );
  }

  const cappedDpr =
    dpr ??
    (typeof window !== "undefined"
      ? Math.min(window.devicePixelRatio || 1, 1.5)
      : 1);

  return (
    <div ref={hostRef} className={className} style={{ width: "100%", height: "100%" }}>
      <WebGLBoundary
        fallback={fallback ?? <div className="canvas-safe-fallback" />}
      >
        <Canvas
          {...props}
          dpr={cappedDpr}
          performance={{ min: 0.5 }}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "default",
            failIfMajorPerformanceCaveat: false,
            ...(typeof gl === "object" && gl ? gl : {}),
          }}
          onCreated={({ gl: renderer }) => {
            renderer.setClearColor(0x000000, 0);
          }}
        >
          <VisibilityGate active={!pauseWhenOffscreen || visible}>
            {children}
          </VisibilityGate>
        </Canvas>
      </WebGLBoundary>
    </div>
  );
}

export default CanvasSafe;
