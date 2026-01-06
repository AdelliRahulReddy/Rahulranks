"use client";

import { motion } from "framer-motion";
import {
    Code2, Database, Globe, Layout, Smartphone,
    Terminal, Cpu, Cloud
} from "lucide-react";

const TECH_ICONS = [
    { icon: Code2, label: "React" },
    { icon: Globe, label: "Next.js" },
    { icon: Smartphone, label: "Flutter" },
    { icon: Database, label: "Firebase" },
    { icon: Layout, label: "Tailwind" },
    { icon: Terminal, label: "TypeScript" },
    { icon: Cloud, label: "Cloud" },
    { icon: Cpu, label: "AI" },
];

export default function StackBox() {
    return (
        <div className="w-full h-full bg-bg-surface flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-4 left-4 z-10">
                <h3 className="text-sm font-black text-text-primary uppercase tracking-wider">Stack</h3>
            </div>

            <div className="flex flex-col gap-4 mt-6">
                {/* Row 1: Left */}
                <div className="relative flex overflow-hidden">
                    <motion.div
                        animate={{ x: [0, -500] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="flex gap-4 px-4"
                    >
                        {[...TECH_ICONS, ...TECH_ICONS, ...TECH_ICONS].map((tech, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 px-3 py-1.5 bg-bg-surface-alt rounded-full border border-border-subtle whitespace-nowrap"
                            >
                                <tech.icon size={12} className="text-accent" />
                                <span className="text-[10px] font-bold text-text-primary">{tech.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Row 2: Right */}
                <div className="relative flex overflow-hidden">
                    <motion.div
                        animate={{ x: [-500, 0] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="flex gap-4 px-4"
                    >
                        {[...TECH_ICONS, ...TECH_ICONS, ...TECH_ICONS].reverse().map((tech, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 px-3 py-1.5 bg-bg-surface-alt rounded-full border border-border-subtle whitespace-nowrap"
                            >
                                <tech.icon size={12} className="text-accent" />
                                <span className="text-[10px] font-bold text-text-primary">{tech.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
