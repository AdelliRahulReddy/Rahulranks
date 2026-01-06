"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
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
    <div ref={containerRef} className="w-full relative z-10 py-8">
      {/* Background - Subtle */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen dark:mix-blend-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-main/10 rounded-full blur-[120px]" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* LEFT: Stats Dashboard */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-brand-main" />
              <p className="text-brand-main font-mono text-xs uppercase tracking-wider font-bold">
                My Journey
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black font-serif leading-tight mb-4 text-text-primary">
              Learning While Building.
            </h2>
            <p className="text-text-secondary text-base max-w-md mb-8">
              Solo developer offering <span className="text-brand-main font-bold">free services</span> to build experience. Your project helps me learn!
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {SOLUTIONS_STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-bg-surface backdrop-blur-md rounded-2xl p-4 border border-border-subtle hover:border-brand-main/50 hover:shadow-lg transition-all cursor-default group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl text-text-primary group-hover:text-brand-main transition-colors">{stat.icon}</span>
                  <div
                    className="w-2 h-2 rounded-full group-hover:scale-150 transition-transform"
                    style={{ backgroundColor: stat.color }}
                  />
                </div>
                <div className="text-2xl font-black text-text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2 }}
                  className="px-3 py-1.5 bg-bg-surface text-text-primary rounded-full text-[10px] font-bold flex items-center gap-1.5 border border-border-subtle hover:border-brand-main/30 shadow-sm transition-all"
                >
                  <span>{tech.icon}</span>
                  <span>{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-main text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-brand-main/40 transition-all group"
          >
            Start Your Project
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* RIGHT: Physics Pills Canvas */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative h-[400px] w-full"
        >
          <div
            ref={canvasRef}
            className={cn(
              "absolute inset-0 bg-bg-surface/50 backdrop-blur-xl rounded-[2rem] border border-border-subtle shadow-inner overflow-hidden",
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            )}
            style={{ touchAction: 'none' }}
          >
            {/* Helper Text */}
            <div className="absolute top-4 left-4 right-4 pointer-events-none z-10">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider text-center">
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
                    "absolute top-0 left-0 rounded-full text-white shadow-lg whitespace-nowrap select-none will-change-transform border border-white/20 backdrop-blur-sm",
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
        </motion.div>
      </div>
    </div>
  );
}
