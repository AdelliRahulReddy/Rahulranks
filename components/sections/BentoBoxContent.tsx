"use client";

import React from 'react';
import { MapPin, Layers, Rocket, Code2, Award, TrendingUp, Users, Clock } from 'lucide-react';

type BentoItem = {
  id: string;
  type: string;
  bgColor: string;
  colSpan?: number;
  rowSpan?: number;
};

export function BentoBoxContent({ item }: { item: BentoItem }) {
  
  // ============================================
  // HERO BOX (P1)
  // ============================================
  if (item.type === 'hero') {
    return (
      <div className="w-full h-full p-4 flex flex-col overflow-hidden">
        <div className="flex justify-between items-start mb-3 flex-shrink-0">
          <div className="px-2.5 py-1 bg-white rounded-full text-[9px] font-bold shadow-lg flex items-center gap-1">
            <Code2 size={10} />
            <span>Full-Stack Dev</span>
          </div>
          <div className="px-2.5 py-1 bg-white rounded-full text-[9px] font-bold shadow-lg flex items-center gap-1">
            <span>✅</span>
            <span>Available</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center text-center min-h-0">
          <div className="w-28 h-28 rounded-2xl overflow-hidden border-3 border-white shadow-2xl mb-3 flex-shrink-0">
            <img src="/profile.jpg" alt="Rahul Reddy" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-black tracking-tight leading-tight mb-2 text-white flex-shrink-0">
            Rahul Reddy
          </h1>
          <div className="text-xs font-bold text-white/90 bg-white/20 px-4 py-1.5 rounded-full shadow-md border border-white/30 mb-2 flex-shrink-0">
            SEO Ready Builder
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-white/80 mb-2 bg-white/20 px-2.5 py-1 rounded-full flex-shrink-0">
            <MapPin size={10} />
            <span>Hyderabad, India</span>
          </div>
          <p className="text-xs font-medium text-white/90 leading-relaxed max-w-xs mb-3 line-clamp-2 flex-shrink-0">
            Building high-performance web & mobile apps with SEO optimization
          </p>
          <div className="flex flex-wrap gap-1.5 justify-center mb-3 flex-shrink-0">
            {['React', 'Next.js', 'Flutter', 'TypeScript'].map((tech, i) => (
              <span key={i} className="px-2 py-0.5 bg-white rounded-full text-[9px] font-bold">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 flex-shrink-0">
          {[
            { value: '5+', label: 'Years', icon: Award },
            { value: '50+', label: 'Projects', icon: Rocket },
            { value: '100%', label: 'Quality', icon: TrendingUp }
          ].map((stat, i) => (
            <div key={i} className="bg-white/20 backdrop-blur-sm rounded-xl p-2 text-center shadow-md border border-white/30">
              <stat.icon className="w-4 h-4 mx-auto mb-1 text-white/80" />
              <div className="text-sm font-black text-white leading-none mb-0.5">{stat.value}</div>
              <div className="text-[8px] font-bold text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ============================================
  // FEATURE BOX (P5)
  // ============================================
  if (item.type === 'feature') {
    const steps = [
      { icon: '🔍', label: 'Research' },
      { icon: '🎨', label: 'Design' },
      { icon: '⚡', label: 'Develop' },
      { icon: '🚀', label: 'Deploy' }
    ];

    return (
      <div className="w-full h-full p-4 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3 shadow-lg flex-shrink-0">
          <Layers size={24} strokeWidth={2} />
        </div>
        <h3 className="text-sm font-black mb-3 text-white flex-shrink-0">Development Process</h3>
        <div className="flex items-center justify-center gap-2 flex-shrink-0">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-lg bg-white border-2 border-white/40 flex items-center justify-center text-sm shadow-md">
                  {step.icon}
                </div>
                <span className="text-[8px] font-bold text-white/90 leading-none">{step.label}</span>
              </div>
              {i < steps.length - 1 && <div className="text-white/60 text-xs">→</div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // ============================================
  // SKILL BOX (P3, P4)
  // ============================================
  if (item.type === 'skill') {
    const isFrontend = item.id === 'p3';
    const skills = isFrontend 
      ? [
          { name: 'React', level: 95 },
          { name: 'Next.js', level: 90 },
          { name: 'TypeScript', level: 85 }
        ]
      : [
          { name: 'Flutter', level: 90 },
          { name: 'Dart', level: 85 },
          { name: 'Firebase', level: 88 }
        ];

    return (
      <div className="w-full h-full p-4 flex flex-col items-center overflow-hidden">
        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-3 shadow-lg border-2 border-white/40 flex-shrink-0">
          <span className="text-3xl">{isFrontend ? '💻' : '📱'}</span>
        </div>
        <h3 className="text-sm font-black mb-3 text-white flex-shrink-0">
          {isFrontend ? 'Frontend' : 'Mobile'}
        </h3>
        <div className="w-full space-y-2.5 flex-shrink-0">
          {skills.map((skill, i) => (
            <div key={i} className="w-full">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-bold text-white">{skill.name}</span>
                <span className="text-[8px] font-bold text-white/80">{skill.level}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: `${skill.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ============================================
  // STAT BOX (P2, W4)
  // ============================================
  if (item.type === 'stat') {
    return (
      <div className="w-full h-full p-3 flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center">
          <Rocket className="w-8 h-8 text-white mb-2 mx-auto flex-shrink-0" />
          <h2 className="text-4xl font-black mb-1 text-white leading-none flex-shrink-0">50+</h2>
          <p className="text-xs font-bold text-white/90 leading-none mb-1 flex-shrink-0">Projects Completed</p>
          <div className="flex items-center justify-center gap-1 text-[9px] text-white/80 flex-shrink-0">
            <TrendingUp size={10} />
            <span>& Growing</span>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // CTA BOX (P6, W2)
  // ============================================
  if (item.type === 'cta') {
    return (
      <div className="w-full h-full p-3 flex flex-col items-center justify-center cursor-pointer overflow-hidden">
        <div className="text-center">
          <h3 className="text-lg font-black mb-1 text-white leading-tight flex-shrink-0">
            Let's Work Together
          </h3>
          <p className="text-xs font-medium text-white/90 mb-2 flex-shrink-0">Open for collaboration</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-xs font-bold shadow-lg mb-2 flex-shrink-0">
            <span>Get in Touch</span>
            <span>→</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-[9px] text-white/80 flex-shrink-0">
            <div className="flex items-center gap-1">
              <Clock size={10} />
              <span>Quick Reply</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={10} />
              <span>1-on-1</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // PROJECT BOX (W1) - FULL IMAGES WITH ANIMATION
  // ============================================
  if (item.type === 'project') {
    const [currentImage, setCurrentImage] = React.useState(0);
    const images = ['/illustration1.png', '/illustration2.png'];

    React.useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 3000); // Change every 3 seconds

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="w-full h-full relative overflow-hidden">
        {/* Image 1 */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentImage === 0 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={images[0]}
            alt="Illustration 1"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image 2 */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentImage === 1 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={images[1]}
            alt="Illustration 2"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentImage === index
                  ? 'bg-white w-6'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  // ============================================
  // METRIC BOX (W5, W6)
  // ============================================
  if (item.type === 'metric') {
    const isSatisfaction = item.id === 'w5';
    const value = isSatisfaction ? '98%' : '10K+';
    const label = isSatisfaction ? 'Satisfaction' : 'Active Users';
    const icon = isSatisfaction ? Award : Users;
    const IconComponent = icon;
    
    return (
      <div className="w-full h-full p-3 flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className="w-10 h-10 rounded-xl bg-white border-2 border-white/40 flex items-center justify-center shadow-lg mb-2 mx-auto flex-shrink-0">
            <IconComponent className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black mb-1 text-white leading-none flex-shrink-0">{value}</div>
          <div className="text-[9px] font-bold text-white/90 flex-shrink-0">{label}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 flex items-center justify-center overflow-hidden">
      <div className="text-center text-white">
        <p className="text-sm font-bold">Box Type: {item.type}</p>
        <p className="text-xs">ID: {item.id}</p>
      </div>
    </div>
  );
}
