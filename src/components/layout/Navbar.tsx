"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";

const NAV_LINKS = [
  { name: "Services", href: "/services" },
  { name: "Team", href: "/team" },
  { name: "Gallery", href: "/gallery" },
  { name: "Journal", href: "/journal" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Hide navbar if scrolling down and past 300px
    if (latest > previous && latest > 300) {
      setIsHidden(true);
    } 
    // Show navbar if scrolling up
    else if (latest < previous) {
      setIsHidden(false);
    }
  });

  const isTransparent = isHomePage && !isScrolled;

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: isHidden ? -100 : 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        isTransparent ? "bg-transparent" : "bg-dark/95 backdrop-blur-md shadow-md"
      }`}
    >
      <div 
        className={`mx-auto max-w-[1280px] px-[clamp(20px,5vw,80px)] flex items-center justify-between transition-all duration-500 ${
          isScrolled ? "h-20" : "h-28"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link href="/" className="font-display text-h3 text-gold tracking-widest-2 uppercase">
            Sadhana
          </Link>
        </motion.div>

        <nav className="hidden lg:flex items-center gap-8 font-body text-sm tracking-widest-2 uppercase text-cream">
          {NAV_LINKS.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            >
              <Link href={link.href} className="relative group overflow-hidden block py-2">
                <span className="relative z-10 group-hover:text-gold transition-colors duration-300">
                  {link.name}
                </span>
                {/* Animated Underline */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold origin-right scale-x-0 transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </Link>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="ml-4"
          >
            <Button onClick={() => router.push('/contact')} variant="ghost" className="!px-6 !py-2.5 !min-h-0 text-xs">
              Book Now
            </Button>
          </motion.div>
        </nav>

        {/* Mobile Hamburger (placeholder) */}
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="lg:hidden text-cream"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>
      </div>
    </motion.header>
  );
}
