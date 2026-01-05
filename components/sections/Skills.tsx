"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SKILLS_DATA } from "@/lib/constants";
import { User, Sparkles, ArrowRight, Code2, Zap } from "lucide-react";

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

  const radius = 140; // ✅ Tighter orbit

  // Enhanced details
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
      // ✅ COMPACT: Reduced padding
      className="bg-gradient-to-br from-bg-subtle via-bg-surface to-bg-subtle border border-text-muted/10 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 my-8 relative overflow-hidden shadow-xl"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <motion.div 
           animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute -top-[20%] -left-[10%] w-[400px] h-[400px] bg-brand-main/5 rounded-full blur-[100px]" 
         />
         <motion.div 
           animate={{ scale: [1, 1.3, 1], rotate: [0, -45, 0] }}
           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           className="absolute -bottom-[20%] -right-[10%] w-[400px] h-[400px] bg-accent-rose/5 rounded-full blur-[100px]" 
         />
      </div>

      {/* Grid Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }} />

      <div className="relative z-10">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={14} className="text-brand-main" />
            </motion.div>
            <p className="text-brand-main font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
              My Arsenal
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-black font-serif text-text-primary mb-2 tracking-tight">
            How I Build Fast 🛠️
          </h2>
          <p className="text-text-secondary text-sm font-medium max-w-lg mx-auto">
            Curated tools and strategies for speed and scalability.
          </p>
        </motion.div>

        {/* Side-by-Side Layout - COMPACT */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          
          {/* LEFT: Circular Orbit - COMPACT */}
          <div className="relative h-[360px] flex items-center justify-center">
            
            {/* Orbit Track */}
            <div className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-text-muted/20 animate-spin-slow pointer-events-none" 
                 style={{ animationDuration: '60s' }} />
            
            {/* Center Core - SMALLER */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", bounce: 0.4 }}
              className="absolute z-20"
            >
              <div className="relative">
                <motion.div 
                  className="absolute inset-0 bg-brand-main rounded-full blur-xl opacity-20"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-brand-main via-brand-dark to-brand-main border-4 border-bg-surface shadow-2xl flex flex-col items-center justify-center z-20">
                  <User size={24} className="text-white mb-1" />
                  <p className="text-white font-black text-[9px] uppercase tracking-wide">
                    Rahul
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Orbiting Elements - SMALLER */}
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
                    className={`relative w-16 h-16 rounded-xl flex flex-col items-center justify-center transition-all duration-300 shadow-sm border group ${
                      isActive
                        ? 'bg-brand-main text-white border-brand-main shadow-lg shadow-brand-main/30 scale-110 z-40'
                        : 'bg-bg-surface text-text-secondary border-text-muted/10 hover:border-brand-main/30 hover:shadow-md'
                    }`}
                  >
                    <span className={`text-xl mb-0.5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                      {category.icon}
                    </span>
                    <span className={`text-[8px] font-bold uppercase tracking-wide ${isActive ? 'text-white' : 'text-text-muted group-hover:text-text-primary'}`}>
                      {category.name}
                    </span>

                    {isActive && (
                      <motion.div 
                        layoutId="activeDot"
                        className="absolute -bottom-1.5 w-1.5 h-1.5 bg-brand-main rounded-full"
                      />
                    )}
                  </motion.button>
                </motion.div>
              );
            })}

            {/* Floating Stats - COMPACT */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 right-8 bg-bg-surface/80 backdrop-blur-sm border border-text-muted/10 px-2.5 py-1 rounded-full text-[9px] font-bold text-text-secondary shadow-sm"
            >
              🚀 5+ Categories
            </motion.div>
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-8 left-8 bg-bg-surface/80 backdrop-blur-sm border border-text-muted/10 px-2.5 py-1 rounded-full text-[9px] font-bold text-text-secondary shadow-sm"
            >
              ⚡ Fast Workflow
            </motion.div>

          </div>

          {/* RIGHT: Dashboard Panel - COMPACT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-[360px]"
          >
            <div className="h-full bg-bg-surface border border-text-muted/10 rounded-2xl shadow-xl overflow-hidden flex flex-col relative">
              {/* Top Bar */}
              <div className="h-1 w-full bg-gradient-to-r from-brand-main via-brand-dark to-brand-main" />

              <AnimatePresence mode="wait">
                {activeCategory && activeDetails && activeData ? (
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 p-5 flex flex-col overflow-hidden"
                  >
                    {/* Panel Header - COMPACT */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-bg-subtle flex items-center justify-center text-2xl shadow-inner border border-text-muted/5">
                          {activeData.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-black font-serif text-text-primary leading-tight">{activeData.name}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[9px] font-bold text-white bg-brand-main px-2 py-0.5 rounded-full">
                              {activeDetails.level}
                            </span>
                            <span className="text-[9px] font-medium text-text-muted">
                              {activeDetails.focus}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description - COMPACT */}
                    <div className="bg-bg-subtle/50 rounded-lg p-3 mb-4 border border-text-muted/5">
                      <p className="text-xs text-text-secondary leading-relaxed font-medium">
                        "{activeDetails.description}"
                      </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                      {/* Skills Section - COMPACT */}
                      <div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <Code2 size={12} className="text-brand-main" />
                          <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Core Skills</h4>
                        </div>
                        <div className="grid grid-cols-1 gap-1.5">
                          {activeData.skills.map((skill, idx) => (
                            <motion.div
                              key={skill.name}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-center justify-between bg-bg-canvas rounded-lg px-2.5 py-1.5 border border-text-muted/10"
                            >
                              <span className="text-xs font-bold text-text-primary">{skill.name}</span>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-1 h-1 rounded-full ${
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

                      {/* Tools Section - COMPACT */}
                      <div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <Zap size={12} className="text-brand-main" />
                          <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Power Tools</h4>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {activeDetails.tools.map((tool, idx) => (
                            <motion.span
                              key={tool}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 + idx * 0.05 }}
                              className="px-2.5 py-1 bg-bg-inverse text-text-inverse text-[10px] font-bold rounded-lg shadow-sm"
                            >
                              {tool}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  // Empty State - COMPACT
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-bg-subtle/30"
                  >
                    <div className="w-16 h-16 bg-bg-surface rounded-full flex items-center justify-center mb-4 shadow-sm border border-text-muted/10">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Sparkles size={28} className="text-brand-main/60" />
                      </motion.div>
                    </div>
                    
                    <h3 className="text-base font-black font-serif text-text-primary mb-2">
                      Explore My Skill Stack
                    </h3>
                    <p className="text-xs text-text-secondary max-w-xs mb-6">
                      Click any category to see proficiency, tools, and strategy.
                    </p>

                    <div className="flex items-center gap-2 text-[10px] font-bold text-brand-main bg-brand-main/5 px-3 py-1.5 rounded-full">
                      <ArrowRight size={12} className="animate-pulse" />
                      Select a category
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
