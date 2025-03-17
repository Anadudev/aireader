import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

const TestimonialCard: React.FC<TestimonialType> = ({
  testimony,
  username,
  avatar,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-2">
      <q className="text-center font-semibold">{testimony}</q>
      <Avatar className="ring-2 ring-slate-500/10 dark:ring-slate-400 p-2 rounded-full">
        <AvatarImage src={avatar} alt="user avatar" />
        <AvatarFallback className="">CN</AvatarFallback>
      </Avatar>
      <p className="text-sm font-semibold text-zinc-500">{username}</p>
    </div>
  );
};

export default TestimonialCard;
