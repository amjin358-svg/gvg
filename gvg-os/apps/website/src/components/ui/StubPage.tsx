import Link from "next/link";

type StubPageProps = {
  title: string;
  description: string;
};

/** Lightweight subroute stub — full feature pages live in @gvg/portal */
export function StubPage({ title, description }: StubPageProps) {
  return (
    <main className="subpage">
      <div>
        <h1>{title}</h1>
        <p style={{ marginTop: "1rem", color: "var(--gv-muted)" }}>{description}</p>
        <p style={{ marginTop: "2rem" }}>
          <Link href="/experience">← Interactive Movie</Link>
          {" · "}
          <Link href="/">Home</Link>
        </p>
      </div>
    </main>
  );
}

export default StubPage;
