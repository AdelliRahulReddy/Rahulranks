"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Quote, Zap, Activity, ShieldCheck, Sparkles } from "lucide-react";
import { TRUST_DATA } from "@/lib/trust";
import { cn } from "@/lib/utils";

export default function MainHero() {
    const testimonials = TRUST_DATA.testimonials;

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative min-h-[70vh] px-4 md:px-8 xl:px-12">

            {/* LEFT SIDE: High-Impact Typography & Narrative */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 text-center lg:text-left z-20"
            >
                <div className="space-y-8">
                    {/* Floating Status Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-md border border-white/50 shadow-sm"
                    >
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-[11px] md:text-xs font-black uppercase tracking-[0.2em] text-text-primary">Currently Available for Q1</span>
                    </motion.div>

                    <div className="space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="text-5xl md:text-6xl lg:text-7xl font-black text-text-primary tracking-tighter leading-tight drop-shadow-sm"
                            style={{ fontFamily: 'var(--font-outfit)' }}
                        >
                            Rahulreddy
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-text-muted max-w-xl mx-auto lg:mx-0 font-medium leading-[1.6] tracking-tight"
                        >
                            I'm <span className="text-text-primary font-black">Rahulreddy</span>, founder of <span className="text-accent italic font-bold">Rahulranks</span>. Currently a solo builder, but growing into a team to serve you all better.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5"
                    >
                        <a
                            href="#contact"
                            className="w-full sm:w-auto px-10 py-5 rounded-full bg-text-primary text-bg-surface font-black text-xs uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl flex items-center justify-center gap-3 group"
                        >
                            Start Project
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="#projects"
                            className="w-full sm:w-auto px-10 py-5 rounded-full border-2 border-text-primary/10 bg-white/30 backdrop-blur-md text-text-primary font-black text-xs uppercase tracking-[0.2em] hover:bg-white/50 transition-all flex items-center justify-center gap-3"
                        >
                            Selected Work
                        </a>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="flex items-center justify-center lg:justify-start gap-8 opacity-40 pt-4"
                    >
                        <div className="flex items-center gap-2 group cursor-default">
                            <ShieldCheck size={16} className="group-hover:text-accent transition-colors" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Money-back Guarantee</span>
                        </div>
                        <div className="flex items-center gap-2 group cursor-default">
                            <Sparkles size={16} className="group-hover:text-accent transition-colors" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">SEO-Optimized MVPs</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* RIGHT SIDE: The $10k Stacked Card System */}
            <div className="flex-1 w-full max-w-[500px] relative h-[500px] lg:h-[600px] flex items-center justify-center lg:justify-end">

                {/* Visual Background Glow */}
                <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

                {/* Card 3: The Base (Status/Visual) */}
                <motion.div
                    initial={{ opacity: 0, rotate: -8, x: 20, y: 20 }}
                    animate={{ opacity: 1, rotate: -12, x: 0, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ rotate: -8, x: -40, y: -20, zIndex: 40 }}
                    className="absolute w-[300px] md:w-[340px] aspect-[4/5] bg-text-primary rounded-[3rem] p-8 text-bg-surface shadow-[20px_40px_80px_rgba(0,0,0,0.3)] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-500 z-10"
                >
                    <div className="flex justify-between items-center relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">System Pulse</span>
                        <div className="flex items-center gap-2 bg-accent/20 px-3 py-1 rounded-full border border-accent/30">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-accent">Active</span>
                        </div>
                    </div>
                    <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                        <Activity size={200} className="text-accent stroke-[1]" />
                    </div>
                    <div className="space-y-2 relative z-10">
                        <h3 className="text-4xl font-black leading-none tracking-tighter">Live<br />Analytics</h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Real-time engagement</p>
                    </div>
                </motion.div>

                {/* Card 2: The Middle (Methodology) */}
                <motion.div
                    initial={{ opacity: 0, rotate: -4, x: 10, y: 10 }}
                    animate={{ opacity: 1, rotate: -6, x: 0, y: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ rotate: 0, x: 0, y: -100, zIndex: 40 }}
                    className="absolute w-[300px] md:w-[340px] aspect-[4/5] bg-accent rounded-[3rem] p-8 text-bg-surface shadow-[10px_30px_60px_rgba(37,99,235,0.2)] flex flex-col justify-between cursor-pointer transition-all duration-500 z-20"
                >
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                        <Zap size={28} className="fill-white/20" />
                    </div>
                    <div className="space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">The Secret Sauce</p>
                        <h3 className="text-3xl font-black leading-tight tracking-tighter italic">AI Engineered Efficiency.</h3>
                        <div className="h-1 w-12 bg-white/40 rounded-full" />
                    </div>
                </motion.div>

                {/* Card 1: The Top (The Proof) */}
                <motion.div
                    initial={{ opacity: 0, rotate: 0, x: 0, y: 0 }}
                    animate={{ opacity: 1, rotate: 2, x: 0, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ rotate: 0, y: -20, scale: 1.02, zIndex: 40 }}
                    className="absolute w-[300px] md:w-[340px] aspect-[4/5] bg-white rounded-[3rem] p-8 border border-white shadow-[0_40px_100px_rgba(0,0,0,0.08)] flex flex-col justify-between cursor-pointer transition-all duration-500 z-30"
                >
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center text-accent ring-1 ring-accent/10">
                            <Quote size={28} />
                        </div>
                        <div className="flex gap-1 pt-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} className="fill-accent text-accent" />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <p className="text-lg text-text-primary font-bold leading-tight tracking-tight italic">
                            "{testimonials[0].text.length > 80 ? testimonials[0].text.substring(0, 80) + "..." : testimonials[0].text}"
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-bg-main flex items-center justify-center text-sm font-black text-accent shadow-inner">
                                {testimonials[0].name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-text-primary tracking-widest">{testimonials[0].name}</p>
                                <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest">Verified Client</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
