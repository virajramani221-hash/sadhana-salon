"use client";

import * as React from "react";
import { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Magnetic } from "./Magnetic";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "ghost";
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, onClick, ...props }, ref) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newRipple = { x, y, id: Date.now() };
      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);

      if (onClick) onClick(e);
    };

    return (
      <Magnetic>
        <motion.button
          suppressHydrationWarning
          ref={ref}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleClick}
          className={cn(
            "relative overflow-hidden inline-flex items-center justify-center transition-colors duration-300 min-h-[44px] min-w-[44px] px-8 py-4 font-body tracking-widest-2 uppercase text-sm cursor-pointer group",
            {
              "bg-dark text-cream hover:bg-dark-2": variant === "primary",
              "border border-gold text-gold hover:bg-gold hover:text-dark": variant === "ghost",
            },
            className
          )}
          {...props}
        >
          {/* Glass Shine Sweep */}
          <div className="absolute inset-0 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-[1.5s] ease-in-out pointer-events-none z-20">
            <div className="h-full w-12 bg-white/20 skew-x-[30deg] blur-[4px]" />
          </div>
          <span className="relative z-10">{children as React.ReactNode}</span>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: ripple.x,
                top: ripple.y,
                width: 100,
                height: 100,
                marginLeft: -50,
                marginTop: -50,
                borderRadius: "50%",
                backgroundColor: variant === "primary" ? "rgba(255,255,255,0.25)" : "rgba(184,149,90,0.3)",
                pointerEvents: "none",
                zIndex: 0
              }}
            />
          ))}
        </motion.button>
      </Magnetic>
    );
  }
);
Button.displayName = "Button";

export { Button, cn };
