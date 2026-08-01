# Trade OS — Platform Architecture (redesigned)

Public: https://amjin358-svg.github.io/gvg/trade-os/

## Shell (3 tiers — matches mockups)

1. **Utility bar** (navy): welcome + 關於 / 服務 / 消息 / 聯絡 / 語系  
2. **Main header** (white): Logo · Search → `/products` · 登入 · 購物車  
3. **Primary nav** (white): 商品中心 · 全球採購 · 國際貿易 · Marketplace · AI 智慧服務 · 合作夥伴專區  

Home `/` is brand entry (hero), not a primary-nav item.

## Module map

| Module | Route | Role |
| --- | --- | --- |
| 首頁 | `/` | Brand / corporate landing |
| 商品中心 | `/products` | **Hub** — pick a vertical |
| 商品列表 | `/categories/[slug]` | Sidebar + product grid |
| 全球採購 | `/procurement` | Sourcing programs |
| 國際貿易 | `/trade` | Trade services (own left rail) |
| Marketplace | `/marketplace` | Supplier bazaar (own left filters) |
| AI 智慧服務 | `/ai` | AI tools (own left rail) |
| 合作夥伴 | `/portal/supplier` | Partner entry |

## Product Center taxonomy

```
保健食品
食品飲料
居家生活
  └ 傢俱 (/categories/furniture)
五金工具
裝潢建材
品牌服飾
汽車用品
```

Marketplace is **not** Product Center — different left filters (supplier type / region).

## Key files

- `components/organisms/SiteHeader.tsx`
- `frontend/data/mock/catalogNav.ts`
- `frontend/features/products/ProductCenterView.tsx` (`hub` | `listing`)
- `frontend/features/marketplace/MarketplaceView.tsx`
