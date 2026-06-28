"use client";

import { motion } from "framer-motion";

const BRANDS = [
  "L'ORÉAL PROFESSIONNEL",
  "KÉRASTASE",
  "OLAPLEX",
  "SCHWARZKOPF",
  "WELLA PROFESSIONALS",
  "MOROCCANOIL",
  "DYSON",
  "BALMAIN HAIR COUTURE",
];

export function InfiniteMarquee() {
  return (
    <div className="w-full bg-dark py-8 border-y border-gold/20 overflow-hidden flex whitespace-nowrap">
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-50%" }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30, // 30 seconds for a full loop
        }}
        className="flex gap-16 items-center w-max"
      >
        {/* We duplicate the array to create the seamless infinite scroll effect */}
        {[...BRANDS, ...BRANDS].map((brand, i) => (
          <div key={i} className="flex items-center gap-16">
            <span className="font-display text-2xl md:text-3xl tracking-widest text-cream opacity-50 hover:opacity-100 transition-opacity duration-300">
              {brand}
            </span>
            <span className="text-gold text-sm opacity-50">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
