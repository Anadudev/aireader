"use client";
import React, { useEffect } from "react";
import useTitleStore from "@/lib/store/title.store";
import ChatCard from "@/components/ChatCard";

const PostDetailsCard = ({ slug }: { slug: string }) => {
  const { handleTitleGet, post, titleGetLoading } = useTitleStore();

  useEffect(() => {
    handleTitleGet(slug, { posts: true, author: true });
  }, [slug, handleTitleGet]);

  return (
    <div>
      <div>PostDetailsCard</div>
      {post && (
        <div className="p-2">
          <div>
            <h1 className="ext-xl font-extrabold bg-gradient-to-r from-indigo-500 bg-clip-text text-transparent to-pink-500 text-4xl sm:text-5xl text-center">
              {post.title}
            </h1>
          </div>
          <div className="space-y-2">
            {post?.posts?.map((post, index) => (
              <ChatCard key={index} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetailsCard;
