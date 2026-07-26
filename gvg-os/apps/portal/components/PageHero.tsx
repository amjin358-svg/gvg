type Props = {
  title: string;
  en?: string;
  lead: string;
};

export function PageHero({ title, en, lead }: Props) {
  return (
    <section className="page-hero">
      <div className="page-hero__inner">
        <p className="eyebrow">GVG Portal</p>
        <h1>
          {title}
          {en ? <span className="page-hero__en">{en}</span> : null}
        </h1>
        <p className="page-hero__lead">{lead}</p>
      </div>
    </section>
  );
}

export default PageHero;
