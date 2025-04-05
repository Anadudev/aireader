import React from "react";
import { formatDateString } from "@/lib/TimeFormat";
import RenderRichText from "@/components/RenderRichText";
import { PostType } from "@/types";

const ChatCard = ({ post }: { post: PostType }) => {
  return (
    <div className="w-full space-y-2 transition-all duration-200 p-2">
      {post?.prompt && (
        <div className="sm:w-[80%] ml-auto">
          <div className="shadow-md p-4 bg-indigo-500/5 rounded-2xl rounded-tr-none border break-words">
              <RenderRichText>{post?.prompt}</RenderRichText>
          </div>
          <small className="font-semibold text-xs text-slate-500">
            {formatDateString(post.updatedAt)}
          </small>
        </div>
      )}
      {post?.response && (
        <div className="grid sm:w-[80%] space-y-2">
          <div className="shadow-md p-4 border bg-pink-500/5 rounded-2xl rounded-tl-none break-words">
              <RenderRichText>{post?.response}</RenderRichText>
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
