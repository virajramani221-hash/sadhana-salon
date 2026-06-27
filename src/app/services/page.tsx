import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FullServiceMenu } from "@/components/sections/FullServiceMenu";
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
      <Suspense fallback={<div className="min-h-screen bg-dark-2" />}>
        <FullServiceMenu />
      </Suspense>
      <PreFooterCTA />
    </div>
  );
}
