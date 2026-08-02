import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CATEGORIES,
  CATEGORY_DETAILS,
  PRODUCT_TRUST,
  type CategoryId,
} from "@/lib/content";
import { IconArrow } from "@/components/icons";
import { RiseTitle } from "@/components/RiseTitle";

const IDS = CATEGORIES.map((c) => c.id);

export function generateStaticParams() {
  return IDS.map((category) => ({ category }));
}

function Stars({ n }: { n: number }) {
  return (
    <span className="product-card__stars" aria-label={`${n} 星`}>
      {"★".repeat(Math.max(0, Math.min(5, n)))}
      <span>{"☆".repeat(Math.max(0, 5 - n))}</span>
    </span>
  );
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: raw } = await params;
  const category = raw as CategoryId;
  const detail = CATEGORY_DETAILS[category];
  const meta = CATEGORIES.find((c) => c.id === category);
  if (!detail || !meta) notFound();

  return (
    <div className="pc">
      <div className="pc__crumbs">
        <Link href="/">首頁</Link>
        <span>/</span>
        <Link href="/products">商品中心</Link>
        <span>/</span>
        <span>{detail.titleZh}</span>
      </div>

      <div className="pc__layout">
        <aside className="pc__sidebar" aria-label="商品篩選">
          <div className="pc__panel">
            <h2>商品分類</h2>
            <ul className="pc__cat-list">
              {CATEGORIES.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={item.id === category ? "is-active" : undefined}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="pc__cat-thumb"
                      src={item.image}
                      alt=""
                      loading="lazy"
                      width={44}
                      height={44}
                    />
                    <span className="pc__cat-text">
                      {item.zh}
                      <small>{item.en}</small>
                    </span>
                  </Link>
                  {item.id === category ? (
                    <ul className="pc__sub-list">
                      {detail.subcategories.map((sub) => (
                        <li key={sub.id}>{sub.label}</li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          <div className="pc__panel">
            <h2>品牌</h2>
            <ul className="pc__check-list">
              {detail.brands.map((brand) => (
                <li key={brand}>
                  <label>
                    <input type="checkbox" defaultChecked={false} /> {brand}
                  </label>
                </li>
              ))}
            </ul>
            <button type="button" className="pc__more">
              顯示更多 +
            </button>
          </div>

          <div className="pc__panel">
            <h2>價格區間 (USD)</h2>
            <div className="pc__price">
              <input type="number" defaultValue={1} min={1} aria-label="最低價" />
              <span>—</span>
              <input type="number" defaultValue={500} min={1} aria-label="最高價" />
              <button type="button" className="btn btn--primary btn--sm">
                確定
              </button>
            </div>
          </div>
        </aside>

        <div className="pc__main">
          <header className="pc__head">
            <RiseTitle as="h1" delay={60} immediate>
              {detail.titleZh}
              <small>{detail.titleEn}</small>
            </RiseTitle>
            <RiseTitle as="p" delay={160} immediate>
              {detail.description}
            </RiseTitle>
          </header>

          <div className="pc__subgrid" aria-label="子分類">
            {detail.subcategories.map((sub, i) => (
              <button
                key={sub.id}
                type="button"
                className={`pc__subchip${i === 0 ? " is-active" : ""}`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          <div className="pc__toolbar">
            <p>
              共找到 <strong>{detail.count}</strong> 項商品
            </p>
            <label>
              排序方式
              <select defaultValue="popular">
                <option value="popular">熱門推薦</option>
                <option value="price-asc">價格由低到高</option>
                <option value="price-desc">價格由高到低</option>
                <option value="new">最新上架</option>
              </select>
            </label>
          </div>

          <div className="product-grid">
            {detail.products.map((p) => (
              <article key={p.id} className="product-card">
                <div className="product-card__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.name} loading="lazy" />
                  {p.badge ? <span className="product-card__badge">{p.badge}</span> : null}
                </div>
                <div className="product-card__body">
                  <p className="product-card__brand">{p.brand}</p>
                  <h3>{p.name}</h3>
                  {p.model ? <p className="product-card__model">{p.model}</p> : null}
                  <p className="product-card__price">{p.price}</p>
                  <div className="product-card__meta">
                    <Stars n={p.rating} />
                    <span>({p.reviews})</span>
                    <Link
                      href={`/contact#rfq?sku=${p.id}`}
                      className="product-card__cart"
                      aria-label="詢價加入"
                    >
                      🛒
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="pc__cta-row">
            <Link href="/contact#rfq" className="btn btn--primary">
              大量採購詢價 <IconArrow />
            </Link>
            <Link href="/products" className="text-link">
              返回商品中心
            </Link>
          </div>
        </div>
      </div>

      <div className="pc__trust">
        {PRODUCT_TRUST.map((item) => (
          <div key={item.title}>
            <strong>{item.title}</strong>
            <span>{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
