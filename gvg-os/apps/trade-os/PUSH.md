# 推送到 https://github.com/amjin358-svg/gvg

此目錄為完整 GVG Global Trade OS 原始碼（不含 node_modules / .next）。

## 一鍵推送（本機，需已登入 GitHub）

```bash
cd gvg-global-trade-os
git init
git add -A
git commit -m "feat: GVG Global Trade OS complete"
git branch -M main
git remote add origin https://github.com/amjin358-svg/gvg.git
git push -u origin main
```

若遠端已有內容需覆蓋：

```bash
git push -u origin main --force
```

## 啟動

```bash
npm install
npm run dev
```

主要入口：
- `/` 首頁
- `/enterprise` GVG Enterprise
- `/business` 商務儀表板
- `/design` 設計中心
- `/development` 開發儀表板
- `/operations` 營運儀表板
