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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const isTransparent = isHomePage && !isScrolled && !isMobileMenuOpen;

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: isHidden && !isMobileMenuOpen ? -100 : 0 }}
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
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="font-display text-h3 text-gold tracking-widest-2 uppercase relative z-[60]">
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

          {/* Mobile Hamburger */}
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-cream relative z-[60] p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between relative">
              <span className={`w-full h-[2px] bg-gold transition-all duration-300 origin-left ${isMobileMenuOpen ? "rotate-45 translate-x-[3px] -translate-y-[1px]" : ""}`} />
              <span className={`w-full h-[2px] bg-gold transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`w-full h-[2px] bg-gold transition-all duration-300 origin-left ${isMobileMenuOpen ? "-rotate-45 translate-x-[3px] translate-y-[1px]" : ""}`} />
            </div>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-dark flex flex-col items-center justify-center lg:hidden"
          >
            <nav className="flex flex-col items-center gap-8 font-display text-h3 text-cream">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-gold transition-colors duration-300 uppercase tracking-widest"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.2 + NAV_LINKS.length * 0.1 }}
                className="mt-8"
              >
                <Button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push('/contact');
                  }} 
                  variant="primary" 
                  className="!px-8 !py-4"
                >
                  Book Appointment
                </Button>
              </motion.div>
            </nav>
            
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gold/10 to-transparent pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
