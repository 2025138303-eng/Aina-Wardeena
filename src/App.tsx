/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InteractiveDemo } from './components/InteractiveDemo';
import { ProductGrid } from './components/ProductGrid';
import { FootScanner } from './components/FootScanner';
import { Chatbot } from './components/Chatbot';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutFlow } from './components/CheckoutFlow';
import { ValueProps, Footer } from './components/Common';
import { AppProvider, useAppContext } from './context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { ScanLine } from 'lucide-react';

const MainContent = () => {
  const { setIsCartOpen, setIsScanning } = useAppContext();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white">
      <Header />
      
      <main>
        <Hero />
        <ValueProps />
        <ProductGrid />
        
        {/* Call to Action for AI Foot Scanner */}
        <section className="py-24 bg-bg border-y border-luxury-border relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-10 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-20">
              <div className="max-w-xl">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-10 h-px bg-ink/20" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/30">02. Digital Concierge</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-light tracking-tight text-ink mb-10 leading-tight serif italic">
                  Precision Fit, <br />
                  <span className="opacity-60 text-ink">AI Guaranteed.</span>
                </h2>
                <p className="text-ink/60 text-base mb-12 leading-relaxed tracking-wide uppercase text-[11px] font-bold opacity-80">
                  Our clinical-grade vision algorithms measure your foot profile with micron-level accuracy for the ultimate tailored experience.
                </p>
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => setIsScanning(true)}
                    className="bg-ink text-white px-12 py-5 text-[10px] uppercase tracking-[0.2em] font-bold shadow-2xl shadow-ink/20 hover:opacity-90 transition-opacity"
                  >
                    Launch Scanner
                  </button>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink/40">Verified by 12,000+ Profiles</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square bg-white luxury-border rounded-full p-20 flex items-center justify-center relative group">
                  <div className="absolute inset-0 border border-ink/5 rounded-full scale-110 animate-pulse" />
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <img 
                      src="https://picsum.photos/seed/footscan/800/800?grayscale" 
                      alt="AI Foot Scanning Technology" 
                      className="w-full max-w-[400px] object-contain drop-shadow-2xl"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InteractiveDemo />
        
        {/* Social Proof / Instagram Grid Mock */}
        <section className="py-24 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Seen On You</h3>
              <p className="text-sm italic serif text-gray-500">#CharlesKeithHeels</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-gray-100 rounded-2xl overflow-hidden group">
                  <img 
                    src={`https://picsum.photos/seed/social${i}/600/600`} 
                    alt="Social Proof" 
                    className="w-full h-full object-cover grayscale brightness-110 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
      
      <CartDrawer onCheckout={() => {
        setIsCartOpen(false);
        setIsCheckoutOpen(true);
      }} />
      
      <AnimatePresence>
        {isCheckoutOpen && (
          <CheckoutFlow isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
        )}
      </AnimatePresence>
      
      <FootScanner />
      <Chatbot />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

