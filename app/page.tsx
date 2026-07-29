import {
  HomeCategories,
  HomeCtaBand,
  HomeServices,
} from "@/frontend/features/home/HomeMarketing";
import { HeroExperience } from "@/frontend/features/experience/HeroExperience";

export default function HomePage() {
  return (
    <>
      <HeroExperience />
      <HomeServices />
      <HomeCategories />
      <HomeCtaBand />
    </>
  );
}
