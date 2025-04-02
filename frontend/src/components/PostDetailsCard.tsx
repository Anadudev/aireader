"use client";
import React, { useEffect } from "react";
import useTitleStore from "@/lib/store/title.store";
import ChatCard from "@/components/ChatCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatCardSkeleton from "@/components/loading/skeleton/ChatCardSkeleton";
import Share from "@/components/Share";

const PostDetailsCard = ({ slug }: { slug: string }) => {
  const [path, setPath] = React.useState("");
  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    draggable: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const { handleTitleGet, post, titleGetLoading } = useTitleStore();

  useEffect(() => {
    handleTitleGet(slug, { posts: true, author: true });
    setPath(window.location.href);
  }, [slug, handleTitleGet]);

  return (
    <div>
      {titleGetLoading ? (
        <ChatCardSkeleton />
      ) : (
        <div className="p-2 space-y-8 max-w-4xl mx-auto">
          <div className="">
            <div className="text-slate-500 capitalize font-extrabold ">
              <div className="flex items-center justify-end gap-1">
                <Avatar className="">
                  <AvatarImage src="https://github.com/shadcn.pg" />
                  <AvatarFallback className="uppercase">
                    {post?.author?.username.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                {post?.author?.username}
              </div>
            </div>
            <div className="flex justify-center items-center gap-4">
              <h1 className="ext-xl font-extrabold bg-gradient-to-r from-indigo-500 bg-clip-text text-transparent to-pink-500 text-4xl sm:text-5xl text-center">
                {post?.title}
              </h1>
              <Share path={path} />
            </div>
          </div>
          <div className="space-y-2 max-w-4xl mx-auto">
            <Slider {...settings} className="">
              {post?.posts?.map((post, index) => (
                <ChatCard key={index} post={post} />
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetailsCard;
