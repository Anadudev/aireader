"use client";
import PostCard from "@/components/PostCard";
import TitleStoreType from "@/lib/store/title.store";
import React, { useEffect } from "react";

const PostsList = () => {
  const { titles, handleTitleGet, titleGetLoading } = TitleStoreType();
  useEffect(() => {
    handleTitleGet({ posts: true });
  }, [handleTitleGet]);
  //   handlePostGet();
  return (
    <div className="flex flex-wrap gap-2 w-full items-center justify-center">
      {titleGetLoading && <span className="">loading titles...</span>}
      {titles?.map((title, index) => (
        <PostCard
          title={title}
          key={index}
          post={title?.posts && title?.posts[0]}
          total={title?.posts?.length}
        />
      ))}
    </div>
  );
};

export default PostsList;
