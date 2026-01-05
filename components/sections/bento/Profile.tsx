"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";

export default function ProfileBox() {
    return (
        <div className="w-full h-full p-6 flex flex-col justify-between relative overflow-hidden group">
            {/* Background Gradient & Noise */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-main/80 to-brand-dark z-0" />
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0 mix-blend-overlay" />

            {/* Floating Shapes */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-40 h-40 bg-accent-rose/30 rounded-full blur-3xl z-0"
            />

            {/* Header */}
            <div className="relative z-10 flex justify-between items-start">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Available</span>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-brand-dark rounded-full p-2 shadow-lg"
                >
                    <ArrowUpRight size={16} />
                </motion.button>
            </div>

            {/* Content */}
            <div className="relative z-10 mt-auto">
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl">
                        <Image
                            src="/profile.jpg"
                            alt="Rahul Reddy"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-white font-serif leading-none mb-1">
                            Rahul Reddy
                        </h1>
                        <p className="text-xs text-white/80 font-medium">
                            Full Stack Developer & SEO Expert
                        </p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        className="flex-1 bg-white text-brand-dark py-2 rounded-lg text-xs font-bold shadow-xl flex items-center justify-center gap-2"
                    >
                        <span>Download CV</span>
                        <Download size={12} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 text-white py-2 rounded-lg text-xs font-bold hover:bg-white/20 transition-colors"
                    >
                        Copy Email
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
