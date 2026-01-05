"use client";

import { motion } from "framer-motion";
import ProfileBox from "./bento/Profile";
import MapBox from "./bento/Map";
import SocialsBox from "./bento/Socials";
import StatsBox from "./bento/Stats";
import StackBox from "./bento/Stack";
import { cn } from "@/lib/utils";

export default function Bento() {
  return (
    <section className="w-full py-12 px-4 md:px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-auto md:h-[600px]"
        >
          {/* 1. Profile Box (Top Left - Large) */}
          <div className="md:col-span-2 md:row-span-2 rounded-[2rem] overflow-hidden shadow-2xl border border-white/20 bg-bg-surface">
            <ProfileBox />
          </div>

          {/* 2. Map Box (Top Middle) */}
          <div className="md:col-span-1 md:row-span-1 rounded-[2rem] overflow-hidden shadow-xl border border-white/20 bg-bg-inverse">
            <MapBox />
          </div>

          {/* 3. Socials Box (Top Right) */}
          <div className="md:col-span-1 md:row-span-1 rounded-[2rem] overflow-hidden shadow-xl border border-white/20 bg-bg-surface">
            <SocialsBox />
          </div>

          {/* 4. Stats Box (Middle Right - Wide) */}
          <div className="md:col-span-2 md:row-span-1 rounded-[2rem] overflow-hidden shadow-xl border border-white/20 bg-bg-inverse">
            <StatsBox />
          </div>

          {/* 5. Tech Stack Marquee (Bottom - Full Width) */}
          <div className="md:col-span-4 md:row-span-1 rounded-[2rem] overflow-hidden shadow-xl border border-white/20 bg-bg-surface">
            <StackBox />
          </div>

        </motion.div>
      </div>
    </section>
  );
}
