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
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-black group">
            {/* Background World Map Effect */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "invert(1)" // Make it white/light
                }}
            />

            {/* Animated Scan Line */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-main/10 to-transparent animate-scan-y pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between p-5">

                {/* Top: Location Badge */}
                <div className="flex justify-between items-start">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                        <MapPin size={10} className="text-brand-main" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">India Base</span>
                    </div>

                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="text-white/20"
                    >
                        <Globe size={32} />
                    </motion.div>
                </div>

                {/* Center: Glowing Pulse */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                        <div className="w-4 h-4 rounded-full bg-brand-main shadow-[0_0_20px_rgba(99,102,241,0.6)] z-10 relative" />
                        <div className="absolute inset-0 w-full h-full rounded-full bg-brand-main/50 animate-ping" />
                        <div className="absolute -inset-8 border border-white/10 rounded-full animate-[spin_4s_linear_infinite]" />
                        <div className="absolute -inset-12 border border-white/5 rounded-full animate-[spin_7s_linear_infinite_reverse]" />
                    </div>
                    {/* Label for India */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="text-[10px] font-black text-white bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                            HYD
                        </span>
                    </div>
                </div>

                {/* Bottom: Time */}
                <div className="mt-auto">
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-0.5">Local Time</p>
                            <div className="flex items-center gap-2">
                                <Clock size={14} className="text-brand-main" />
                                <p className="text-2xl font-black text-white font-mono tracking-tight leading-none">
                                    {time}
                                </p>
                            </div>
                        </div>
                        <div className="h-full flex items-end">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_#4ade80]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
