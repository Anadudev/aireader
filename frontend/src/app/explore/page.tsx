import React from "react";
import PostsList from "@/app/explore/sections/PostsList";

const ExplorePage = () => {
  return (
    <div>
      {/* todo: implement breadcrumbs */}
      <h1>ExplorePage</h1>
      <div className="p-2">
        <PostsList />
      </div>
    </div>
  );
};

export default ExplorePage;
