"use client";

import { RiseTitle } from "@/components/RiseTitle";

type Props = {
  title: string;
  en?: string;
  lead: string;
};

export function PageHero({ title, en, lead }: Props) {
  return (
    <section className="page-hero">
      <div className="page-hero__inner">
        <RiseTitle as="p" className="eyebrow" delay={40} immediate>
          GVG Portal
        </RiseTitle>
        <RiseTitle as="h1" delay={100} immediate>
          {title}
          {en ? <span className="page-hero__en">{en}</span> : null}
        </RiseTitle>
        <RiseTitle as="p" className="page-hero__lead" delay={200} immediate>
          {lead}
        </RiseTitle>
      </div>
    </section>
  );
}

export default PageHero;
