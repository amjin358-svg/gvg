# Trade OS — Marketplace Architecture (Mockup Align)

Public URL: https://amjin358-svg.github.io/gvg/trade-os/

## Information architecture

| Nav | Route | View |
| --- | --- | --- |
| 首頁 | `/` | `frontend/features/home/HomeMarketing.tsx` |
| 商品中心 | `/products`, `/categories/[slug]` | `frontend/features/products/ProductCenterView.tsx` |
| 全球採購 | `/procurement` | page shell |
| 國際貿易 | `/trade` | `app/trade/page.tsx` |
| Marketplace | `/marketplace` | `frontend/features/marketplace/MarketplaceView.tsx` |
| AI 智慧服務 | `/ai` | `app/ai/page.tsx` |
| 合作夥伴專區 | `/portal/supplier` | portal page |

## Shared chrome

- `components/organisms/SiteHeader.tsx` — navy search band + white primary nav
- `components/molecules/CategorySidebar.tsx` — left category / brand / price filters
- `components/molecules/CommerceProductCard.tsx` — commerce grid card
- `frontend/data/mock/catalogNav.ts` — zh verticals for Product Center

## Visual system

- Navy `#001529`, gold `#d4a017`, mist background `#f3f6f9`
- Dual-row header, left sidebar + content grid, trust badge footer bar
- Category pages reuse Product Center shell (保健食品 / 五金工具 / 居家生活 / 品牌服飾 / 裝潢建材 …)
