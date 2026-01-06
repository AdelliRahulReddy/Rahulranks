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
        <div className="w-full h-full p-6 flex flex-col justify-between relative overflow-hidden group bg-accent">
            {/* Header */}
            <div className="relative z-10 flex justify-between items-start">
                <div className="bg-bg-surface/20 border border-bg-surface/30 rounded-full px-3 py-1.5 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bg-surface opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-bg-surface"></span>
                    </span>
                    <span className="text-[10px] font-bold text-bg-surface uppercase tracking-wider">Open to Work (Free!)</span>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-bg-surface text-accent rounded-full p-2 shadow-lg"
                    aria-label="View more"
                >
                    <ArrowUpRight size={16} />
                </motion.button>
            </div>

            {/* Content */}
            <div className="relative z-10 mt-auto">
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-bg-surface/30 shadow-xl bg-bg-surface/10">
                        <Image
                            src="/profile.jpg"
                            alt="Rahul Reddy"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-bg-surface font-serif leading-none mb-1">
                            Rahul Reddy
                        </h1>
                        <p className="text-xs text-bg-surface/90 font-medium">
                            Student Developer | Learning & Building
                        </p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.02 }}
                        className="flex-1 bg-bg-surface text-accent py-2.5 rounded-xl text-xs font-bold shadow-lg flex items-center justify-center gap-2 hover:opacity-90"
                    >
                        <span>Let's Talk</span>
                        <Mail size={12} />
                    </motion.a>
                    <motion.button
                        onClick={handleEmailClick}
                        whileHover={{ scale: 1.02 }}
                        className="flex-1 bg-bg-surface/15 border border-bg-surface/25 text-bg-surface py-2.5 rounded-xl text-xs font-bold hover:bg-bg-surface/25 transition-colors"
                    >
                        Copy Email
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
