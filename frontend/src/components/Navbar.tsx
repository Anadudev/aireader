"use client";
import { BookOpen, Home, Info, Loader, Menu, UserRound } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/lib/store/auth.store";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "/", Icon: Home },
  { name: "Explore", href: "/explore", Icon: BookOpen },
  { name: "About", href: "/about", Icon: Info },
];

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const pathName = usePathname();
  const toggleNav = () => setShowNav(!showNav);

  const { authUser, logoutLoading, logoutHandler } = useAuthStore();

  return (
    <nav className="h-12 w-full flex ">
      <Button
        className="sm:hidden fixed bottom-16 right-3 cursor-pointer z-50"
        variant={"outline"}
        size="icon"
        onClick={toggleNav}
        title="Menu"
      >
        <Menu className="size-xl" />
      </Button>
      <div className="w-full sm:bg-blur sm:bg-transparent/50 sm:backdrop-blur-md fixed top-0 z-10 flex items-center justify-between px-4 py-2">
        <div className="">
          <Logo />
        </div>
        <div
          className={`fixed sm:static bg-zinc-200 sm:bg-transparent bottom-4 left-1/2 sm:left-0 flex justify-center border sm:border-none rounded-full transform -translate-x-1/2 sm:translate-x-0 w-fit gap-4 p-1 sm:p-0 ${
            showNav ? "block" : "hidden sm:flex"
          }`}
        >
          {navItems.map((item, index) => (
            <Button
              key={index}
              asChild
              variant={"link"}
              className={`text-zinc-800 border flex items-center hover:no-underline p-3
 hover:text-zinc-500 text-md ${
   pathName === item.href
     ? "text-zinc-500 rounded-full bg-zinc-100 sm:bg-transparent border-zinc-300 sm:border-none"
     : "border-transparent"
 } `}
              title={item.name}
            >
              <Link href={item.href} className="space-x-3">
                <item.Icon className="sm:hidden size-lg" />
                <p
                  className={` ${
                    pathName === item.href
                      ? "text-zinc-500 block"
                      : "hidden sm:block"
                  }  `}
                >
                  {item.name}
                </p>
              </Link>
            </Button>
          ))}
        </div>
        <div className="flex gap-4">
          {authUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <Button variant={"outline"}>
                  <UserRound /> {authUser?.username}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Button size={"sm"} variant={"link"} asChild>
                    <Link href={`/user/${authUser?.username}`}>Dashboard</Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Button size={"sm"} variant={"link"} asChild>
                    <Link href={`/user/${authUser?.username}/profile`}>
                      Profile
                    </Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Button size={"sm"} variant={"link"} asChild>
                    <Link href={`/user/${authUser?.username}/settings`}>
                      Settings
                    </Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="">
                  <Button
                    size={"sm"}
                    variant={"destructive"}
                    onClick={logoutHandler}
                  >
                    Logout {logoutLoading ? <Loader /> : ""}
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              size={"icon"}
              variant={"link"}
              asChild
              className="rounded-full cursor-pointer ring-1 ring-zinc-300"
            >
              <Link href="/login">
                <UserRound />
              </Link>
            </Button>
          )}

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
