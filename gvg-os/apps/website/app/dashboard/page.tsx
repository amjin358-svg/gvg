import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="subpage">
      <div>
        <h1>Dashboard</h1>
        <p style={{ marginTop: "1rem", color: "var(--gv-muted)" }}>
          Ops dashboard entry (stub).
        </p>
        <p style={{ marginTop: "2rem" }}>
          <Link href="/">← Home</Link>
        </p>
      </div>
    </main>
  );
}
