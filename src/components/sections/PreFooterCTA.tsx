"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";

export function PreFooterCTA() {
  const router = useRouter();

  return (
    <section className="bg-dark py-[clamp(80px,10vw,160px)] text-center">
      <div className="mx-auto max-w-4xl px-[clamp(20px,5vw,80px)]">
        <h2 className="font-display text-h2 text-cream leading-tight mb-8">
          Your ritual <span className="italic text-gold">begins here.</span>
        </h2>
        <p className="font-body text-cream/70 max-w-xl mx-auto mb-10 text-lg">
          Book an appointment today and step into a sanctuary of relaxation, rejuvenation, and artistry.
        </p>
        <Button 
          onClick={() => router.push('/contact')}
          variant="primary" 
          className="bg-gold text-dark hover:bg-gold-light border-none"
        >
          Book Appointment
        </Button>
      </div>
    </section>
  );
}
