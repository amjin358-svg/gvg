export const DESIGN_NAV = [
  { label: "Design Center", labelZh: "設計中心", href: "/design" },
  { label: "Logo", labelZh: "標誌", href: "/design/logo" },
  { label: "Color Palette", labelZh: "色彩盤", href: "/design/color-palette" },
  { label: "UI Kit", labelZh: "UI 套件", href: "/design/ui-kit" },
  { label: "Components", labelZh: "元件", href: "/design/components" },
  { label: "Dashboard Preview", labelZh: "儀表板預覽", href: "/design/dashboard-preview" },
  { label: "Website Preview", labelZh: "官網預覽", href: "/design/website-preview" },
  { label: "Mobile Preview", labelZh: "行動預覽", href: "/design/mobile-preview" },
] as const;

export const DESIGN_PRINCIPLES = [
  {
    title: "Brand first",
    titleZh: "品牌優先",
    body: "首屏必須清楚讀出 GVG／Global Vista Group；去導覽後仍能辨識品牌。",
  },
  {
    title: "One composition",
    titleZh: "單一構圖",
    body: "第一視野一個主構圖、一個主訊息；避免儀表板式資訊堆疊出現在行銷首屏。",
  },
  {
    title: "Operational precision",
    titleZh: "營運精準",
    body: "語氣自信、全球、可執行——不是趣味新創或霓虹 AI 模板。",
  },
  {
    title: "Tokens over inventing",
    titleZh: "權杖優於即興",
    body: "顏色、字級、間距、狀態皆來自 tokens；禁止臨時紫色漸層或奶油紙感版型。",
  },
] as const;

export const COLOR_TOKENS = [
  { name: "Ink", token: "--color-ink", hex: "#0A1628", role: "主文字／深色底", roleEn: "Primary text / dark base" },
  { name: "Ink Soft", token: "--color-ink-soft", hex: "#132338", role: "深色抬升面", roleEn: "Elevated dark panel" },
  { name: "Navy", token: "--color-navy", hex: "#001529", role: "品牌海軍藍", roleEn: "Brand navy" },
  { name: "Navy Deep", token: "--color-navy-deep", hex: "#00101F", role: "更深底色", roleEn: "Deepest navy" },
  { name: "Accent", token: "--color-accent", hex: "#0B3A6E", role: "強調連結／聚焦", roleEn: "Accent / focus" },
  { name: "Accent Strong", token: "--color-accent-strong", hex: "#072A4F", role: "主按鈕 hover", roleEn: "Primary hover" },
  { name: "Accent Soft", token: "--color-accent-soft", hex: "#D6E4F5", role: "淺強調底", roleEn: "Soft accent fill" },
  { name: "Gold", token: "--color-gold", hex: "#D4A017", role: "品牌金／CTA 輔色", roleEn: "Brand gold" },
  { name: "Gold Strong", token: "--color-gold-strong", hex: "#B8860B", role: "金色強調", roleEn: "Gold emphasis" },
  { name: "Teal", token: "--color-teal", hex: "#1A7A6D", role: "營運成功／輔助強調", roleEn: "Ops success / secondary" },
  { name: "Copper", token: "--color-copper", hex: "#B87333", role: "次要金屬感（節制）", roleEn: "Secondary metal (sparingly)" },
  { name: "Mist", token: "--color-mist", hex: "#F3F6F9", role: "頁面／區段底", roleEn: "Page / section bg" },
  { name: "Surface", token: "--color-surface", hex: "#FFFFFF", role: "內容面", roleEn: "Content surface" },
  { name: "Line", token: "--color-line", hex: "#E5EAF0", role: "分隔線", roleEn: "Borders" },
  { name: "Muted", token: "--color-muted", hex: "#5B6B7C", role: "次要文字", roleEn: "Secondary text" },
] as const;

export const TYPE_SCALE = [
  { role: "Display XL", roleZh: "展示特大", sample: "Global Trade OS", className: "font-[family-name:var(--font-display)] text-5xl font-semibold tracking-tight" },
  { role: "Display L", roleZh: "展示大", sample: "商務儀表板", className: "font-[family-name:var(--font-display)] text-4xl font-semibold" },
  { role: "Title", roleZh: "標題", sample: "今日關鍵指標", className: "font-[family-name:var(--font-display)] text-2xl font-semibold" },
  { role: "Body", roleZh: "內文", sample: "企業級 B2B／B2C 國際貿易平台，連結供應商與買方。", className: "text-base leading-relaxed" },
  { role: "Label", roleZh: "標籤", sample: "開放 RFQ · 在途貨況", className: "text-sm font-medium" },
  { role: "Caption", roleZh: "說明", sample: "示範數據 · Phase 1", className: "text-xs text-[var(--color-muted)]" },
  { role: "Mono", roleZh: "等寬", sample: "SKU-HW-2048 · HS 8504.40", className: "font-mono text-sm" },
] as const;

export const SPACING_SCALE = [
  { name: "2", px: "8px", use: "緊密間距" },
  { name: "3", px: "12px", use: "元件內距" },
  { name: "4", px: "16px", use: "列表項目" },
  { name: "6", px: "24px", use: "區段內距" },
  { name: "8", px: "32px", use: "區塊分隔" },
  { name: "12", px: "48px", use: "大區段" },
] as const;

export const LOGO_ASSETS = [
  {
    src: "/brand/gvg-mark.svg",
    label: "Mark",
    labelZh: "圖標",
    tone: "dark" as const,
    use: "App icon、favicon、窄版導覽",
  },
  {
    src: "/brand/gvg-lockup.svg",
    label: "Company lockup",
    labelZh: "公司組合標",
    tone: "light" as const,
    use: "信紙、提案、淺色頁首",
  },
  {
    src: "/brand/gvg-product-lockup.svg",
    label: "Product lockup",
    labelZh: "產品組合標",
    tone: "light" as const,
    use: "淺色行銷與文件",
  },
  {
    src: "/brand/gvg-product-lockup-dark.svg",
    label: "Product lockup (dark)",
    labelZh: "產品組合標（深色）",
    tone: "dark" as const,
    use: "深色英雄區、簡報",
  },
] as const;

export const ICON_CATALOG = [
  { name: "Globe2", use: "國際／語言" },
  { name: "Ship", use: "物流／貿易" },
  { name: "Package", use: "訂單／庫存" },
  { name: "Search", use: "搜尋" },
  { name: "Bot", use: "AI 助理" },
  { name: "BriefcaseBusiness", use: "企業／商務" },
  { name: "FolderKanban", use: "專案" },
  { name: "CircleDollarSign", use: "營收" },
  { name: "ClipboardList", use: "動態／清單" },
  { name: "Shield", use: "合規" },
  { name: "ShoppingCart", use: "市集／購物" },
  { name: "UserRound", use: "帳號" },
] as const;

export const WEBSITE_RULES = [
  { title: "首屏構圖", body: "品牌 + 一句標題 + 一句說明 + CTA；全幅英雄視覺，無貼紙／統計列。" },
  { title: "導覽", body: "圖標 + 公司名；主選單含產品、貿易、市集、AI、企業資訊。" },
  { title: "頁面節奏", body: "每區一件事；卡片僅用於可互動容器。" },
  { title: "動效", body: "每頁 2–3 個意圖動效；尊重 prefers-reduced-motion。" },
] as const;

export const DASHBOARD_RULES = [
  { title: "結構", body: "App bar · 側欄 · 標題 · KPI（最多 4）· 主工作表。" },
  { title: "密度", body: "14px 內文、清晰列高；避免多層陰影與光暈。" },
  { title: "狀態", body: "用 StatusBadge；危險色節制，不用銅作為錯誤色。" },
  { title: "一致性", body: "與官網同一套 ink／navy／gold tokens，不是另一套主題。" },
] as const;

export const MOBILE_SCREENS = [
  {
    id: "home",
    title: "Home",
    titleZh: "首頁",
    href: "/",
    bars: ["GVG", "搜尋", "國際貿易", "市集", "AI"],
  },
  {
    id: "marketplace",
    title: "Marketplace",
    titleZh: "市集",
    href: "/marketplace",
    bars: ["篩選", "供應商", "熱銷", "詢價"],
  },
  {
    id: "business",
    title: "Dashboard",
    titleZh: "商務儀表板",
    href: "/business",
    bars: ["KPI", "營收", "專案", "AI 摘要"],
  },
] as const;

export const PREVIEW_LINKS = [
  { id: "home", title: "Website — Home", titleZh: "官網首頁", href: "/", note: "海軍藍英雄 + 金色 CTA" },
  { id: "trade", title: "Website — Trade", titleZh: "國際貿易", href: "/trade", note: "側欄服務目錄" },
  { id: "marketplace", title: "Website — Marketplace", titleZh: "市集", href: "/marketplace", note: "篩選與商品列" },
  { id: "business", title: "Dashboard — Business", titleZh: "商務儀表板", href: "/business", note: "KPI／營收／專案／AI" },
  { id: "ai", title: "Product — AI", titleZh: "AI 智慧服務", href: "/ai", note: "助理面板" },
] as const;

export const BRAND_COLLATERAL = [
  { href: "/brand/templates/name-card.html", label: "Name Card", labelZh: "名片" },
  { href: "/brand/templates/letterhead.html", label: "Letterhead", labelZh: "信紙" },
  { href: "/brand/templates/email-signature.html", label: "Email Signature", labelZh: "郵件簽名" },
  { href: "/brand/templates/proposal.html", label: "Proposal", labelZh: "提案封面" },
] as const;
