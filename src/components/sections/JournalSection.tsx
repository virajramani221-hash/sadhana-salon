"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionEyebrow } from "../ui/SectionEyebrow";

const POSTS = [
  { 
    title: "The Art of Mindful Beauty", 
    date: "Oct 12, 2025",
    img: "https://images.unsplash.com/photo-1470259078422-826894b933aa?w=800&q=80"
  },
  { 
    title: "Preparing Your Hair for Winter", 
    date: "Nov 04, 2025",
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80"
  },
  { 
    title: "Understanding Scalp Health", 
    date: "Dec 18, 2025",
    img: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800&q=80"
  },
];

export function JournalSection() {
  return (
    <section className="bg-cream py-[var(--section-padding-y)] overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-[clamp(20px,5vw,80px)]">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionEyebrow label="Journal" className="mb-6" />
          <h2 className="font-display text-h2 text-dark leading-tight mb-16">
            Latest from <span className="italic text-gold">The Desk</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POSTS.map((post, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] relative overflow-hidden mb-6">
                <Image 
                  src={post.img} 
                  alt={post.title} 
                  fill 
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="font-body text-xs tracking-widest-3 uppercase text-gold mb-3">
                {post.date}
              </div>
              <h3 className="font-display text-2xl text-dark group-hover:text-gold transition-colors">
                {post.title}
              </h3>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
