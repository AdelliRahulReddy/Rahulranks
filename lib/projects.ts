// Path: lib/projects.ts

// ==========================================
// YOUR PROJECTS DATA
// Easy to update - just edit this file!
// ==========================================

export const MY_PROJECTS = [
  {
    id: "project-1",
    name: "ARRZONE",
    category: "websites",
    description: "Deals & coupons platform",
    // New detailed description for the single project page
    longDescription: "ARRZONE is a high-traffic deals and coupons platform designed to aggregate discounts from major retailers. The challenge was to handle thousands of dynamic coupon codes while maintaining lightning-fast SEO performance. Built with a custom WordPress architecture and heavily optimized PHP, it ensures that pages load instantly even with heavy database queries. The platform currently serves thousands of users looking for real-time savings.",
    image: "/projects/arrzone.jpg",
    tags: ["WordPress", "PHP", "SEO"],
    status: "live",
    liveLink: "https://arrzone.vercel.app",
    githubLink: "", // Leave empty if no GitHub
    featured: true,
    year: "2024"
  },
  {
    id: "project-2",
    name: "PG Management",
    category: "clients",
    description: "Property management system",
    longDescription: "This comprehensive property management system was built to streamline operations for Paying Guest (PG) accommodations. It replaces manual bookkeeping with a digital dashboard that handles tenant onboarding, rent collection, and maintenance requests. Leveraging Flutter for a cross-platform mobile experience and Firebase for real-time data syncing, it allows property owners to manage multiple buildings from a single interface.",
    image: "/projects/pg-management.jpg",
    tags: ["Flutter", "Firebase"],
    status: "live",
    liveLink: "https://pg-app.vercel.app",
    githubLink: "",
    featured: true,
    year: "2024"
  },
  {
    id: "project-3",
    name: "Food Delivery App",
    category: "websites",
    description: "Food ordering with video reels",
    longDescription: "A novel approach to food delivery that combines social media dynamics with e-commerce. Instead of static menus, users browse video reels of dishes being prepared. This 'TikTok-for-food' interface drives higher engagement and larger order values. The frontend is built with Next.js for snappy video playback, while the backend handles complex order routing and delivery tracking.",
    image: "/projects/food-app.jpg",
    tags: ["Next.js", "Video"],
    status: "development",
    liveLink: "https://food-app.vercel.app",
    githubLink: "https://github.com/you/food-app",
    featured: false,
    year: "2025"
  },
  // 👇 ADD MORE PROJECTS BELOW - JUST COPY & PASTE THIS BLOCK
  // {
  //   id: "project-4",
  //   name: "Project Name",
  //   category: "websites", // websites, clients, tools, or demos
  //   description: "Short description",
  //   longDescription: "Detailed description of the problem, solution, and tech stack.",
  //   image: "/projects/screenshot.jpg",
  //   tags: ["Tech1", "Tech2"],
  //   status: "live", // live, development, or archived
  //   liveLink: "https://your-link.com",
  //   githubLink: "", // Optional
  //   featured: false,
  //   year: "2024"
  // },
];

// ==========================================
// CATEGORY TABS
// ==========================================
export const PROJECT_TABS = [
  { id: "all", name: "All Work", icon: "📁" },
  { id: "websites", name: "Websites", icon: "🌐" },
  { id: "clients", name: "Client Work", icon: "💼" },
  { id: "tools", name: "AI Tools", icon: "🤖" },
  { id: "demos", name: "Demos", icon: "🧪" },
];

// ==========================================
// STATUS COLORS
// ==========================================
export const STATUS_COLORS = {
  live: { label: "Live", color: "bg-green-500", emoji: "🟢" },
  development: { label: "Building", color: "bg-yellow-500", emoji: "🟡" },
  archived: { label: "Archived", color: "bg-red-500", emoji: "🔴" }
};