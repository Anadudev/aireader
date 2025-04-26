"use client";
import React, { useEffect } from "react";
import PostCardSkeleton from "@/components/loading/skeleton/PostCardSkeleton";
import PostCard from "@/components/PostCard";
import useTitleStore from "@/lib/store/title.store";
import EmptyData from "@/components/EmptyData";

const PostsList = () => {
  const { titles, handleTitlesGet, titleGetLoading } = useTitleStore();
  useEffect(() => {
    handleTitlesGet({ posts: true });
  }, [handleTitlesGet]);

  return (
    <div className="flex flex-wrap gap-2 w-full items-center justify-center p-2">
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
      {!titles[0] && !titleGetLoading && <EmptyData />}
    </div>
  );
};

export default PostsList;
