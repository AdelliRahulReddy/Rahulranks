"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Award, Calendar } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "certificate" | "testimonial";
  data: any; // Using any for flexibility with heterogeneous data types
}

export default function Modal({ isOpen, onClose, type, data }: ModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-bg-inverse/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="bg-bg-surface rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl relative border border-text-muted/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - COMPACT */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-3 right-3 z-10 w-8 h-8 bg-bg-inverse text-text-inverse rounded-full flex items-center justify-center hover:bg-black transition-colors shadow-lg"
              >
                <X size={16} />
              </motion.button>

              <div className="overflow-y-auto max-h-[85vh] custom-scrollbar">
                {type === "certificate" ? (
                  // CERTIFICATE MODAL - COMPACT
                  <div>
                    {/* Header - COMPACT */}
                    <div className="bg-gradient-to-br from-brand-main to-brand-dark text-white p-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3"
                      >
                        <Award size={24} className="text-status-warning" />
                      </motion.div>
                      <h2 className="text-xl font-black font-serif mb-1">{data.name}</h2>
                      <p className="text-white/80 text-xs">Issued by {data.issuer}</p>
                    </div>

                    {/* Certificate Image - COMPACT */}
                    <div className="relative w-full h-64 bg-bg-subtle">
                      {data.status === "active" && data.image ? (
                        <Image
                          src={data.image}
                          alt={data.name}
                          fill
                          className="object-contain p-4"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-5xl mb-2">🎓</div>
                            <p className="text-text-primary font-bold text-sm">Certificate preview</p>
                            <p className="text-[10px] text-text-muted">Coming soon</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Details - COMPACT */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-1.5 text-text-secondary">
                          <Calendar size={14} />
                          <span className="text-xs font-bold">{data.date}</span>
                        </div>
                        {data.verifyLink && data.status === "active" && (
                          <a
                            href={data.verifyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-brand-main hover:text-brand-dark text-xs font-bold"
                          >
                            <span>Verify Certificate</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed">{data.description}</p>
                    </div>
                  </div>
                ) : (
                  // TESTIMONIAL MODAL - COMPACT
                  <div>
                    {/* Header - COMPACT */}
                    <div className="bg-gradient-to-br from-brand-main to-brand-dark text-white p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-lg font-black">
                          {data.name.charAt(0)}
                        </div>
                        <div>
                          <h2 className="text-base font-black font-serif">{data.name}</h2>
                          <p className="text-white/80 text-xs">{data.role}</p>
                          <p className="text-white/60 text-[10px]">{data.company}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < data.rating ? "text-status-warning text-lg" : "text-white/30 text-lg"}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Content - COMPACT */}
                    <div className="p-6">
                      <div className="mb-4">
                        <span className="text-5xl text-brand-main opacity-20">&quot;</span>
                        <p className="text-base text-text-secondary leading-relaxed italic -mt-6 ml-6">
                          {data.text}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-text-muted/10">
                        <div>
                          <p className="text-xs font-bold text-text-primary">Project: {data.project}</p>
                          <p className="text-[10px] text-text-muted">{data.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
