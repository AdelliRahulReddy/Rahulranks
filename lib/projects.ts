// Path: lib/projects.ts

// ==========================================
// YOUR PROJECTS DATA
// LOCKED 7-COLOR SYSTEM
// ==========================================

export const MY_PROJECTS = [
  {
    id: "project-1",
    name: "Portfolio Website",
    category: "websites",
    description: "My personal portfolio (this site!)",
    longDescription: "This is my first major project - a portfolio website built with Next.js and React. I'm learning as I build, implementing modern design principles and best practices. This project itself is a learning journey in web development, UI/UX design, and deployment.",
    image: "/projects/portfolio.jpg",
    tags: ["Next.js", "React", "Tailwind", "TypeScript"],
    status: "live",
    liveLink: "https://rahulranks.com",
    githubLink: "",
    featured: true,
    year: "2025"
  }
];

// ==========================================
// CATEGORY TABS
// ==========================================
export const PROJECT_TABS = [
  { id: "all", name: "All Work", icon: "📁" },
  { id: "websites", name: "Websites", icon: "🌐" },
  { id: "learning", name: "Learning", icon: "🎓" },
  { id: "practice", name: "Practice", icon: "💻" },
];

// ==========================================
// STATUS COLORS
// ==========================================
export const STATUS_COLORS = {
  live: { label: "Live", color: "bg-accent text-bg-surface", emoji: "🟢" },
  development: { label: "Building", color: "bg-bg-surface-alt text-text-primary", emoji: "🟡" },
  archived: { label: "Archived", color: "bg-text-muted text-bg-surface", emoji: "⚪" }
};