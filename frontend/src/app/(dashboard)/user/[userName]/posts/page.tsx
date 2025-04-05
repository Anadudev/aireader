import React from "react";
import PostsListSection from "@/app/(dashboard)/user/[userName]/posts/sections/PostsListSection";
import ProtectedRoute from "@/lib/protectedRoute";

const UserPostsPage = () => {
  return (
    <div>
      <ProtectedRoute />
      <div className="">
        <PostsListSection />
      </div>
    </div>
  );
};

export default UserPostsPage;
