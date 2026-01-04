/**
 * seo/entity.ts
 *
 * Defines the core semantic entities for Rahul Reddy and Rahulranks.
 *
 * STRATEGY:
 * This file acts as the single source of truth for Identity and Knowledge Graph signals.
 * It is designed to feed metadata, JSON-LD schema, and AI context windows.
 *
 * PHILOSOPHY:
 * - Zero fluff / Zero exaggeration.
 * - Focus on capability, transparency, and the "Build in Public" ethos.
 * - Optimized for Entity-Based SEO (E-E-A-T) rather than just keywords.
 */

// -----------------------------------------------------------------------------
// TYPES (Semantic Structure)
// -----------------------------------------------------------------------------

type EntityLink = {
  text: string;
  url: string;
  relationship: 'sameAs' | 'knowsAbout' | 'worksFor' | 'author';
};

type SemanticEntity = {
  name: string;
  alternateNames?: string[];
  role: string;
  disambiguatingDescription: string; // Precise definition for Knowledge Graph
  shortDescription: string; // For meta tags/bios
  location: string;
  skills: string[]; // Competency signals
  philosophy: string[]; // Trust signals
  urls: string[]; // Identity resolution
};

// -----------------------------------------------------------------------------
// CORE PERSON ENTITY: RAHUL REDDY
// -----------------------------------------------------------------------------

export const RAHUL_REDDY: SemanticEntity = {
  name: 'Rahul Reddy',
  alternateNames: ['Rahul R.', 'Rahulranks Founder'],
  role: 'SEO-Focused Website Builder & Automation Developer',

  location: 'India', // Broad location context
  
  // High-fidelity description for AI/Search understanding
  disambiguatingDescription: 
    'Rahul Reddy is a practical web developer and builder focused on creating SEO-ready applications, small tools, and automations. ' +
    'Unlike traditional agencies, he operates as an independent builder who leverages AI-assisted workflows and modern frameworks like Next.js ' +
    'to solve real-world problems. He documents his engineering process, experiments, and learnings publicly to foster transparency and trust.',

  // Concise description for UI/Meta
  shortDescription: 
    'Building SEO-ready websites and automations in public. Focused on practical shipping, iterative improvement, and helping others through code.',

  skills: [
    'Next.js & React Development',
    'Semantic HTML & Accessibility',
    'Programmatic SEO Architecture',
    'AI-Assisted Engineering',
    'Rapid Prototyping (MVP)',
    'Process Automation'
  ],

  philosophy: [
    'Build → Test → Improve',
    'Transparency over perfection',
    'Practical utility over theoretical expertise',
    'Continuous public learning'
  ],

  urls: [
    // Add real social profiles here when available (e.g., GitHub, X/Twitter, LinkedIn)
    'https://rahulranks.com' 
  ]
};

// -----------------------------------------------------------------------------
// CORE BRAND/PROJECT ENTITY: RAHULRANKS
// -----------------------------------------------------------------------------

export const RAHULRANKS = {
  name: 'Rahulranks',
  type: 'Digital Laboratory & Portfolio', // Specific classification
  foundingDate: '2025', // Future-proofing
  founder: RAHUL_REDDY.name,
  
  // Distinction: Not an agency
  description: 
    'Rahulranks is the public build-lab and portfolio of Rahul Reddy. ' +
    'It serves as a central repository for web experiments, SEO case studies, and open-source tools. ' +
    'It is not a marketing agency, but a documented journey of building software that works.',

  mission: 
    'To demonstrate the capabilities of modern web engineering through transparency and actual shipped code.',
  
  topics: [
    'Build in Public',
    'Web Performance',
    'Search Engine Optimization',
    'Software Experiments'
  ]
};

// -----------------------------------------------------------------------------
// KNOWLEDGE GRAPH HELPERS
// -----------------------------------------------------------------------------

export const IDENTITY_KEYWORDS = [
  ...RAHUL_REDDY.skills,
  ...RAHULRANKS.topics,
  'Rahul Reddy Developer',
  'Rahulranks'
];

/**
 * Returns a structured object suitable for JSON-LD "Person" schema
 * without depending on UI/React libraries.
 */
export const getPersonSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: RAHUL_REDDY.name,
    jobTitle: RAHUL_REDDY.role,
    description: RAHUL_REDDY.disambiguatingDescription,
    url: RAHULRANKS.urls?.[0] || 'https://rahulranks.com',
    sameAs: RAHUL_REDDY.urls,
    knowsAbout: RAHUL_REDDY.skills,
    worksFor: {
      '@type': 'Organization',
      name: RAHULRANKS.name,
      description: RAHULRANKS.description
    }
  };
};