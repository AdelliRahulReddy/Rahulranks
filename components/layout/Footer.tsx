"use client";

import { useLayoutEffect, useRef } from "react";
import { Github, Linkedin, Twitter, Mail, ArrowUp, Heart } from "lucide-react";
import gsap from "gsap";


export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/rahul", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/rahulranks", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/rahulranks", label: "Twitter/X" },
    { icon: Mail, href: "mailto:hello@rahulranks.com", label: "Email" },
  ];

  const footerLinks = [
    { name: "Home", href: "#home" },
    { name: "Solutions", href: "#solutions" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  // Handle nav click
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace("#", "");
    scrollToSection(sectionId);
  };

  // Handle back to top
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Animate on scroll into view
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.fromTo(
                ".footer-logo",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
              );

              gsap.fromTo(
                ".footer-column",
                { opacity: 0, y: 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  stagger: 0.1,
                  ease: "power3.out",
                  delay: 0.2
                }
              );

              gsap.fromTo(
                ".social-icon",
                { scale: 0, rotate: -180 },
                {
                  scale: 1,
                  rotate: 0,
                  duration: 0.5,
                  stagger: 0.08,
                  ease: "back.out(1.7)",
                  delay: 0.4
                }
              );

              gsap.fromTo(
                ".footer-bottom",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.6 }
              );

              observer.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );

      if (footerRef.current) {
        observer.observe(footerRef.current);
      }

      return () => observer.disconnect();
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    // REFACTORED: bg-bg-inverse (Global Dark Theme)
    <footer ref={footerRef} className="bg-bg-inverse text-text-inverse mt-20 relative overflow-hidden">
      {/* REFACTORED: Gradients using accent-rose and brand-main */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-rose/5 via-transparent to-brand-main/5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="footer-logo opacity-0">
            <h3 className="text-2xl font-black mb-2 group cursor-default">
              Rahulranks
              {/* REFACTORED: text-accent-rose */}
              <span className="text-accent-rose inline-block group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">.</span>
            </h3>
            {/* REFACTORED: text-text-muted */}
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Building SEO-ready tools & MVPs with modern frameworks. Turning ideas into production-ready products.
            </p>
            {/* REFACTORED: text-text-secondary */}
            <div className="mt-4 flex items-center gap-2 text-xs text-text-secondary">
              <span>Crafted with</span>
              {/* REFACTORED: text-accent-rose */}
              <Heart size={12} className="text-accent-rose animate-pulse" fill="currentColor" />
              <span>in India</span>
            </div>
          </div>

          <div className="footer-column opacity-0">
            {/* REFACTORED: text-text-secondary */}
            <h4 className="text-xs uppercase font-bold tracking-widest text-text-secondary mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    // REFACTORED: text-text-muted hover:text-text-inverse
                    className="text-text-muted hover:text-text-inverse text-sm transition-all inline-flex items-center gap-1 group hover:translate-x-1 cursor-pointer"
                  >
                    {/* REFACTORED: bg-accent-rose */}
                    <span className="w-0 h-0.5 bg-accent-rose group-hover:w-4 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column opacity-0">
            <h4 className="text-xs uppercase font-bold tracking-widest text-text-secondary mb-4">
              Connect
            </h4>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    // REFACTORED: bg-text-inverse/5 hover:bg-accent-rose
                    className="social-icon w-10 h-10 rounded-full bg-text-inverse/5 hover:bg-accent-rose flex items-center justify-center transition-all hover:scale-110 group relative opacity-0"
                  >
                    <Icon size={18} className="group-hover:scale-110 transition-transform" />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold shadow-lg">
                      {social.label}
                    </span>
                  </a>
                );
              })}
            </div>
            <p className="text-text-secondary text-xs mt-4">
              Open to freelance projects and collaborations
            </p>
          </div>
        </div>

        {/* REFACTORED: border-text-inverse/10 */}
        <div className="border-t border-text-inverse/10 pt-6 footer-bottom opacity-0">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted">
            <p className="flex items-center gap-2">
              © {currentYear} <span className="font-bold text-text-inverse">Rahul</span>. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#privacy"
                className="hover:text-text-inverse transition-colors relative group"
              >
                Privacy Policy
                {/* REFACTORED: bg-accent-rose */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-rose group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#terms"
                className="hover:text-text-inverse transition-colors relative group"
              >
                Terms of Service
                {/* REFACTORED: bg-accent-rose */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-rose group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
          </div>
        </div>

        <button
          onClick={handleBackToTop}
          // REFACTORED: bg-accent-rose hover:bg-accent-rose/90 hover:shadow-accent-rose/50
          className="absolute bottom-8 right-8 w-12 h-12 bg-accent-rose hover:brightness-110 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-accent-rose/50 transition-all hover:scale-110 group footer-bottom opacity-0 cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
