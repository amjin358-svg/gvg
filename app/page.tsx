import {
  HomeCategories,
  HomeCtaBand,
  HomeHero,
  HomeServices,
} from "@/frontend/features/home/HomeMarketing";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeServices />
      <HomeCategories />
      <HomeCtaBand />
    </>
  );
}
