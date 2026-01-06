"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Copy, Check, Sparkles, Zap, Mail, MessageCircle, ExternalLink } from "lucide-react";
import { CONTACT_DATA } from "@/lib/contact";

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: true });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{ left: string, top: string, delay: number, duration: number }>>([]);

  useEffect(() => {
    // Adding a small delay to avoid synchronous state update warning
    const timer = setTimeout(() => {
      setMounted(true);
      const newParticles = [...Array(12)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2
      }));
      setParticles(newParticles);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusColor = () => {
    switch (CONTACT_DATA.availability.status) {
      case "available": return "bg-status-success";
      case "busy": return "bg-status-warning";
      case "booked": return "bg-bg-inverse";
      default: return "bg-text-muted";
    }
  };

  const getStatusText = () => {
    switch (CONTACT_DATA.availability.status) {
      case "available": return "Available for work";
      case "busy": return "Limited availability";
      case "booked": return "Fully booked";
      default: return "Status unknown";
    }
  };

  return (
    <section
      ref={containerRef}
      className="bg-gradient-to-br from-bg-subtle via-bg-surface to-bg-subtle border border-border-subtle rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 my-8 relative overflow-hidden shadow-2xl"
    >
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply dark:mix-blend-screen">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px',
          color: 'var(--color-text-muted)'
        }} />
      </div>

      {/* Particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-brand-main rounded-full"
              style={{ left: particle.left, top: particle.top, opacity: 0.2 }}
              initial={{ opacity: 0 }}
              animate={{
                y: [0, -40, 0],
                opacity: [0, 0.4, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, type: "spring", bounce: 0.5 }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={16} className="text-brand-main" />
            </motion.div>
            <p className="text-brand-main font-mono text-xs uppercase tracking-[0.2em] font-bold">
              Let&apos;s Connect
            </p>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black font-serif text-text-primary mb-4 tracking-tight leading-tight">
            {CONTACT_DATA.headline}{" "}
            <motion.span
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block origin-bottom"
            >
              🚀
            </motion.span>
          </h2>

          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto mb-8 font-medium">
            {CONTACT_DATA.subheadline}
          </p>

          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-3 bg-bg-surface border border-border-subtle rounded-full px-5 py-2.5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-2.5 h-2.5 rounded-full ${getStatusColor()}`}
              />
              <span className="text-text-primary text-sm font-bold">{getStatusText()}</span>
            </div>
            <div className="w-px h-4 bg-border-strong" />
            <div className="flex items-center gap-2 text-text-muted text-xs font-medium">
              <Zap size={12} />
              <span>{CONTACT_DATA.availability.responseTime} response</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {CONTACT_DATA.primaryContacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative h-full"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${contact.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`} />

              {/* Card */}
              <div className="relative bg-bg-surface rounded-2xl p-6 shadow-sm hover:shadow-xl border border-border-subtle h-full flex flex-col transition-all">
                <div className="text-3xl mb-3 text-text-primary group-hover:scale-110 transition-transform origin-left">{contact.icon}</div>

                <h3 className="text-xs font-black text-text-muted mb-1 uppercase tracking-wider">
                  {contact.label}
                </h3>

                <div className="flex-1 mb-4">
                  <p className="text-text-primary font-bold text-base mb-1">
                    {contact.displayValue}
                  </p>
                  <p className="text-text-secondary text-xs">
                    {contact.description}
                  </p>
                </div>

                <div className="flex gap-2">
                  <motion.a
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 bg-gradient-to-r ${contact.color} text-white py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-shadow`}
                  >
                    {contact.id === "email" ? <Mail size={14} /> :
                      contact.id === "whatsapp" ? <MessageCircle size={14} /> :
                        <ExternalLink size={14} />}
                    <span>Open</span>
                  </motion.a>

                  <motion.button
                    onClick={() => copyToClipboard(contact.value, contact.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-bg-inverse text-text-inverse hover:bg-black dark:hover:bg-white dark:hover:text-black py-2.5 px-4 rounded-xl font-bold transition-colors shadow-md"
                    aria-label="Copy to clipboard"
                  >
                    {copiedId === contact.id ? (
                      <Check size={16} className="text-status-success" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="bg-bg-subtle/30 backdrop-blur-md border border-border-subtle rounded-2xl p-6 md:p-8"
        >
          <p className="text-text-secondary text-xs font-bold mb-4 text-center uppercase tracking-wider">
            Or find me on social media
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CONTACT_DATA.socialLinks.map((social, index) => (
              <motion.a
                key={social.id}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="bg-bg-surface hover:bg-bg-subtle border border-border-subtle rounded-xl p-4 flex flex-col items-center gap-2 transition-all group shadow-sm hover:shadow-lg hover:border-brand-main/30"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{social.icon}</span>
                <span className="text-text-primary text-xs font-bold">{social.label}</span>
                <span className="text-text-muted text-[10px] group-hover:text-brand-main transition-colors">
                  {social.username}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-8 text-center"
        >
          <p className="text-text-muted text-[10px] font-medium">
            📍 Based in {CONTACT_DATA.availability.timezone} • Usually reply within {CONTACT_DATA.availability.responseTime}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
