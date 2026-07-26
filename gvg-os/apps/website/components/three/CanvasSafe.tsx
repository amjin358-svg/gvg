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

/** Catch WebGL / R3F mount failures so the movie shell still renders. */
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

type CanvasSafeProps = CanvasProps & {
  fallback?: ReactNode;
  className?: string;
};

/**
 * Client-only R3F Canvas with WebGL error isolation.
 * Avoids SSR/hydration crashes on GitHub Pages / restricted GPUs.
 */
export function CanvasSafe({
  children,
  fallback = null,
  className,
  ...props
}: CanvasSafeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={className} style={{ width: "100%", height: "100%" }} />;
  }

  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <WebGLBoundary fallback={fallback ?? <div className="canvas-safe-fallback" />}>
        <Canvas {...props}>{children}</Canvas>
      </WebGLBoundary>
    </div>
  );
}

export default CanvasSafe;
