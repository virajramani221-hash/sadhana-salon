"use client";

import Link from "next/link";
import { useState } from "react";

export function Footer() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
    <footer className="bg-dark-2 text-cream pt-[clamp(64px,8vw,120px)] pb-8 border-t border-gold/10">
      <div className="mx-auto max-w-[1280px] px-[clamp(20px,5vw,80px)] grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-display text-h3 text-gold tracking-widest-2 uppercase mb-4">Sadhana Salon</h3>
          <p className="font-body text-sm text-muted">Warm Ritual Minimalism. Elevating your beauty experience.</p>
        </div>
        <div>
          <h4 className="font-body text-xs tracking-widest-3 uppercase text-muted mb-4">Explore</h4>
          <ul className="space-y-2 font-body text-sm tracking-widest-2 uppercase">
            <li><Link href="/services" className="hover:text-gold transition-colors">Services</Link></li>
            <li><Link href="/team" className="hover:text-gold transition-colors">Team</Link></li>
            <li><Link href="/gallery" className="hover:text-gold transition-colors">Gallery</Link></li>
            <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-body text-xs tracking-widest-3 uppercase text-muted mb-4">Connect</h4>
          <p className="font-body text-sm text-muted mb-4">Join our newsletter for exclusive rituals.</p>
            <form onSubmit={handleSubscribe} className="flex">
              <input name="email" type="email" required placeholder="Your email" className="bg-transparent border-b border-muted/50 px-0 py-2 w-full text-sm focus:outline-none focus:border-gold transition-colors text-cream" />
              <button type="submit" disabled={status === "loading" || status === "success"} className="text-gold font-body tracking-widest-2 text-sm ml-4 hover:text-gold-light disabled:opacity-50">
                {status === "loading" ? "..." : status === "success" ? "Done" : "Subscribe"}
              </button>
            </form>
            {status === "error" && <p className="text-red-400 text-xs mt-2 font-body">Failed to subscribe.</p>}
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-gold/10 text-center font-body text-xs tracking-widest-3 text-muted uppercase">
        © {new Date().getFullYear()} Sadhana Salon. All Rights Reserved.
      </div>
    </footer>
  );
}
