import { BentoBox } from "./bentoTypes";
import { Activity, Rocket, Github, Code, Zap, Target, TrendingUp, Award } from "lucide-react";

export const PROFILE_BOXES: BentoBox[] = [
  // BOX 1: Hero Introduction
  {
    id: "profile-hero",
    type: "hero",
    gridArea: "col-span-12 md:col-span-4 md:row-span-3",
    title: "Rahul Reddy",
    subtitle: "Full-Stack Developer & SaaS Builder",
    description: "Turning ambitious ideas into production-ready MVPs. Specialized in Next.js, React, and modern web technologies.",
    bgColor: "bg-gradient-to-br from-[#fbbf24] to-[#f59e0b]",
    textColor: "text-slate-900",
    customProps: {
      name: "RAHUL REDDY",
      location: "📍 Haryana, India",
      availability: "🟢 Available for Projects",
      tagline: "Building the future, one commit at a time"
    }
  },
  
  // BOX 2: Tech Stack Showcase (Rotating)
  {
    id: "profile-stack",
    type: "stackIcon",
    gridArea: "col-span-12 md:col-span-3 md:row-span-2",
    bgColor: "bg-gradient-to-br from-[#fbbf24] via-[#f59e0b] to-[#fbbf24]",
    customProps: {
      icons: ["⚛️", "▲", "🔥", "⚡"],
      labels: ["React", "Next.js", "Firebase", "Tailwind"],
      descriptions: [
        "React Ecosystem Expert",
        "Next.js 14 App Router",
        "Firebase & Real-time",
        "Tailwind CSS v4"
      ]
    }
  },
  
  // BOX 3: Action Buttons (Rotating CTAs)
  {
    id: "profile-button",
    type: "button",
    gridArea: "col-span-12 md:col-span-3 md:row-span-1",
    bgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
    customProps: {
      buttons: [
        { text: "View Projects", icon: "💼" },
        { text: "Get in Touch", icon: "📧" },
        { text: "Download CV", icon: "📄" },
        { text: "See GitHub", icon: "💻" }
      ]
    }
  },
  
  // BOX 4: Availability Status
  {
    id: "profile-status",
    type: "status",
    gridArea: "col-span-12 md:col-span-2 md:row-span-1",
    title: "Available",
    subtitle: "for Projects",
    bgColor: "bg-[#1a1a1a]",
    textColor: "text-white",
    icon: Activity,
    customProps: {
      status: "open",
      responseTime: "< 2 hours",
      nextAvailable: "Immediate"
    }
  },
  
  // BOX 5: Current Project
  {
    id: "profile-rocket",
    type: "rocket",
    gridArea: "col-span-12 md:col-span-3 md:row-span-2",
    title: "Currently Building",
    subtitle: "ARRZONE Platform",
    bgColor: "bg-gradient-to-br from-rose-400 to-pink-500",
    icon: Rocket,
    customProps: {
      project: "ARRZONE",
      description: "Deals & Coupons Platform",
      progress: 75,
      tech: ["WordPress", "PHP", "Next.js"],
      eta: "Launch: Jan 2026"
    }
  },
  
  // BOX 6: Performance Metrics
  {
    id: "profile-lighthouse",
    type: "lighthouse",
    gridArea: "col-span-12 md:col-span-2 md:row-span-2",
    title: "100",
    subtitle: "Lighthouse Score",
    bgColor: "bg-white",
    textColor: "text-slate-900",
    customProps: {
      metrics: [
        { label: "Performance", value: 100 },
        { label: "Accessibility", value: 100 },
        { label: "Best Practices", value: 100 },
        { label: "SEO", value: 100 }
      ],
      badge: "🏆 Perfect Score"
    }
  },
  
  // BOX 7: Design Pattern
  {
    id: "profile-grid",
    type: "grid",
    gridArea: "col-span-12 md:col-span-3 md:row-span-1",
    title: "Design Systems",
    bgColor: "bg-gradient-to-br from-orange-500 to-red-500",
    customProps: {
      pattern: "bento",
      description: "Component-driven architecture"
    }
  },
  
  // BOX 8: Focus Areas / Expertise
  {
    id: "profile-focus",
    type: "focus",
    gridArea: "col-span-12 md:col-span-5 md:row-span-2",
    title: "Core Expertise",
    bgColor: "bg-[#331800]",
    data: [
      { 
        name: "Frontend", 
        color: "#3b82f6",
        skills: ["React", "Next.js", "Tailwind"],
        level: "Expert"
      },
      { 
        name: "Backend", 
        color: "#10b981",
        skills: ["Node.js", "Firebase", "APIs"],
        level: "Advanced"
      },
      { 
        name: "Mobile", 
        color: "#f59e0b",
        skills: ["Flutter", "React Native"],
        level: "Proficient"
      }
    ]
  },
  
  // BOX 9: Stats Carousel (Rotating Numbers)
  {
    id: "profile-stats",
    type: "stats",
    gridArea: "col-span-12 md:col-span-3 md:row-span-2",
    bgColor: "bg-[#331800]",
    textColor: "text-[#fffbeb]",
    data: [
      { 
        value: "50+", 
        label: "Projects Delivered",
        subtext: "Across multiple industries"
      },
      { 
        value: "5+", 
        label: "Years Experience",
        subtext: "Full-stack development"
      },
      { 
        value: "100%", 
        label: "Quality Code",
        subtext: "Type-safe & tested"
      },
      { 
        value: "24/7", 
        label: "Support",
        subtext: "Client communication"
      }
    ]
  },
  
  // BOX 10: Development Process
  {
    id: "profile-process",
    type: "process",
    gridArea: "col-span-12 md:col-span-4 md:row-span-2",
    title: "My Process",
    bgColor: "bg-gradient-to-br from-[#84cc16] to-[#65a30d]",
    data: [
      { 
        step: "Understand", 
        description: "Deep dive into requirements",
        icon: "🎯"
      },
      { 
        step: "Design", 
        description: "Wireframes & prototypes",
        icon: "🎨"
      },
      { 
        step: "Build", 
        description: "Clean, scalable code",
        icon: "⚡"
      },
      { 
        step: "Launch", 
        description: "Deploy & monitor",
        icon: "🚀"
      }
    ]
  }
];
