import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-[var(--color-ink)] px-4 pt-24 text-center text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">404</p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm text-white/70">
        The requested route is not part of GVG Global Trade OS yet.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center bg-[var(--color-accent)] px-5 text-sm font-semibold text-white"
      >
        Back to home
      </Link>
    </section>
  );
}
