"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { error: Error | null };

/** Keeps the cinematic shell recoverable if a scene throws. */
export class MovieErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("[InteractiveMovie]", error.message, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <main className="movie-root ending-scene" aria-label="Global Vista Group">
          <div className="ending-scene__mark">
            <h1 className="logo">Global Vista Group</h1>
            <p className="ending-scene__line">
              Connecting Markets. Creating Value.
            </p>
            <p className="ending-scene__line" style={{ opacity: 0.7 }}>
              Reload to restart the cinematic experience.
            </p>
            <a className="ending-scene__cta" href="./">
              Return to Homepage
            </a>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}

export default MovieErrorBoundary;
