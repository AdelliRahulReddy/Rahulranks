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
  title: {
    default: `${RAHULRANKS.name} | Next.js Engineering & SEO Lab`,
    template: `%s | ${RAHULRANKS.name}`,
  },

  // DESCRIPTION STRATEGY
  description: `${RAHULRANKS.name} is the public engineering laboratory of ${RAHUL_REDDY.name}. Building SEO-ready websites, small tools, and automations in public with Next.js and AI-assisted workflows.`,

  // TECHNICAL & AUTHORSHIP SIGNALS
  applicationName: RAHULRANKS.name,
  authors: [{ name: RAHUL_REDDY.name, url: BASE_URL }],
  creator: RAHUL_REDDY.name,
  publisher: RAHULRANKS.name,

  // ENTITY KEYWORDS
  keywords: [
    ...IDENTITY_KEYWORDS,
    'Web Engineering Lab',
    'Next.js Portfolio India',
    'Build in Public',
    'SEO Automation Tools',
    'Practical Web Development',
    'SaaS MVP Development'
  ],

  // BASE URL RESOLUTION
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: '/',
  },

  // ROBOTS STRATEGY
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // OPEN GRAPH (Social / Rich Sharing)
  openGraph: {
    siteName: RAHULRANKS.name,
    locale: 'en_US',
    type: 'website',
    title: `${RAHULRANKS.name} | Web Engineering & SEO Experiments`,
    description: RAHUL_REDDY.shortDescription,
    url: BASE_URL,
    images: [
      {
        url: `${BASE_URL}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: `${RAHULRANKS.name} - Build in Public`,
      },
    ],
  },

  // TWITTER CARD
  twitter: {
    card: 'summary_large_image',
    title: `${RAHULRANKS.name} by ${RAHUL_REDDY.name}`,
    description: 'Engineering lab documenting the process of building SEO-ready software tools.',
    images: [`${BASE_URL}/og-default.jpg`],
    creator: '@rahulranks',
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