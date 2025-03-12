"use client";
import PostCard from "@/components/PostCard";
import usePostStore from "@/lib/store/post.store";
import React, { useEffect } from "react";

const PostsList = () => {
  const { titles, handleTitleGet, titleGetLoading } = usePostStore();
  useEffect(() => {
    handleTitleGet();
  }, [handleTitleGet]);
  //   handlePostGet();
  return (
    <div className="flex flex-wrap gap-2 w-full items-center justify-center">
      {titleGetLoading && <span className="">loading titles...</span>}
      {titles?.map((title, i) => (
        <PostCard title={title.title} key={i} />
      ))}
    </div>
  );
};

export default PostsList;
