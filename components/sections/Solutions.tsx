"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { SOLUTIONS_STATS, TECH_STACK } from "@/lib/constants";
import { PILLS_DATA } from "@/lib/pills";

export default function SolutionsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isInView = useInView(containerRef, { amount: 0.2, once: true });
  const [isMounted, setIsMounted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !isInView || !canvasRef.current) return;

    const {
      Engine,
      Runner,
      Bodies,
      Composite,
      Mouse,
      MouseConstraint,
      Events,
      Body,
    } = Matter;

    const engine = Engine.create();
    engine.gravity.y = 1.15;
    const world = engine.world;

    const container = canvasRef.current;
    const { width, height } = container.getBoundingClientRect();

    if (width === 0 || height === 0) return;

    const wallThickness = 200;
    const wallHeight = height * 5;

    const ground = Bodies.rectangle(
      width / 2,
      height + wallThickness / 2,
      width + 300,
      wallThickness,
      { isStatic: true }
    );

    const leftWall = Bodies.rectangle(
      -wallThickness / 2,
      height / 2 - height,
      wallThickness,
      wallHeight,
      { isStatic: true }
    );

    const rightWall = Bodies.rectangle(
      width + wallThickness / 2,
      height / 2 - height,
      wallThickness,
      wallHeight,
      { isStatic: true }
    );

    Composite.add(world, [ground, leftWall, rightWall]);

    const pillBodies: Matter.Body[] = [];
    const padding = 30;

    PILLS_DATA.forEach((pill, index) => {
      const el = pillsRef.current[index];
      if (!el) return;

      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const isLarge = pill.size === 'large';

      const x = padding + Math.random() * (width - padding * 2);
      const y = -Math.random() * 500 - 150;

      const body = Bodies.rectangle(x, y, w, h, {
        chamfer: { radius: h / 2 },
        restitution: 0.18,
        friction: 0.25,
        frictionAir: isLarge ? 0.035 : 0.025,
        density: isLarge ? 0.0022 : 0.0014,
        angle: (Math.random() - 0.5) * 0.3,
      });

      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.02);
      pillBodies.push(body);
    });

    Composite.add(world, pillBodies);

    const mouse = Mouse.create(container);
    mouse.pixelRatio = 1;

    // Disable scroll hijacking
    mouse.element.removeEventListener('mousewheel', (mouse as any).mousewheel);
    mouse.element.removeEventListener('DOMMouseScroll', (mouse as any).mousewheel);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.15,
        render: { visible: false },
      },
    });

    Events.on(mouseConstraint, 'startdrag', () => setIsDragging(true));
    Events.on(mouseConstraint, 'enddrag', () => setIsDragging(false));

    Composite.add(world, mouseConstraint);

    const runner = Runner.create();
    Runner.run(runner, engine);

    Events.on(engine, 'afterUpdate', () => {
      pillBodies.forEach((body, index) => {
        const el = pillsRef.current[index];
        if (!el) return;

        // Respawn pills that fall out
        if (
          body.position.y > height + 300 ||
          body.position.x < -200 ||
          body.position.x > width + 200
        ) {
          Body.setPosition(body, {
            x: padding + Math.random() * (width - padding * 2),
            y: -150,
          });

          Body.setVelocity(body, {
            x: (Math.random() - 0.5) * 0.5,
            y: 0,
          });

          Body.setAngularVelocity(body, 0);
        }

        const { x, y } = body.position;
        const rotation = body.angle * (180 / Math.PI);

        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${rotation}deg)`;
      });
    });

    return () => {
      Runner.stop(runner);
      Matter.Engine.clear(engine);
      Composite.clear(world, false);
    };
  }, [isMounted, isInView]);

  const getPillSize = (size: string) => {
    switch (size) {
      case 'large': return 'px-6 py-2.5 text-base font-bold';
      case 'medium': return 'px-4 py-1.5 text-sm font-semibold';
      default: return 'px-3 py-1 text-xs';
    }
  };

  return (
    <div ref={containerRef} className="w-full relative z-10 flex flex-col gap-12">
      {/* 1. Header Row: Text Content */}
      <div className="w-full">
        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 w-fit"
          >
            <Sparkles size={14} className="text-accent" />
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">My growth strategy</span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-text-primary leading-[1.1]"
          >
            Turning curiosity into <br />
            <span className="text-accent italic whitespace-nowrap">ready-to-ship</span> products.
          </motion.h3>
        </div>
      </div>

      {/* 2. Main content Grid: Perfectly Aligned Wheel and Pills */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* LEFT: Commitment Wheel */}
        <div className="flex justify-center items-center h-full">
          <div className="relative w-80 h-80 md:w-[420px] md:h-[420px] group/wheel">
            <div className="absolute inset-0 bg-accent/5 rounded-full blur-[100px] pointer-events-none group-hover/wheel:bg-accent/10 transition-colors duration-700" />

            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_15px_40px_rgba(0,0,0,0.06)] overflow-visible">
              {/* Segment 1: Fresh Start */}
              <motion.path
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                viewport={{ once: true }}
                d="M 50,50 L 50,5 A 45,45 0 0 1 89,27.5 Z"
                fill="white"
                className="stroke-border-subtle/30 stroke-[0.4] cursor-pointer transition-all duration-300"
              />

              {/* Segment 2: 100% Commitment */}
              <motion.path
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                viewport={{ once: true }}
                d="M 50,50 L 89,27.5 A 45,45 0 0 1 89,72.5 Z"
                fill="#FDF8F0"
                className="stroke-border-subtle/30 stroke-[0.4] cursor-pointer transition-all duration-300"
              />

              {/* Segment 3: Free Projects */}
              <motion.path
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                viewport={{ once: true }}
                d="M 50,50 L 89,72.5 A 45,45 0 0 1 11,72.5 Z"
                fill="white"
                className="stroke-border-subtle/30 stroke-[0.4] cursor-pointer transition-all duration-300"
              />

              {/* Segment 4: Solo Dev */}
              <motion.path
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                viewport={{ once: true }}
                d="M 50,50 L 11,72.5 A 45,45 0 0 1 50,5 Z"
                fill="#FAF7F2"
                className="stroke-border-subtle/30 stroke-[0.4] cursor-pointer transition-all duration-300"
              />

              <circle cx="50" cy="50" r="14" fill="white" className="shadow-lg" />
              <foreignObject x="42" y="42" width="16" height="16">
                <div className="w-full h-full flex items-center justify-center text-accent">
                  <Activity size={14} />
                </div>
              </foreignObject>
            </svg>

            {/* Data-Rich Label Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[8%] left-1/2 -translate-x-1/2 flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.5 }}
                  className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-lg border border-border-subtle flex flex-col items-center"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">🌱</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-text-primary">Fresh Start</span>
                  </div>
                  <span className="text-[7px] font-bold text-text-muted mt-0.5 whitespace-nowrap uppercase">New Beginnings</span>
                </motion.div>
              </div>

              <div className="absolute top-1/2 right-[-2%] -translate-y-1/2 flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.6 }}
                  className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-lg border border-border-subtle flex flex-col items-center"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">💪</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-text-primary">100% Focused</span>
                  </div>
                  <span className="text-[7px] font-bold text-text-muted mt-0.5 whitespace-nowrap uppercase">Core Commitment</span>
                </motion.div>
              </div>

              <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.7 }}
                  className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-lg border border-border-subtle flex flex-col items-center"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">🎁</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-text-primary">Zero Cost</span>
                  </div>
                  <span className="text-[7px] font-bold text-text-muted mt-0.5 whitespace-nowrap uppercase">Initial Projects</span>
                </motion.div>
              </div>

              <div className="absolute top-1/2 left-[-2%] -translate-y-1/2 flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.8 }}
                  className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-lg border border-border-subtle flex flex-col items-center"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">👨‍💻</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-text-primary">Solo Dev</span>
                  </div>
                  <span className="text-[7px] font-bold text-text-muted mt-0.5 whitespace-nowrap uppercase">Pure Craftsmanship</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Physics Pills Canvas */}
        <div className="flex flex-col gap-6 w-full h-full justify-center">
          <div
            ref={canvasRef}
            className={cn(
              "relative w-full h-[360px] md:h-[420px] bg-bg-surface rounded-3xl border border-border-subtle shadow-inner overflow-hidden",
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            )}
            style={{ touchAction: 'none' }}
          >

            {/* Helper Text */}
            <div className="absolute top-3 left-3 right-3 pointer-events-none z-10">
              <p className="text-[9px] font-black text-text-muted uppercase tracking-wider text-center opacity-30">
                ✨ Drag & Interact
              </p>
            </div>

            {/* Pills */}
            <div className="absolute inset-0">
              {PILLS_DATA.map((pill, index) => (
                <div
                  key={index}
                  ref={(el) => { pillsRef.current[index] = el; }}
                  className={cn(
                    "absolute top-0 left-0 rounded-full shadow-md whitespace-nowrap select-none will-change-transform",
                    pill.color,
                    getPillSize(pill.size),
                    isDragging ? 'cursor-grabbing' : 'cursor-grab'
                  )}
                  style={{
                    transform: 'translate(-50%, -50%) translate(200px, -200px)',
                    touchAction: 'none',
                  }}
                >
                  {pill.sparkle && <span className="mr-1">✨</span>} {pill.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Footer Row: Tech Bar and CTA */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-8 border-t border-border-subtle">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 w-full lg:w-auto"
        >
          <span className="text-[10px] font-black text-text-muted uppercase tracking-widest whitespace-nowrap">Core Stack</span>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {TECH_STACK.map((tech) => (
              <div key={tech.name} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                <span className="text-accent text-sm">{tech.icon}</span>
                <span className="text-[11px] font-black text-text-primary uppercase tracking-tight">{tech.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-auto"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-10 py-4 bg-accent text-bg-surface rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-accent/20 hover:scale-[1.02] transition-all group w-full justify-center"
          >
            Collaborate With Me
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
