import { HomeHero } from "@/components/home/HomeHero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ServicesSection />
      <CategoriesSection />
    </>
  );
}
