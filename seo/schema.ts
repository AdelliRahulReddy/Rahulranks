import { RAHUL_REDDY, RAHULRANKS } from "./entity";

/**
 * seo/schema.ts
 *
 * Single source of truth for JSON-LD Knowledge Graph data.
 *
 * GOALS:
 * - Make Rahul Reddy the primary Person entity
 * - Make Rahulranks the owned Project / Website entity
 * - Support tools, experiments, and articles later
 * - Keep everything factual, minimal, and trust-first
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://rahulranks.com";

/* =============================================================================
   CORE ENTITY SCHEMAS (USED IN layout.tsx)
============================================================================= */

/**
 * PERSON ENTITY
 * WHO is behind everything.
 */
export const getPersonSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/#rahul`,
    name: RAHUL_REDDY.name,
    jobTitle: RAHUL_REDDY.role,
    description: RAHUL_REDDY.disambiguatingDescription,
    url: BASE_URL,
    sameAs: RAHUL_REDDY.urls,
    knowsAbout: RAHUL_REDDY.skills,
    mainEntityOfPage: {
      "@type": "ProfilePage",
      "@id": BASE_URL,
    },
  };
};

/**
 * PROJECT / WEBSITE ENTITY
 * WHAT Rahul is building.
 */
export const getProjectSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: RAHULRANKS.name,
    url: BASE_URL,
    description: RAHULRANKS.description,
    inLanguage: "en",
    publisher: {
      "@type": "Person",
      "@id": `${BASE_URL}/#rahul`,
    },
    creator: {
      "@type": "Person",
      "@id": `${BASE_URL}/#rahul`,
    },
    about: {
      "@type": "Thing",
      name: "Build in Public Web Engineering",
      description:
        "Public experiments in SEO, web performance, automation, and MVP development.",
    },
  };
};

/* =============================================================================
   PAGE-LEVEL SCHEMAS (USED LATER IN app pages)
============================================================================= */

/**
 * SOFTWARE TOOL / MVP
 */
export const getToolSchema = (
  name: string,
  description: string,
  path: string,
  featureList: string[]
) => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    url: `${BASE_URL}${path}`,
    author: {
      "@id": `${BASE_URL}/#rahul`,
    },
    featureList,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free public tool",
    },
  };
};

/**
 * TECH EXPERIMENT / ARTICLE
 */
export const getExperimentSchema = (
  headline: string,
  summary: string,
  path: string,
  publishedDate: string
) => {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline,
    description: summary,
    url: `${BASE_URL}${path}`,
    datePublished: publishedDate,
    author: {
      "@id": `${BASE_URL}/#rahul`,
    },
    publisher: {
      "@type": "Organization",
      name: RAHULRANKS.name,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
  };
};

/* =============================================================================
   GRAPH SERIALIZER
============================================================================= */

/**
 * Combines multiple schema nodes into ONE graph.
 * This is what you inject into <script type="application/ld+json">
 */
export const serializeSchema = (
  ...schemas: Record<string, any>[]
) => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": schemas.map(({ "@context": _, ...rest }) => rest),
  });
};
