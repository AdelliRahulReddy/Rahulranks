"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

export default function ProfileBox() {
    const handleEmailClick = () => {
        navigator.clipboard.writeText("hello@rahulranks.com");
        alert("Email copied! Reach out anytime 😊");
    };

    return (
        <div className="w-full h-full p-6 flex flex-col justify-between relative overflow-hidden group">
            {/* Background Gradient & Noise */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-main/90 to-brand-main z-0" />
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0 mix-blend-overlay" />

            {/* Floating Shapes */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl z-0"
            />

            {/* Header */}
            <div className="relative z-10 flex justify-between items-start">
                <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-3 py-1.5 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Open to Work (Free!)</span>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-brand-main rounded-full p-2 shadow-lg"
                    aria-label="View more"
                >
                    <ArrowUpRight size={16} />
                </motion.button>
            </div>

            {/* Content */}
            <div className="relative z-10 mt-auto">
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl bg-white/10">
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
                        <p className="text-xs text-white/90 font-medium">
                            Student Developer | Learning & Building
                        </p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.02 }}
                        className="flex-1 bg-white text-brand-main py-2.5 rounded-xl text-xs font-bold shadow-xl flex items-center justify-center gap-2 hover:brightness-95"
                    >
                        <span>Let's Talk</span>
                        <Mail size={12} />
                    </motion.a>
                    <motion.button
                        onClick={handleEmailClick}
                        whileHover={{ scale: 1.02 }}
                        className="flex-1 bg-white/15 backdrop-blur-md border border-white/25 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-white/25 transition-colors"
                    >
                        Copy Email
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
