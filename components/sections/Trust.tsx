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
  const [modalData, setModalData] = useState<Record<string, unknown> | null>(null);
  const [modalType, setModalType] = useState<"certificate" | "testimonial">("certificate");

  const openModal = (type: "certificate" | "testimonial", data: Record<string, unknown>) => {
    setModalType(type);
    setModalData(data);
    setModalOpen(true);
  };

  const placeholders = [
    {
      icon: <Award size={28} className="text-status-success" />,
      title: "Certifications",
      subtitle: TRUST_DATA.certifications.filter(c => c.status === "active").length > 0
        ? `${TRUST_DATA.certifications.filter(c => c.status === "active").length} Certificate(s) Earned`
        : "Earning credentials in 2025",
      status: TRUST_DATA.certifications.filter(c => c.status === "active").length > 0 ? "active" : "in_progress",
      emoji: "🎓",
      color: "from-status-success/20 to-status-success/10",
      data: TRUST_DATA.certifications,
      clickType: "certificate" as const
    },
    {
      icon: <MessageCircle size={28} className="text-brand-main" />,
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
      icon: <Star size={28} className="text-status-warning" />,
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
      icon: <TrendingUp size={28} className="text-accent-rose" />,
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
        className="w-full relative z-10"
      >
        {/* Animated Background - Subtle global blend */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen dark:mix-blend-screen">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-brand-main/20 to-accent-rose/20 rounded-full blur-3xl opacity-50"
          />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={16} className="text-brand-main" />
              </motion.div>
              <p className="text-brand-main font-mono text-xs uppercase tracking-[0.2em] font-bold">
                Trust & Recognition
              </p>
            </div>

            <h2 className="text-4xl md:text-5xl font-black font-serif text-text-primary mb-4">
              Building Credibility{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                🏆
              </motion.span>
            </h2>

            <p className="text-text-secondary text-base max-w-xl mx-auto mb-6">
              Click any card to view details. Real credentials and testimonials as I grow.
            </p>

            {/* Progress Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-bg-surface border border-border-subtle rounded-full px-4 py-2 shadow-sm"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 size={14} className="text-brand-main" />
              </motion.div>
              <span className="text-xs font-bold text-text-primary">2025 Journey Started</span>
            </motion.div>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {placeholders.map((item, index) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                      if (activeItem) openModal(item.clickType, activeItem);
                    }
                  }}
                  className={`group relative bg-bg-surface backdrop-blur-md rounded-2xl p-6 border border-border-subtle hover:border-brand-main/50 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl ${isClickable ? 'cursor-pointer' : 'cursor-default'
                    }`}
                >
                  {/* Gradient Glow */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: isClickable ? 0.3 : 0.05 }}
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} blur-xl`}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      animate={{
                        y: [0, -6, 0],
                        rotate: index % 2 === 0 ? [0, 5, 0] : [0, -5, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="mb-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-bg-subtle flex items-center justify-center border border-text-muted/10 shadow-inner">
                        {item.icon}
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-lg font-black font-serif text-text-primary mb-1">
                      {item.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs text-text-muted mb-4 leading-relaxed h-8 line-clamp-2">
                      {item.subtitle}
                    </p>

                    {/* Status Badge */}
                    <div className="flex items-center gap-1.5 border-t border-border-subtle pt-4">
                      {item.status === "active" ? (
                        <>
                          <span className="text-base">{item.emoji}</span>
                          <span className="text-[10px] font-bold text-status-success uppercase tracking-wider">
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
                          <span className="text-[10px] font-bold text-brand-main uppercase tracking-wider">
                            In Progress
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-base">{item.emoji}</span>
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                            Coming Soon
                          </span>
                        </>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {item.status === "in_progress" && (
                      <div className="mt-3 h-1 bg-bg-subtle rounded-full overflow-hidden border border-border-subtle">
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
            <p className="text-text-muted text-xs italic">
              &quot;Building in public. Every project is a step forward.&quot; 🚀
            </p>
          </motion.div>
        </div>
      </div>

      {/* Modal - Already Component based, assumes it uses Portal/Overlay which we might need to check if it has hardcoded styles */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        data={modalData}
      />
    </>
  );
}
