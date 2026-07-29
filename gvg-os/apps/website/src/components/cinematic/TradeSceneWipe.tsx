"use client";

/**
 * Trade-themed scene entry wipe / atmosphere plates.
 * theme: orbital | shipping | cargo | vip
 */
export function TradeSceneWipe({
  theme,
}: {
  theme: "orbital" | "shipping" | "cargo" | "vip";
}) {
  return (
    <div className={`trade-wipe trade-wipe--${theme}`} aria-hidden>
      <div className="trade-wipe__plate" />
      <div className="trade-wipe__motif" />
      {theme === "shipping" ? (
        <>
          <span className="trade-wipe__lane trade-wipe__lane--a" />
          <span className="trade-wipe__lane trade-wipe__lane--b" />
          <span className="trade-wipe__lane trade-wipe__lane--c" />
        </>
      ) : null}
      {theme === "cargo" ? (
        <div className="trade-wipe__crates">
          <i />
          <i />
          <i />
          <i />
        </div>
      ) : null}
      {theme === "orbital" ? (
        <>
          <span className="trade-wipe__orbit trade-wipe__orbit--a" />
          <span className="trade-wipe__orbit trade-wipe__orbit--b" />
          <span className="trade-wipe__orbit trade-wipe__orbit--c" />
        </>
      ) : null}
      {theme === "vip" ? <span className="trade-wipe__portal" /> : null}
    </div>
  );
}

export default TradeSceneWipe;
