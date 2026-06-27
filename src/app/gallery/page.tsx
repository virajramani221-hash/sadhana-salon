import { PageHeader } from "@/components/ui/PageHeader";
import { GallerySection } from "@/components/sections/GallerySection";
import { PreFooterCTA } from "@/components/sections/PreFooterCTA";

export default function GalleryPage() {
  return (
    <div className="w-full">
      <PageHeader 
        title="Our" 
        italicWord="Work"
        subtitle="The Portfolio"
        description="A curated gallery showcasing our signature bridal styling, precision cuts, and aesthetic mastery."
      />
      <GallerySection />
      <PreFooterCTA />
    </div>
  );
}
