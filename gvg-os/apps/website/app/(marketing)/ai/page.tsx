import Link from "next/link";

export default function AiPage() {
  return (
    <main className="subpage">
      <div>
        <h1>AI</h1>
        <p style={{ marginTop: "1rem", color: "var(--gv-muted)" }}>
          Intelligence layer for trade decisions.
        </p>
        <p style={{ marginTop: "2rem" }}>
          <Link href="/">← Back to Interactive Movie</Link>
        </p>
      </div>
    </main>
  );
}
