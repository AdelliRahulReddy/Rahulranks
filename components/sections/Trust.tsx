"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Award, MessageCircle, Star, TrendingUp, Sparkles, Loader2 } from "lucide-react";
import { TRUST_DATA } from "@/lib/trust";
import Modal from "@/components/ui/Modal";

export default function TrustSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: true });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const [modalType, setModalType] = useState<"certificate" | "testimonial">("certificate");

  const openModal = (type: "certificate" | "testimonial", data: any) => {
    setModalType(type);
    setModalData(data);
    setModalOpen(true);
  };

  const placeholders = [
    {
      // REFACTORED: Status Success Color
      icon: <Award size={32} className="text-status-success" />,
      title: "Certifications",
      subtitle: TRUST_DATA.certifications.filter(c => c.status === "active").length > 0 
        ? `${TRUST_DATA.certifications.filter(c => c.status === "active").length} Certificate(s) Earned`
        : "Earning credentials in 2025",
      status: TRUST_DATA.certifications.filter(c => c.status === "active").length > 0 ? "active" : "in_progress",
      emoji: "🎓",
      color: "from-status-success/20 to-status-success/10", // Subtle gradient
      data: TRUST_DATA.certifications,
      clickType: "certificate" as const
    },
    {
      // REFACTORED: Brand Main Color
      icon: <MessageCircle size={32} className="text-brand-main" />,
      title: "Client Reviews",
      subtitle: TRUST_DATA.testimonials.filter(t => t.status === "active").length > 0
        ? `${TRUST_DATA.testimonials.filter(t => t.status === "active").length} Happy Client(s)`
        : "Building trust, one project at a time",
      status: TRUST_DATA.testimonials.filter(t => t.status === "active").length > 0 ? "active" : "coming_soon",
      emoji: "💬",
      color: "from-brand-main/20 to-brand-main/10",
      data: TRUST_DATA.testimonials,
      clickType: "testimonial" as const
    },
    {
      // REFACTORED: Warning Color (Star)
      icon: <Star size={32} className="text-status-warning" />,
      title: "Testimonials",
      subtitle: TRUST_DATA.testimonials.filter(t => t.status === "active").length > 0
        ? "⭐⭐⭐⭐⭐ Rated Work"
        : "First testimonial loading...",
      status: "coming_soon",
      emoji: "⭐",
      color: "from-status-warning/20 to-status-warning/10",
      data: TRUST_DATA.testimonials,
      clickType: "testimonial" as const
    },
    {
      // REFACTORED: Accent Rose
      icon: <TrendingUp size={32} className="text-accent-rose" />,
      title: "Recognition",
      subtitle: "Making impact, earning respect",
      status: "in_progress",
      emoji: "🏆",
      color: "from-accent-rose/20 to-accent-rose/10",
      data: [],
      clickType: "certificate" as const
    }
  ];

  return (
    <>
      <div
        ref={containerRef}
        // REFACTORED: Light Premium Background (Warm Glass Vibe)
        className="bg-gradient-to-br from-bg-subtle via-bg-surface to-bg-subtle rounded-[32px] md:rounded-[48px] p-8 md:p-12 my-8 relative overflow-hidden shadow-2xl border border-text-muted/10"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            // REFACTORED: Very subtle warm glow
            className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-brand-main/10 to-accent-rose/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={14} className="text-brand-main" />
              </motion.div>
              <p className="text-brand-main font-mono text-[10px] uppercase tracking-widest font-bold">
                Trust & Recognition
              </p>
            </div>

            {/* REFACTORED: Text Primary */}
            <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-3">
              Building Credibility{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                🏆
              </motion.span>
            </h2>

            {/* REFACTORED: Text Secondary */}
            <p className="text-text-secondary text-sm max-w-xl mx-auto mb-4">
              Click any card to view details. Real credentials and testimonials as I grow.
            </p>

            {/* Progress Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              // REFACTORED: White pill with shadow
              className="inline-flex items-center gap-2 bg-bg-surface border border-text-muted/20 rounded-full px-4 py-2 shadow-sm"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 size={14} className="text-brand-main" />
              </motion.div>
              {/* REFACTORED: Text Primary */}
              <span className="text-xs font-bold text-text-primary">2025 Journey Started</span>
            </motion.div>
          </motion.div>

          {/* Grid of Placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {placeholders.map((item, index) => {
              const hasActiveData = item.data.some((d: any) => d.status === "active");
              const isClickable = hasActiveData;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={isClickable ? { y: -5, scale: 1.02 } : { y: -2 }}
                  onClick={() => {
                    if (hasActiveData) {
                      const activeItem = item.data.find((d: any) => d.status === "active");
                      openModal(item.clickType, activeItem);
                    }
                  }}
                  // REFACTORED: White Card with border and shadow-sm
                  className={`group relative bg-bg-surface rounded-2xl p-6 border border-text-muted/10 hover:border-brand-main/30 hover:shadow-lg transition-all duration-300 overflow-hidden ${
                    isClickable ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  {/* Gradient Glow on Hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: isClickable ? 0.3 : 0.05 }}
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} blur-xl`}
                  />

                  <div className="relative z-10">
                    {/* Icon with Animation */}
                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                        rotate: index % 2 === 0 ? [0, 5, 0] : [0, -5, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="mb-4"
                    >
                      {/* REFACTORED: Light background for icon */}
                      <div className="w-12 h-12 rounded-xl bg-bg-subtle flex items-center justify-center border border-text-muted/10">
                        {item.icon}
                      </div>
                    </motion.div>

                    {/* Title - Text Primary */}
                    <h3 className="text-base font-black text-text-primary mb-1">
                      {item.title}
                    </h3>

                    {/* Subtitle - Text Muted */}
                    <p className="text-xs text-text-muted mb-3 leading-relaxed">
                      {item.subtitle}
                    </p>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      {item.status === "active" ? (
                        <>
                          <span className="text-lg">{item.emoji}</span>
                          {/* REFACTORED: Success Text */}
                          <span className="text-[10px] font-bold text-status-success uppercase">
                            Click to View
                          </span>
                        </>
                      ) : item.status === "in_progress" ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            <Loader2 size={12} className="text-brand-main" />
                          </motion.div>
                          <span className="text-[10px] font-bold text-brand-main uppercase">
                            In Progress
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-lg">{item.emoji}</span>
                          <span className="text-[10px] font-bold text-text-muted uppercase">
                            Coming Soon
                          </span>
                        </>
                      )}
                    </div>

                    {/* Animated Progress Bar (for "in progress" items) */}
                    {item.status === "in_progress" && (
                      // REFACTORED: Light track background
                      <div className="mt-3 h-1 bg-bg-subtle rounded-full overflow-hidden border border-text-muted/10">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: "60%" }}
                          transition={{ duration: 2, delay: 0.5 + index * 0.1 }}
                          className={`h-full bg-gradient-to-r ${item.color}`}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="text-text-muted text-sm italic">
              "Building in public. Every project is a step forward." 🚀
            </p>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        data={modalData}
      />
    </>
  );
}
