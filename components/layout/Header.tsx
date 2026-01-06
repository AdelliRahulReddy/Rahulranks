"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { Menu, X, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Solutions", href: "#solutions" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" }
];

export default function Header() {
  const { theme, setTheme } = useTheme();
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
      <header
        ref={containerRef}
        className={cn(
          "fixed top-0 left-0 z-50 w-full h-[64px] transition-all duration-300",
          "flex items-center justify-between px-6 md:px-12"
        )}
      >
        {/* Glass Background */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-300",
            scrolled
              ? "glass border-b border-border-subtle shadow-lg"
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
                  ? "text-brand-main"
                  : "text-text-primary group-hover:text-brand-main"
              )}
              style={{
                marginRight: char === "r" ? "-0.01em" : "-0.03em",
                fontFamily: "var(--font-outfit)"
              }}
            >
              {char}
            </span>
          ))}
          <span className="logo-dot inline-block w-2 h-2 ml-1 mb-1 rounded-full bg-brand-main shadow-[0_0_10px_var(--color-brand-main)]" />
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
                    ? "text-brand-main"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-[2px] bg-brand-main transition-all duration-300 rounded-full",
                    active ? "w-full shadow-[0_0_8px_var(--color-brand-main)]" : "w-0 group-hover:w-full"
                  )}
                />
              </a>
            );
          })}

          <div className="h-6 w-px bg-border-strong mx-2" />

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-bg-subtle transition-colors text-text-secondary hover:text-brand-main group"
            aria-label="Toggle Theme"
          >
            <div className="relative w-5 h-5">
              <Sun className="absolute inset-0 h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
              <Moon className="absolute inset-0 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-indigo-400" />
            </div>
          </button>

          <button
            onClick={handleCTAClick}
            className="nav-item px-8 py-2.5 rounded-full bg-brand-main text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-brand-dark transition-all shadow-lg hover:shadow-brand-main/50 transform hover:-translate-y-0.5 font-sans hover-scale"
          >
            Hire Me
          </button>
        </nav>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-4 relative z-10">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 text-text-primary hover:text-brand-main transition-colors"
          >
            {theme === 'dark' ? <Moon size={20} className="text-indigo-400" /> : <Sun size={20} className="text-amber-500" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-text-primary hover:text-brand-main transition-colors"
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
            className="absolute inset-0 bg-bg-inverse/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <nav className="absolute top-[64px] left-0 right-0 glass border-b border-border-subtle shadow-xl p-6 space-y-4">
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
                      ? "text-brand-main"
                      : "text-text-secondary hover:text-brand-main"
                  )}
                >
                  {link.name}
                </a>
              );
            })}

            <button
              onClick={handleCTAClick}
              className="w-full px-5 py-3 rounded-full bg-brand-main text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-dark transition-all font-sans shadow-lg hover:shadow-brand-main/40"
            >
              Hire Me
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
