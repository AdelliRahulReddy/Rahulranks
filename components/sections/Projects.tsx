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

  // Count featured projects
  const featuredCount = MY_PROJECTS.filter(p => p.featured).length;

  // REFACTORED: Theme-aligned status mapping
  const getStatusStyle = (status: string) => {
    switch(status) {
      case "live": return { color: "bg-status-success", label: "Live", emoji: "🟢" };
      case "building": return { color: "bg-brand-main", label: "Building", emoji: "🔨" };
      case "beta": return { color: "bg-status-warning", label: "Beta", emoji: "🚧" };
      default: return { color: "bg-text-muted", label: "Idea", emoji: "💡" };
    }
  };

  return (
    <section
      ref={containerRef}
      // REFACTORED: Warm Glass Background + Compact Padding
      className="bg-gradient-to-br from-bg-subtle via-bg-surface to-bg-subtle border border-text-muted/10 rounded-[32px] md:rounded-[48px] py-10 px-6 md:px-12 my-8 relative overflow-hidden shadow-2xl"
    >
      {/* Animated Background Gradients - Brand Aligned */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          // REFACTORED: Brand Main Glow
          className="absolute -top-40 -right-40 w-96 h-96 bg-brand-main/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          // REFACTORED: Accent Rose Glow
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-rose/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10">
        {/* Header with Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, type: "spring", bounce: 0.5 }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={16} className="text-brand-main" />
            </motion.div>
            <p className="text-brand-main font-mono text-[10px] uppercase tracking-[0.2em] font-black">
              Portfolio
            </p>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-3 tracking-tight">
            My Work{" "}
            <motion.span
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block"
            >
              💼
            </motion.span>
          </h2>

          <p className="text-text-secondary text-base max-w-2xl mx-auto mb-6">
            Real projects, shipped and running. {MY_PROJECTS.length} projects total, {featuredCount} featured.
          </p>

          {/* Quick Stats - White Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-8"
          >
            <div className="flex items-center gap-2 bg-bg-surface backdrop-blur-sm px-4 py-2 rounded-full border border-text-muted/10 shadow-sm">
              <Star size={14} className="text-brand-main fill-brand-main" />
              <span className="text-xs font-bold text-text-primary">{featuredCount} Featured</span>
            </div>
            <div className="flex items-center gap-2 bg-bg-surface backdrop-blur-sm px-4 py-2 rounded-full border border-text-muted/10 shadow-sm">
              <TrendingUp size={14} className="text-status-success" />
              <span className="text-xs font-bold text-text-primary">
                {MY_PROJECTS.filter(p => p.status === "live").length} Live
              </span>
            </div>
            <div className="flex items-center gap-2 bg-bg-surface backdrop-blur-sm px-4 py-2 rounded-full border border-text-muted/10 shadow-sm">
              <span className="text-xs font-bold text-text-primary">
                Latest: {MY_PROJECTS[0]?.year}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Controls: Tabs + View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8"
        >
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
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
                  // REFACTORED: Inverse vs Surface styling
                  className={`relative px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'bg-bg-inverse text-text-inverse shadow-lg'
                      : 'bg-bg-surface text-text-secondary hover:bg-white border border-text-muted/10 hover:border-text-muted/30'
                  }`}
                >
                  <motion.span
                    animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {tab.icon}
                  </motion.span>
                  <span>{tab.name}</span>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                      isActive ? 'bg-white/20 text-white' : 'bg-bg-subtle text-text-muted'
                    }`}
                  >
                    {count}
                  </motion.span>

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-bg-inverse rounded-xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-bg-surface backdrop-blur-sm p-1 rounded-xl border border-text-muted/10 shadow-sm">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "grid"
                  ? 'bg-bg-inverse text-text-inverse shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
              aria-label="Grid view"
            >
              <Grid3x3 size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "list"
                  ? 'bg-bg-inverse text-text-inverse shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
              aria-label="List view"
            >
              <List size={16} />
            </motion.button>
          </div>
        </motion.div>

        {/* Projects Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
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
                  whileHover={{ y: -8, scale: 1.02 }}
                  onHoverStart={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                  // REFACTORED: White Card with border-text-muted/10
                  className={`group relative bg-bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-text-muted/10 hover:border-brand-main/30 ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                >
                  {/* Hover Glow Effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 0.1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-brand-main to-accent-rose blur-xl -z-10"
                  />

                  {/* Featured Badge */}
                  {project.featured && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, type: "spring", bounce: 0.6 }}
                      className="absolute top-3 left-3 z-20"
                    >
                      {/* REFACTORED: Brand Gradient */}
                      <div className="bg-gradient-to-r from-brand-main to-brand-dark text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Star size={10} className="fill-white" />
                        <span>Featured</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Status Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                    className="absolute top-3 right-3 z-20"
                  >
                    <motion.div
                      animate={project.status === "live" ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`${statusInfo.color} text-white text-[9px] font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 backdrop-blur-sm`}
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

                  {/* Image Container - Placeholder Style */}
                  <div className={`relative ${
                    viewMode === "list" ? "w-48 h-48" : "w-full h-56"
                  } bg-gradient-to-br from-bg-subtle to-gray-100 overflow-hidden`}>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ opacity: isHovered ? 0.5 : 1 }}
                    >
                      <div className="text-center">
                        <motion.div
                          animate={{
                            y: [0, -10, 0],
                            rotate: isHovered ? 360 : 0
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-5xl mb-3"
                        >
                          {project.category === "websites" ? "🌐" : 
                           project.category === "clients" ? "💼" : 
                           project.category === "tools" ? "🤖" : "🧪"}
                        </motion.div>
                        <p className="text-[10px] text-text-muted font-mono px-4">
                          Add screenshot:<br/><span className="text-brand-main font-bold">{project.image}</span>
                        </p>
                      </div>
                    </motion.div>

                    {/* Gradient Overlay on Hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-bg-inverse/80 via-bg-inverse/30 to-transparent flex items-end justify-center pb-4"
                    >
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                        className="text-white text-xs font-bold flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <ChevronRight size={14} />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className={`p-5 ${viewMode === "list" ? "flex-1" : ""}`}>
                    {/* Title & Year */}
                    <div className="flex items-start justify-between mb-2">
                      <motion.h3
                        // REFACTORED: Text Primary + Hover Brand
                        className="font-black text-lg text-text-primary group-hover:text-brand-main transition-colors flex-1"
                        animate={isHovered ? { x: 5 } : { x: 0 }}
                      >
                        {project.name}
                      </motion.h3>
                      <motion.span
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="text-[10px] font-bold text-text-muted bg-bg-subtle px-2 py-1 rounded-full ml-2"
                      >
                        {project.year}
                      </motion.span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-text-secondary mb-4 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, viewMode === "list" ? 5 : 3).map((tag, idx) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 + idx * 0.05 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          // REFACTORED: Subtle background tags
                          className="text-[10px] font-bold text-text-secondary bg-bg-subtle hover:bg-bg-canvas px-2.5 py-1 rounded-full transition-colors cursor-default border border-text-muted/5"
                        >
                          {tag}
                        </motion.span>
                      ))}
                      {project.tags.length > (viewMode === "list" ? 5 : 3) && (
                        <span className="text-[10px] font-bold text-text-muted bg-bg-subtle px-2 py-1 rounded-full">
                          +{project.tags.length - (viewMode === "list" ? 5 : 3)}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {project.liveLink && (
                        <motion.a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          // REFACTORED: Inverse Button
                          className="flex-1 bg-bg-inverse hover:bg-black text-text-inverse text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all group/btn shadow-md hover:shadow-lg"
                        >
                          <span>View Live</span>
                          <motion.div
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ExternalLink size={12} />
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
                          // REFACTORED: Surface Button
                          className="bg-bg-subtle hover:bg-bg-canvas text-text-primary text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center transition-all shadow-sm hover:shadow-md border border-text-muted/10"
                          aria-label="View on GitHub"
                        >
                          <Github size={14} />
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
            className="text-center py-20"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-4"
            >
              🔍
            </motion.div>
            <h3 className="text-xl font-black text-text-primary mb-2">No projects here yet</h3>
            <p className="text-text-muted text-sm">Check back soon or explore other categories!</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
