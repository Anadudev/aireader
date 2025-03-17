import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  className?: string;
  href?: string;
};

const Logo: React.FC<Props> = ({ className, href }) => {
  return (
    <Link
      className={`relative flex text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 bg-clip-text text-transparent to-pink-500 ${className}`}
      href={href ?? "/"}
    >
      AILogue
      <div className="absolute size-3 animate-spin -top-1 left-[1.1rem] transition-all duration-1500">
        <Image
          className="rounded-full group-hover:animate-spin transition-all duration-200"
          title="Ai logo"
          src="/gemini_sparkle.svg"
          alt="AI Logo"
          fill
        />
      </div>
    </Link>
  );
};

export default Logo;
