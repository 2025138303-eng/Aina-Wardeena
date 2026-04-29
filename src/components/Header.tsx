import React from 'react';
import { ShoppingBag, Search, Menu, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';

export const Header = () => {
  const { cart, setIsCartOpen, setIsScanning } = useAppContext();
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-luxury-border">
      <div className="max-w-[1440px] mx-auto px-10">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-10">
            <button className="p-2 -ml-2 text-ink hover:opacity-70 md:hidden" id="mobile-menu-btn">
              <Menu size={20} />
            </button>
            <nav className="hidden md:flex items-center space-x-10 text-[11px] uppercase tracking-[0.2em] font-semibold">
              <a href="#" className="text-ink hover:text-accent transition-colors">New Arrivals</a>
              <a href="#" className="text-ink hover:text-accent transition-colors">Heels</a>
              <a href="#" className="text-ink hover:text-accent transition-colors">Personalize</a>
              <a href="#" className="text-ink hover:text-accent transition-colors">About</a>
            </nav>
          </div>

          <div className="flex items-center justify-center">
            <a href="/" className="text-2xl font-bold tracking-[0.3em] uppercase serif text-ink" id="brand-logo">
              Charles & Keith
            </a>
          </div>

          <div className="flex items-center space-x-8">
            <button 
              onClick={() => setIsScanning(true)}
              className="hidden lg:flex items-center space-x-2 bg-[#E8E4DF] hover:bg-[#DDD9D4] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-ink transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>AI Foot Scanner</span>
            </button>
            
            <div className="flex items-center space-x-6">
              <button className="text-ink hover:opacity-70 hidden sm:block" id="search-btn">
                <Search size={20} strokeWidth={1.5} />
              </button>
              <button 
                className="text-ink hover:opacity-70 relative" 
                id="cart-btn"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartItemCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-4 h-4 bg-ink text-white text-[8px] flex items-center justify-center rounded-full font-bold"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
