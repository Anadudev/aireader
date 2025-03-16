import React from "react";
import FeatureCard from "@/components/FeatureCard";
import SectionTitle from "@/components/SectionTitle";
import { features } from "@/lib/data/features";

const FeaturesSection = () => {
  return (
    <section className="h-fit flex flex-col justify-center gap-8">
      {/* Explore the unique benefits our platform offers */}
      <SectionTitle
        title="Features"
        descriptionLeft="Explore the"
        descriptionKeyWord="Unique Benefits"
        descriptionRight="Our Platform Offers"
      />
      <div className="p-3">
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              Icon={feature.Icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
