export const BIO = {
  NAME: "Rahul Reddy",
  TAGLINE: "Learning & Building",
  DESC: "Student developer building real-world projects while learning modern web development.",
  STACK_ICONS: ["⚛️", "🚀", "🎓", "💻"],
  BUTTONS: ["My Journey", "Learning Path", "Let's Connect", "Practice Projects"],
  FOCUS_AREAS: [
    { name: "Learning", role: "Student", color: "var(--accent)" },
    { name: "Building", role: "Practice", color: "var(--text-primary)" },
    { name: "Growing", role: "Journey", color: "var(--accent)" }
  ],
  STATS: [
    { value: "Learning", label: "Daily" },
    { value: "Building", label: "Projects" },
    { value: "Open", label: "To Learn" },
    { value: "Free", label: "Start Price" }
  ]
};

// Stats for Solutions Section
export const SOLUTIONS_STATS = [
  {
    value: "Just Started",
    label: "Fresh Beginning",
    color: "var(--accent)",
    icon: "🌱"
  },
  {
    value: "100%",
    label: "Commitment",
    color: "var(--text-primary)",
    icon: "💪"
  },
  {
    value: "Free",
    label: "Initial Projects",
    color: "var(--accent)",
    icon: "🎁"
  },
  {
    value: "Solo",
    label: "Developer",
    color: "var(--text-primary)",
    icon: "👨‍💻"
  }
];

// Tech Stack for Solutions Section
export const TECH_STACK = [
  { name: "React", icon: "⚛️", color: "var(--accent)" },
  { name: "Next.js", icon: "▲", color: "var(--text-primary)" },
  { name: "TypeScript", icon: "TS", color: "var(--accent)" },
  { name: "Tailwind", icon: "🎨", color: "var(--text-primary)" },
  { name: "Node.js", icon: "🟢", color: "var(--accent)" },
  { name: "Firebase", icon: "🔥", color: "var(--text-primary)" },
];

// Skills Section Data
export const SKILLS_DATA = {
  centerText: {
    name: "Rahul Reddy",
    tagline: "Learning Dev",
    emoji: "🎓"
  },
  categories: [
    {
      id: "web",
      name: "Web Development",
      icon: "🌐",
      color: "var(--accent)",
      skills: [
        { name: "HTML/CSS", level: "comfortable" },
        { name: "JavaScript", level: "comfortable" },
        { name: "React Basics", level: "comfortable" },
        { name: "Responsive Design", level: "comfortable" }
      ]
    },
    {
      id: "tools",
      name: "Tools & Platforms",
      icon: "🛠️",
      color: "var(--text-primary)",
      skills: [
        { name: "Git/GitHub", level: "comfortable" },
        { name: "VS Code", level: "comfortable" },
        { name: "Figma", level: "comfortable" },
        { name: "Chrome DevTools", level: "comfortable" }
      ]
    },
    {
      id: "learning",
      name: "Currently Learning",
      icon: "📚",
      color: "var(--accent)",
      skills: [
        { name: "Next.js", level: "comfortable" },
        { name: "TypeScript", level: "comfortable" },
        { name: "Tailwind CSS", level: "comfortable" },
        { name: "Backend Basics", level: "comfortable" }
      ]
    },
    {
      id: "soft",
      name: "Soft Skills",
      icon: "💡",
      color: "var(--text-primary)",
      skills: [
        { name: "Problem Solving", level: "comfortable" },
        { name: "Quick Learning", level: "comfortable" },
        { name: "Communication", level: "comfortable" },
        { name: "Dedication", level: "comfortable" }
      ]
    },
    {
      id: "ai",
      name: "AI Tools",
      icon: "🤖",
      color: "var(--accent)",
      skills: [
        { name: "ChatGPT", level: "comfortable" },
        { name: "GitHub Copilot", level: "comfortable" },
        { name: "AI Prompting", level: "comfortable" },
        { name: "Learning Assist", level: "comfortable" }
      ]
    }
  ]
};

export const SKILL_LEVELS = {
  expert: { label: "Expert", stars: 5, color: "var(--accent)" },
  advanced: { label: "Advanced", stars: 4, color: "var(--accent)" },
  comfortable: { label: "Learning", stars: 3, color: "var(--text-muted)" }
};
