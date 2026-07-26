import { PageHero } from "@/components/PageHero";
import { NEWS_ITEMS } from "@/lib/content";

export default function NewsPage() {
  return (
    <>
      <PageHero
        title="最新消息"
        en="Latest News"
        lead="掌握 GVG 市場拓展、服務升級與合作動態。"
      />
      <div className="page-body">
        <div className="news-list">
          {NEWS_ITEMS.map((item) => (
            <article key={item.title} className="news-item">
              <time dateTime={item.date}>{item.date}</time>
              <div>
                <h3>
                  {item.title}
                  <small>{item.en}</small>
                </h3>
                <p>{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
