import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { CATEGORIES } from "@/lib/content";
import { IconArrow } from "@/components/icons";

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="商品中心"
        en="Product Center"
        lead="探索保健、食品、居家、五金、建材與辦公等熱門品類，支援批發採購、品牌導入與跨境通路需求。"
      />
      <div className="page-body">
        <div className="section__head" style={{ marginBottom: "1.5rem" }}>
          <div>
            <p className="eyebrow">Catalog</p>
            <h2 style={{ margin: 0, color: "var(--gvg-navy)" }}>熱門產品分類</h2>
            <p style={{ margin: "0.45rem 0 0", color: "var(--gvg-muted)" }}>
              選擇品類進入商品列表與篩選 · Browse by category
            </p>
          </div>
          <Link href="/contact#rfq" className="text-link">
            立即詢價 <IconArrow />
          </Link>
        </div>

        <div className="category-grid">
          {CATEGORIES.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`category-tile category-tile--${item.tone}`}
            >
              <span>
                {item.zh}
                <small>{item.en}</small>
              </span>
            </Link>
          ))}
        </div>

        <article className="prose" style={{ marginTop: "2.5rem" }}>
          <h2>如何開始採購</h2>
          <p>
            告訴我們目標市場、預估量與規格需求，GVG 將協助媒合合適供應來源，
            並提供報價、樣品與交期建議。Welcome to inquire with your target
            market and volume.
          </p>
          <Link href="/contact#rfq" className="btn btn--primary">
            前往詢價 <IconArrow />
          </Link>
        </article>
      </div>
    </>
  );
}
