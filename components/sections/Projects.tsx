"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Sparkles, Grid3x3, List, ChevronRight, Star, TrendingUp } from "lucide-react";
import Image from "next/image";
import { MY_PROJECTS, PROJECT_TABS } from "@/lib/projects";

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2, once: true });

  // Filter and sort projects
  const filteredProjects = activeTab === "all"
    ? MY_PROJECTS
    : MY_PROJECTS.filter(p => p.category === activeTab);

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return parseInt(b.year) - parseInt(a.year);
  });

  const featuredCount = MY_PROJECTS.filter(p => p.featured).length;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "live": return { color: "bg-status-success", label: "Live", emoji: "🟢" };
      case "building": return { color: "bg-brand-main", label: "Building", emoji: "🔨" };
      case "beta": return { color: "bg-status-warning", label: "Beta", emoji: "🚧" };
      default: return { color: "bg-text-muted", label: "Idea", emoji: "💡" };
    }
  };

  return (
    <section
      ref={containerRef}
      className="bg-[#0f172a] border border-white/10 rounded-[2.5rem] py-8 px-6 md:px-10 my-8 relative overflow-hidden shadow-2xl"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-80 h-80 bg-brand-main/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-accent-rose/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-center mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, type: "spring", bounce: 0.5 }}
            className="flex items-center justify-center gap-2 mb-1.5"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={14} className="text-brand-main" />
            </motion.div>
            <p className="text-brand-main font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
              Portfolio
            </p>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-black font-serif text-white mb-2 tracking-tight">
            My Work{" "}
            <motion.span
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block"
            >
              💼
            </motion.span>
          </h2>

          <p className="text-text-secondary text-sm max-w-2xl mx-auto mb-4">
            Real projects, shipped and running. {MY_PROJECTS.length} projects total, {featuredCount} featured.
          </p>

          {/* Quick Stats - COMPACT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-6"
          >
            <div className="flex items-center gap-1.5 bg-bg-surface backdrop-blur-sm px-3 py-1.5 rounded-full border border-text-muted/10 shadow-sm">
              <Star size={12} className="text-brand-main fill-brand-main" />
              <span className="text-[10px] font-bold text-text-primary">{featuredCount} Featured</span>
            </div>
            <div className="flex items-center gap-1.5 bg-bg-surface backdrop-blur-sm px-3 py-1.5 rounded-full border border-text-muted/10 shadow-sm">
              <TrendingUp size={12} className="text-status-success" />
              <span className="text-[10px] font-bold text-text-primary">
                {MY_PROJECTS.filter(p => p.status === "live").length} Live
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-bg-surface backdrop-blur-sm px-3 py-1.5 rounded-full border border-text-muted/10 shadow-sm">
              <span className="text-[10px] font-bold text-text-primary">
                Latest: {MY_PROJECTS[0]?.year}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Controls - COMPACT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between gap-3 mb-6"
        >
          {/* Category Tabs - COMPACT */}
          <div className="flex flex-wrap justify-center md:justify-start gap-1.5">
            {PROJECT_TABS.map((tab) => {
              const count = tab.id === "all"
                ? MY_PROJECTS.length
                : MY_PROJECTS.filter(p => p.category === tab.id).length;

              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative px-3 py-2 rounded-lg text-[10px] font-bold transition-all duration-300 flex items-center gap-1.5 ${isActive
                    ? 'bg-bg-inverse text-text-inverse shadow-md'
                    : 'bg-bg-surface text-text-secondary hover:bg-white border border-text-muted/10 hover:border-text-muted/30'
                    }`}
                >
                  <motion.span
                    animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                    className="text-sm"
                  >
                    {tab.icon}
                  </motion.span>
                  <span>{tab.name}</span>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${isActive ? 'bg-white/20 text-white' : 'bg-bg-subtle text-text-muted'
                      }`}
                  >
                    {count}
                  </motion.span>

                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-bg-inverse rounded-lg -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* View Mode Toggle - COMPACT */}
          <div className="flex items-center gap-1 bg-bg-surface backdrop-blur-sm p-1 rounded-lg border border-text-muted/10 shadow-sm">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-all ${viewMode === "grid"
                ? 'bg-bg-inverse text-text-inverse shadow-sm'
                : 'text-text-muted hover:text-text-primary'
                }`}
              aria-label="Grid view"
            >
              <Grid3x3 size={14} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-all ${viewMode === "list"
                ? 'bg-bg-inverse text-text-inverse shadow-sm'
                : 'text-text-muted hover:text-text-primary'
                }`}
              aria-label="List view"
            >
              <List size={14} />
            </motion.button>
          </div>
        </motion.div>

        {/* Projects Grid - COMPACT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "flex flex-col gap-3"
            }
          >
            {sortedProjects.map((project, index) => {
              const statusInfo = getStatusStyle(project.status);
              const isHovered = hoveredProject === project.id;

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    type: "spring",
                    bounce: 0.3
                  }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  onHoverStart={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                  className={`group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all duration-500 border border-white/10 hover:border-brand-main/50 ${viewMode === "list" ? "flex flex-row" : ""
                    }`}
                >
                  {/* Hover Glow */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 0.1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-brand-main to-accent-rose blur-xl -z-10"
                  />

                  {/* Featured Badge - COMPACT */}
                  {project.featured && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, type: "spring", bounce: 0.6 }}
                      className="absolute top-2 left-2 z-20"
                    >
                      <div className="bg-gradient-to-r from-brand-main to-brand-dark text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1">
                        <Star size={8} className="fill-white" />
                        <span>Featured</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Status Badge - COMPACT */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                    className="absolute top-2 right-2 z-20"
                  >
                    <motion.div
                      animate={project.status === "live" ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`${statusInfo.color} text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1 backdrop-blur-sm`}
                    >
                      <motion.span
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        {statusInfo.emoji}
                      </motion.span>
                      <span>{statusInfo.label}</span>
                    </motion.div>
                  </motion.div>

                  {/* Image - COMPACT */}
                  <div className={`relative ${viewMode === "list" ? "w-40 h-40" : "w-full h-48"
                    } bg-gradient-to-br from-bg-subtle to-gray-100 overflow-hidden`}>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ opacity: isHovered ? 0.5 : 1 }}
                    >
                      <div className="text-center">
                        <motion.div
                          animate={{
                            y: [0, -8, 0],
                            rotate: isHovered ? 360 : 0
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-4xl mb-2"
                        >
                          {project.category === "websites" ? "🌐" :
                            project.category === "clients" ? "💼" :
                              project.category === "tools" ? "🤖" : "🧪"}
                        </motion.div>
                        <p className="text-[9px] text-text-muted font-mono px-4">
                          Add screenshot:<br /><span className="text-brand-main font-bold">{project.image}</span>
                        </p>
                      </div>
                    </motion.div>

                    {/* Gradient Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-bg-inverse/80 via-bg-inverse/30 to-transparent flex items-end justify-center pb-3"
                    >
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                        className="text-white text-[10px] font-bold flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <ChevronRight size={12} />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Content - COMPACT */}
                  <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                    {/* Title & Year */}
                    <div className="flex items-start justify-between mb-1.5">
                      <motion.h3
                        className="font-black font-serif text-base text-white group-hover:text-brand-main transition-colors flex-1"
                        animate={isHovered ? { x: 5 } : { x: 0 }}
                      >
                        {project.name}
                      </motion.h3>
                      <motion.span
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="text-[9px] font-bold text-text-muted bg-bg-subtle px-2 py-0.5 rounded-full ml-2"
                      >
                        {project.year}
                      </motion.span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-text-secondary mb-3 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags - COMPACT */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tags.slice(0, viewMode === "list" ? 5 : 3).map((tag, idx) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 + idx * 0.05 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="text-[9px] font-bold text-text-secondary bg-bg-subtle hover:bg-bg-canvas px-2 py-0.5 rounded-full transition-colors cursor-default border border-text-muted/5"
                        >
                          {tag}
                        </motion.span>
                      ))}
                      {project.tags.length > (viewMode === "list" ? 5 : 3) && (
                        <span className="text-[9px] font-bold text-text-muted bg-bg-subtle px-2 py-0.5 rounded-full">
                          +{project.tags.length - (viewMode === "list" ? 5 : 3)}
                        </span>
                      )}
                    </div>

                    {/* Buttons - COMPACT */}
                    <div className="flex gap-2">
                      {project.liveLink && (
                        <motion.a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 bg-bg-inverse hover:bg-black text-text-inverse text-[10px] font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md hover:shadow-lg"
                        >
                          <span>View Live</span>
                          <motion.div
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ExternalLink size={10} />
                          </motion.div>
                        </motion.a>
                      )}
                      {project.githubLink && (
                        <motion.a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-bg-subtle hover:bg-bg-canvas text-text-primary text-[10px] font-bold py-2 px-3 rounded-lg flex items-center justify-center transition-all shadow-sm hover:shadow-md border border-text-muted/10"
                          aria-label="View on GitHub"
                        >
                          <Github size={12} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {sortedProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-3"
            >
              🔍
            </motion.div>
            <h3 className="text-lg font-black font-serif text-text-primary mb-1.5">No projects here yet</h3>
            <p className="text-text-muted text-xs">Check back soon or explore other categories!</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
