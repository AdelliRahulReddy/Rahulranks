// Path: lib/projects.ts

// ==========================================
// YOUR PROJECTS DATA
// Start small, build up!
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
  },
  // Ready for your first client project!
  // {
  //   id: "project-2",
  //   name: "Your First Project",
  //   category: "clients",
  //   description: "This could be YOUR project!",
  //   longDescription: "I'm looking for my first client projects to build my portfolio. If you have a website idea, landing page, or basic web project, I'd love to work with you for FREE to gain experience. Let's build something together!",
  //   image: "/projects/coming-soon.jpg",
  //   tags: ["Opportunity", "Free Service", "Portfolio"],
  //   status: "development",
  //   liveLink: "",
  //   githubLink: "",
  //   featured: true,
  //   year: "2025"
  // },
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
  live: { label: "Live", color: "bg-green-500", emoji: "🟢" },
  development: { label: "Building", color: "bg-yellow-500", emoji: "🟡" },
  archived: { label: "Archived", color: "bg-gray-500", emoji: "⚪" }
};