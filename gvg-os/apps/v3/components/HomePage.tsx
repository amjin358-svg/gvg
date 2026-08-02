import { SiteHeader } from "@/components/SiteHeader";
import { OrbitStage } from "@/components/OrbitStage";
import {
  BRAND,
  NAV,
  ORBIT_MODULES,
  ROUTES,
  SERVICES,
  STATS,
} from "@/lib/content";

export function HomePage() {
  return (
    <div className="v3-app">
      <div className="v3-sky" aria-hidden>
        <div className="v3-sky__stars" />
      </div>

      <SiteHeader />

      {/* 觀測層 */}
      <section className="observe" id="observe" aria-label="全球視野">
        <div>
          <p className="observe__eyebrow">V3 · Cosmos ↔ Trade</p>
          <h1>
            {BRAND.heroZh}
            <span className="observe__en">{BRAND.heroEn}</span>
          </h1>
          <p className="observe__lead">
            {BRAND.leadZh}
            <br />
            <span style={{ color: "rgba(126,182,255,0.85)" }}>{BRAND.leadEn}</span>
          </p>
          <div className="observe__cta">
            <a className="btn btn--gold" href="#orbit">
              探索貿易航線
            </a>
            <a className="btn btn--ghost" href="#ground">
              進入履約落地
            </a>
          </div>
          <ul className="observe__stats">
            {STATS.map((item) => (
              <li key={item.label}>
                <strong>{item.value}</strong>
                <span>
                  {item.label}
                  <small> · {item.en}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <OrbitStage />
      </section>

      {/* 軌道層 */}
      <section className="section" id="orbit" aria-labelledby="orbit-title">
        <div className="section__head">
          <div>
            <p className="eyebrow">Orbit Layer</p>
            <h2 id="orbit-title">貿易航線仍在夜空之下</h2>
            <p>
              金線不是裝飾，是可追蹤的跨境節點——採購、合規、調度與決策，都沿著同一條軌道前進。
            </p>
          </div>
          <a className="btn btn--ghost btn--sm" href="#services">
            查看服務
          </a>
        </div>

        <div className="orbit-grid">
          {ORBIT_MODULES.map((mod) => (
            <article key={mod.title} className="orbit-card">
              <h3>
                {mod.title}
                <small>{mod.en}</small>
              </h3>
              <p>{mod.body}</p>
            </article>
          ))}
        </div>

        <div className="route-list" aria-label="主要航線">
          {ROUTES.map((route) => (
            <div key={route.zh} className="route-chip">
              <strong>
                {route.from} → {route.to}
              </strong>
              {route.zh}
            </div>
          ))}
        </div>
      </section>

      {/* 地面層 */}
      <div className="ground" id="ground">
        <div className="ground-hero">
          <div>
            <p className="eyebrow">Ground Layer</p>
            <h2>航線落地，變成可執行的貿易節奏</h2>
            <p>
              從軌道看見的全球網絡，在港口變成貨櫃、文件與交期。V3
              用同一套海軍藍與金線，把「視野」接上「履約」。
            </p>
            <div className="observe__cta" style={{ marginTop: "1.25rem" }}>
              <a className="btn btn--navy" href="#contact">
                開始詢價
              </a>
            </div>
          </div>
          <div className="ground-hero__media" role="img" aria-label="港口貨輪" />
        </div>

        <section className="section" id="services" aria-labelledby="services-title">
          <div className="section__head">
            <div>
              <p className="eyebrow">Services</p>
              <h2 id="services-title">核心服務項目</h2>
              <p>專業流程對接跨境商機——中文主敘，英文標註關鍵能力。</p>
            </div>
          </div>
          <div className="service-grid">
            {SERVICES.map((item) => (
              <article key={item.title} className="service-card">
                <h3>
                  {item.title}
                  <small>{item.en}</small>
                </h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="contact" aria-label="聯絡詢價">
          <div className="contact-card">
            <h3>聯絡資訊</h3>
            <ul>
              <li>Email：trade@globalvistagroup.com</li>
              <li>服務時間：週一至週五 09:00–18:00（UTC+8）</li>
              <li>導覽：{NAV.map((n) => n.label).join(" · ")}</li>
            </ul>
          </div>
          <form className="contact-form" action="#" method="post">
            <h3>立即詢價 / RFQ</h3>
            <div className="form-grid">
              <label>
                公司名稱
                <input name="company" placeholder="您的公司" required />
              </label>
              <label>
                Email
                <input type="email" name="email" placeholder="name@company.com" required />
              </label>
              <label>
                需求說明
                <textarea
                  name="message"
                  placeholder="產品、數量、目標市場與交期…"
                  required
                />
              </label>
              <button className="btn btn--navy" type="submit">
                送出需求
              </button>
            </div>
          </form>
        </section>
      </div>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <span>
            © {new Date().getFullYear()} {BRAND.nameEn} · {BRAND.nameZh}
          </span>
          <span>V3 · Connecting Markets. Creating Value.</span>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
