import {
  HomeCategories,
  HomeCtaBand,
  HomeServices,
} from "@/frontend/features/home/HomeMarketing";
import { HeroExperience } from "@/frontend/features/experience/HeroExperience";
import { CubeLoader } from "@/frontend/features/experience/CubeLoader";

export default function HomePage() {
  return (
    <>
      <CubeLoader />
      <HeroExperience />
      <HomeServices />
      <HomeCategories />
      <HomeCtaBand />
    </>
  );
}
