import React from "react";

export const MessageFilled = ({ className, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props} className={className}>
  <path fill="currentColor" fillOpacity=".45" d="M3 21V6c0-2 1-3 3-3h12c2 0 3 1 3 3v9c0 2-1 3-3 3H6l-3 3Z"/>
</svg>
);
