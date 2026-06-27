import { PageHeader } from "@/components/ui/PageHeader";
import { JournalSection } from "@/components/sections/JournalSection";
import { PreFooterCTA } from "@/components/sections/PreFooterCTA";

export default function JournalPage() {
  return (
    <div className="w-full">
      <PageHeader 
        title="The" 
        italicWord="Journal"
        subtitle="Insights & Rituals"
        description="Expert advice, wellness rituals, and beauty trends straight from the Sadhana master stylists."
      />
      <JournalSection />
      <PreFooterCTA />
    </div>
  );
}
