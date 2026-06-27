"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export function StickyBookWidget() {
  const { scrollYProgress } = useScroll();
  
  // Rotate the stamp based on scroll
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <Link href="/contact" className="fixed right-6 bottom-6 md:right-10 md:bottom-10 z-[100] group">
      <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center cursor-pointer"
      >
        {/* Rotating Circular Text Stamp */}
        <motion.div 
          style={{ rotate }}
          className="absolute inset-0 w-full h-full text-gold opacity-90 group-hover:opacity-100 transition-opacity duration-300"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_10s_linear_infinite]">
            <path id="curve" fill="transparent" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
            <text className="font-display text-[10px] uppercase tracking-[0.2em]" fill="currentColor">
              <textPath href="#curve" startOffset="0">
                BOOK NOW • SADHANA SALON • BOOK NOW • SADHANA SALON •
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Inner Solid Circle */}
        <div className="absolute w-12 h-12 md:w-16 md:h-16 bg-dark text-gold rounded-full flex items-center justify-center border border-gold/30 shadow-[0_0_20px_rgba(184,149,90,0.15)] group-hover:bg-gold group-hover:text-dark transition-colors duration-500">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </motion.div>
    </Link>
  );
}
