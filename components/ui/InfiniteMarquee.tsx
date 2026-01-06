"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function InfiniteMarquee() {
  const content = [
    "🚀 Available for Projects",
    "100% Lighthouse Scores",
    "SEO-Ready MVPs",
    "Fast Delivery",
    "Modern Stack",
  ];

  // Repeat content to ensure seamless loop on wide screens
  const items = [...content, ...content, ...content, ...content];

  return (
    <div
      className="
        w-full
        h-[60px]
        bg-bg-main
        border-y border-border-subtle
        overflow-hidden
        relative
        z-10
        flex
        items-center
        select-none
      "
    >
      {/* Left fade - Matches BG Main */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-main to-transparent z-20 pointer-events-none" />

      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-main to-transparent z-20 pointer-events-none" />

      <motion.div
        className="flex gap-16 items-center whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-text-primary font-bold text-sm uppercase tracking-[0.2em] font-mono">
              {item}
            </span>
            <Sparkles
              size={12}
              className="text-accent ml-12"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
