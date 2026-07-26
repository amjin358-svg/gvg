import Link from "next/link";

export default function RealEstatePage() {
  return (
    <main className="subpage">
      <div>
        <h1>Real Estate</h1>
        <p style={{ marginTop: "1rem", color: "var(--gv-muted)" }}>
          Property and development desk.
        </p>
        <p style={{ marginTop: "2rem" }}>
          <Link href="/">← Back to Interactive Movie</Link>
        </p>
      </div>
    </main>
  );
}
