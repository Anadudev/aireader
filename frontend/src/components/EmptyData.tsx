import Link from "next/link";
import React from "react";

declare type EmptyDataProps = {
  className?: string;
  body?: React.ReactNode;
  message?: string;
  link?: string;
  href?: string;
};

const EmptyData: React.FC<EmptyDataProps> = ({
  className = "",
  body,
  message,
  link,
  href,
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {body ? (
        body
      ) : (
        <div className="">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
                {message || "No Data"}
              </h2>
              <Link
                href={href || "/"}
                className="text-blue-600 hover:underline"
              >
                {link || " Go to Home"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptyData;
