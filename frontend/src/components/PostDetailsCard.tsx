"use client";
import React, { useEffect, useState } from "react";
import useTitleStore from "@/lib/store/title.store";
import ChatCard from "@/components/ChatCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ChatCardSkeleton from "@/components/loading/skeleton/ChatCardSkeleton";
import Share from "@/components/Share";
import EmptyData from "@/components/EmptyData";

const PostDetailsCard = ({ slug }: { slug: string }) => {
  const [path, setPath] = useState("");
  const [slideIndex, setSlideIndex] = useState(0);
  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    draggable: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (_: number, index: number) => setSlideIndex(index),
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
        <div className="">
          {!titleGetLoading && post ? (
            <div className="p-2 space-y-8 max-w-4xl mx-auto">
              <div className="">
                <div className="capitalize font-extrabold ">
                  <div className="flex gap-2 items-center justify-end my-2 pr-4">
                    <Avatar className="size-12">
                      <AvatarFallback className="uppercase text-2xl text-slate-500 ">
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
              <div className="space-y-5 max-w-4xl mx-auto">
                <div className="text-center flex flex-col space-2">
                  <span className="text-slate-500">
                    Swipe content left or right to navigate
                  </span>
                  <span className="font-semibold text-3xl animate-pulse">
                    {slideIndex + 1}/{post?.posts?.length}
                  </span>
                </div>
                <Slider {...settings} className="cursor-grab">
                  {post?.posts?.map((post, index) => (
                    <ChatCard key={index} post={post} />
                  ))}
                </Slider>
                <div className="text-right flex flex-col pt-4 space-2">
                  <span className="text-slate-500">
                    Swipe content left or right to navigate
                  </span>
                  <span className="font-semibold text-3xl animate-pulse">
                    {slideIndex + 1}/{post?.posts?.length}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <EmptyData
              message="Dialogue not found"
              href="/explore"
              link={"Explore dialogues"}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PostDetailsCard;
