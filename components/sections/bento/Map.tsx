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
        <div className="w-full h-full relative overflow-hidden group bg-bg-surface">
            {/* Background World Map Effect - Using subtle opacity */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Content */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between p-5">

                {/* Top: Location Badge */}
                <div className="flex justify-between items-start">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bg-surface-alt border border-border-subtle shadow-sm">
                        <MapPin size={10} className="text-accent" />
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

                {/* Center: Pulse Indicator */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                        <div className="w-4 h-4 rounded-full bg-accent z-10 relative" />
                        <div className="absolute inset-0 w-full h-full rounded-full bg-accent/50 animate-ping" />
                        <div className="absolute -inset-8 border border-accent/20 rounded-full animate-[spin_4s_linear_infinite]" />
                        <div className="absolute -inset-12 border border-accent/10 rounded-full animate-[spin_7s_linear_infinite_reverse]" />
                    </div>
                </div>

                {/* Bottom: Time */}
                <div className="mt-auto">
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-0.5">Local Time</p>
                            <div className="flex items-center gap-2">
                                <Clock size={14} className="text-accent" />
                                <p className="text-2xl font-black text-text-primary font-mono tracking-tight leading-none">
                                    {time}
                                </p>
                            </div>
                        </div>
                        <div className="h-full flex items-end">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
