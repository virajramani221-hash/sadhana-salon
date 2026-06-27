"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Refresh ScrollTrigger on route changes
    ScrollTrigger.refresh();
    
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pathname]);

  return <>{children}</>;
}
