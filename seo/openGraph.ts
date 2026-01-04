/**
 * seo/openGraph.ts
 *
 * Centralized Open Graph & Twitter configuration.
 *
 * PURPOSE:
 * - Provide stable, site-wide social metadata
 * - Reinforce Person ↔ Project entity connection
 * - Avoid page-level noise at the global layer
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://rahulranks.com";

/* =============================================================================
   OPEN GRAPH (BASE CONFIG)
============================================================================= */

export const openGraphConfig = {
  type: "website",
  locale: "en_US",
  url: BASE_URL,
  siteName: "Rahulranks",
  title: "Rahulranks | Build in Public Web Engineering",
  description:
    "Rahulranks is the public build-in-public lab of Rahul Reddy, documenting real-world experiments in SEO, web engineering, automation, and MVP development.",
  images: [
    {
      url: `${BASE_URL}/og-default.jpg`,
      width: 1200,
      height: 630,
      alt: "Rahulranks – Build in Public",
    },
  ],
};

/* =============================================================================
   TWITTER CARD (BASE CONFIG)
============================================================================= */

export const twitterConfig = {
  card: "summary_large_image",
  title: "Rahulranks by Rahul Reddy",
  description:
    "Practical experiments in SEO, web engineering, automation, and MVP development.",
  images: [`${BASE_URL}/og-default.jpg`],
  creator: "@rahulranks", // optional / can be updated later
};
