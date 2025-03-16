import Image from "next/image";
import React from "react";

const BenefitSection = () => {
  return (
    <section>
      {/* Boost engagement,  */}
      <div className="space-y-4 sm:flex p-2 max-w-5xl mx-auto gap-4 items-center">
        <div className="flex-1 p-2 space-y-4">
          <h2 className={`text-center sm:text-left text-2xl sm:text-3xl font-bold `}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
              Transform
            </span>{" "}
            your content creation.{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
              Save{" "}
            </span>
            time{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
              Boost{" "}
            </span>
            engagement, and unlock new levels of AI conversation{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
              Mastery
            </span>
            .
          </h2>
          <p className="text-center sm:text-left text-gray-600 font-semibold">
            AILogue empowers you to focus on crafting compelling contents from
            AI dialogues. Experience faster creation, improved content quality,
            and a thriving community to amplify your reach.
          </p>
        </div>
        <div className="flex-1 relative aspect-1/1 sm:max-h-96 rounded-3xl p-2 shadow">
          <Image fill src="/benefit.jpg" alt="benefit" className="rounded-3xl aspect-square" />
        </div>
      </div>
    </section>
  );
};

export default BenefitSection;
