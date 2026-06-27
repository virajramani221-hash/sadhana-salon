"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { GoldDivider } from "../ui/GoldDivider";

export function AboutSection() {
  return (
    <section className="bg-cream py-[var(--section-padding-y)] overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-[clamp(20px,5vw,80px)]">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="aspect-[4/5] relative w-full overflow-hidden rounded-sm">
              <Image 
                src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1200&q=85"
                alt="Stylist working on client"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative element */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-6 -right-6 w-32 h-32 border border-gold-dim z-[-1]" 
            />
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", staggerChildren: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col"
          >
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionEyebrow label="Our Philosophy" className="mb-6" />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="font-display text-h2 text-dark leading-tight mb-8"
            >
              A sanctuary where <span className="italic text-gold">craft meets calm.</span>
            </motion.h2>
            
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-body text-muted mb-6 leading-relaxed">
              At Sadhana Salon, we believe that beauty is not just a service—it&apos;s a ritual. 
              Our highly trained masters combine modern techniques with mindful practices to 
              create an experience that transcends the ordinary.
            </motion.p>
            
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-body text-muted mb-12 leading-relaxed">
              Every detail, from our warm ambient lighting to our curated selection of 
              premium products, is designed to bring you to a state of complete relaxation 
              while we perfect your look.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <GoldDivider className="mb-8" />
            </motion.div>
            
            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "10+", label: "Years Exp" },
                { value: "4.9★", label: "Google Rating" },
                { value: "15", label: "Master Stylists" }
              ].map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + (idx * 0.1) }}
                >
                  <div className="font-display text-3xl text-dark mb-1">{stat.value}</div>
                  <div className="font-body text-xs tracking-widest-3 uppercase text-muted">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
