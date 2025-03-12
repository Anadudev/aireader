import Image from "next/image";
import Link from "next/link";
import React from "react";

const PostCard = ({title}:{title:string}) => {
  return (
    <Link href={'#'} className="flex-1 cursor-pointer group card backdrop-blur-lg shadow-sm transition-all ease-in-out hover:shadow-md p-5 rounded-4xl min-h-64 border-4 border-slate-300/30 max-w-[32rem] min-w-80">
      <div className="float-left relative size-12 bg-gradient-to-r from-indigo-500 bg-clip-text text-transparent to-pink-500 mr-4 rounded-full border-2">
        <Image
          className="rounded-full group-hover:animate-spin transition-all duration-200"
          title="Ai logo"
          src="/gemini_sparkle.svg"
          alt="AI Logo"
          fill
        />
      </div>
      <div className="space-y-5">
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-500 bg-clip-text text-transparent to-pink-500">
         {title}
        </h2>
        <div className=" text-card-foreground text-pretty">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          iusto dignissimos eum voluptatum sequi, minima aliquam laborum non
          impedit ipsam.
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
