"use client";

import { motion } from "framer-motion";
import { Globe, Clock, MapPin } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function MapBox() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone: "Asia/Kolkata",
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            };
            setTime(now.toLocaleTimeString("en-US", options));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full relative overflow-hidden group">
            {/* Background World Map Effect */}
            <div
                className="absolute inset-0 opacity-10 dark:opacity-20 transition-opacity"
                style={{
                    backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "var(--color-bg-inverse) === '#f8fafc' ? 'invert(1)' : 'none'"
                }}
            />
            {/* Simple CSS filter for map based on theme is tricky inline with vars. 
                Using a simpler approach: allow map to be dark in light mode (contrast) or invert it.
                Actually, simpler: Just use the map as a texture. 
            */}
            <div
                className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-multiply dark:mix-blend-screen"
                style={{
                    backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Animated Scan Line */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-main/10 to-transparent animate-scan-y pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between p-5">

                {/* Top: Location Badge */}
                <div className="flex justify-between items-start">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bg-subtle/50 backdrop-blur-md border border-border-subtle shadow-sm">
                        <MapPin size={10} className="text-brand-main" />
                        <span className="text-[10px] font-bold text-text-primary uppercase tracking-wider">India Base</span>
                    </div>

                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="text-text-muted"
                    >
                        <Globe size={32} />
                    </motion.div>
                </div>

                {/* Center: Glowing Pulse */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                        <div className="w-4 h-4 rounded-full bg-brand-main shadow-[0_0_20px_var(--color-brand-main)] z-10 relative" />
                        <div className="absolute inset-0 w-full h-full rounded-full bg-brand-main/50 animate-ping" />
                        <div className="absolute -inset-8 border border-brand-main/20 rounded-full animate-[spin_4s_linear_infinite]" />
                        <div className="absolute -inset-12 border border-brand-main/10 rounded-full animate-[spin_7s_linear_infinite_reverse]" />
                    </div>
                </div>

                {/* Bottom: Time */}
                <div className="mt-auto">
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-0.5">Local Time</p>
                            <div className="flex items-center gap-2">
                                <Clock size={14} className="text-brand-main" />
                                <p className="text-2xl font-black text-text-primary font-mono tracking-tight leading-none">
                                    {time}
                                </p>
                            </div>
                        </div>
                        <div className="h-full flex items-end">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-status-success shadow-[0_0_10px_var(--color-status-success)]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
