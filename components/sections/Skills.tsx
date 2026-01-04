"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SKILLS_DATA } from "@/lib/constants";
import { User, Sparkles, ArrowRight, Zap, Code2, Cpu, BarChart3, Database } from "lucide-react";

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: true });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Calculate circular positions
  const getCircularPosition = (index: number, total: number, radius: number) => {
    const angle = (index * 360) / total - 90;
    const radian = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius,
    };
  };

  const radius = 160; // Slightly tighter orbit for better mobile feel

  // Enhanced details (Rich Content)
  const categoryDetails = {
    strategy: {
      description: "Strategy is the blueprint. I map user flows, define MVP scope, and select the tech stack that scales.",
      tools: ["Miro", "Notion", "Figma"],
      focus: "Product-Market Fit",
      level: "Expert"
    },
    marketing: {
      description: "SEO isn't just keywords; it's intent. I build structures that search engines love and users trust.",
      tools: ["Google Analytics", "Ahrefs", "Search Console"],
      focus: "Organic Growth",
      level: "Advanced"
    },
    ai: {
      description: "AI accelerates execution. I use LLMs to scaffold code, generate content, and debug complex logic.",
      tools: ["ChatGPT-4o", "Cursor", "Claude 3.5"],
      focus: "Workflow Velocity",
      level: "Specialist"
    },
    platforms: {
      description: "Choosing the right vehicle. Next.js for power, WordPress for content, Flutter for mobile dominance.",
      tools: ["WordPress", "Webflow", "Framer"],
      focus: "Scalability",
      level: "Expert"
    },
    automation: {
      description: "If I do it twice, I automate it. Connecting APIs to remove manual friction from operations.",
      tools: ["Zapier", "Make.com", "n8n"],
      focus: "Efficiency",
      level: "Advanced"
    }
  };

  const activeDetails = activeCategory ? categoryDetails[activeCategory as keyof typeof categoryDetails] : null;
  const activeData = activeCategory ? SKILLS_DATA.categories.find(c => c.id === activeCategory) : null;

  return (
    <div
      ref={containerRef}
      // REFACTORED: Warm Glass Background with subtle depth
      className="bg-gradient-to-br from-bg-subtle via-bg-surface to-bg-subtle border border-text-muted/10 rounded-[32px] md:rounded-[48px] p-8 md:p-12 my-8 relative overflow-hidden shadow-2xl"
    >
      {/* 1. LAYERED BACKGROUND */}
      
      {/* Ambient Blobs (Brand + Accent) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <motion.div 
           animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-brand-main/5 rounded-full blur-[100px]" 
         />
         <motion.div 
           animate={{ scale: [1, 1.3, 1], rotate: [0, -45, 0] }}
           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] bg-accent-rose/5 rounded-full blur-[100px]" 
         />
      </div>

      {/* Grid Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }} />

      <div className="relative z-10">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={16} className="text-brand-main" />
            </motion.div>
            <p className="text-brand-main font-mono text-[10px] uppercase tracking-[0.2em] font-black">
              My Arsenal
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-3 tracking-tight">
            How I Build Fast 🛠️
          </h2>
          <p className="text-text-secondary text-sm font-medium max-w-lg mx-auto">
            A curated stack of tools, frameworks, and strategies designed for speed and scalability.
          </p>
        </motion.div>

        {/* Side-by-Side Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* LEFT: Rich Circular Orbit */}
          <div className="relative h-[450px] flex items-center justify-center">
            
            {/* Orbit Track (Visible Ring) */}
            <div className="absolute w-[340px] h-[340px] rounded-full border border-dashed border-text-muted/20 animate-spin-slow pointer-events-none" 
                 style={{ animationDuration: '60s' }} />
            
            {/* Center Core */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", bounce: 0.4 }}
              className="absolute z-20"
            >
              <div className="relative">
                {/* Pulsing Core */}
                <motion.div 
                  className="absolute inset-0 bg-brand-main rounded-full blur-xl opacity-20"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-brand-main via-brand-dark to-brand-main border-4 border-bg-surface shadow-2xl flex flex-col items-center justify-center z-20">
                  <User size={28} className="text-white mb-1" />
                  <p className="text-white font-black text-[10px] uppercase tracking-wide">
                    Rahul
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Orbiting Elements */}
            {SKILLS_DATA.categories.map((category, index) => {
              const position = getCircularPosition(index, SKILLS_DATA.categories.length, radius);
              const isActive = activeCategory === category.id;
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
                  animate={
                    isInView
                      ? { x: position.x, y: position.y, opacity: 1, scale: 1 }
                      : {}
                  }
                  transition={{
                    duration: 0.7,
                    delay: 0.3 + index * 0.1,
                    type: "spring",
                    bounce: 0.5,
                  }}
                  className="absolute z-30"
                >
                  <motion.button
                    onClick={() => setActiveCategory(category.id)}
                    whileHover={{ scale: 1.15, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-20 h-20 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 shadow-sm border group ${
                      isActive
                        ? 'bg-brand-main text-white border-brand-main shadow-lg shadow-brand-main/30 scale-110 z-40'
                        : 'bg-bg-surface text-text-secondary border-text-muted/10 hover:border-brand-main/30 hover:shadow-md'
                    }`}
                  >
                    <span className={`text-2xl mb-1 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                      {category.icon}
                    </span>
                    <span className={`text-[9px] font-bold uppercase tracking-wide ${isActive ? 'text-white' : 'text-text-muted group-hover:text-text-primary'}`}>
                      {category.name}
                    </span>

                    {/* Active Indicator Dot */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeDot"
                        className="absolute -bottom-2 w-1.5 h-1.5 bg-brand-main rounded-full"
                      />
                    )}
                  </motion.button>
                </motion.div>
              );
            })}

            {/* Floating Micro-Stats (Decoration) */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 bg-bg-surface/80 backdrop-blur-sm border border-text-muted/10 px-3 py-1.5 rounded-full text-[10px] font-bold text-text-secondary shadow-sm"
            >
              🚀 5+ Categories
            </motion.div>
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 left-10 bg-bg-surface/80 backdrop-blur-sm border border-text-muted/10 px-3 py-1.5 rounded-full text-[10px] font-bold text-text-secondary shadow-sm"
            >
              ⚡ Fast Workflow
            </motion.div>

          </div>

          {/* RIGHT: Tech Dashboard Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-[450px]"
          >
            <div className="h-full bg-bg-surface border border-text-muted/10 rounded-3xl shadow-xl overflow-hidden flex flex-col relative">
              {/* Top Bar Decoration */}
              <div className="h-1.5 w-full bg-gradient-to-r from-brand-main via-brand-dark to-brand-main" />

              <AnimatePresence mode="wait">
                {activeCategory && activeDetails && activeData ? (
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 p-6 flex flex-col"
                  >
                    {/* Panel Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-bg-subtle flex items-center justify-center text-3xl shadow-inner border border-text-muted/5">
                          {activeData.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-text-primary leading-tight">{activeData.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold text-white bg-brand-main px-2 py-0.5 rounded-full">
                              {activeDetails.level}
                            </span>
                            <span className="text-[10px] font-medium text-text-muted">
                              Focus: {activeDetails.focus}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description Box */}
                    <div className="bg-bg-subtle/50 rounded-xl p-4 mb-6 border border-text-muted/5">
                      <p className="text-sm text-text-secondary leading-relaxed font-medium">
                        "{activeDetails.description}"
                      </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
                      {/* Skills Section */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Code2 size={14} className="text-brand-main" />
                          <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">Core Skills</h4>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {activeData.skills.map((skill, idx) => (
                            <motion.div
                              key={skill.name}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-center justify-between bg-bg-canvas rounded-lg px-3 py-2 border border-text-muted/10"
                            >
                              <span className="text-sm font-bold text-text-primary">{skill.name}</span>
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      i < (skill.level === 'expert' ? 5 : skill.level === 'advanced' ? 4 : 3)
                                        ? 'bg-brand-main'
                                        : 'bg-text-muted/20'
                                    }`}
                                  />
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Tools Section */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Zap size={14} className="text-brand-main" />
                          <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">Power Tools</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {activeDetails.tools.map((tool, idx) => (
                            <motion.span
                              key={tool}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 + idx * 0.05 }}
                              className="px-3 py-1.5 bg-bg-inverse text-text-inverse text-xs font-bold rounded-lg border border-transparent shadow-sm flex items-center gap-1.5"
                            >
                              {tool}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  // EMPTY STATE (Default)
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-bg-subtle/30"
                  >
                    <div className="w-20 h-20 bg-bg-surface rounded-full flex items-center justify-center mb-6 shadow-sm border border-text-muted/10">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Sparkles size={32} className="text-brand-main/60" />
                      </motion.div>
                    </div>
                    
                    <h3 className="text-lg font-black text-text-primary mb-2">
                      Explore My Skill Stack
                    </h3>
                    <p className="text-sm text-text-secondary max-w-xs mb-8">
                      Click on any category on the left to see my proficiency, tools, and strategic approach.
                    </p>

                    <div className="flex items-center gap-2 text-xs font-bold text-brand-main bg-brand-main/5 px-4 py-2 rounded-full">
                      <ArrowRight size={14} className="animate-pulse" />
                      Select a category to begin
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
