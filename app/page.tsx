"use client";

import { ReactLenis } from "lenis/react";
import Header from "@/components/layout/Header";
import InfiniteMarquee from "@/components/ui/InfiniteMarquee";
import Bento from "@/components/sections/Bento";
import SolutionsSection from "@/components/sections/Solutions";
import SkillsSection from "@/components/sections/Skills";
import TrustSection from "@/components/sections/Trust";
import ProjectsSection from "@/components/sections/Projects";
import CTASection from "@/components/sections/CTA";

export default function Portfolio() {
  return (
    <ReactLenis root>
      <div className="min-h-screen bg-bg-canvas text-text-primary relative overflow-x-hidden selection:bg-brand-main selection:text-white transition-colors duration-500">

        {/* Background Pattern - handled by globals.css mostly, but adding localized flair */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-soft-light">
          <div className="absolute inset-0 bg-pattern-dense" />
        </div>

        {/* Semantic Blur Glows */}
        <div className="fixed top-0 right-0 w-[50vw] h-[50vh] rounded-full bg-brand-main/20 blur-[120px] -mr-[10%] -mt-[10%] pointer-events-none mix-blend-screen dark:mix-blend-screen" />
        <div className="fixed bottom-0 left-0 w-[40vw] h-[40vh] rounded-full bg-accent-rose/10 blur-[100px] -ml-[10%] -mb-[10%] pointer-events-none mix-blend-screen dark:mix-blend-screen" />

        {/* Content */}
        <div className="relative z-10">
          <Header />

          <main className="w-full pt-[72px]">

            <div className="w-full">
              <InfiniteMarquee />
            </div>

            <section id="home" className="w-full px-4 md:px-8 lg:px-12 py-8 md:py-12 scroll-mt-24">
              <Bento />
            </section>

            <div id="solutions" className="w-full px-4 md:px-8 lg:px-12 py-16 md:py-24 scroll-mt-24">
              <SolutionsSection />
            </div>

            <div id="skills" className="w-full px-4 md:px-8 lg:px-12 py-16 md:py-24 bg-bg-subtle/30 scroll-mt-24 border-y border-border-subtle">
              <SkillsSection />
            </div>

            <div id="trust" className="w-full px-4 md:px-8 lg:px-12 py-16 md:py-24 scroll-mt-24">
              <TrustSection />
            </div>

            <div id="projects" className="w-full px-4 md:px-8 lg:px-12 py-16 md:py-24 bg-bg-subtle/30 scroll-mt-24 border-y border-border-subtle">
              <ProjectsSection />
            </div>

            <div id="contact" className="w-full px-4 md:px-8 lg:px-12 py-16 md:py-24 scroll-mt-24">
              <CTASection />
            </div>

          </main>
        </div>
      </div>
    </ReactLenis>
  );
}
