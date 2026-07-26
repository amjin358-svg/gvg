import Link from "next/link";

export function Ending() {
  return (
    <section className="scene scene--black scene-stub">
      <div>
        <h2>GVG</h2>
        <p style={{ marginTop: "1rem" }}>Connecting Markets. Creating Value.</p>
        <p style={{ marginTop: "2rem" }}>
          <Link href="/marketplace">Enter Marketplace →</Link>
        </p>
      </div>
    </section>
  );
}

export default Ending;
