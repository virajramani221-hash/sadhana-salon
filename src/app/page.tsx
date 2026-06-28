import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { JournalSection } from "@/components/sections/JournalSection";
import { PreFooterCTA } from "@/components/sections/PreFooterCTA";
import { ContactSection } from "@/components/sections/ContactSection";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <InfiniteMarquee />
      <TeamSection />
      <TestimonialsSection />
      <GallerySection />
      <JournalSection />
      <PreFooterCTA />
      <ContactSection />
    </>
  );
}
