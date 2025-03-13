import React from "react";

const ChatCardSkeleton = () => {
  return (
    <div className="animate-pulse space-y-8 p-2  max-w-4xl mx-auto">
      <div className="space-y-2">
        <div className="ml-auto h-6 w-12 bg-gray-300 rounded-full "></div>
        <div className="mx-auto w-full max-w-4xl h-12 bg-gray-300 rounded-full p-4"></div>
      </div>
      <div className="space-y-2 ">
        <div className="w-[80%] ml-auto space-y-2">
          <div className="shadow-md  p-9 rounded-2xl rounded-tr-none text-indigo-50 h-12 bg-gray-300"></div>
          <div className="w-12 py-1.5 rounded-2xl bg-gray-300"></div>
        </div>
        <div className="grid w-[80%] space-y-2">
          <div className="shadow-md  p-20 rounded-2xl rounded-tr-none text-indigo-50 h-12 bg-gray-300"></div>
          <div className="w-12 py-1.5 rounded-2xl ml-auto bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatCardSkeleton;
