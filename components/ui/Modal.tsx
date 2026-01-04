"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Award, Calendar } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "certificate" | "testimonial";
  data: any;
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-slate-800 transition-colors shadow-lg"
              >
                <X size={20} />
              </motion.button>

              <div className="overflow-y-auto max-h-[90vh]">
                {type === "certificate" ? (
                  // CERTIFICATE MODAL
                  <div>
                    {/* Header */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4"
                      >
                        <Award size={32} className="text-orange-400" />
                      </motion.div>
                      <h2 className="text-2xl font-black mb-2">{data.name}</h2>
                      <p className="text-gray-300 text-sm">Issued by {data.issuer}</p>
                    </div>

                    {/* Certificate Image */}
                    <div className="relative w-full h-80 bg-gray-100">
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
                            <div className="text-6xl mb-3">🎓</div>
                            <p className="text-gray-500 font-bold">Certificate preview</p>
                            <p className="text-xs text-gray-400">Coming soon</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={16} />
                          <span className="text-sm font-bold">{data.date}</span>
                        </div>
                        {data.verifyLink && data.status === "active" && (
                          <a
                            href={data.verifyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm font-bold"
                          >
                            <span>Verify Certificate</span>
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                      <p className="text-gray-600 leading-relaxed">{data.description}</p>
                    </div>
                  </div>
                ) : (
                  // TESTIMONIAL MODAL
                  <div>
                    {/* Header */}
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-black">
                          {data.name.charAt(0)}
                        </div>
                        <div>
                          <h2 className="text-xl font-black">{data.name}</h2>
                          <p className="text-orange-100 text-sm">{data.role}</p>
                          <p className="text-orange-200 text-xs">{data.company}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < data.rating ? "text-yellow-300 text-xl" : "text-white/30 text-xl"}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Content */}
                    <div className="p-8">
                      <div className="mb-6">
                        <span className="text-6xl text-orange-500 opacity-20">"</span>
                        <p className="text-lg text-gray-700 leading-relaxed italic -mt-8 ml-8">
                          {data.text}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                        <div>
                          <p className="text-sm font-bold text-gray-900">Project: {data.project}</p>
                          <p className="text-xs text-gray-500">{data.date}</p>
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
