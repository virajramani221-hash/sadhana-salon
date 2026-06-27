"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Curtain Wipe transition
  const curtainVariants = {
    initial: { top: 0, height: "100vh" },
    animate: { top: "100vh", height: "0vh" },
    exit: { top: 0, height: "100vh" },
  };

  const pageVariants = isMobile
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.98 },
      };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className="flex-1 flex flex-col relative"
      >
        {/* The Content */}
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="flex-1 flex flex-col"
        >
          {children}
        </motion.div>

        {/* The Curtain Overlay (desktop only) */}
        {!isMobile && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={curtainVariants}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-0 w-full bg-dark z-[100] pointer-events-none"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
