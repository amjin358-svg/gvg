"use client";

import Link from "next/link";
import { CATEGORIES } from "@/lib/content";
import { IconArrow } from "@/components/icons";
import { RiseTitle } from "@/components/RiseTitle";

/**
 * Popular categories — mockup order #4
 */
export function CategoriesSection() {
  return (
    <section className="section categories" aria-labelledby="categories-title">
      <div className="section__head">
        <RiseTitle as="h2" id="categories-title">
          熱門產品分類
        </RiseTitle>
        <Link href="/products" className="text-link">
          瀏覽所有產品 <IconArrow />
        </Link>
      </div>

      <div className="category-grid">
        {CATEGORIES.map((item, i) => (
          <RiseTitle
            as={Link}
            key={item.href}
            href={item.href}
            className="category-tile category-tile--photo"
            delay={i * 70}
            style={{
              backgroundImage: `linear-gradient(180deg, transparent 28%, rgba(0,20,48,0.78)), url("${item.image}")`,
            }}
          >
            <span>
              {item.zh}
              <small>{item.en}</small>
            </span>
          </RiseTitle>
        ))}
      </div>
    </section>
  );
}

export default CategoriesSection;
