import React from "react";
import { PostType } from "@/types/Post.type";
import { formatDateString } from "@/lib/TimeFormat";
import RenderRichText from "@/components/RenderRichText";

const ChatCard = ({ post }: { post: PostType }) => {
  return (
    <div className="space-y-2 transition-all duration-200 p-2">
      {post?.prompt && (
        <div className="sm:w-[80%] ml-auto">
          <div className="shadow-md p-4 rounded-2xl rounded-tr-none border break-words">
              <RenderRichText>{post?.prompt}</RenderRichText>
          </div>
          <small className="font-semibold text-xs text-slate-500">
            {formatDateString(post.updatedAt)}
          </small>
        </div>
      )}
      {post?.response && (
        <div className="grid sm:w-[80%] space-y-2">
          <div className="shadow-md p-4 border rounded-2xl rounded-tl-none break-words">
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
