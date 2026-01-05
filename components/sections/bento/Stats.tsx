"use client";

import { motion } from "framer-motion";
import { FolderGit2, Users, Star, TrendingUp } from "lucide-react";

export default function StatsBox() {
    return (
        <div className="w-full h-full bg-[#0f172a] relative overflow-hidden flex items-center">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-main/20 via-transparent to-accent-rose/20" />

            {/* Decorative */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-main/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent-rose/30 rounded-full blur-3xl" />

            <div className="w-full grid grid-cols-3 gap-0 relative z-10 divide-x divide-white/10">

                {/* Stat 1 */}
                <div className="px-4 py-2 flex flex-col items-center justify-center text-center group cursor-default">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="mb-2 p-2 bg-white/5 rounded-full border border-white/10 group-hover:bg-white/10 transition-colors"
                    >
                        <FolderGit2 size={18} className="text-brand-main" />
                    </motion.div>
                    <div className="text-2xl lg:text-3xl font-black text-white leading-none mb-1">
                        50<span className="text-brand-main text-lg">+</span>
                    </div>
                    <p className="text-[9px] font-bold text-white/50 uppercase tracking-wider">Projects</p>
                </div>

                {/* Stat 2 */}
                <div className="px-4 py-2 flex flex-col items-center justify-center text-center group cursor-default">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="mb-2 p-2 bg-white/5 rounded-full border border-white/10 group-hover:bg-white/10 transition-colors"
                    >
                        <Users size={18} className="text-accent-teal" />
                    </motion.div>
                    <div className="text-2xl lg:text-3xl font-black text-white leading-none mb-1">
                        20<span className="text-accent-teal text-lg">+</span>
                    </div>
                    <p className="text-[9px] font-bold text-white/50 uppercase tracking-wider">Clients</p>
                </div>

                {/* Stat 3 */}
                <div className="px-4 py-2 flex flex-col items-center justify-center text-center group cursor-default">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="mb-2 p-2 bg-white/5 rounded-full border border-white/10 group-hover:bg-white/10 transition-colors"
                    >
                        <Star size={18} className="text-accent-amber" />
                    </motion.div>
                    <div className="text-2xl lg:text-3xl font-black text-white leading-none mb-1">
                        5.0
                    </div>
                    <p className="text-[9px] font-bold text-white/50 uppercase tracking-wider">Rating</p>
                </div>

            </div>
        </div>
    );
}
