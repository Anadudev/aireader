"use client";
import React, { useEffect } from "react";
import TitleStoreType from "@/lib/store/title.store";
import PostCardSkeleton from "@/components/loading/skeleton/PostCardSkeleton";
import PostCard from "@/components/PostCard";

const PostsList = () => {
  const { titles, handleTitleGet, titleGetLoading } = TitleStoreType();
  useEffect(() => {
    handleTitleGet({ posts: true });
  }, [handleTitleGet]);
  //   handlePostGet();
  return (
    <div className="flex flex-wrap gap-2 w-full items-center justify-center">
      {titleGetLoading &&
        [...Array(3)].map((_, index) => <PostCardSkeleton key={index} />)}
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
