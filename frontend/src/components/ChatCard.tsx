import React from "react";
import { PostType } from "@/types/Post.type";
import { formatDateString } from "@/lib/TimeFormat";

const ChatCard = ({ post }: { post: PostType }) => {
  return (
    <div className="space-y-2 transition-all duration-200">
      {post?.prompt && (
        <div className="w-[80%] ml-auto">
          <div className="shadow-md bg-gradient-to-r from-indigo-400 to-indigo-700 p-4 rounded-2xl rounded-tr-none text-indigo-50 font-semibold text-sm">
            <p className="">{post?.prompt}</p>
          </div>
          <small className="font-semibold text-xs text-slate-500">
            {formatDateString(post.updatedAt)}
          </small>
        </div>
      )}
      {post?.response && (
        <div className="grid w-[80%]">
          <div className="shadow-md bg-gradient-to-r from-pink-700 to-pink-400 p-4 rounded-2xl rounded-tl-none text-indigo-50 font-semibold text-sm">
            {post?.response}
          </div>
          <small className="font-semibold text-xs text-slate-500 ml-auto">
            {formatDateString(post.updatedAt)}
          </small>
        </div>
      )}
    </div>
  );
};

export default ChatCard;
