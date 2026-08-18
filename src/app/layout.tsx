import type { Metadata } from "next";
import { Manrope, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const serif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "CHEMRADES | Specialty Chemistry, Reliably Delivered",
  description: "Specialty additives and performance chemicals for plastics, coatings, packaging and industry across the Middle East and beyond.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${manrope.variable} ${serif.variable}`}>{children}</body></html>;
}

