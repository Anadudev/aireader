import React from "react";
const RenderRichText = ({ children }: { children: string }) => {
  return (
    <div
      className="text-wrap break-words"
      dangerouslySetInnerHTML={{
        __html: children,
      }}
    />
  );
};

export default RenderRichText;
