"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SectionEyebrow } from "../ui/SectionEyebrow";

export function TestimonialsSection() {
  return (
    <section className="bg-cream-2 py-[var(--section-padding-y)] overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-[clamp(20px,5vw,80px)] text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionEyebrow label="Client Stories" className="justify-center mb-6" />
        </motion.div>
        
        {/* Placeholder for carousel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="max-w-4xl mx-auto mt-16"
        >
          <div className="mb-8">
            {/* 5 Stars */}
            <div className="flex justify-center gap-2 text-gold text-2xl mb-8">
              ★ ★ ★ ★ ★
            </div>
            
            <p className="font-display text-3xl md:text-5xl text-dark leading-tight italic">
              &quot;The most serene salon experience I&apos;ve ever had. My balayage is flawless, and the attention to detail is unmatched in Ahmedabad.&quot;
            </p>
          </div>
          
          <div>
            <div className="font-body text-sm tracking-widest-2 uppercase text-dark mb-1">Sneha Patel</div>
            <div className="font-body text-xs text-muted">via Google Reviews</div>
          </div>
        </motion.div>
        
        {/* Carousel controls placeholder */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex justify-center gap-4 mt-12"
        >
          <button className="w-12 h-12 rounded-full border border-dark/20 flex items-center justify-center text-dark hover:border-dark transition-colors">
            ←
          </button>
          <button className="w-12 h-12 rounded-full border border-dark/20 flex items-center justify-center text-dark hover:border-dark transition-colors">
            →
          </button>
        </motion.div>

      </div>
    </section>
  );
}
