"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Copy, Mail, Linkedin, Twitter, Sparkles, Check, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: true });
  const [copied, setCopied] = useState(false);

  // Parallax Effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const handleCopy = () => {
    navigator.clipboard.writeText("hello@rahulranks.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactData = [
    {
      icon: <Mail size={24} />,
      label: "Email Me",
      value: "hello@rahulranks.com",
      action: handleCopy,
      btnLabel: copied ? "Copied!" : "Copy Email",
      btnIcon: copied ? <Check size={14} /> : <Copy size={14} />,
      color: "bg-accent"
    },
    {
      icon: <Linkedin size={24} />,
      label: "LinkedIn",
      value: "Connect professionally",
      href: "https://linkedin.com/in/rahulranks",
      btnLabel: "Let's Connect",
      btnIcon: <ArrowRight size={14} />,
      color: "bg-text-primary"
    },
    {
      icon: <Twitter size={24} />,
      label: "Twitter/X",
      value: "Follow my journey",
      href: "https://x.com/rahulranks",
      btnLabel: "Follow Me",
      btnIcon: <ArrowRight size={14} />,
      color: "bg-text-muted"
    }
  ];

  return (
    <div ref={containerRef} className="w-full relative z-10 overflow-hidden rounded-3xl">
      {/* Background - Clean with pattern */}
      <div className="absolute inset-0 bg-bg-surface-alt border border-border-subtle rounded-3xl" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--text-muted) 1px, transparent 1px), linear-gradient(90deg, var(--text-muted) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Content Container */}
      <motion.div
        style={{ y }}
        className="relative z-10 py-16 px-6 md:px-12 lg:px-20 text-center"
      >
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-text-primary text-bg-surface px-4 py-2 rounded-full mb-8 shadow-md"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent border border-bg-surface"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider">
            Available for New Projects
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-text-primary mb-6 leading-tight max-w-4xl mx-auto"
        >
          Ready to turn your idea into a <span className="text-accent underline decoration-4 underline-offset-4 decoration-accent/30">reality</span>?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          I'm currently building my portfolio and offering <span className="font-bold text-text-primary">free development services</span> for select projects. Let's create something amazing together.
        </motion.p>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {contactData.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-bg-surface rounded-2xl p-6 border border-border-subtle hover:border-accent shadow-sm hover:shadow-lg transition-all flex flex-col items-center text-center group"
            >
              <div className={`w-14 h-14 rounded-full ${item.color} text-bg-surface flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>

              <h3 className="text-lg font-bold text-text-primary mb-1">{item.label}</h3>
              <p className="text-sm text-text-muted mb-6">{item.value}</p>

              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full py-2.5 rounded-xl border border-border-subtle bg-bg-surface-alt hover:bg-accent hover:text-bg-surface text-text-primary text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  {item.btnLabel}
                  {item.btnIcon}
                </a>
              ) : (
                <button
                  onClick={item.action}
                  className="mt-auto w-full py-2.5 rounded-xl border border-border-subtle bg-bg-surface-alt hover:bg-accent hover:text-bg-surface text-text-primary text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  {item.btnLabel}
                  {item.btnIcon}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 flex items-center justify-center gap-2 opacity-60"
        >
          <Sparkles size={14} className="text-accent" />
          <p className="text-xs font-bold text-text-muted uppercase tracking-widest">
            Fast Response • 100% Committed
          </p>
          <Sparkles size={14} className="text-accent" />
        </motion.div>
      </motion.div>
    </div>
  );
}
