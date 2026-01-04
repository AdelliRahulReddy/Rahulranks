import { BentoBox } from "./bentoTypes";
import { Workflow, Database, Server, Globe, Github, Activity, Smartphone, Layout } from "lucide-react";

export const WORK_BOXES: BentoBox[] = [
  // BOX 1: Featured Project - Analytics
  {
    id: "work-analytics",
    type: "analytics",
    gridArea: "col-span-12 md:col-span-4 md:row-span-3",
    title: "Analytics Dashboard",
    subtitle: "React • Recharts • TypeScript",
    bgColor: "bg-[#1a1a1a]",
    textColor: "text-white",
    customProps: {
      project: "Real-time Analytics",
      description: "Enterprise-grade dashboard with live data visualization",
      chartData: [40, 70, 45, 90, 60, 80, 50],
      features: [
        "Real-time updates",
        "Interactive charts",
        "Export functionality",
        "Mobile responsive"
      ],
      metrics: {
        users: "10K+ daily",
        performance: "< 1s load",
        uptime: "99.9%"
      }
    }
  },
  
  // BOX 2: Automation Workflow
  {
    id: "work-automation",
    type: "automation",
    gridArea: "col-span-12 md:col-span-3 md:row-span-2",
    title: "Workflow Automation",
    subtitle: "Save 10+ hours/week",
    bgColor: "bg-gradient-to-br from-rose-400 to-pink-500",
    icon: Workflow,
    customProps: {
      workflows: [
        {
          trigger: "New Lead Captured",
          action: "Send Welcome Email",
          automation: "Zapier Integration"
        },
        {
          trigger: "Payment Received",
          action: "Generate Invoice",
          automation: "Auto-process"
        },
        {
          trigger: "Support Ticket",
          action: "Assign & Notify",
          automation: "Smart routing"
        }
      ],
      savings: "10+ hours/week automated"
    }
  },
  
  // BOX 3: Code Access Button
  {
    id: "work-button",
    type: "button",
    gridArea: "col-span-12 md:col-span-3 md:row-span-1",
    bgColor: "bg-gradient-to-r from-blue-500 to-indigo-600",
    customProps: {
      buttons: [
        { text: "View Code", icon: "💻" },
        { text: "Live Demo", icon: "🚀" },
        { text: "Case Study", icon: "📊" }
      ],
      link: "https://github.com/rahul"
    }
  },
  
  // BOX 4: Live Demo Status
  {
    id: "work-demo",
    type: "status",
    gridArea: "col-span-12 md:col-span-2 md:row-span-1",
    title: "Live Demo",
    subtitle: "Try it now",
    bgColor: "bg-gradient-to-br from-[#84cc16] to-[#65a30d]",
    textColor: "text-white",
    icon: Activity,
    customProps: {
      status: "live",
      visitors: "500+ monthly",
      demo: "Available 24/7"
    }
  },
  
  // BOX 5: Responsive Design
  {
    id: "work-responsive",
    type: "responsive",
    gridArea: "col-span-12 md:col-span-3 md:row-span-2",
    title: "Fully Responsive",
    bgColor: "bg-white",
    customProps: {
      devices: [
        { name: "Mobile", icon: "📱", support: "100%" },
        { name: "Tablet", icon: "📱", support: "100%" },
        { name: "Desktop", icon: "💻", support: "100%" },
        { name: "4K", icon: "🖥️", support: "100%" }
      ],
      description: "Pixel-perfect across all devices"
    }
  },
  
  // BOX 6: Uptime & Reliability
  {
    id: "work-uptime",
    type: "lighthouse",
    gridArea: "col-span-12 md:col-span-2 md:row-span-2",
    title: "99.9%",
    subtitle: "Uptime SLA",
    bgColor: "bg-[#331800]",
    textColor: "text-[#fffbeb]",
    customProps: {
      uptime: "99.9%",
      monitoring: "24/7 automated",
      incidents: "0 in last 90 days",
      response: "< 5 min alert time"
    }
  },
  
  // BOX 7: Tech Stack Used
  {
    id: "work-stack",
    type: "stackIcon",
    gridArea: "col-span-12 md:col-span-3 md:row-span-1",
    title: "Tech Stack",
    bgColor: "bg-gradient-to-r from-orange-500 to-red-500",
    customProps: {
      icons: ["💾", "⚙️", "🌐", "🔐"],
      labels: ["Database", "Backend", "Frontend", "Security"],
      stack: [
        { name: "PostgreSQL", category: "Database" },
        { name: "Node.js", category: "Backend" },
        { name: "React", category: "Frontend" },
        { name: "Auth0", category: "Security" }
      ]
    }
  },
  
  // BOX 8: Recent Projects List
  {
    id: "work-projects",
    type: "projects",
    gridArea: "col-span-12 md:col-span-5 md:row-span-2",
    title: "Recent Deliveries",
    bgColor: "bg-white",
    data: [
      {
        name: "E-Commerce MVP",
        description: "Full-stack shopping platform",
        tech: ["Next.js", "Stripe", "Prisma"],
        status: "Live",
        timeline: "4 weeks"
      },
      {
        name: "SaaS Dashboard",
        description: "Analytics & reporting tool",
        tech: ["React", "Firebase", "Recharts"],
        status: "Live",
        timeline: "3 weeks"
      },
      {
        name: "Booking System",
        description: "Appointment scheduling app",
        tech: ["Next.js", "Calendly API"],
        status: "Live",
        timeline: "2 weeks"
      }
    ]
  },
  
  // BOX 9: Fast Delivery Time
  {
    id: "work-delivery",
    type: "deliveryTime",
    gridArea: "col-span-12 md:col-span-3 md:row-span-2",
    title: "< 2 Weeks",
    subtitle: "Average Delivery",
    bgColor: "bg-gradient-to-br from-[#fbbf24] to-[#f59e0b]",
    textColor: "text-slate-900",
    customProps: {
      average: "< 2 weeks",
      fastest: "3 days (landing page)",
      methodology: "Agile sprints",
      updates: "Daily progress reports",
      guarantee: "On-time or refund"
    }
  },
  
  // BOX 10: CTA - Start Project
  {
    id: "work-cta",
    type: "cta",
    gridArea: "col-span-12 md:col-span-4 md:row-span-2",
    title: "Ready to Start?",
    subtitle: "Let's build your next project",
    bgColor: "bg-gradient-to-br from-[#331800] to-black",
    textColor: "text-white",
    customProps: {
      primaryCTA: "Start Project",
      secondaryCTA: "Schedule Call",
      benefits: [
        "✅ Free consultation",
        "✅ Custom quote in 24h",
        "✅ Flexible payment terms"
      ]
    }
  }
];
