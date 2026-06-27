import { useState, useEffect } from "react";

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      
      setScrollProgress(scrollY / docHeight);
      setIsScrolled(scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollProgress, isScrolled };
}
