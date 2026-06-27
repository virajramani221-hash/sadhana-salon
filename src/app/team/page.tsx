import { PageHeader } from "@/components/ui/PageHeader";
import { TeamSection } from "@/components/sections/TeamSection";
import { PreFooterCTA } from "@/components/sections/PreFooterCTA";

export default function TeamPage() {
  return (
    <div className="w-full">
      <PageHeader 
        title="Meet The" 
        italicWord="Artists"
        subtitle="Our Masters"
        description="Our team of master stylists and wellness experts are dedicated to elevating your personal style."
      />
      <TeamSection />
      <PreFooterCTA />
    </div>
  );
}
