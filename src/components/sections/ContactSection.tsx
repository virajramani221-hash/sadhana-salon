"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { FormField } from "../ui/FormField";
import { Button } from "../ui/Button";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="bg-cream-2 py-[var(--section-padding-y)] overflow-hidden">
      <div className="mx-auto max-w-[800px] px-[clamp(20px,5vw,80px)] text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <SectionEyebrow label="Get in Touch" className="justify-center mb-6" />
          <h2 className="font-display text-h2 text-dark leading-tight">
            Send a <span className="italic text-gold">Message</span>
          </h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="text-left w-full mx-auto max-w-2xl mb-16">
            {status === "success" ? (
              <div className="bg-sage/10 text-sage p-6 border border-sage/20 font-body text-center">
                Thank you! We have received your inquiry and will contact you shortly.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <FormField label="Full Name" name="name" type="text" required />
                  <FormField label="Phone Number" name="phone" type="tel" required />
                </div>
                <div className="mb-8">
                  <FormField label="Service Interested In" name="service" type="text" />
                </div>
                <div className="mb-12">
                  <FormField label="Your Message (Optional)" name="message" type="text" />
                </div>
                <div className="flex justify-center">
                  <Button type="submit" variant="primary" className="w-full sm:w-auto min-w-[200px]" disabled={status === "loading"}>
                    {status === "loading" ? "Sending..." : "Submit Request"}
                  </Button>
                </div>
                {status === "error" && (
                  <p className="text-red-500 text-sm mt-4 font-body text-center">There was an error sending your message. Please try again.</p>
                )}
              </>
            )}
          </form>
        </motion.div>

        {/* Contact Info Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-dark/10 font-body text-sm text-muted"
        >
          <div>
            <h4 className="font-bold text-dark tracking-widest-2 uppercase text-xs mb-2">Address</h4>
            <p>123 Signature Road, Bodakdev<br />Ahmedabad, Gujarat 380054</p>
          </div>
          <div>
            <h4 className="font-bold text-dark tracking-widest-2 uppercase text-xs mb-2">Hours</h4>
            <p>Mon-Sat: 10:00 AM - 8:00 PM<br />Sunday: Closed</p>
          </div>
          <div>
            <h4 className="font-bold text-dark tracking-widest-2 uppercase text-xs mb-2">Contact</h4>
            <p>+91 98765 43210<br />hello@sadhanasalon.in</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
