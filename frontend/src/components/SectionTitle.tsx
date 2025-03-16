import { Minus } from "lucide-react";
import React from "react";
type SectionTitleProps = {
  title: string;
  descriptionLeft: string;
  descriptionKeyWord: string;
  descriptionRight: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};
const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  descriptionLeft,
  descriptionKeyWord,
  descriptionRight,
  className,
  titleClassName,
  descriptionClassName,
}) => {
  return (
    <div
      className={`space-y-2 flex flex-col items-center p-2 max-w-xl mx-auto ${className}`}
    >
      <h3
        className={`[text-shadow:_0_2px_4px_rgb(99_102_241_/_0.8)] text-md font-semibold text-pink-500 flex gap-2 self-start sm:self-center ${titleClassName}`}
      >
        <Minus />
        {title}
        <Minus />
      </h3>
      <h2
        className={`sm:text-center text-2xl sm:text-3xl font-bold ${descriptionClassName}`}
      >
        {descriptionLeft}{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
          {descriptionKeyWord}
        </span>{" "}
        {descriptionRight}
      </h2>
    </div>
  );
};

export default SectionTitle;
