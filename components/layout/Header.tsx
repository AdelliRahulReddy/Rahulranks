"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Solutions", href: "#solutions" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" }
];

export default function Header() {
  const containerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const text = "Rahulranks";
  const letters = text.split("");

  /* -------------------------------
     Smooth scroll helper
  -------------------------------- */
  const scrollToSection = (sectionId: string) => {
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const offset = 56; // ✅ REDUCED from 68 to 56
      const top = el.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    scrollToSection(href.replace("#", ""));
    setMobileMenuOpen(false);
  };

  const handleCTAClick = () => {
    scrollToSection("contact");
    setMobileMenuOpen(false);
  };

  /* -------------------------------
     Active section tracking
  -------------------------------- */
  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + 120;

      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const id = NAV_LINKS[i].href.replace("#", "");
        const sec = document.getElementById(id);
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(id);
          return;
        }
      }

      if (window.scrollY < 100) setActiveSection("home");
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* -------------------------------
     Logo + nav entrance animation
  -------------------------------- */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const firstChar = document.querySelector(".logo-char-0");
      if (!firstChar) return;

      gsap.set(".logo-char", { opacity: 0, y: -16 });
      gsap.set(firstChar, {
        opacity: 0,
        scale: 0.85,
        filter: "blur(6px)",
        y: 0
      });
      gsap.set(".logo-dot", { opacity: 0, scale: 0 });

      const tl = gsap.timeline({ delay: 0.1 });

      tl.to(firstChar, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "elastic.out(1, 0.5)"
      });

      tl.to(
        ".logo-char:not(.logo-char-0)",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "power3.out"
        },
        "-=0.3"
      );

      tl.to(
        ".logo-dot",
        {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: "back.out(2)"
        },
        "-=0.2"
      );

      const navItems =
        containerRef.current?.querySelectorAll(".nav-item") || [];

      tl.fromTo(
        navItems,
        { y: -12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out"
        },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* -------------------------------
     Logo hover animation
  -------------------------------- */
  const handleLogoHover = () => {
    gsap.to(".logo-char", {
      y: -5,
      duration: 0.25,
      stagger: 0.03,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    });

    gsap.to(".logo-dot", {
      scale: 1.3,
      rotate: 180,
      duration: 0.35,
      ease: "back.out(2)"
    });
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        ref={containerRef}
        className="
          fixed top-0 left-0 z-50 w-full h-[56px]
          flex items-center justify-between
          px-4 md:px-8
        "
      >
        {/* Background layer */}
        <div className="absolute inset-0 bg-bg-canvas/95 backdrop-blur-xl border-b border-gray-200/60 shadow-sm" />

        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          ref={logoRef}
          onMouseEnter={handleLogoHover}
          className="relative z-10 flex items-baseline cursor-pointer group"
          aria-label={text}
        >
          {letters.map((char, i) => (
            <span
              key={i}
              className={cn(
                "logo-char inline-block font-black text-2xl md:text-3xl transition-colors",
                `logo-char-${i}`,
                i === 0
                  ? "text-accent-rose"
                  : "text-text-primary group-hover:text-accent-rose"
              )}
              style={{
                marginRight: char === "r" ? "-0.01em" : "-0.03em"
              }}
            >
              {char}
            </span>
          ))}
          <span className="logo-dot inline-block w-2 h-2 ml-1 mb-1 rounded-full bg-accent-rose shadow-lg shadow-accent-rose/50" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 relative z-10">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            const active = activeSection === id;

            return (
              <a
                key={id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "nav-item relative text-xs uppercase font-bold tracking-widest transition-colors",
                  active
                    ? "text-accent-rose"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {link.name}
                {active && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent-rose rounded-full" />
                )}
              </a>
            );
          })}

          <button
            onClick={handleCTAClick}
            className="nav-item px-5 py-2 rounded-full bg-bg-inverse text-text-inverse text-[10px] font-extrabold uppercase tracking-widest hover:bg-accent-rose hover:scale-105 transition-all shadow-lg hover:shadow-accent-rose/50"
          >
            Let's Talk
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden relative z-10 p-2 text-text-primary hover:text-accent-rose transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          <nav className="absolute top-[56px] left-0 right-0 bg-bg-canvas border-b border-gray-200 shadow-xl p-6 space-y-4">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const active = activeSection === id;

              return (
                <a
                  key={id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "block text-sm uppercase font-bold tracking-wider py-2",
                    active
                      ? "text-accent-rose"
                      : "text-text-secondary hover:text-accent-rose"
                  )}
                >
                  {link.name}
                </a>
              );
            })}

            <button
              onClick={handleCTAClick}
              className="w-full px-5 py-3 rounded-full bg-bg-inverse text-text-inverse text-xs font-bold uppercase tracking-wider hover:bg-accent-rose transition-all"
            >
              Let's Talk
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
