"use client";
import { BookOpen, Home, Info, Settings, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";

const navItems = [
  { name: "Home", href: "/", Icon: Home },
  { name: "Explore", href: "/explore", Icon: BookOpen },
  { name: "About", href: "/about", Icon: Info },
];

const Navbar = () => {
  const pathName = usePathname();
  return (
    <nav className="bg-transparent h-12 w-full flex">
      <div className="w-full fixed top-0 z-10 flex items-center justify-between px-4 py-2">
        <div className="">
          <Logo />
        </div>
        <div className="">
          {navItems.map((item, index) => (
            <Button
              key={index}
              asChild
              variant={"link"}
              className={`text-zinc-800 hover:no-underline
 hover:text-zinc-500 text-md ${pathName === item.href && "text-zinc-500"} `}
            >
              <Link href={item.href} className="">
                <item.Icon className="sm:hidden" /> {item.name}
              </Link>
            </Button>
          ))}
        </div>
        <div className="flex gap-4">
          <Button
            size={"icon"}
            variant={"outline"}
            className="rounded-full cursor-pointer"
          >
            <UserRound />
          </Button>
          <Button
            size={"icon"}
            variant={"outline"}
            className="rounded-full cursor-pointer"
          >
            <Settings />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
