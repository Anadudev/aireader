"use client";
import React from "react";
import { Interweave } from "interweave";
// Interweave
const RenderRichText = ({ children }: { children: string }) => {
  return (
    <Interweave content={children} />
    // <Markup className="text-wrap bg-red-400" content={children}/>

    // <div
    //   className="text-wrap block break-words"
    //   dangerouslySetInnerHTML={{
    //     __html: children,
    //   }}
    // />
    // >{children}</div>
  );
};

export default RenderRichText;
