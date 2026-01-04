import type { Metadata } from "next";
import "./globals.css";

import { baseMetadata } from "@/seo/metadata";
import { openGraphConfig, twitterConfig } from "@/seo/openGraph";
import { getPersonSchema, getProjectSchema } from "@/seo/schema";
import { Outfit } from "next/font/google";
import Footer from "@/components/layout/Footer";

// REFACTORED: added variable definition
const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
});

/* ------------------------------------------
   GLOBAL METADATA (SITE-WIDE DEFAULTS)
------------------------------------------- */

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: openGraphConfig,
  twitter: twitterConfig,
};

/* ------------------------------------------
   ROOT LAYOUT
------------------------------------------- */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personSchema = getPersonSchema();
  const projectSchema = getProjectSchema();

  return (
    // REFACTORED: injected font variable
    <html lang="en" className={outfit.variable}>
      <head>
        {/* JSON-LD: Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />

        {/* JSON-LD: Project / Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(projectSchema),
          }}
        />
      </head>

      {/* REFACTORED: added font-sans to enforce Outfit */}
      <body className="bg-bg-canvas font-sans min-h-screen antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}
