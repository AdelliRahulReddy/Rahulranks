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
      <div className="min-h-screen bg-bg-main text-text-primary relative overflow-x-hidden selection:bg-accent selection:text-bg-surface">

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

            <div id="skills" className="w-full px-4 md:px-8 lg:px-12 py-16 md:py-24 bg-bg-surface-alt scroll-mt-24 border-y border-border-subtle">
              <SkillsSection />
            </div>

            <div id="trust" className="w-full px-4 md:px-8 lg:px-12 py-16 md:py-24 scroll-mt-24">
              <TrustSection />
            </div>

            <div id="projects" className="w-full px-4 md:px-8 lg:px-12 py-16 md:py-24 bg-bg-surface-alt scroll-mt-24 border-y border-border-subtle">
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
