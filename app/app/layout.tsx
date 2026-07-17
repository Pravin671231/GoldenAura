import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { PageShell } from "@/components/layout/PageShell";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Golden Aura — Ornamental Plants Shop",
  description:
    "Golden Aura is a plant nursery offering ornamental plants, pots & accessories, and gardening services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full">
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
