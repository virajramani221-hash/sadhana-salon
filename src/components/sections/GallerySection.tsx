"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { Button } from "../ui/Button";
import { TextReveal } from "../ui/TextReveal";
import { ParallaxImage } from "../ui/ParallaxImage";

const GALLERY = [
  { img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&q=80", tag: "Hair" },
  { img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80", tag: "Colour" },
  { img: "https://images.unsplash.com/photo-1596178060810-72f53ce9a65c?w=800&q=80", tag: "Bridal" },
  { img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80", tag: "Nails" },
];

export function GallerySection() {
  return (
    <section className="bg-cream py-[var(--section-padding-y)] overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-[clamp(20px,5vw,80px)]">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SectionEyebrow label="Our Portfolio" className="mb-6" />
            <h2 className="font-display text-h2 text-dark leading-tight">
              <TextReveal text="Featured Work" />
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Button variant="ghost" className="text-dark border-dark hover:bg-dark hover:text-cream">
              View All Work
            </Button>
          </motion.div>
        </div>

        {/* Masonry Grid (Approximation with standard grid for now) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {GALLERY.map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
              className="relative group overflow-hidden cursor-pointer aspect-[3/4] md:aspect-square"
            >
              <ParallaxImage 
                src={item.img} 
                alt={item.tag} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="font-body tracking-widest-2 uppercase text-cream text-sm">
                  {item.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
