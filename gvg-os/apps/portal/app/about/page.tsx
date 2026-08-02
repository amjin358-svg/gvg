import { PageHero } from "@/components/PageHero";
import { ABOUT_HIGHLIGHTS, BRAND } from "@/lib/content";

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="關於 GVG"
        en="About Global Vista Group"
        lead={`${BRAND.nameZh} 專注全球貿易與供應鏈整合，協助企業穩健拓展跨境商機。`}
      />
      <div className="page-body">
        <article className="prose">
          <h2>我們是誰</h2>
          <p>
            GVG（{BRAND.nameEn}）以「連接市場、創造價值」為使命，整合採購、貿易、
            物流與合規能力，為品牌商、通路商與供應商打造可規模化的跨境合作模式。
          </p>
          <p>
            團隊深耕多區域市場，強調透明流程與長期夥伴關係，讓每一次進出貨都能
            更快、更穩、更可控。
          </p>
        </article>

        <div className="content-grid" style={{ marginTop: "2rem" }}>
          {ABOUT_HIGHLIGHTS.map((item) => (
            <div key={item.title} className="info-block">
              <h3>
                {item.title}
                <small>{item.en}</small>
              </h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
