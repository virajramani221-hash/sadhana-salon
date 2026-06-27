"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SectionEyebrow } from "./SectionEyebrow";

interface PageHeaderProps {
  title: string;
  italicWord?: string;
  subtitle: string;
  description?: string;
}

export function PageHeader({ title, italicWord, subtitle, description }: PageHeaderProps) {
  return (
    <section className="w-full bg-cream pt-40 pb-20 px-[clamp(20px,5vw,80px)]">
      <div className="max-w-[1280px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionEyebrow label={subtitle} className="justify-center mb-6" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-dark leading-tight mb-8"
        >
          {title} {italicWord && <span className="italic text-gold">{italicWord}</span>}
        </motion.h1>

        {description && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-body text-lg text-muted max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
