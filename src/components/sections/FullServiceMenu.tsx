"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { GoldDivider } from "../ui/GoldDivider";

// --- Service Data ---
const WOMEN_SERVICES = [
  { title: "Balayage Ritual", price: "₹4,500+", category: "Hair" },
  { title: "Precision Cut & Style", price: "₹1,500", category: "Hair" },
  { title: "Keratin Treatment", price: "₹6,000+", category: "Hair" },
  { title: "Root Touch-Up", price: "₹1,200", category: "Hair" },
  { title: "Hydration Facial", price: "₹2,500", category: "Skin" },
  { title: "Advanced Skin Therapy", price: "₹4,500", category: "Skin" },
  { title: "Bridal Makeup", price: "₹15,000", category: "Bridal" },
  { title: "Pre-Bridal Package", price: "₹12,000", category: "Bridal" },
  { title: "Spa Pedicure", price: "₹1,200", category: "Nails" },
  { title: "Gel Manicure", price: "₹1,800", category: "Nails" },
  { title: "Aromatherapy Massage", price: "₹3,500", category: "Wellness" },
];

const MEN_SERVICES = [
  { title: "Classic Barber Cut", price: "₹800", category: "Hair" },
  { title: "Precision Fade", price: "₹1,000", category: "Hair" },
  { title: "Hot Towel Shave", price: "₹600", category: "Grooming" },
  { title: "Beard Sculpting", price: "₹500", category: "Grooming" },
  { title: "Men's Energizing Facial", price: "₹2,000", category: "Skin" },
  { title: "Scalp Detox", price: "₹1,500", category: "Hair" },
  { title: "Gray Blending", price: "₹1,200", category: "Hair" },
  { title: "Sports Massage", price: "₹3,000", category: "Wellness" },
];

export function FullServiceMenu() {
  const searchParams = useSearchParams();
  const genderParam = searchParams?.get("gender");

  const [activeGender, setActiveGender] = useState<"Women" | "Men">("Women");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    if (genderParam === "men") {
      setActiveGender("Men");
    } else if (genderParam === "women") {
      setActiveGender("Women");
    }
  }, [genderParam]);

  const currentServices = activeGender === "Women" ? WOMEN_SERVICES : MEN_SERVICES;
  
  // Extract unique categories based on the selected gender
  const categories = ["All", ...Array.from(new Set(currentServices.map(s => s.category)))];
  
  const filteredServices = activeCategory === "All" 
    ? currentServices 
    : currentServices.filter(s => s.category === activeCategory);

  // When changing gender, reset category if the new gender doesn't have it
  const handleGenderChange = (gender: "Women" | "Men") => {
    setActiveGender(gender);
    setActiveCategory("All");
  };

  return (
    <section className="bg-dark-2 py-[var(--section-padding-y)] overflow-hidden min-h-screen">
      <div className="mx-auto max-w-[1280px] px-[clamp(20px,5vw,80px)]">
        
        {/* Header & Gender Toggle */}
        <div className="flex flex-col items-center mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <SectionEyebrow label="The Menu" className="mb-6 justify-center text-cream opacity-80" />
            <h2 className="font-display text-h2 text-cream leading-tight">
              Curated <span className="italic text-gold">Treatments</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex p-1 bg-dark rounded-full border border-gold/20"
          >
            <button
              onClick={() => handleGenderChange("Women")}
              className={`px-8 py-3 rounded-full font-body text-sm tracking-widest-2 uppercase transition-all duration-300 ${
                activeGender === "Women" 
                  ? "bg-gold text-dark" 
                  : "text-cream hover:text-gold"
              }`}
            >
              For Her
            </button>
            <button
              onClick={() => handleGenderChange("Men")}
              className={`px-8 py-3 rounded-full font-body text-sm tracking-widest-2 uppercase transition-all duration-300 ${
                activeGender === "Men" 
                  ? "bg-gold text-dark" 
                  : "text-cream hover:text-gold"
              }`}
            >
              For Him
            </button>
          </motion.div>
        </div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex overflow-x-auto pb-4 mb-10 gap-8 font-body text-sm tracking-widest-2 uppercase justify-start md:justify-center text-muted whitespace-nowrap hide-scrollbar border-b border-gold/10"
        >
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pb-4 border-b-2 transition-colors ${
                activeCategory === cat 
                  ? "text-gold border-gold" 
                  : "hover:text-cream border-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Services Grid with Animation */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div 
                key={service.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
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
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
