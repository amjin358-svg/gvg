import Link from "next/link";
import { PageHero } from "@/components/PageHero";

const STEPS = [
  {
    title: "需求評估",
    en: "Briefing",
    body: "釐清產品、市場、預算與時程，建立可執行的貿易方案。",
  },
  {
    title: "供應媒合",
    en: "Matching",
    body: "對接合適供應商與報價條件，協助樣品與品質確認。",
  },
  {
    title: "交易履約",
    en: "Fulfillment",
    body: "串聯物流、文件與付款節點，確保交期與風險可控。",
  },
  {
    title: "售後追蹤",
    en: "Aftercare",
    body: "持續優化補貨與再訂購節奏，累積長期合作效率。",
  },
] as const;

export default function TradePage() {
  return (
    <>
      <PageHero
        title="貿易中心"
        en="Trade Hub"
        lead="一站掌握詢價、媒合、文件與履約節奏，讓跨境交易更清楚、更快推進。"
      />
      <div className="page-body">
        <div className="content-grid">
          {STEPS.map((item) => (
            <div key={item.title} className="info-block">
              <h3>
                {item.title}
                <small>{item.en}</small>
              </h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "2rem" }}>
          <Link href="/contact#rfq" className="btn btn--primary">
            前往立即詢價
          </Link>
        </div>
      </div>
    </>
  );
}
