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
        className="bg-[#0f172a] rounded-[2.5rem] p-6 md:p-8 my-8 relative overflow-hidden shadow-2xl border border-white/10"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-brand-main/10 to-accent-rose/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10">
          {/* Compact Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={14} className="text-brand-main" />
              </motion.div>
              <p className="text-brand-main font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                Trust & Recognition
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-black font-serif text-white mb-2">
              Building Credibility{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                🏆
              </motion.span>
            </h2>

            <p className="text-text-secondary text-sm max-w-xl mx-auto mb-3">
              Click any card to view details. Real credentials and testimonials as I grow.
            </p>

            {/* Progress Banner - COMPACT */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-bg-surface border border-text-muted/20 rounded-full px-3 py-1.5 shadow-sm"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 size={12} className="text-brand-main" />
              </motion.div>
              <span className="text-[10px] font-bold text-text-primary">2025 Journey Started</span>
            </motion.div>
          </motion.div>

          {/* Grid - COMPACT */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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
                  className={`group relative bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-brand-main/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-300 overflow-hidden ${isClickable ? 'cursor-pointer' : 'cursor-default'
                    }`}
                >
                  {/* Gradient Glow */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: isClickable ? 0.3 : 0.05 }}
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} blur-xl`}
                  />

                  <div className="relative z-10">
                    {/* Icon - COMPACT */}
                    <motion.div
                      animate={{
                        y: [0, -6, 0],
                        rotate: index % 2 === 0 ? [0, 5, 0] : [0, -5, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="mb-3"
                    >
                      <div className="w-10 h-10 rounded-lg bg-bg-subtle flex items-center justify-center border border-text-muted/10">
                        {item.icon}
                      </div>
                    </motion.div>

                    {/* Title - COMPACT */}
                    <h3 className="text-sm font-black font-serif text-white mb-1">
                      {item.title}
                    </h3>

                    {/* Subtitle - COMPACT */}
                    <p className="text-[11px] text-text-muted mb-2 leading-relaxed">
                      {item.subtitle}
                    </p>

                    {/* Status Badge - COMPACT */}
                    <div className="flex items-center gap-1.5">
                      {item.status === "active" ? (
                        <>
                          <span className="text-base">{item.emoji}</span>
                          <span className="text-[9px] font-bold text-status-success uppercase">
                            Click to View
                          </span>
                        </>
                      ) : item.status === "in_progress" ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            <Loader2 size={10} className="text-brand-main" />
                          </motion.div>
                          <span className="text-[9px] font-bold text-brand-main uppercase">
                            In Progress
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-base">{item.emoji}</span>
                          <span className="text-[9px] font-bold text-text-muted uppercase">
                            Coming Soon
                          </span>
                        </>
                      )}
                    </div>

                    {/* Progress Bar - COMPACT */}
                    {item.status === "in_progress" && (
                      <div className="mt-2 h-0.5 bg-bg-subtle rounded-full overflow-hidden border border-text-muted/10">
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

          {/* Bottom Message - COMPACT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-6 text-center"
          >
            <p className="text-text-muted text-xs italic">
              &quot;Building in public. Every project is a step forward.&quot; 🚀
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
