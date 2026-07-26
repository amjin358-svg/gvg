import Link from "next/link";

export default function InvestmentPage() {
  return (
    <main className="subpage">
      <div>
        <h1>Investment</h1>
        <p style={{ marginTop: "1rem", color: "var(--gv-muted)" }}>
          Capital and growth narratives.
        </p>
        <p style={{ marginTop: "2rem" }}>
          <Link href="/">← Back to Interactive Movie</Link>
        </p>
      </div>
    </main>
  );
}
