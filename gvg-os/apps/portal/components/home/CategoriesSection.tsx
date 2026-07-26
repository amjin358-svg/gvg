import Link from "next/link";
import { CATEGORIES } from "@/lib/content";
import { IconArrow } from "@/components/icons";

export function CategoriesSection() {
  return (
    <section className="section categories" aria-labelledby="categories-title">
      <div className="section__head">
        <div>
          <h2 id="categories-title">熱門產品分類</h2>
          <p>探索我們豐富的產品類別 · Explore our wide range of categories</p>
        </div>
        <Link href="/products" className="text-link">
          瀏覽所有產品 <IconArrow />
        </Link>
      </div>

      <div className="category-grid">
        {CATEGORIES.map((item) => (
          <Link
            key={item.href}
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
    </section>
  );
}

export default CategoriesSection;
