"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionEyebrow } from "../ui/SectionEyebrow";

const TEAM = [
  { name: "Ananya Desai", role: "Creative Director", img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&q=85" },
  { name: "Rohan Mehta", role: "Master Colorist", img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=85" },
  { name: "Priya Sharma", role: "Senior Stylist", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=85" },
  { name: "Karan Patel", role: "Bridal Specialist", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85" },
];

export function TeamSection() {
  return (
    <section className="bg-dark py-[var(--section-padding-y)] overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-[clamp(20px,5vw,80px)]">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <SectionEyebrow label="The Masters" className="justify-center mb-6 text-cream opacity-80" />
          <h2 className="font-display text-h2 text-cream leading-tight">
            Meet the <span className="italic text-gold">Artists</span>
          </h2>
        </motion.div>

        {/* 
          Mobile: horizontal scroll container (LAW 6: No Horizontal Scroll on body, contained here)
          Tablet: 2 columns
          Desktop: 4 columns
        */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 md:pb-0 hide-scrollbar snap-x snap-mandatory">
          {TEAM.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
              className="min-w-[80vw] sm:min-w-[45vw] md:min-w-0 snap-center group cursor-pointer"
            >
              <div className="aspect-[3/4] relative overflow-hidden mb-6">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover grayscale-0 md:grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105 md:group-hover:scale-105 scale-100"
                  sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Dark gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="text-center">
                <h3 className="font-display text-2xl text-cream mb-1">{member.name}</h3>
                <p className="font-body text-xs tracking-widest-3 uppercase text-gold">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
