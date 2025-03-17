import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import Typewriter from "typewriter-effect";

const HeroSection = () => {
  return (
    <section className="min-h-[80vh] h-fit flex flex-col justify-center gap-8">
      <div className="text-center max-w-4xl mx-auto space-y-4 p-2">
        <div className="text-4xl sm:text-5xl font-extrabold [text-shadow:_0_2px_4px_rgb(99_102_241_/_0.8)] ">
          <h1 className="">Shape the Future of Content:</h1>
          <h1 className="">
            {/* todo: effect should be a neon text of pink and blue */}
            {/* <Typewriter
            options={{
              strings: ["Write", "Read", "Share", "Create"],
              autoStart: true,
              loop: true,
              wrapperClassName: "",
            }}
          /> */}{" "}
            <span className=" bg-gradient-to-r from-indigo-500 bg-clip-text text-transparent to-pink-500 ">
              Write
            </span>{" "}
            AI Dialogues.
          </h1>
        </div>
        <div className="">
          <p className="text-lg">
            Unlock the Future of AI Conversations. Join a vibrant community
            where you can create, share, and explore insightful AI chat
            dialogues. Discover unlimited possibilities and connect with others
            who are passionate about AI content.
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <Button>
          <Link href="/signup" className="capitalize">
            Join now
          </Link>
        </Button>
        <Button variant="outline">
          <Link href="/explore">Start Exploring</Link>
        </Button>
      </div>
      <div className="bg-[url(/heroBg.jpg)] h-75 w-[90%] sm:w-[80%] mx-auto rounded-2xl bg-cover bg-center"></div>
    </section>
  );
};

export default HeroSection;
