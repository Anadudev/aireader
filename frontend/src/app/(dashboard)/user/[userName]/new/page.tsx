import React from "react";
import PostForm from "@/components/PostForm";
import ProtectedRoute from "@/lib/protectedRoute";

const NewPostPage = () => {
  return (
    <div className="px-2">
      <ProtectedRoute />
      <div className="flex justify-center mt-2">
        <PostForm />
      </div>
    </div>
  );
};

export default NewPostPage;
