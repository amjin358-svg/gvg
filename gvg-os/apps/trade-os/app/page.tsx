import {
  HomeCategories,
  HomeCtaBand,
  HomeHero,
  HomeCapabilities,
  HomeShowcase,
} from "@/frontend/features/home/HomeMarketing";

/**
 * GVG homepage — Seedance-style cinematic product architecture.
 * Dark full-bleed media, brand-first hero, one purpose per section.
 */
export default function HomePage() {
  return (
    <div className="home-seedance bg-[#05080f]">
      <HomeHero />
      <HomeCapabilities />
      <HomeShowcase />
      <HomeCategories />
      <HomeCtaBand />
    </div>
  );
}
