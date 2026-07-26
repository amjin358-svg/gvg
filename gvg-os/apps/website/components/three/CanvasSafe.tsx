"use client";

import {
  Component,
  useEffect,
  useState,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { Canvas, type CanvasProps } from "@react-three/fiber";

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
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

type CanvasSafeProps = CanvasProps & {
  fallback?: ReactNode;
  className?: string;
};

/**
 * Client-only R3F Canvas with WebGL preflight + error isolation.
 * Prevents uncaught WebGL failures from white-screening the movie.
 */
export function CanvasSafe({
  children,
  fallback = null,
  className,
  ...props
}: CanvasSafeProps) {
  const [state, setState] = useState<"boot" | "ok" | "no-webgl">("boot");

  useEffect(() => {
    setState(detectWebGL() ? "ok" : "no-webgl");
  }, []);

  if (state !== "ok") {
    return (
      <div className={className} style={{ width: "100%", height: "100%" }}>
        {fallback ?? <div className="canvas-safe-fallback" />}
      </div>
    );
  }

  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <WebGLBoundary
        fallback={fallback ?? <div className="canvas-safe-fallback" />}
      >
        <Canvas
          {...props}
          gl={{
            antialias: true,
            powerPreference: "default",
            failIfMajorPerformanceCaveat: false,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor("#020b1c");
          }}
        >
          {children}
        </Canvas>
      </WebGLBoundary>
    </div>
  );
}

export default CanvasSafe;
