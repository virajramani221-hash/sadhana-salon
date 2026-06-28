import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { GSAPProvider } from "@/components/providers/GSAPProvider";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sadhana Salon | Luxury Beauty & Wellness in Ahmedabad",
  description: "Experience world-class beauty treatments, mindful rituals, and premium styling at Sadhana Salon in Ahmedabad, Gujarat.",
  keywords: ["Salon Ahmedabad", "Luxury Salon", "Bridal Makeup", "Balayage", "Skin Care"],
  openGraph: {
    title: "Sadhana Salon | Luxury Beauty & Wellness",
    description: "Experience world-class beauty treatments and mindful rituals at Sadhana Salon.",
    url: "https://sadhanasalon.in",
    siteName: "Sadhana Salon",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <SmoothScrollProvider>
          <GSAPProvider>
            <Navbar />
            <PageTransition>
              <main className="flex-1 w-full">{children}</main>
            </PageTransition>
            <Footer />
            <WhatsAppButton />
          </GSAPProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
