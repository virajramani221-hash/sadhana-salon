"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface InnerPageHeroProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
}

export function InnerPageHero({ title, subtitle, imageSrc }: InnerPageHeroProps) {
  return (
    <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-dark pt-24">
      {/* Background Image */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          className="object-cover opacity-50"
        />
        {/* Dark Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {subtitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-xs md:text-sm tracking-widest-3 uppercase text-gold mb-6"
          >
            {subtitle}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-4xl md:text-6xl text-cream leading-tight"
        >
          {title}
        </motion.h1>
      </div>

      {/* Subtle bottom fade to blend into the next section smoothly */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent z-10" />
    </section>
  );
}
