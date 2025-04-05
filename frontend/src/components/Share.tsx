import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { socialsShare } from "@/lib/data/share";

const Share = ({ path }: { path: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Share2 className="cursor-pointer bg-transparent font-extrabold text-xl size-9" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2">
        <DropdownMenuLabel className="uppercase">
          Share this dialogue
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            className="w-full cursor-pointer"
            variant={"secondary"}
            onClick={() => {
              navigator.clipboard.writeText(path);
              toast.success("Copied to clipboard");
            }}
          >
            <Copy /> Copy link
          </Button>
        </DropdownMenuItem>
        {socialsShare.map((item, index) => (
          <DropdownMenuItem asChild key={index}>
            <Button
              className="cursor-pointer w-full"
              asChild
              variant={"secondary"}
            >
              <Link
                target="_blank"
                href={`${item.link}${path}`}
                title={item.text}
              >
                <item.Icon />
                {item.name}
              </Link>
            </Button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Share;
