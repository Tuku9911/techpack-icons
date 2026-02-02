import React from "react";

export const FlagFilled = ({ className, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props} className={className}>
  <path fill="currentColor" fillOpacity=".45" d="m15 8.5 4 5.5H5.75v6.96c0 .41-.34.75-.75.75s-.75-.34-.75-.75V6c0-2 1-3 3-3H19l-4 5.5Z"/>
</svg>
);
