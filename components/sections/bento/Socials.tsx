"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";

const SOCIALS = [
    { icon: Github, href: "https://github.com/rahul", label: "Github", color: "hover:bg-[#24292e]" },
    { icon: Linkedin, href: "https://linkedin.com/in/rahulranks", label: "LinkedIn", color: "hover:bg-[#0077b5]" },
    { icon: Twitter, href: "https://x.com/rahulranks", label: "X / Twitter", color: "hover:bg-[#000000]" },
    { icon: Mail, href: "mailto:hello@rahulranks.com", label: "Email", color: "hover:bg-accent-rose" },
];

export default function SocialsBox() {
    return (
        <div className="w-full h-full bg-bg-surface flex flex-col p-5 relative overflow-hidden">

            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-black text-text-primary uppercase tracking-wider flex items-center gap-2">
                    Connect <span className="w-1.5 h-1.5 rounded-full bg-brand-main" />
                </h3>
            </div>

            <div className="flex flex-col gap-2 flex-1 justify-center">
                {SOCIALS.map((social, i) => (
                    <motion.a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ x: 5 }}
                        className={`flex items-center justify-between p-2.5 rounded-lg bg-bg-subtle/50 border border-transparent ${social.color} hover:text-white hover:border-white/10 transition-all group`}
                    >
                        <div className="flex items-center gap-3">
                            <social.icon size={16} className="text-text-secondary group-hover:text-white transition-colors" />
                            <span className="text-xs font-bold text-text-primary group-hover:text-white transition-colors">
                                {social.label}
                            </span>
                        </div>
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                ))}
            </div>
        </div>
    );
}
