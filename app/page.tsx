"use client";

import { ReactLenis } from "lenis/react";
import Header from "@/components/layout/Header";
import InfiniteMarquee from "@/components/ui/InfiniteMarquee";
import MainHero from "@/components/sections/MainHero";
import SolutionsSection from "@/components/sections/Solutions";
import SkillsSection from "@/components/sections/Skills";
import TrustSection from "@/components/sections/Trust";
import ProjectsSection from "@/components/sections/Projects";
import CTASection from "@/components/sections/CTA";
import { motion } from "framer-motion";

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="w-full flex flex-col items-center justify-center py-12 px-6 border-b border-border-subtle/30 bg-white/40 backdrop-blur-xl mb-12 relative overflow-hidden group">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-accent/5 blur-[60px] rounded-full group-hover:bg-accent/10 transition-colors duration-1000" />
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-black font-serif text-text-primary tracking-tighter relative z-10"
    >
      {title}
    </motion.h2>
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width: 60, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2, ease: "circOut" }}
      viewport={{ once: true }}
      className="h-1.5 bg-accent rounded-full my-6 relative z-10"
    />
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
      className="text-[13px] md:text-sm font-black text-text-muted uppercase tracking-[0.4em] text-center relative z-10"
    >
      {subtitle}
    </motion.p>
  </div>
);

export default function Portfolio() {
  return (
    <ReactLenis root>
      <div className="min-h-screen bg-bg-main text-text-primary relative overflow-x-hidden selection:bg-accent selection:text-bg-surface">

        {/* Content */}
        <div className="relative z-10">
          <Header />

          <main className="w-full">
            {/* ABOVE THE FOLD: Header + Marquee + Hero */}
            <div className="min-h-[100dvh] flex flex-col justify-between pb-8">
              <div className="w-full pt-12 md:pt-16">
                <div className="w-[95%] max-w-[1540px] mx-auto">
                  <InfiniteMarquee />
                </div>
              </div>

              {/* 1. Home / Hero */}
              <div id="home" className="scroll-mt-24 py-8 lg:py-4 flex-1 flex items-center w-full">
                <div className="w-[95%] max-w-[1540px] mx-auto">
                  <MainHero />
                </div>
              </div>
            </div>

            <div className="w-full space-y-24 md:space-y-32">
              {/* 2. Solutions */}
              <div id="solutions" className="scroll-mt-24 w-full">
                <div className="section-box w-[95%] max-w-[1540px] mx-auto overflow-hidden">
                  <SectionHeader
                    title="Learning While Building"
                    subtitle="SOLO DEVELOPER BUILDING EXPERIENCE"
                  />
                  <div className="px-6 md:px-12 pb-16 md:pb-24">
                    <SolutionsSection />
                  </div>
                </div>
              </div>

              {/* 3. Skills */}
              <div id="skills" className="scroll-mt-24 w-full">
                <div className="section-box w-[95%] max-w-[1540px] mx-auto overflow-hidden">
                  <SectionHeader
                    title="My Arsenal"
                    subtitle="CORE TOOLS & STRATEGIES"
                  />
                  <div className="px-6 md:px-12 pb-16 md:pb-24">
                    <SkillsSection />
                  </div>
                </div>
              </div>

              {/* 4. Trust */}
              <div id="trust" className="scroll-mt-24 w-full">
                <div className="section-box w-[95%] max-w-[1540px] mx-auto overflow-hidden">
                  <SectionHeader
                    title="Trust & Recognition"
                    subtitle="CREDENTIALS & TESTIMONIALS"
                  />
                  <div className="px-6 md:px-12 pb-16 md:pb-24">
                    <TrustSection />
                  </div>
                </div>
              </div>

              {/* 5. Projects */}
              <div id="projects" className="scroll-mt-24 w-full">
                <div className="section-box w-[95%] max-w-[1540px] mx-auto overflow-hidden">
                  <SectionHeader
                    title="My Work"
                    subtitle="REAL PROJECTS, SHIPPED"
                  />
                  <div className="px-6 md:px-12 pb-16 md:pb-24">
                    <ProjectsSection />
                  </div>
                </div>
              </div>

              {/* 6. Contact */}
              <div id="contact" className="scroll-mt-24 w-full">
                <div className="section-box w-[95%] max-w-[1540px] mx-auto overflow-hidden">
                  <SectionHeader
                    title="Get In Touch"
                    subtitle="READY TO BUILD TOGETHER?"
                  />
                  <div className="px-6 md:px-12 pb-12 md:pb-16">
                    <CTASection />
                  </div>
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>
    </ReactLenis>
  );
}
