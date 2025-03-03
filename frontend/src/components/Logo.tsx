import Link from "next/link";
import React from "react";

type Props = {
  className?: string;
  href?: string;
};

const Logo: React.FC<Props> = ({ className, href }) => {
  return (
    <Link
      className={`text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 bg-clip-text text-transparent to-pink-500 ${className}`}
      href={href ?? "/"}
    >
      AIreader
    </Link>
  );
};

export default Logo;
