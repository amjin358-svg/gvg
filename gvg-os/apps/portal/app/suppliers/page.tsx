import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SUPPLIER_BENEFITS } from "@/lib/content";

export default function SuppliersPage() {
  return (
    <>
      <PageHero
        title="供應商合作"
        en="Supplier Partnership"
        lead="歡迎優質供應商加入 GVG 網絡，對接全球買主並共同提升履約品質。"
      />
      <div className="page-body">
        <div className="content-grid">
          {SUPPLIER_BENEFITS.map((item) => (
            <div key={item.title} className="info-block">
              <h3>
                {item.title}
                <small>{item.en}</small>
              </h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
        <article className="prose" style={{ marginTop: "2.25rem" }}>
          <h2>申請成為供應商</h2>
          <p>
            請提供公司簡介、主力品類、產能與認證資料。我們將由專責窗口評估後回覆。
            Apply with your company profile and certifications.
          </p>
          <Link href="/contact#supplier" className="btn btn--primary">
            提交合作申請
          </Link>
        </article>
      </div>
    </>
  );
}
