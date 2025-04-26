import Link from "next/link";
import React from "react";

declare type EmptyDataProps = {
  className?: string;
  body?: React.ReactNode;
};

const EmptyData: React.FC<EmptyDataProps> = ({ className = "", body }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {body ? (
        body
      ) : (
        <div className="">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
				No Data
              </h2>
              <Link href="/" className="text-blue-600 hover:underline">
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptyData;
