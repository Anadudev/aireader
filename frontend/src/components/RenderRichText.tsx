import React from "react";

const RenderRichText = ({ children }: { children: string }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: children,
      }}
    />
  );
};

export default RenderRichText;
