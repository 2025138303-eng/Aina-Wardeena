import React from 'react';
import { Star, Plus, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../constants';
import { useAppContext } from '../context/AppContext';
import { HeelType } from '../types';

export const ProductGrid = () => {
  const { addToCart } = useAppContext();

  return (
    <section className="py-24 bg-white" id="bestsellers">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-ink/30 mb-4 block">Most Coveted</h2>
            <h3 className="text-5xl font-light tracking-tight text-ink serif leading-tight">
              Signature <span className="italic">Series</span>
            </h3>
          </div>
          <a href="#" className="flex items-center space-x-2 text-[11px] uppercase tracking-[0.2em] font-bold text-ink border-b border-ink pb-1 group hover:opacity-70 transition-opacity">
            <span>View All Collections</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              id={`product-card-${product.id}`}
            >
              <div className="relative aspect-[3/4] bg-bg rounded-none border border-luxury-border overflow-hidden mb-8">
                <img 
                  src={product.baseImage} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                
                {/* Labels */}
                <div className="absolute top-6 left-6 flex flex-col space-y-2">
                  <span className="bg-white/90 backdrop-blur px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-ink luxury-border shadow-sm">
                    {product.category}
                  </span>
                </div>

                {/* Quick Add Overlay */}
                <div className="absolute inset-0 bg-ink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        color: product.colors[0].name,
                        heelType: HeelType.STILETTO,
                        size: product.sizes[0],
                        quantity: 1,
                        image: product.colors[0].image
                      });
                    }}
                    className="w-full bg-ink text-white py-4 text-[10px] font-bold uppercase tracking-[0.22em] shadow-2xl shadow-ink/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                  >
                    Quick Add To Bag
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-sm font-bold text-ink uppercase tracking-widest leading-relaxed">
                    {product.name}
                  </h4>
                  <span className="text-sm font-bold text-ink">${product.price}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Star size={10} className="fill-accent text-accent" />
                      <span className="text-[10px] font-bold text-ink">{product.rating}</span>
                    </div>
                    <div className="w-px h-3 bg-luxury-border" />
                    <div className="flex items-center space-x-2">
                      {product.colors.map((color) => (
                        <div 
                          key={color.name}
                          className="w-3 h-3 rounded-full border border-luxury-border"
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
