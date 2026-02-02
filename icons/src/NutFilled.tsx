import React from "react";

export const NutFilled = ({ className, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props} className={className}>
  <path fill="currentColor" fillOpacity=".45" d="m18.83 6.82-5.5-3.44c-.82-.51-1.84-.51-2.66 0l-5.5 3.44C4.44 7.27 4 8.08 4 8.94v6.12c0 .86.44 1.67 1.17 2.12l5.5 3.44c.82.51 1.84.51 2.66 0l5.5-3.44c.73-.45 1.17-1.26 1.17-2.12V8.94c0-.86-.44-1.67-1.17-2.12ZM12 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3Z"/>
</svg>
);
