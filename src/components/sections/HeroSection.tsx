"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";

const SLIDES = [
  {
    id: 1,
    image: "/images/slider/slide1.png",
    title: "Artistry.",
    subtitle: "01 / LUXURY SALON",
  },
  {
    id: 2,
    image: "/images/slider/slide2.png",
    title: "Precision.",
    subtitle: "02 / HAIR STYLING",
  },
  {
    id: 3,
    image: "/images/slider/slide3.png",
    title: "Elegance.",
    subtitle: "03 / BRIDAL",
  },
  {
    id: 4,
    image: "/images/slider/slide4.png",
    title: "Clarity.",
    subtitle: "04 / WELLNESS",
  },
  {
    id: 5,
    image: "/images/slider/slide5.png",
    title: "Perfection.",
    subtitle: "05 / NAIL CARE",
  },
  {
    id: 6,
    image: "/images/slider/slide6.png",
    title: "Radiance.",
    subtitle: "06 / SKIN CARE",
  },
  {
    id: 7,
    image: "/images/slider/slide7.png",
    title: "Harmony.",
    subtitle: "07 / MASSAGE",
  },
  {
    id: 8,
    image: "/images/slider/slide8.png",
    title: "Grooming.",
    subtitle: "08 / MEN'S CARE",
  },
  {
    id: 9,
    image: "/images/slider/slide9.png",
    title: "Vibrance.",
    subtitle: "09 / COLORING",
  }
];

export function HeroSection() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  // Drastically lower threshold so sliding is easy and completely controlled by the user's hand
  const swipeConfidenceThreshold = 2000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = SLIDES.length - 1;
      if (nextIndex >= SLIDES.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const currentSlide = SLIDES[currentIndex];

  // Auto-scroll every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col justify-end bg-dark">
      
      {/* Background Slider */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 400, damping: 40 },
            opacity: { duration: 0.5 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.8}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            // If the user drags left (negative offset)
            if (swipe < -swipeConfidenceThreshold || offset.x < -100) {
              paginate(1);
            } 
            // If the user drags right (positive offset)
            else if (swipe > swipeConfidenceThreshold || offset.x > 100) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
        >
          <Image
            src={currentSlide.image}
            alt={currentSlide.title}
            fill
            priority
            draggable={false}
            className="object-cover opacity-60 select-none pointer-events-none"
          />
          {/* Dark Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-dark/10 pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-10 w-full mx-auto max-w-[1280px] px-[clamp(20px,5vw,80px)] pb-[15vh]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pointer-events-none">
          
          <div className="max-w-2xl pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="font-body text-xs tracking-widest-3 uppercase text-gold mb-6">
                  {currentSlide.subtitle}
                </div>
                <h1 className="font-display text-hero leading-[1] text-cream mb-10">
                  {currentSlide.title}
                </h1>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Button onClick={() => router.push('/contact')} variant="primary">Book Appointment</Button>
              <Button onClick={() => router.push('/services')} variant="ghost">Our Services</Button>
            </div>
          </div>

          {/* Slider Indicators */}
          <div className="flex gap-3 pointer-events-auto">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-[2px] transition-all duration-500 ${
                  idx === currentIndex ? "w-12 bg-gold" : "w-6 bg-cream/30 hover:bg-cream/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          
        </div>
      </div>
      
    </section>
  );
}
