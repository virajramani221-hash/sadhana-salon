"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { TiltCard } from "../ui/TiltCard";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "The most serene salon experience I've ever had. My balayage is flawless, and the attention to detail is unmatched in Ahmedabad.",
    author: "Sneha Patel",
    source: "Google Reviews",
  },
  {
    id: 2,
    quote: "Absolute perfection. The ambiance, the staff, and the final result were all above and beyond my expectations.",
    author: "Riya Sharma",
    source: "Facebook Reviews",
  },
  {
    id: 3,
    quote: "They truly understand luxury and care. Every visit feels like a rejuvenating retreat. Highly recommended.",
    author: "Anjali Desai",
    source: "Yelp",
  }
];

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  const nextTestimonial = () => {
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="bg-cream-2 py-[var(--section-padding-y)] overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-[clamp(20px,5vw,80px)] text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionEyebrow label="Client Stories" className="justify-center mb-6" />
        </motion.div>
        
        {/* 3D Stack Container */}
        <div className="relative w-full max-w-4xl h-[400px] mt-16 perspective-[1000px] flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {TESTIMONIALS.map((testimonial, i) => {
              // Calculate relative position: 0 is active, 1 is next, 2 is after next...
              const relativeIndex = (i - index + TESTIMONIALS.length) % TESTIMONIALS.length;
              
              if (relativeIndex > 2) return null; // Only show top 3 cards

              return (
                <motion.div
                  key={testimonial.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: 10 }}
                  animate={{ 
                    opacity: 1 - (relativeIndex * 0.3), 
                    scale: 1 - (relativeIndex * 0.1), 
                    y: relativeIndex * 40,
                    z: -relativeIndex * 100,
                    rotateX: relativeIndex * 5,
                    zIndex: TESTIMONIALS.length - relativeIndex 
                  }}
                  exit={{ opacity: 0, scale: 1.1, y: -50, filter: "blur(10px)" }}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute w-full max-w-3xl"
                  style={{ transformOrigin: "top center" }}
                >
                  <TiltCard className="bg-white/80 backdrop-blur-xl border border-gold/10 p-12 shadow-2xl rounded-sm">
                    <div className="flex justify-center gap-2 text-gold text-2xl mb-8">
                      ★ ★ ★ ★ ★
                    </div>
                    <p className="font-display text-2xl md:text-4xl text-dark leading-tight italic mb-8">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <div>
                      <div className="font-body text-sm tracking-widest-2 uppercase text-dark mb-1">{testimonial.author}</div>
                      <div className="font-body text-xs text-muted">via {testimonial.source}</div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        
        {/* Carousel controls */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex justify-center gap-4 mt-8 z-10 relative"
        >
          <button onClick={prevTestimonial} className="w-12 h-12 rounded-full border border-dark/20 flex items-center justify-center text-dark hover:border-dark hover:bg-dark hover:text-cream transition-all duration-300">
            ←
          </button>
          <button onClick={nextTestimonial} className="w-12 h-12 rounded-full border border-dark/20 flex items-center justify-center text-dark hover:border-dark hover:bg-dark hover:text-cream transition-all duration-300">
            →
          </button>
        </motion.div>

      </div>
    </section>
  );
}
