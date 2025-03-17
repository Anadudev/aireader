import HeroSection from "@/app/homeSections/HeroSection";
import FeaturesSection from "@/app/homeSections/FeaturesSection";
import BenefitSection from "@/app/homeSections/BenefitSection";
import TestimonialSection from "@/app/homeSections/TestimonialSection";
import GettingStartedSection from "@/app/homeSections/GettingStartedSection";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <FeaturesSection />
      <BenefitSection />
      <TestimonialSection />
      <GettingStartedSection />
    </div>
  );
}
