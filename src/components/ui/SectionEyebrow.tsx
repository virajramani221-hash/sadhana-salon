import * as React from "react";
import { cn } from "./Button"; // Using the cn utility we just defined

interface SectionEyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

export function SectionEyebrow({ label, className, ...props }: SectionEyebrowProps) {
  return (
    <div className={cn("flex items-center gap-4", className)} {...props}>
      <div className="h-[1px] w-8 bg-gold" />
      <span className="font-body text-xs tracking-widest-3 uppercase text-muted">
        {label}
      </span>
    </div>
  );
}
