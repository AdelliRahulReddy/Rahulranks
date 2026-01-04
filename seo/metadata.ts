import { Metadata } from 'next';
import { RAHUL_REDDY, RAHULRANKS, IDENTITY_KEYWORDS } from './entity';

/**
 * seo/metadata.ts
 *
 * Defines the foundational SEO metadata strategy for the application.
 *
 * STRATEGY:
 * - Establish strong Entity-Authority connection between Person (Rahul) and Project (Rahulranks).
 * - Optimize for "Aboutness" to help Google/AI classify the site as a portfolio/lab, not a generic agency.
 * - Prioritize signals of "Building in Public" (transparency) over "Selling Services" (marketing).
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://rahulranks.com';

// -----------------------------------------------------------------------------
// DEFAULT METADATA CONFIGURATION
// -----------------------------------------------------------------------------

export const baseMetadata: Metadata = {
  // TITLE STRATEGY
  // Core branding + Primary Function.
  // Template allows specific pages to shine while maintaining entity association.
  title: {
    default: `${RAHULRANKS.name} | Web Engineering & SEO Experiments`,
    template: `%s | ${RAHULRANKS.name}`,
  },

  // DESCRIPTION STRATEGY
  // Clear, factual statement of purpose. 
  // explicitly links the "Project" to the "Person" to consolidate authority.
  description: `${RAHULRANKS.name} is the public engineering lab of ${RAHUL_REDDY.name}. Documenting the process of building SEO-ready websites, small tools, and automations using Next.js and AI workflows.`,

  // TECHNICAL & AUTHORSHIP SIGNALS
  applicationName: RAHULRANKS.name,
  authors: [
    { name: RAHUL_REDDY.name, url: BASE_URL },
  ],
  creator: RAHUL_REDDY.name,
  publisher: RAHULRANKS.name,
  
  // ENTITY KEYWORDS
  // Mix of Identity (Who), Technology (How), and Topic (What).
  // Avoids spammy lists; focuses on semantic relevance.
  keywords: [
    ...IDENTITY_KEYWORDS,
    'Web Engineering Lab',
    'Next.js Experiments',
    'Build in Public',
    'SEO Automation Tools',
    'Practical Web Development'
  ],

  // BASE URL RESOLUTION
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: '/',
  },

  // ROBOTS STRATEGY
  // Maximize snippets for rich results (AI Overviews love structured snippets).
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // OPEN GRAPH (Social / Rich Sharing)
  // Treats the site as a 'website' generally, but specific pages can override to 'article'.
  openGraph: {
    siteName: RAHULRANKS.name,
    locale: 'en_US',
    type: 'website',
    title: `${RAHULRANKS.name} | Web Engineering & Experiments`,
    description: RAHUL_REDDY.shortDescription,
    url: BASE_URL,
    images: [
      {
        url: '/og-default.jpg', // Should be a dedicated brand asset
        width: 1200,
        height: 630,
        alt: `${RAHULRANKS.name} - Building in Public`,
      },
    ],
  },

  // TWITTER CARD
  twitter: {
    card: 'summary_large_image',
    title: `${RAHULRANKS.name} by ${RAHUL_REDDY.name}`,
    description: 'Practical experiments in web development and SEO automation.',
    creator: '@rahulranks', // Update if specific handle differs
  },

  // VERIFICATION
  // Placeholders for search console ownership verification
  verification: {
    google: 'google-site-verification-code', // To be replaced via env
  },
};

/**
 * HELPER: Construct page-specific metadata with entity reinforcement.
 * * @param title - The specific page title (e.g., "Keyword Clustering Tool")
 * @param description - Specific page description
 * @param path - The route path (e.g., "/tools/clustering")
 */
export const generatePageMetadata = (
  title: string,
  description: string,
  path: string
): Metadata => {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${RAHULRANKS.name}`,
      description,
      url: `${BASE_URL}${path}`,
    },
    twitter: {
      title: `${title} | ${RAHULRANKS.name}`,
      description,
    },
  };
};