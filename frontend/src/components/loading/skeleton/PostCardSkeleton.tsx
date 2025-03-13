import React from "react";

const PostCardSkeleton = () => {
  return (
    <div className="flex-1 cursor-pointer group card backdrop-blur-lg shadow-sm ease-in-out p-4 rounded-3xl sm:min-h-60 border-2 hover:border-slate-300/35 border-slate-300/10 max-w-[32rem] min-w-80 animate-pulse">
      <div className="float-left relative size-8 bg-gray-300 rounded-full "></div>
      <div className=" float-right relative size-12 h-6 w-12 bg-gray-300 rounded-full mb-4 text-2xl font-bold"></div>
      <div className="space-y-5">
        <h2 className="h-7 ml-12 w-48 bg-gray-300 rounded-full"></h2>
        <div className="space-y-2">
          <div
            className="shadow-md h-14 w-[80%] ml-auto bg-gray-300 rounded-2xl rounded-tr-none"
            title="Prompt"
          ></div>
          <div
            className="shadow-md h-18 w-[80%] bg-gray-300 rounded-2xl rounded-tl-none"
            title="Response"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
