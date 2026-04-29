import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';

interface CartDrawerProps {
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout }) => {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen } = useAppContext();
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] pointer-events-none">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
      />
      
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col pointer-events-auto"
      >
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingBag size={20} />
            <h2 className="text-sm font-bold uppercase tracking-widest">Shopping Bag</h2>
            <span className="text-xs text-gray-400">({cart.length})</span>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                <ShoppingBag size={32} />
              </div>
              <p className="text-gray-900 font-medium mb-2">Your bag is empty</p>
              <p className="text-gray-500 text-sm mb-8">Items added to your bag will appear here.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-xs font-bold uppercase tracking-widest underline underline-offset-4"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {cart.map((item) => (
                <div key={item.id} className="flex space-x-6">
                  <div className="w-24 h-32 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 leading-relaxed max-w-[120px]">{item.name}</h3>
                        <p className="text-xs font-bold">${item.price}</p>
                      </div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                        {item.color} / {item.heelType} / Size {item.size}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-100 rounded-lg overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 hover:bg-gray-50 text-gray-400 hover:text-black transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 hover:bg-gray-50 text-gray-400 hover:text-black transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-[10px] uppercase font-bold text-gray-400 hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 border-t border-gray-100 bg-gray-50/50">
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="text-gray-900 uppercase font-bold text-[10px] tracking-widest">Complimentary</span>
              </div>
              <div className="h-px bg-gray-200" />
              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-bold uppercase tracking-widest">Total</span>
                <span className="text-xl font-black text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={onCheckout}
              className="w-full bg-black text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-3 shadow-xl shadow-gray-200 hover:opacity-90 transition-opacity"
            >
              <span>Secure Checkout</span>
              <ArrowRight size={16} />
            </button>
            <p className="mt-4 text-center text-[10px] text-gray-400 uppercase tracking-widest font-medium">
              Tax calculated at checkout
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
