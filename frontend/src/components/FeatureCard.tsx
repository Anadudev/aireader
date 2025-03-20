import React from "react";
import { FeatureType } from "@/types/feature";

const FeatureCard: React.FC<FeatureType> = ({ title, description, Icon }) => {
  return (
    <div className="flex-1 sm:min-w-[20rem] group cursor-default flex flex-col items-center gap-4 sm:gap-6 bg-blur sm:max-w-xl mx-auto p-4 sm:p-6 rounded-2xl hover:shadow-md dark:hover:bg-slate-800">
      <Icon size="2rem" className=" text-indigo-500" />
      <h3 className="text-xl font-semibold text-center group-hover:bg-gradient-to-r from-indigo-500 bg-clip-text group-hover:text-transparent to-pink-500 transition-all ease-in-out duration-400">
        {title}
      </h3>
      <p className="text-gray-600 text-center dark:group-hover:text-gray-400">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
