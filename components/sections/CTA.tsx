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
  const [particles, setParticles] = useState<Array<{left: string, top: string, delay: number, duration: number}>>([]);

  useEffect(() => {
    setMounted(true);
    const newParticles = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // STRICT UX MAPPING
  // Available = Success (Green) - Universal signal for "Go"
  // Busy = Warning (Amber) - Signal for "Wait"
  // Booked = Inverse (Dark) - Signal for "Closed"
  const getStatusColor = () => {
    switch(CONTACT_DATA.availability.status) {
      case "available": return "bg-status-success"; 
      case "busy": return "bg-status-warning";
      case "booked": return "bg-bg-inverse"; 
      default: return "bg-text-muted";
    }
  };

  const getStatusText = () => {
    switch(CONTACT_DATA.availability.status) {
      case "available": return "Available for work";
      case "busy": return "Limited availability";
      case "booked": return "Fully booked";
      default: return "Status unknown";
    }
  };

  return (
    <section
      ref={containerRef}
      // REFACTORED: "Warm Glass" Gradient
      // from-brand-light (Soft Peach) -> via-surface (White) -> to-brand-light
      // This creates depth without the heavy "Saffron" look
      className="bg-gradient-to-br from-brand-light via-bg-surface to-brand-light border border-brand-main/10 rounded-[32px] md:rounded-[48px] p-8 md:p-16 my-8 relative overflow-hidden shadow-2xl shadow-brand-main/5"
    >
      {/* Pattern Overlay - Darkened slightly for the light background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Particles - Brand Colored */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-brand-main/20 rounded-full"
              style={{ left: particle.left, top: particle.top }}
              initial={{ opacity: 0 }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.6, 0],
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
        {/* Header Content */}
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
              <Sparkles size={20} className="text-brand-main" />
            </motion.div>
            <p className="text-text-primary/80 font-mono text-xs uppercase tracking-[0.2em] font-black">
              Let's Connect
            </p>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-4 tracking-tight">
            {CONTACT_DATA.headline}{" "}
            <motion.span
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block origin-bottom"
            >
              🚀
            </motion.span>
          </h2>

          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto mb-6">
            {CONTACT_DATA.subheadline}
          </p>

          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            // REFACTORED: White background for badge to pop against the light gradient
            className="inline-flex items-center gap-3 bg-bg-surface border border-brand-main/10 rounded-full px-5 py-2.5 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-2.5 h-2.5 rounded-full ${getStatusColor()}`}
              />
              <span className="text-text-primary text-sm font-bold">{getStatusText()}</span>
            </div>
            <div className="w-px h-4 bg-text-muted/20" />
            <div className="flex items-center gap-2 text-text-secondary text-xs">
              <Zap size={12} />
              <span className="font-semibold">{CONTACT_DATA.availability.responseTime} response</span>
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
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${contact.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`} />
              
              {/* Card - REFACTORED: bg-bg-surface (White) */}
              <div className="relative bg-bg-surface rounded-2xl p-6 shadow-sm hover:shadow-xl border border-brand-main/5 h-full flex flex-col">
                <div className="text-4xl mb-3">{contact.icon}</div>

                <h3 className="text-sm font-black text-text-primary mb-1 uppercase tracking-wide">
                  {contact.label}
                </h3>

                <div className="flex-1 mb-3">
                  <p className="text-text-secondary font-bold text-base mb-1">
                    {contact.displayValue}
                  </p>
                  <p className="text-text-muted text-xs">
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
                    // Keep the vibrant gradient on buttons for contrast
                    className={`flex-1 bg-gradient-to-r ${contact.color} text-white py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow`}
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
                    // REFACTORED: Inverse (Black) button for high contrast
                    className="bg-bg-inverse text-text-inverse hover:bg-black py-2.5 px-4 rounded-xl font-bold transition-colors"
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
          // REFACTORED: Subtle background
          className="bg-bg-subtle/50 backdrop-blur-md border border-brand-main/5 rounded-2xl p-6"
        >
          <p className="text-text-secondary text-sm font-bold mb-4 text-center">
            Or find me on social media
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                // REFACTORED: White buttons with shadow
                className="bg-bg-surface hover:bg-white border border-brand-main/5 rounded-xl p-4 flex flex-col items-center gap-2 transition-all group shadow-sm hover:shadow-md"
              >
                <span className="text-2xl">{social.icon}</span>
                <span className="text-text-primary text-xs font-bold">{social.label}</span>
                <span className="text-text-muted text-[10px] group-hover:text-text-primary transition-colors">
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
          <p className="text-text-muted text-xs">
            📍 Based in {CONTACT_DATA.availability.timezone} • Usually reply within {CONTACT_DATA.availability.responseTime}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
