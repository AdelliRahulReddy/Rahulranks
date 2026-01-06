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
  const logoRef = useRef<HTMLAnchorElement>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const text = "Rahulranks";
  const letters = text.split("");

  /* -------------------------------
     Scroll state tracking
  -------------------------------- */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* -------------------------------
     Smooth scroll helper
  -------------------------------- */
  const scrollToSection = (sectionId: string) => {
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const offset = 80;
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
        y: 0
      });
      gsap.set(".logo-dot", { opacity: 0, scale: 0 });

      const tl = gsap.timeline({ delay: 0.1 });

      tl.to(firstChar, {
        opacity: 1,
        scale: 1,
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
      <header
        ref={containerRef}
        className={cn(
          "fixed top-0 left-0 z-50 w-full h-[64px] transition-all duration-300",
          "flex items-center justify-between px-6 md:px-12"
        )}
      >
        {/* Background */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-300",
            scrolled
              ? "bg-bg-surface border-b border-border-subtle shadow-md"
              : "bg-transparent"
          )}
        />

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
                "logo-char inline-block font-black transition-colors",
                `logo-char-${i}`,
                "text-2xl md:text-3xl",
                i === 0
                  ? "text-accent"
                  : "text-text-primary group-hover:text-accent"
              )}
              style={{
                marginRight: char === "r" ? "-0.01em" : "-0.03em",
                fontFamily: "var(--font-outfit)"
              }}
            >
              {char}
            </span>
          ))}
          <span className="logo-dot inline-block w-2 h-2 ml-1 mb-1 rounded-full bg-accent" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12 relative z-10">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            const active = activeSection === id;

            return (
              <a
                key={id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "nav-item relative text-xs uppercase font-bold tracking-[0.2em] transition-colors group",
                  "font-sans",
                  active
                    ? "text-accent"
                    : "text-text-muted hover:text-text-primary"
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-[2px] bg-accent transition-all duration-300 rounded-full",
                    active ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </a>
            );
          })}

          <div className="h-6 w-px bg-border-subtle mx-2" />

          <button
            onClick={handleCTAClick}
            className="nav-item px-8 py-2.5 rounded-full bg-accent text-bg-surface text-xs font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-all shadow-md transform hover:-translate-y-0.5 font-sans"
          >
            Hire Me
          </button>
        </nav>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-4 relative z-10">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-text-primary hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-text-primary/50"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <nav className="absolute top-[64px] left-0 right-0 bg-bg-surface border-b border-border-subtle shadow-xl p-6 space-y-4">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const active = activeSection === id;

              return (
                <a
                  key={id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "block text-sm uppercase font-bold tracking-wider py-2 font-sans transition-all",
                    active
                      ? "text-accent"
                      : "text-text-muted hover:text-accent"
                  )}
                >
                  {link.name}
                </a>
              );
            })}

            <button
              onClick={handleCTAClick}
              className="w-full px-5 py-3 rounded-full bg-accent text-bg-surface text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all font-sans shadow-md"
            >
              Hire Me
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
