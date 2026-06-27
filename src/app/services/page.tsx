import { PageHeader } from "@/components/ui/PageHeader";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PreFooterCTA } from "@/components/sections/PreFooterCTA";

export default function ServicesPage() {
  return (
    <div className="w-full">
      <PageHeader 
        title="Our" 
        italicWord="Services"
        subtitle="The Menu"
        description="Experience world-class beauty treatments and mindful rituals crafted for the modern individual."
      />
      <ServicesSection />
      <PreFooterCTA />
    </div>
  );
}
