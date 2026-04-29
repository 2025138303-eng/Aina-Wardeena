import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeelType } from '../types';
import { cn } from '../lib/utils';
import { Info, Box, Layers, RefreshCw } from 'lucide-react';

export const InteractiveDemo = () => {
  const [activeHeel, setActiveHeel] = useState<HeelType>(HeelType.STILETTO);

  const heels = [
    { type: HeelType.STILETTO, label: 'Stiletto', height: '100mm', icon: <div className="w-1 h-8 bg-current rotate-[5deg]" /> },
    { type: HeelType.BLOCK, label: 'Block', height: '60mm', icon: <div className="w-3 h-6 bg-current" /> },
    { type: HeelType.MID, label: 'Mid', height: '40mm', icon: <div className="w-2 h-4 bg-current rotate-[-5deg]" /> },
  ];

  return (
    <section className="py-24 bg-white border-y border-luxury-border overflow-hidden" id="interactive-demo">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Visual Presentation Area */}
          <div className="flex-1 w-full relative bg-[#F9F8F6] rounded-[2.5rem] p-12 luxury-border">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHeel}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="aspect-square w-full"
              >
                <img 
                  src={`https://picsum.photos/seed/${activeHeel.toLowerCase()}-heel/1000/1000`} 
                  alt={`${activeHeel} Heel`}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute top-10 right-10 flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest font-bold text-ink/30 mb-1">Elevation</span>
              <span className="text-xl font-bold text-ink">{heels.find(h => h.type === activeHeel)?.height}</span>
            </div>
          </div>

          {/* Controls Area */}
          <div className="flex-1 max-w-lg">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-xs uppercase tracking-widest font-bold text-ink">01. Personalize</h2>
              <span className="text-[10px] uppercase tracking-widest text-ink/30">Interactive Customizer</span>
            </div>
            
            <h3 className="text-4xl font-light tracking-tight text-ink mb-12 serif italic leading-tight">
              Craft Your Signature <br />Silhouette
            </h3>

            <div className="space-y-12">
              <div className="space-y-6">
                <label className="text-[11px] uppercase tracking-widest text-ink/50 font-bold">Select Heel Type</label>
                <div className="flex flex-wrap gap-4">
                  {heels.map((heel) => (
                    <button
                      key={heel.type}
                      onClick={() => setActiveHeel(heel.type)}
                      className={cn(
                        "w-20 h-20 bg-white border luxury-border flex flex-col items-center justify-center transition-all duration-300 relative",
                        activeHeel === heel.type ? "border-ink ring-1 ring-ink" : "hover:border-ink/30"
                      )}
                    >
                      <div className={cn(
                        "transition-colors mb-2",
                        activeHeel === heel.type ? "text-ink" : "text-ink/20"
                      )}>
                        {heel.icon}
                      </div>
                      <span className={cn(
                        "text-[9px] uppercase font-bold tracking-widest",
                        activeHeel === heel.type ? "text-ink" : "text-ink/30"
                      )}>{heel.label}</span>
                    </button>
                  ))}
                  <div className="flex flex-col justify-center ml-4">
                    <span className="text-sm font-bold uppercase tracking-tight">{activeHeel}</span>
                    <span className="text-[10px] opacity-50 uppercase tracking-widest">{heels.find(h => h.type === activeHeel)?.height} Height</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] uppercase tracking-widest text-ink/50 font-bold">Select Size</label>
                  <span className="text-[10px] font-bold text-accent">AI Recommendation: EU 38</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[36, 37, 38, 39, 40].map(size => (
                    <button 
                      key={size}
                      className={cn(
                        "py-3 border text-center text-xs tracking-widest transition-all",
                        size === 38 ? "bg-ink text-white border-ink font-bold" : "border-luxury-border text-ink hover:border-ink"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button className="w-full bg-ink text-white mt-12 h-16 flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.2em] shadow-2xl shadow-ink/20 hover:opacity-90 transition-opacity">
              <span>Add to Bag</span>
              <span className="opacity-20 text-[10px]">—</span>
              <span>$149.00</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
