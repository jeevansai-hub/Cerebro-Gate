import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import LenisProvider from "@/components/layout/LenisProvider";
import { CinematicLoader } from "@/components/layout/CinematicLoader";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "CerebroGate | Intelligent AI Infrastructure Layer",
  description: "One Gateway. Every AI Model. Zero Compromise. Classify, compress, cache, and protect every request with CerebroGate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={cn(
          syne.variable,
          dmSans.variable,
          jetbrainsMono.variable,
          "antialiased selection:bg-cyan/30 bg-bg-base text-text-primary"
        )}
      >
        <LenisProvider>
          <CinematicLoader />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
