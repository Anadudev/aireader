import PostDetailsCard from "@/components/PostDetailsCard";
import React from "react";

const PostsDetailPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  return (
    <div>
      <div>PostsDetailPage</div>
      <div>
        <PostDetailsCard slug={slug} />
      </div>
    </div>
  );
};

export default PostsDetailPage;
