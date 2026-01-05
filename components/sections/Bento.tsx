"use client";

import React from 'react';
import { BentoBoxContent } from './BentoBoxContent';

type BentoItem = {
  id: string;
  colSpan: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 12;
  rowSpan: 1 | 2 | 3 | 4;
  bgColor: string;
  type: string;
};

const getGridClasses = (col: number, row: number) => {
  const colClasses: Record<number, string> = {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
    5: 'md:col-span-5',
    6: 'md:col-span-6',
    8: 'md:col-span-8',
    12: 'md:col-span-12',
  };
  
  const rowClasses: Record<number, string> = {
    1: 'md:row-span-1',
    2: 'md:row-span-2',
    3: 'md:row-span-3',
    4: 'md:row-span-4',
  };

  return `${colClasses[col] || 'md:col-span-1'} ${rowClasses[row] || 'md:row-span-1'}`;
};

const BENTO_ITEMS: BentoItem[] = [
  // --- TOP ROW ---
  { id: 'b1', colSpan: 3, rowSpan: 1, bgColor: '#6366f1', type: 'logo' },
  { id: 'b2', colSpan: 3, rowSpan: 1, bgColor: '#f43f5e', type: 'icons' },
  { id: 'b3', colSpan: 6, rowSpan: 1, bgColor: '#14b8a6', type: 'cta-button' },

  // --- MIDDLE ROW (Tall items) ---
  { id: 'b4', colSpan: 6, rowSpan: 2, bgColor: '#8b5cf6', type: 'hero-large' },
  { id: 'b5', colSpan: 6, rowSpan: 2, bgColor: '#f59e0b', type: 'illustration' },

  // --- BOTTOM ROW ---
  { id: 'b6', colSpan: 4, rowSpan: 1, bgColor: '#0f172a', type: 'price-box' },
  { id: 'b7', colSpan: 4, rowSpan: 1, bgColor: '#10b981', type: 'services-list' },
  { id: 'b8', colSpan: 4, rowSpan: 1, bgColor: '#ec4899', type: 'brand-message' }
];

const BentoBox = ({ item }: { item: BentoItem }) => {
  return (
    <div className="h-full min-h-[100px] md:min-h-0 p-[1px]">
      <div 
        className="w-full h-full relative flex items-center justify-center text-white font-bold rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
        style={{ backgroundColor: item.bgColor }}
      >
        <BentoBoxContent item={item} />
      </div>
    </div>
  );
};

export default function Bento() {
  return (
    <section className="w-full flex flex-col items-center font-sans antialiased py-6 px-4">
      
      {/* ✅ EXACT: 1400px container */}
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl p-[1px]">
          <div className="bg-bg-subtle rounded-xl overflow-hidden">
            {/* ✅ EXACT: 520px total height (4 rows × 130px) */}
            <div className="relative w-full h-auto md:h-[520px] grid grid-cols-1 md:grid-cols-12 md:grid-rows-4 gap-0">
              {BENTO_ITEMS.map((item) => (
                <div 
                  key={item.id} 
                  className={`${getGridClasses(item.colSpan, item.rowSpan)} w-full h-full`}
                >
                  <BentoBox item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
