"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { Button } from "../ui/Button";
import { GoldDivider } from "../ui/GoldDivider";

// Placeholder data from constants
const SERVICES = [
  { title: "Balayage Ritual", price: "₹4,500+", category: "Hair" },
  { title: "Precision Cut", price: "₹1,200", category: "Hair" },
  { title: "Hydration Facial", price: "₹2,500", category: "Skin" },
  { title: "Bridal Makeup", price: "₹15,000", category: "Bridal" },
  { title: "Keratin Treatment", price: "₹6,000+", category: "Hair" },
  { title: "Manicure & Pedicure", price: "₹1,800", category: "Nails" },
];

export function ServicesSection() {
  return (
    <section className="bg-dark-2 py-[var(--section-padding-y)] overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-[clamp(20px,5vw,80px)]">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SectionEyebrow label="Our Services" className="mb-6 text-cream opacity-80" />
            <h2 className="font-display text-h2 text-cream leading-tight">
              Curated <span className="italic text-gold">Treatments</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Button variant="ghost">View Full Menu</Button>
          </motion.div>
        </div>

        {/* Tab Filter (Static for now) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex overflow-x-auto pb-4 mb-10 gap-8 font-body text-sm tracking-widest-2 uppercase text-muted whitespace-nowrap hide-scrollbar border-b border-gold/10"
        >
          <button className="text-gold border-b-2 border-gold pb-4">All</button>
          <button className="hover:text-cream transition-colors pb-4 border-b-2 border-transparent">Hair</button>
          <button className="hover:text-cream transition-colors pb-4 border-b-2 border-transparent">Skin</button>
          <button className="hover:text-cream transition-colors pb-4 border-b-2 border-transparent">Nails</button>
          <button className="hover:text-cream transition-colors pb-4 border-b-2 border-transparent">Bridal</button>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
              className="group border border-gold/10 bg-dark p-8 hover:border-gold/30 transition-colors duration-500 flex flex-col justify-between min-h-[240px] cursor-pointer"
            >
              <div>
                <div className="font-body text-xs tracking-widest-3 uppercase text-gold mb-4">
                  {service.category}
                </div>
                <h3 className="font-display text-2xl text-cream mb-2 group-hover:text-gold-light transition-colors">
                  {service.title}
                </h3>
              </div>
              <div>
                <GoldDivider className="mb-4 opacity-30 group-hover:opacity-100" animated={false} />
                <div className="flex justify-between items-center text-cream">
                  <span className="font-body tracking-wider">{service.price}</span>
                  <span className="font-body text-xs uppercase tracking-widest-2 text-gold group-hover:translate-x-2 transition-transform duration-300">
                    Book →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
