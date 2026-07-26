# @gvg/portal — GVG 企業官網分頁

與 cinematic 行銷站（`@gvg/website`）分離的功能／企業站。文案以**繁體中文為主（約 80%）**，英文為輔（約 20%）。

## 頁面

| 路由 | 說明 |
| --- | --- |
| `/` | 首頁 Hero、服務、產品分類 |
| `/about` | 關於 GVG |
| `/services` | 服務項目 |
| `/products` | 全球產品 |
| `/trade` | 貿易中心 |
| `/suppliers` | 供應商合作 |
| `/news` | 最新消息 |
| `/contact` | 聯絡／詢價 |

## 開發

```bash
# from gvg-os/
npm run dev:portal
```

http://localhost:3001

## 上線

`GITHUB_PAGES=true` 時 basePath 為 `/gvg/portal`，由 `npm run build:pages` 巢狀進 website 靜態輸出。
