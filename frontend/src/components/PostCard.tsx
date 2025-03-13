import stringLimiter from "@/lib/stringLimiter";
import { PostType } from "@/types/Post.type";
import { TitleType } from "@/types/Title.type";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PostCard = ({
  title,
  post,
  total,
}: {
  title: TitleType;
  post?: PostType;
  total?: number;
}) => {
  return (
    <Link
      href={"#"}
      className="flex-1 cursor-pointer group card backdrop-blur-lg shadow-sm transition-all hover:scale-95 ease-in-out p-4 rounded-3xl sm:min-h-60 border-2 border-slate-300/30 max-w-[32rem] min-w-80"
    >
      <div className="float-left relative size-8 bg-gradient-to-r from-indigo-500 bg-clip-text text-transparent to-pink-500 mb-4  mr-4 rounded-full border-2">
        <Image
          className="rounded-full group-hover:animate-spin transition-all duration-200"
          title="Ai logo"
          src="/gemini_sparkle.svg"
          alt="AI Logo"
          fill
        />
      </div>
      <div className="flex items-center float-right relative size-12 bg-gradient-to-r from-indigo-500 bg-clip-text text-transparent to-pink-500 mb-4 text-2xl font-bold">
        <MessageCircle className="size-6 text-card-foreground/60" />
        <span className="underline">{total}</span>{" "}
      </div>
      <div className="space-y-5">
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-500 bg-clip-text text-transparent to-pink-500">
          {stringLimiter(title?.title, 30)}
        </h2>
        <div className="text-card-foreground text-pretty space-y-2">
          {post?.prompt && (
            <div
              className="shadow-md bg-gradient-to-r from-indigo-400 to-indigo-700 p-2 rounded-2xl rounded-tr-none text-indigo-50 font-semibold text-sm w-[80%] ml-auto"
              title={post?.prompt}
            >
              <p className="">{stringLimiter(post?.prompt, 100)}</p>
            </div>
          )}
          {post?.response && (
            <div
              className="shadow-md bg-gradient-to-r from-pink-700 to-pink-400 p-2 rounded-2xl rounded-tl-none text-indigo-50 font-semibold text-sm w-[80%]"
              title={post?.response}
            >
              {stringLimiter(post?.response, 100)}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
