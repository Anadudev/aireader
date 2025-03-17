import HeroSection from "@/app/homeSections/HeroSection";
import FeaturesSection from "@/app/homeSections/FeaturesSection";
import BenefitSection from "@/app/homeSections/BenefitSection";
import TestimonialSection from "@/app/homeSections/TestimonialSection";
import GettingStartedSection from "@/app/homeSections/GettingStartedSection";
import CTASection from "@/app/homeSections/CTASection";

export default function Home() {
  return (
    <main className="space-y-16">
      <HeroSection />
      <FeaturesSection />
      <BenefitSection />
      <TestimonialSection />
      <GettingStartedSection />
      <CTASection />
    </main>
  );
}
