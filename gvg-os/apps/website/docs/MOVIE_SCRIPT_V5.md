# GVG Interactive Movie — 特效劇本 IM-V5.0

> 版本代碼：**IM-V5.0** · Semver：**0.5.0** · 凍結日：2026-07-29  
> 線上觀看（手機／桌機）：https://amjin358-svg.github.io/gvg/experience/  
> 源碼活版：`@gvg/website` · 劇本凍結備份：`@gvg/v5`

## 觀看方式

| 裝置 | 操作 |
| --- | --- |
| 桌機 | 滾輪推進場景；移動游標召喚流星軌跡 |
| 手機／平板 | 直向／橫向皆可；單指上下滑動推進；手指滑動產生流星 |

建議全螢幕或直立手機瀏覽；地球場景需 WebGL（多數現代瀏覽器皆支援）。

## 場景流水線

`Open → Earth → Routes → Pillars → Finale`

---

### 01｜Open — 銀河開場

| 項目 | 規格 |
| --- | --- |
| 背景 | 深空星野（無紫色旋轉底圖）；細星大量加密 + 雙層閃爍 |
| 流星 | 環境微小流星持續飛過；游標／觸控拖尾加強 |
| 主標 | **GVG** — 字級減半；進場為「太空跳躍前」蓄能／壓縮／釋放特效 |
| 副標 | 金黃色 **Global Vista Group** |
| 標語 | Connecting Markets. Creating Value. |
| 中文 | 連接全球市場，創造無限商機。 |

### 02｜Earth — 地球自轉

| 項目 | 規格 |
| --- | --- |
| 3D | Blue Marble 地球 + 細衛星軌道；ScrollTrigger 絲滑自轉 |
| 標註 | 服務國家光點持續閃爍；國名字級縮小 |
| 標題 | *One Planet. Infinite Markets.* — 淡藍漸層字 |
| 星空 | Drei Stars 輕微 twinkle；全域白色細點閃爍層 |

### 03｜Routes — 全球動線

| 項目 | 規格 |
| --- | --- |
| 概念 | 海運、空運與數位網絡交會，形成 GVG 的全球動線 |
| 樞紐 | Americas／Asia Pacific／Europe／Global Hub（下半區，不擋副標） |
| 註記（金黃放大） | 市場入口 · 供應樞紐 · 合規通道 · 協作中心 |
| 動效 | 樞紐依序縮放進場；連線 strokeDash 描繪 |

### 04｜Pillars — What We Build

| 項目 | 規格 |
| --- | --- |
| Eyebrow | **What We Build** — 字級減半、淡紫色 |
| 標題 | Trade. Intelligence. Scale. |
| 卡片 | 01 Product Center · 02 Supply Chain · 03 AI Insight |
| 說明 | 對齊企業官網總架構（六大品類／貿易採購物流合規／數據洞察）詳實彙整 |
| 數字 | **01 / 02 / 03** — 大字級；卡片升起 + 輕微 rotateX |

### 05｜Finale — 收尾

| 項目 | 規格 |
| --- | --- |
| 標題列 | **Begin with** + **Global Vista Group** 同一行；字級減半 |
| 特效 | 太空跳躍蓄能／釋放 + 爆發光暈（重於單純發光字） |
| 震波 | **兩層重疊** shockwave 環（錯開時間擴張） |
| CTA | 「進入企業官網」；「GVG簡介」回到本體驗 |

### 全域互動

- **MouseMeteors**：pointer 速度驅動流星拖尾（桌機游標／手機觸控滑動皆可）
- **Galaxy plate**：全片連續銀河底圖，場景透明疊加無硬切色帶

## 版本對照

| 代碼 | App | 角色 |
| --- | --- | --- |
| IM-V5.0 | `@gvg/website` `/experience` | 線上活版（持續演進以此為基線） |
| IM-V5.0 freeze | `@gvg/v5` | 本劇本凍結備份，可還原比對 |
| — | `@gvg/v4` | 更早的首頁／電影備份 |
| — | `@gvg/portal` | 企業官網／商品中心 |
