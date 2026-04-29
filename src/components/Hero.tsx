import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-[#ECE9E4] flex items-center pt-20">
      <div className="relative z-10 max-w-7xl mx-auto px-10 w-full flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-7xl md:text-8xl font-light tracking-tight text-ink leading-[0.85] mb-8 serif">
              The Versatile<br />
              <span className="italic">Heel.</span>
            </h1>
            <p className="text-base text-ink/70 mb-10 max-w-sm leading-relaxed tracking-wide">
              Experience the future of luxury. One silhouette, three interchangeable heel heights for any occasion.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-ink text-white px-10 py-4 text-xs uppercase tracking-[0.15em] font-bold shadow-xl shadow-ink/10"
                id="hero-shop-btn"
              >
                Shop Collection
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-transparent border border-ink text-ink px-10 py-4 text-xs uppercase tracking-[0.15em] font-medium"
                id="hero-customize-btn"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="relative mt-20 md:mt-0">
          <div className="text-[180px] md:text-[240px] font-black text-white/40 serif italic select-none pointer-events-none">
            HEELS
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md p-6 luxury-border shadow-2xl">
            <p className="text-[10px] uppercase font-bold tracking-widest text-ink/40 mb-2">Featured Item</p>
            <p className="text-lg serif text-ink mb-1">Lucile Pointed-Toe Pumps</p>
            <p className="text-sm font-bold text-ink">$149.00</p>
          </div>
        </div>
      </div>
    </section>
  );
};
