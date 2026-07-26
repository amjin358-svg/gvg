import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { CATEGORIES } from "@/lib/content";

const IDS = [
  "supplements",
  "food",
  "home",
  "hardware",
  "materials",
  "office",
] as const;

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="全球產品"
        en="Global Products"
        lead="涵蓋保健、食品、居家、五金、建材與辦公等熱門品類，支援多樣化市場需求。"
      />
      <div className="page-body">
        <div className="category-grid">
          {CATEGORIES.map((item, index) => (
            <Link
              key={item.href}
              id={IDS[index]}
              href={`/contact#rfq?category=${IDS[index]}`}
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
        </article>
      </div>
    </>
  );
}
