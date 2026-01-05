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
  // LOGO BOX (B1)
  // ============================================
  if (item.type === 'logo') {
    return (
      <div className="w-full h-full p-4 flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className="text-5xl mb-3 flex-shrink-0">💻</div>
          <h2 className="text-2xl font-black text-white leading-none flex-shrink-0 font-serif">
            Rahulranks
          </h2>
          <p className="text-[10px] font-bold text-white/80 uppercase tracking-widest mt-2 flex-shrink-0">
            Full Stack Developer
          </p>
        </div>
      </div>
    );
  }

  // ============================================
  // ICONS BOX (B2)
  // ============================================
  if (item.type === 'icons') {
    const techs = [
      { icon: '⚛️', name: 'React' },
      { icon: '📱', name: 'Flutter' },
      { icon: '🔥', name: 'Firebase' },
      { icon: '🎨', name: 'Tailwind' }
    ];

    return (
      <div className="w-full h-full p-4 flex items-center justify-center overflow-hidden">
        <div className="grid grid-cols-2 gap-3">
          {techs.map((tech, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl border border-white/30 shadow-lg">
                {tech.icon}
              </div>
              <span className="text-[8px] font-bold text-white/90">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ============================================
  // CTA BUTTON BOX (B3)
  // ============================================
  if (item.type === 'cta-button') {
    return (
      <div className="w-full h-full p-4 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform overflow-hidden">
        <div className="text-center">
          <h3 className="text-xl font-black mb-3 text-white leading-tight flex-shrink-0 font-serif">
            Let's Build Together
          </h3>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-full text-sm font-bold shadow-xl hover:shadow-2xl transition-all flex-shrink-0">
            <span>Get in Touch</span>
            <span>→</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-[10px] text-white/80 mt-3 flex-shrink-0">
            <div className="flex items-center gap-1">
              <Clock size={10} />
              <span>Quick Reply</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={10} />
              <span>1-on-1 Call</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // HERO LARGE BOX (B4)
  // ============================================
  if (item.type === 'hero-large') {
    return (
      <div className="w-full h-full p-6 flex flex-col overflow-hidden">
        <div className="flex justify-between items-start mb-4 flex-shrink-0">
          <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-[10px] font-bold text-white shadow-lg flex items-center gap-1.5 border border-white/30">
            <Code2 size={12} />
            <span>Full-Stack Dev</span>
          </div>
          <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-[10px] font-bold text-white shadow-lg flex items-center gap-1.5 border border-white/30">
            <span>✅</span>
            <span>Available</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center text-center min-h-0">
          <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white/40 shadow-2xl mb-4 flex-shrink-0 bg-white/10">
            <img src="/profile.jpg" alt="Rahul" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-4xl font-black tracking-tight leading-tight mb-3 text-white flex-shrink-0 font-serif">
            Rahul Reddy
          </h1>
          <div className="text-sm font-bold text-white/90 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full shadow-md border border-white/30 mb-3 flex-shrink-0">
            SEO Ready Builder
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-white/90 mb-4 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex-shrink-0 border border-white/30">
            <MapPin size={12} />
            <span>Hyderabad, India</span>
          </div>
          <p className="text-sm font-medium text-white/90 leading-relaxed max-w-md mb-4 flex-shrink-0">
            Building high-performance web & mobile apps with SEO optimization
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-4 flex-shrink-0">
            {['React', 'Next.js', 'Flutter', 'TypeScript'].map((tech, i) => (
              <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[10px] font-bold text-white border border-white/30">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 flex-shrink-0">
          {[
            { value: '5+', label: 'Years', icon: Award },
            { value: '50+', label: 'Projects', icon: Rocket },
            { value: '100%', label: 'Quality', icon: TrendingUp }
          ].map((stat, i) => (
            <div key={i} className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center shadow-md border border-white/30">
              <stat.icon className="w-5 h-5 mx-auto mb-1.5 text-white/90" />
              <div className="text-lg font-black text-white leading-none mb-1">{stat.value}</div>
              <div className="text-[9px] font-bold text-white/80 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ============================================
  // ILLUSTRATION BOX (B5)
  // ============================================
  if (item.type === 'illustration') {
    const [currentImage, setCurrentImage] = React.useState(0);
    const images = ['/illustration1.png', '/illustration2.png'];

    React.useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 3000);

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
              className={`h-2 rounded-full transition-all duration-300 ${
                currentImage === index
                  ? 'bg-white w-6'
                  : 'bg-white/50 hover:bg-white/70 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  // ============================================
  // PRICE BOX (B6)
  // ============================================
  if (item.type === 'price-box') {
    return (
      <div className="w-full h-full p-4 flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 flex-shrink-0">
            Starting at
          </div>
          <div className="text-4xl font-black text-white leading-none mb-2 flex-shrink-0 font-serif">
            $499
          </div>
          <div className="text-[10px] font-bold text-white/70 flex-shrink-0">
            per project
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // SERVICES LIST (B7)
  // ============================================
  if (item.type === 'services-list') {
    const services = ['Web Dev', 'Mobile Apps', 'SEO Audit', 'Consulting'];

    return (
      <div className="w-full h-full p-4 flex flex-col justify-center overflow-hidden">
        <h3 className="text-sm font-black mb-3 text-white flex-shrink-0">Services</h3>
        <div className="space-y-2 flex-shrink-0">
          {services.map((service, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
              <span className="text-xs font-semibold text-white/90">{service}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ============================================
  // BRAND MESSAGE (B8)
  // ============================================
  if (item.type === 'brand-message') {
    return (
      <div className="w-full h-full p-4 flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className="text-4xl mb-3 flex-shrink-0">✨</div>
          <h3 className="text-lg font-black text-white leading-tight mb-2 flex-shrink-0 font-serif">
            Quality First
          </h3>
          <p className="text-xs font-medium text-white/90 leading-relaxed flex-shrink-0">
            Production-ready code every time
          </p>
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
