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
      <div className="min-h-screen bg-bg-canvas text-text-primary selection:bg-brand-main selection:text-white font-sans overflow-x-hidden">
        
        <Header />
        
        {/* ✅ REDUCED: pt-16 to pt-14 (saves 8px) */}
        <main className="pt-14 px-4 pb-12 max-w-[1400px] mx-auto relative">
          
          {/* ✅ REMOVED mb-2 - No gap between marquee and bento */}
          <div className="opacity-90 hover:opacity-100 transition-opacity">
            <InfiniteMarquee />
          </div>

          {/* ✅ REMOVED mb-3, Added -mt-1 to pull bento closer */}
          <section id="home" className="-mt-1 w-full scroll-mt-24">
            <Bento />
          </section>

          {/* Solutions - Added mt-6 for spacing after bento */}
          <div id="solutions" className="scroll-mt-24 mt-6">
            <SolutionsSection />
          </div>

          {/* Skills */}
          <div id="skills" className="scroll-mt-24">
            <SkillsSection />
          </div>

          {/* Trust */}
          <TrustSection />

          {/* Projects */}
          <div id="projects" className="scroll-mt-24">
            <ProjectsSection />
          </div>

          {/* Contact */}
          <div id="contact" className="scroll-mt-24">
            <CTASection />
          </div>

        </main>
        
      </div>
    </ReactLenis>
  );
}
