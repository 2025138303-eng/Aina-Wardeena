import React from 'react';
import * as Icons from 'lucide-react';
import { Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';
import { VALUE_PROPS } from '../constants';

export const ValueProps = () => {
  return (
    <section className="py-24 bg-bg border-y border-luxury-border">
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {VALUE_PROPS.map((prop) => {
            const Icon = (Icons as any)[prop.icon];
            return (
              <div key={prop.title} className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 bg-white flex items-center justify-center mb-6 luxury-border shadow-sm group-hover:shadow-md transition-shadow">
                  <Icon size={20} className="text-ink" strokeWidth={1.5} />
                </div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink mb-3">{prop.title}</h3>
                <p className="text-xs text-ink/50 leading-relaxed max-w-[180px] mx-auto font-medium">{prop.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-white text-ink border-t border-luxury-border">
      <div className="max-w-7xl mx-auto px-10 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold tracking-[0.4em] uppercase mb-10 serif">Charles & Keith</h2>
            <p className="text-ink/60 text-xs font-medium leading-loose max-w-xs tracking-wider uppercase opacity-80">
              Innovating luxury footwear since 1996. Our Signature Series redefines versatility through visionary design and AI-driven precision.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-ink">Collections</h4>
            <ul className="space-y-6 text-[10px] text-ink/40 font-bold tracking-[0.15em] uppercase">
              <li><a href="#" className="hover:text-ink transition-colors">New In</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Heels</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Signature Series</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Personalize</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-ink">Boutique</h4>
            <ul className="space-y-6 text-[10px] text-ink/40 font-bold tracking-[0.15em] uppercase">
              <li><a href="#" className="hover:text-ink transition-colors">Store Locator</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Digital Mirror</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Order Status</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-ink">Newsletter</h4>
            <p className="text-[10px] text-ink/40 mb-8 font-bold tracking-[0.15em] uppercase leading-relaxed">Early access to collections and exclusive AI features.</p>
            <div className="flex border-b border-ink/20 focus-within:border-ink transition-all">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border-none text-[10px] px-0 py-4 w-full focus:ring-0 placeholder:text-ink/20 font-bold tracking-[0.2em]"
              />
              <button className="p-4 hover:opacity-50 transition-opacity">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-luxury-border flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 text-[9px] uppercase font-bold tracking-[0.3em] text-ink/30">
          <div className="flex gap-12">
            <span>Sustainability</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
          <p>© 2026 Charles & Keith.</p>
          <div className="flex space-x-8">
            <Instagram size={16} className="hover:text-ink transition-colors cursor-pointer" strokeWidth={1.5} />
            <Twitter size={16} className="hover:text-ink transition-colors cursor-pointer" strokeWidth={1.5} />
            <Facebook size={16} className="hover:text-ink transition-colors cursor-pointer" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </footer>
  );
};
