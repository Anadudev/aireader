"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  AlignLeft,
  BookPlus,
  LayoutList,
  MessageSquareQuote,
} from "lucide-react";
import Link from "next/link";

const actions = [
  {
    name: "New",
    href: "/user/new",
    Icon: BookPlus,
  },
  {
    name: "posts",
    href: "/user/posts",
    Icon: LayoutList,
  },
  {
    name: "Comments",
    href: "/user/comments",
    Icon: MessageSquareQuote,
  },
];

const DashboardAction = () => {
  const [showActions, setShowActions] = React.useState(false);
  return (
    <div className="flex items-center gap-2 sm:bg-none size-xl rounded-full cursor-pointer z-20 ml-2">
      <Button
        onClick={() => setShowActions(!showActions)}
        variant="outline"
        size="icon"
        className={`${showActions ? "bg-zinc-200" : ""}`}
      >
        <AlignLeft />
      </Button>
      <div className={`flex flex-wrap gap-2 w-fit  ${showActions ? "flex" : "hidden"}`}>
        {actions.map((action, index) => (
          <Button
            key={index}
            asChild
            variant={"link"}
            size="sm"
            className="flex-1 border rounded-r-lg"
          >
            <Link href={action.href}>
              <action.Icon /> {action.name}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DashboardAction;
