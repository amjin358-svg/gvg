import Link from "next/link";

export default function MarketplacePage() {
  return (
    <main className="subpage">
      <div>
        <h1>Marketplace</h1>
        <p style={{ marginTop: "1rem", color: "var(--gv-muted)" }}>
          Product discovery and sourcing hub.
        </p>
        <p style={{ marginTop: "2rem" }}>
          <Link href="/">← Back to Interactive Movie</Link>
        </p>
      </div>
    </main>
  );
}
