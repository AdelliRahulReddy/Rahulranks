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
      {/* Bachelor Brothers Background */}
      <div 
        className="min-h-screen text-slate-900 selection:bg-indigo-600 selection:text-white overflow-x-hidden relative"
        style={{ 
          backgroundColor: '#fef3e2',
          fontFamily: 'var(--font-outfit)'
        }}
      >
        
        {/* Background Pattern */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(244, 63, 94, 0.08) 0%, transparent 50%)
              `
            }}
          />
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')"
            }}
          />
        </div>
        
        {/* Blur Glows */}
        <div 
          className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full -mr-20 -mt-20 z-0 pointer-events-none"
          style={{
            background: 'rgb(99, 102, 241)',
            filter: 'blur(150px)',
            opacity: 0.2
          }}
        />
        <div 
          className="fixed bottom-0 left-0 w-[400px] h-[400px] rounded-full -ml-20 -mb-20 z-0 pointer-events-none"
          style={{
            background: 'rgb(244, 63, 94)',
            filter: 'blur(120px)',
            opacity: 0.15
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          <Header />
          
          <main className="pt-14 px-4 pb-12 max-w-[1400px] mx-auto relative">
            
            <div className="opacity-90 hover:opacity-100 transition-opacity">
              <InfiniteMarquee />
            </div>

            <section id="home" className="-mt-1 w-full scroll-mt-24">
              <Bento />
            </section>

            <div id="solutions" className="scroll-mt-24 mt-12">
              <SolutionsSection />
            </div>

            <div id="skills" className="scroll-mt-24 mt-12">
              <SkillsSection />
            </div>

            <div id="trust" className="scroll-mt-24 mt-12">
              <TrustSection />
            </div>

            <div id="projects" className="scroll-mt-24 mt-12">
              <ProjectsSection />
            </div>

            <div id="contact" className="scroll-mt-24 mt-12">
              <CTASection />
            </div>

          </main>
        </div>
        
      </div>
    </ReactLenis>
  );
}
