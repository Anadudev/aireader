import React from "react";
import Logo from "@/components/Logo";
import { links } from "@/lib/data/links";
import Link from "next/link";
import { socials } from "@/lib/data/socials";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="flex  flex-col gap-4 bg-gradient-to-br from-indigo-900/10 to-pink-900/10">
      <div className="px-4 py-8 flex flex-wrap items-center sm:items-baseline justify-center gap-8">
        <Logo />
        <div className="flex-1 flex gap-8">
          <div className="space-y-2">
            <h4 className="font-bold">Company</h4>
            <ul className="space-y-1">
              {links.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-2 sm:flex-1 flex flex-col gap-4 justify-between">
            <div className="flex-1 flex gap-4 items-center justify-center">
              {socials.map((social, index) => (
                <div key={index} title={social.name}>
                  <Link href={social.href}>{<social.Icon />}</Link>
                </div>
              ))}
            </div>
            <form className="flex flex-col gap-4">
              <Input
                type="email"
                required
                placeholder="Subscribe to our newsletter"
                className=""
              />
              <Button type="submit" className="ml-auto">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="text-center bg-indigo-900/20 p-4">
        © {year} AILogue. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
