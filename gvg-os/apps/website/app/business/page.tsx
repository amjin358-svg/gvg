import Link from "next/link";

export default function BusinessPage() {
  return (
    <main className="subpage">
      <div>
        <h1>Business</h1>
        <p style={{ marginTop: "1rem", color: "var(--gv-muted)" }}>
          Company profile and enterprise story.
        </p>
        <p style={{ marginTop: "2rem" }}>
          <Link href="/">← Back to Interactive Movie</Link>
        </p>
      </div>
    </main>
  );
}
