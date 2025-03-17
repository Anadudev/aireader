"use client";
import React, { useEffect } from "react";
import SectionTitle from "@/components/SectionTitle";
import PostCardSkeleton from "@/components/loading/skeleton/PostCardSkeleton";
import PostCard from "@/components/PostCard";
import useTitleStore from "@/lib/store/title.store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const GettingStartedSection = () => {
  const { titles, handleTitlesGet, titleGetLoading } = useTitleStore();
  useEffect(() => {
    handleTitlesGet({ posts: true });
  }, [handleTitlesGet]);
  return (
    <section>
      {/* Learn how to create, share, and explore AI dialogues on AILogue. */}
      <SectionTitle
        title="Getting Started"
        descriptionLeft="Learn how to create, share, and explore AI dialogues on"
        descriptionKeyWord="AILogue"
      />
      <div className="p-2 space-y-4">
        <p className="text-gray-600 text-sm text-center max-w-4xl mx-auto">
          Getting started with creating, reading, and sharing AI dialogues on
          AILogue is seamless. First, sign up with a username to unlock a world
          of creative possibilities. Once registered, you can easily create,
          edit, publish, and share your AI-powered dialogues with just a few
          clicks. Dive into our community forums, explore expert prompting
          examples, and begin crafting your own unique AI contents.
        </p>
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
        </div>
        <div className="flex flex-wrap gap-2 w-full items-center justify-center p-2">
          <Button>
            <Link href={"/new"}>Get Started</Link>
          </Button>
          <Button variant={"link"} asChild>
            <Link href={"/explore"}>View More Prompts</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GettingStartedSection;
