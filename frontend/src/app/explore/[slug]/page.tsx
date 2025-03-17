import React from "react";
import PostDetailsCard from "@/components/PostDetailsCard";


const PostsDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return (
    <div>
      <div>
        <PostDetailsCard slug={slug} />
      </div>
    </div>
  );
};

export default PostsDetailPage;
