const VALUES = [
  {
    title: "AI-Powered",
    zh: "AI 驅動效率與決策",
    tone: "blue",
    icon: (
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden>
        <circle cx="16" cy="16" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M16 4v3M16 25v3M4 16h3M25 16h3M7 7l2 2M23 23l2 2M25 7l-2 2M9 23l-2 2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
  {
    title: "Cloud-Native",
    zh: "彈性架構 · 高可用",
    tone: "violet",
    icon: (
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden>
        <path
          d="M10 22h14a5 5 0 0 0 0-10 7 7 0 0 0-13.5-2A4.5 4.5 0 0 0 10 22z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
  {
    title: "Data-Driven",
    zh: "數據驅動營運判斷",
    tone: "green",
    icon: (
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden>
        <circle cx="8" cy="20" r="3" fill="currentColor" />
        <circle cx="16" cy="10" r="3" fill="currentColor" />
        <circle cx="24" cy="18" r="3" fill="currentColor" />
        <path d="M10.5 18l4-6 6 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "Secure & Reliable",
    zh: "企業級安全防護",
    tone: "gold",
    icon: (
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden>
        <path
          d="M16 4l10 4v7c0 6-4 10-10 12C10 25 6 21 6 15V8l10-4z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
  {
    title: "Scalable",
    zh: "模組化成長設計",
    tone: "teal",
    icon: (
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden>
        <path
          d="M6 20h8v6H6zM18 12h8v14h-8zM10 6h8v8h-8z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
];

export function ValueBar() {
  return (
    <section className="home-values" id="solutions" aria-label="Platform strengths">
      <ul className="home-values__list">
        {VALUES.map((item) => (
          <li key={item.title} className={`home-value home-value--${item.tone}`}>
            <span className="home-value__icon">{item.icon}</span>
            <strong>{item.title}</strong>
            <span>{item.zh}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ValueBar;
