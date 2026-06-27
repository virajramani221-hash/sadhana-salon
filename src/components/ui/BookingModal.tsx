"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl h-[80vh] bg-cream rounded-sm shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-gold/20">
              <h2 className="font-display text-2xl text-dark">Book an Appointment</h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-dark/5 hover:bg-dark/10 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 w-full relative">
              {/* Fresha Embed Placeholder */}
              <iframe
                src={process.env.NEXT_PUBLIC_FRESHA_BOOKING_URL || "https://www.fresha.com/book-now"}
                className="absolute inset-0 w-full h-full border-0"
                title="Fresha Booking"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
