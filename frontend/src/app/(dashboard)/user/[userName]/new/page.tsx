import React from "react";
import PostForm from "@/components/PostForm";

const NewPostPage = () => {
  return (
    <div className="px-2">
      {/* <div>NewPostPage</div> */}
      <div className="flex justify-center mt-2">
        <PostForm />
      </div>
    </div>
  );
};

export default NewPostPage;
