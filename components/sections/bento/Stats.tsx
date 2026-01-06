"use client";

import { motion } from "framer-motion";
import { GraduationCap, Heart, Gift } from "lucide-react";

export default function StatsBox() {
    return (
        <div className="w-full h-full relative overflow-hidden flex items-center bg-bg-surface">
            <div className="w-full grid grid-cols-3 gap-0 relative z-10 divide-x divide-border-subtle">

                {/* Stat 1 - Learning */}
                <div className="px-4 py-2 flex flex-col items-center justify-center text-center group cursor-default">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="mb-2 p-2 bg-bg-surface-alt rounded-full border border-border-subtle group-hover:border-accent transition-colors"
                    >
                        <GraduationCap size={18} className="text-accent" />
                    </motion.div>
                    <div className="text-2xl lg:text-3xl font-black text-text-primary leading-none mb-1">
                        Learning
                    </div>
                    <p className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Every Day</p>
                </div>

                {/* Stat 2 - Commitment */}
                <div className="px-4 py-2 flex flex-col items-center justify-center text-center group cursor-default">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="mb-2 p-2 bg-bg-surface-alt rounded-full border border-border-subtle group-hover:border-accent transition-colors"
                    >
                        <Heart size={18} className="text-accent" fill="currentColor" />
                    </motion.div>
                    <div className="text-2xl lg:text-3xl font-black text-text-primary leading-none mb-1">
                        100<span className="text-accent text-lg">%</span>
                    </div>
                    <p className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Dedicated</p>
                </div>

                {/* Stat 3 - Free Start */}
                <div className="px-4 py-2 flex flex-col items-center justify-center text-center group cursor-default">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="mb-2 p-2 bg-bg-surface-alt rounded-full border border-border-subtle group-hover:border-accent transition-colors"
                    >
                        <Gift size={18} className="text-accent" />
                    </motion.div>
                    <div className="text-2xl lg:text-3xl font-black text-text-primary leading-none mb-1">
                        Free
                    </div>
                    <p className="text-[9px] font-bold text-text-muted uppercase tracking-wider">To Start</p>
                </div>

            </div>
        </div>
    );
}
