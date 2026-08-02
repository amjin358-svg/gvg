import { PageHero } from "@/components/PageHero";
import { SERVICES } from "@/lib/content";

const ANCHORS = [
  "trade",
  "sourcing",
  "supply-chain",
  "logistics",
  "compliance",
  "oem",
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="服務項目"
        en="Our Services"
        lead="從國際貿易、全球採購到物流合規與 OEM／ODM，提供一站式跨境服務能力。"
      />
      <div className="page-body">
        <div className="content-grid">
          {SERVICES.map((item, index) => (
            <article
              key={item.href}
              id={ANCHORS[index]}
              className="info-block"
            >
              <h3>
                {item.title}
                <small>{item.en}</small>
              </h3>
              <p>{item.desc}</p>
              <p>
                我們以清楚節點與可追蹤流程協助您縮短決策時間，並在關鍵市場維持穩定交付。
              </p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
