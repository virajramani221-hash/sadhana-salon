import * as React from "react";
import { cn } from "./Button";

interface GoldDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  animated?: boolean;
}

export function GoldDivider({ animated = true, className, ...props }: GoldDividerProps) {
  return (
    <div
      className={cn(
        "h-[1px] w-full bg-gold transform origin-left",
        {
          "animate-[scaleXIn_0.8s_cubic-bezier(0.25,0.46,0.45,0.94)_forwards]": animated,
        },
        className
      )}
      {...props}
    />
  );
}
