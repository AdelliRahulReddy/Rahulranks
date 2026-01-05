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
    const newParticles = [...Array(12)].map(() => ({
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
      className="bg-gradient-to-br from-brand-light via-bg-surface to-brand-light border border-brand-main/10 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 my-8 relative overflow-hidden shadow-xl shadow-brand-main/5"
    >
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      {/* Particles - REDUCED */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-brand-main/20 rounded-full"
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
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, type: "spring", bounce: 0.5 }}
            className="flex items-center justify-center gap-2 mb-1.5"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={14} className="text-brand-main" />
            </motion.div>
            <p className="text-text-primary/80 font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
              Let's Connect
            </p>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-black font-serif text-text-primary mb-3 tracking-tight">
            {CONTACT_DATA.headline}{" "}
            <motion.span
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block origin-bottom"
            >
              🚀
            </motion.span>
          </h2>

          <p className="text-text-secondary text-sm md:text-base max-w-2xl mx-auto mb-4">
            {CONTACT_DATA.subheadline}
          </p>

          {/* Availability Badge - COMPACT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-2.5 bg-bg-surface border border-brand-main/10 rounded-full px-4 py-2 shadow-sm"
          >
            <div className="flex items-center gap-1.5">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-2 h-2 rounded-full ${getStatusColor()}`}
              />
              <span className="text-text-primary text-xs font-bold">{getStatusText()}</span>
            </div>
            <div className="w-px h-3 bg-text-muted/20" />
            <div className="flex items-center gap-1.5 text-text-secondary text-[10px]">
              <Zap size={10} />
              <span className="font-semibold">{CONTACT_DATA.availability.responseTime} response</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Cards - COMPACT */}
        <div className="grid md:grid-cols-3 gap-3 mb-6">
          {CONTACT_DATA.primaryContacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${contact.color} rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`} />
              
              {/* Card */}
              <div className="relative bg-bg-surface rounded-xl p-5 shadow-sm hover:shadow-xl border border-brand-main/5 h-full flex flex-col">
                <div className="text-3xl mb-2">{contact.icon}</div>

                <h3 className="text-xs font-black text-text-primary mb-1 uppercase tracking-wide">
                  {contact.label}
                </h3>

                <div className="flex-1 mb-3">
                  <p className="text-text-secondary font-bold text-sm mb-0.5">
                    {contact.displayValue}
                  </p>
                  <p className="text-text-muted text-[10px]">
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
                    className={`flex-1 bg-gradient-to-r ${contact.color} text-white py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-shadow`}
                  >
                    {contact.id === "email" ? <Mail size={12} /> : 
                     contact.id === "whatsapp" ? <MessageCircle size={12} /> : 
                     <ExternalLink size={12} />}
                    <span>Open</span>
                  </motion.a>

                  <motion.button
                    onClick={() => copyToClipboard(contact.value, contact.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-bg-inverse text-text-inverse hover:bg-black py-2 px-3 rounded-lg font-bold transition-colors"
                    aria-label="Copy to clipboard"
                  >
                    {copiedId === contact.id ? (
                      <Check size={14} className="text-status-success" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Links - COMPACT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="bg-bg-subtle/50 backdrop-blur-md border border-brand-main/5 rounded-xl p-5"
        >
          <p className="text-text-secondary text-xs font-bold mb-3 text-center">
            Or find me on social media
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
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
                className="bg-bg-surface hover:bg-white border border-brand-main/5 rounded-lg p-3 flex flex-col items-center gap-1.5 transition-all group shadow-sm hover:shadow-md"
              >
                <span className="text-xl">{social.icon}</span>
                <span className="text-text-primary text-[10px] font-bold">{social.label}</span>
                <span className="text-text-muted text-[9px] group-hover:text-text-primary transition-colors">
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
          className="mt-6 text-center"
        >
          <p className="text-text-muted text-[10px]">
            📍 Based in {CONTACT_DATA.availability.timezone} • Usually reply within {CONTACT_DATA.availability.responseTime}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
