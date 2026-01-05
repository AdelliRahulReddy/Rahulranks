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
  const [engineStarted, setEngineStarted] = useState(false);

  useEffect(() => {
    if (!isInView || engineStarted || !canvasRef.current) return;

    const initTimer = setTimeout(() => {
        setEngineStarted(true);

        const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;
        
        const engine = Engine.create({ 
          enableSleeping: false,
          gravity: { x: 0, y: 0.8 } 
        });
        const world = engine.world;
        const container = canvasRef.current!;
        const { width, height } = container.getBoundingClientRect();

        if (!width || !height) return;

        const wallThick = 200;
        const ground = Bodies.rectangle(width / 2, height + wallThick / 2, width + 400, wallThick, { isStatic: true, render: { visible: false } });
        const leftWall = Bodies.rectangle(-wallThick / 2, height / 2, wallThick, height * 4, { isStatic: true, render: { visible: false } });
        const rightWall = Bodies.rectangle(width + wallThick / 2, height / 2, wallThick, height * 4, { isStatic: true, render: { visible: false } });
        Composite.add(world, [ground, leftWall, rightWall]);

        const pillBodies: Matter.Body[] = [];
        PILLS_DATA.forEach((pill, index) => {
            const el = pillsRef.current[index];
            if (!el) return;
            
            const w = el.offsetWidth;
            const h = el.offsetHeight;
            
            const x = Math.random() * (width - 100) + 50;
            const y = -Math.random() * 500 - 100; 

            const body = Bodies.rectangle(x, y, w, h, {
                chamfer: { radius: h / 2 },
                restitution: 0.4,
                friction: 0.1,
                density: 0.002, 
                angle: (Math.random() - 0.5) * 1,
            });
            pillBodies.push(body);
        });
        Composite.add(world, pillBodies);

        const mouse = Mouse.create(container);
        mouse.pixelRatio = 1; 
        // ✅ KEEP SCROLL: Don't prevent mousewheel
        // Commented out to allow scroll inside canvas
        // mouse.element.removeEventListener("mousewheel", mouse.mousewheel as any);
        // mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel as any);

        const mouseConstraint = MouseConstraint.create(engine, {
            mouse,
            constraint: { 
              stiffness: 0.2, 
              render: { visible: false } 
            }
        });
        Composite.add(world, mouseConstraint);

        const runner = Runner.create();
        Runner.run(runner, engine);

        Events.on(engine, 'afterUpdate', () => {
            pillBodies.forEach((body, index) => {
                const el = pillsRef.current[index];
                if (!el) return;
                const { x, y } = body.position;
                const rotation = body.angle * (180 / Math.PI);
                el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${rotation}deg)`;
            });
        });

    }, 100);

    return () => clearTimeout(initTimer);
  }, [isInView, engineStarted]);

  const getPillSize = (size: string) => {
    switch(size) {
      case 'large': return 'px-6 py-2.5 text-base font-bold';
      case 'medium': return 'px-4 py-1.5 text-sm font-semibold';
      default: return 'px-3 py-1 text-xs';
    }
  };

  return (
    <div ref={containerRef} className="bg-bg-subtle rounded-[2rem] md:rounded-[2.5rem] py-8 px-6 md:px-10 my-8 text-text-primary relative overflow-hidden border border-text-muted/10 shadow-lg">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 items-center">
        
        {/* LEFT: Stats Dashboard */}
        <div className="relative z-10">
          {/* Header - Compact Spacing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles size={14} className="text-brand-main" />
              <p className="text-brand-main font-mono text-xs uppercase tracking-wider font-bold">
                Our Expertise
              </p>
            </div>
            {/* ✅ ONE LINE: Removed <br/> */}
            <h2 className="text-3xl md:text-4xl font-black font-serif leading-tight mb-2 text-text-primary">
              Proven Excellence.
            </h2>
            <p className="text-text-secondary text-sm max-w-md mb-4">
              Real results from real projects. Numbers that speak for themselves.
            </p>
          </motion.div>

          {/* Stats Grid - Compact */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {SOLUTIONS_STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-bg-surface backdrop-blur-sm rounded-xl p-3 border border-text-muted/10 hover:border-brand-main/20 hover:shadow-md transition-all cursor-default group"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-xl text-text-primary">{stat.icon}</span>
                  <div 
                    className="w-1.5 h-1.5 rounded-full group-hover:scale-150 transition-transform"
                    style={{ backgroundColor: stat.color }}
                  />
                </div>
                <div className="text-xl font-black text-text-primary mb-0.5">
                  {stat.value}
                </div>
                <div className="text-[9px] font-bold text-text-muted uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <p className="text-[9px] font-bold text-text-muted uppercase tracking-wider mb-1.5">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {TECH_STACK.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2 }}
                  className="px-2.5 py-1 bg-bg-surface text-text-primary rounded-full text-[10px] font-bold flex items-center gap-1.5 border border-text-muted/10 hover:border-brand-main/30 shadow-sm transition-all"
                >
                  <span>{tech.icon}</span>
                  <span>{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Button - Compact */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-bg-inverse text-text-inverse px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all group"
          >
            Start Your Project
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* RIGHT: Physics Pills Canvas */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative h-[320px] w-full"
        >
           {/* ✅ SCROLL ENABLED: Removed touch-pan-y, added overflow-auto */}
           <div 
             ref={canvasRef} 
             className="absolute inset-0 bg-bg-surface rounded-[1.5rem] border border-text-muted/10 shadow-inner overflow-auto cursor-grab active:cursor-grabbing"
             data-lenis-prevent
           >
             {/* Helper Text */}
             <div className="absolute top-3 left-3 right-3 pointer-events-none z-10">
               <p className="text-[9px] font-bold text-text-muted uppercase tracking-wider text-center">
                 ✨ Drag & Interact • Scroll Enabled
               </p>
             </div>

             {/* Pills - Smaller Sizes */}
             {PILLS_DATA.map((pill, index) => (
               <div 
                 key={index} 
                 ref={(el) => { pillsRef.current[index] = el; }} 
                 className={cn(
                   "absolute top-0 left-0 rounded-full text-white shadow-md whitespace-nowrap select-none z-50 touch-none border border-black/5",
                   pill.color,
                   getPillSize(pill.size)
                 )}
                 style={{ 
                   transform: 'translate(-50%, -50%) translate(0px, -200px)',
                   willChange: 'transform'
                 }}
               >
                 {pill.sparkle && <span className="mr-1">✨</span>} {pill.label}
               </div>
             ))}
           </div>
        </motion.div>
      </div>
    </div>
  );
}
