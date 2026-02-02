import React from "react";

export const BatteryHalfFilled = ({ className, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props} className={className}>
  <path fill="currentColor" fillOpacity=".45" d="M17.5 8h-13C3.5 8 3 8.5 3 9.5v6c0 1 .5 1.5 1.5 1.5h13c1 0 1.5-.5 1.5-1.5v-6c0-1-.5-1.5-1.5-1.5ZM6.75 14.5a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 1.5 0v4Zm2.5 0a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 1.5 0v4Zm2.5 0a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 1.5 0v4Zm9.25.25a.75.75 0 0 1-.75-.75v-3a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-.75.75Z"/>
</svg>
);
