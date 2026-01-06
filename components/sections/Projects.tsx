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
      className="w-full relative z-10"
    >
      {/* Animated Background - Subtle global blend */}
      <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-screen dark:mix-blend-screen">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[10%] w-[50vw] h-[50vw] bg-brand-main/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -left-[10%] w-[50vw] h-[50vw] bg-accent-rose/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, type: "spring", bounce: 0.5 }}
            className="flex items-center justify-center gap-2 mb-2"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={16} className="text-brand-main" />
            </motion.div>
            <p className="text-brand-main font-mono text-xs uppercase tracking-[0.2em] font-bold">
              Portfolio
            </p>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black font-serif text-text-primary mb-4 tracking-tight">
            My Work{" "}
            <motion.span
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block"
            >
              💼
            </motion.span>
          </h2>

          <p className="text-text-secondary text-base max-w-2xl mx-auto mb-8">
            Real projects, shipped and running. {MY_PROJECTS.length} projects total, {featuredCount} featured.
          </p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-8"
          >
            <div className="flex items-center gap-1.5 bg-bg-surface backdrop-blur-md px-4 py-2 rounded-full border border-border-subtle shadow-sm">
              <Star size={14} className="text-brand-main fill-brand-main" />
              <span className="text-xs font-bold text-text-primary">{featuredCount} Featured</span>
            </div>
            <div className="flex items-center gap-1.5 bg-bg-surface backdrop-blur-md px-4 py-2 rounded-full border border-border-subtle shadow-sm">
              <TrendingUp size={14} className="text-status-success" />
              <span className="text-xs font-bold text-text-primary">
                {MY_PROJECTS.filter(p => p.status === "live").length} Live
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-bg-surface backdrop-blur-md px-4 py-2 rounded-full border border-border-subtle shadow-sm">
              <span className="text-xs font-bold text-text-primary">
                Latest: {MY_PROJECTS[0]?.year}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Controls */}
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
                : MY_PROJECTS.filter(p => p.category === activeTab).length;

              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 ${isActive
                    ? 'bg-brand-main text-white shadow-lg shadow-brand-main/30'
                    : 'bg-bg-surface text-text-secondary hover:bg-bg-subtle border border-border-subtle'
                    }`}
                >
                  <motion.span
                    animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                    className="text-base"
                  >
                    {tab.icon}
                  </motion.span>
                  <span>{tab.name}</span>
                </motion.button>
              );
            })}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-bg-surface backdrop-blur-sm p-1.5 rounded-xl border border-border-subtle shadow-sm">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${viewMode === "grid"
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
              className={`p-2 rounded-lg transition-all ${viewMode === "list"
                ? 'bg-bg-inverse text-text-inverse shadow-sm'
                : 'text-text-muted hover:text-text-primary'
                }`}
              aria-label="List view"
            >
              <List size={16} />
            </motion.button>
          </div>
        </motion.div>

        {/* Projects Grid */}
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
                  whileHover={{ y: -6, scale: 1.02 }}
                  onHoverStart={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                  className={`group relative bg-bg-surface backdrop-blur-md rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-border-subtle hover:border-brand-main/30 ${viewMode === "list" ? "flex flex-row" : ""
                    }`}
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-main/5 to-accent-rose/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Featured Badge */}
                  {project.featured && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, type: "spring", bounce: 0.6 }}
                      className="absolute top-3 left-3 z-20"
                    >
                      <div className="bg-brand-main text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
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
                    <div className={`${statusInfo.color} text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-sm`}>
                      <span className="text-xs">{statusInfo.emoji}</span>
                      <span>{statusInfo.label}</span>
                    </div>
                  </motion.div>

                  {/* Image */}
                  <div className={`relative ${viewMode === "list" ? "w-48 h-48" : "w-full h-56"
                    } bg-bg-subtle overflow-hidden`}>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-10 pointer-events-none transition-opacity duration-500"
                    >
                      <div className="text-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                        <div className="text-6xl mb-2 filter blur-sm group-hover:blur-0 transition-all duration-500">
                          {project.category === "websites" ? "🌐" :
                            project.category === "clients" ? "💼" :
                              project.category === "tools" ? "🤖" : "🧪"}
                        </div>
                      </div>
                    </motion.div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Content */}
                  <div className={`p-6 ${viewMode === "list" ? "flex-1 flex flex-col justify-center" : ""}`}>
                    {/* Title & Year */}
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-black font-serif text-xl text-text-primary group-hover:text-brand-main transition-colors leading-tight">
                        {project.name}
                      </h3>
                      <span className="text-[10px] font-bold text-text-muted bg-bg-subtle px-2 py-1 rounded-full border border-border-subtle">
                        {project.year}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-text-secondary mb-4 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold text-text-secondary bg-bg-subtle px-2.5 py-1 rounded-full border border-border-subtle"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-auto">
                      {project.liveLink && (
                        <motion.a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 bg-brand-main hover:bg-brand-dark text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-brand-main/30"
                        >
                          <span>View Live</span>
                          <ExternalLink size={12} />
                        </motion.a>
                      )}
                      {project.githubLink && (
                        <motion.a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-bg-subtle hover:bg-bg-canvas text-text-primary text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center transition-all border border-border-subtle hover:border-text-primary/20"
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
          <div className="text-center py-20 opacity-50">
            <h3 className="text-xl font-bold text-text-primary">No projects found</h3>
          </div>
        )}
      </div>
    </section>
  );
}
