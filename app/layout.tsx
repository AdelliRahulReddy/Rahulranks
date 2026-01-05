import type { Metadata } from "next";
import "./globals.css";

import { baseMetadata } from "@/seo/metadata";
import { openGraphConfig, twitterConfig } from "@/seo/openGraph";
import { getPersonSchema, getProjectSchema } from "@/seo/schema";
import { Outfit, Playfair_Display } from "next/font/google";
import Footer from "@/components/layout/Footer";

/* ------------------------------------------
   FONT CONFIGURATION
------------------------------------------- */

// Sans-serif Font (Body Text - Outfit)
const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// Serif Font (Headings - Playfair Display)
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["700", "900"],
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
    // Inject both font variables
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
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

      {/* Applied font-sans for body, antialiased for smooth rendering */}
      <body className="bg-bg-canvas font-sans min-h-screen antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}
