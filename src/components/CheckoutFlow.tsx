import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, ArrowRight, CreditCard, Truck, CheckCircle2, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { CheckoutStep } from '../types';
import { cn } from '../lib/utils';

interface CheckoutFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutFlow: React.FC<CheckoutFlowProps> = ({ isOpen, onClose }) => {
  const { cart } = useAppContext();
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  const renderShipping = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">First Name</label>
          <input type="text" className="w-full bg-gray-50 border-gray-100 rounded-xl p-3 text-sm focus:ring-1 focus:ring-black" placeholder="Jane" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Last Name</label>
          <input type="text" className="w-full bg-gray-50 border-gray-100 rounded-xl p-3 text-sm focus:ring-1 focus:ring-black" placeholder="Doe" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
        <input type="email" className="w-full bg-gray-50 border-gray-100 rounded-xl p-3 text-sm focus:ring-1 focus:ring-black" placeholder="jane@example.com" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Shipping Address</label>
        <input type="text" className="w-full bg-gray-50 border-gray-100 rounded-xl p-3 text-sm focus:ring-1 focus:ring-black" placeholder="123 Luxury Lane" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">City</label>
          <input type="text" className="w-full bg-gray-50 border-gray-100 rounded-xl p-3 text-sm focus:ring-1 focus:ring-black" placeholder="Milan" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Postal Code</label>
          <input type="text" className="w-full bg-gray-50 border-gray-100 rounded-xl p-3 text-sm focus:ring-1 focus:ring-black" placeholder="20121" />
        </div>
      </div>
      <button 
        onClick={() => setStep('payment')}
        className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-2"
      >
        <span>Continue to Payment</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );

  const renderPayment = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between border border-gray-100">
        <div className="flex items-center space-x-4">
          <CreditCard className="text-gray-400" />
          <span className="text-sm font-medium uppercase tracking-wider text-gray-600">Credit or Debit Card</span>
        </div>
        <input type="radio" checked readOnly className="text-black focus:ring-black" />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Card Number</label>
          <input type="text" className="w-full bg-gray-50 border-gray-100 rounded-xl p-3 text-sm focus:ring-1 focus:ring-black" placeholder="0000 0000 0000 0000" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Expiry</label>
            <input type="text" className="w-full bg-gray-50 border-gray-100 rounded-xl p-3 text-sm focus:ring-1 focus:ring-black" placeholder="MM/YY" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">CVV</label>
            <input type="text" className="w-full bg-gray-50 border-gray-100 rounded-xl p-3 text-sm focus:ring-1 focus:ring-black" placeholder="123" />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl border border-green-100">
        <ShieldCheck size={18} className="text-green-500" />
        <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">Secure 256-bit Encrypted Payment</span>
      </div>

      <button 
        onClick={() => setStep('confirmation')}
        className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-2"
      >
        <span>Place Order Now</span>
        <CheckCircle2 size={16} />
      </button>
      <button 
        onClick={() => setStep('shipping')}
        className="w-full text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600"
      >
        Back to Shipping
      </button>
    </div>
  );

  const renderConfirmation = () => (
    <div className="text-center py-12">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
      >
        <CheckCircle2 size={48} />
      </motion.div>
      <h2 className="text-4xl font-light tracking-tight text-gray-900 mb-4">You're All Set.</h2>
      <p className="text-gray-500 mb-8 max-w-xs mx-auto">Your order #CK-{Math.floor(Math.random() * 100000)} has been placed and is being prepared with care.</p>
      
      <div className="bg-gray-50 p-6 rounded-3xl mb-12 text-left">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Order Summary</h4>
        <div className="space-y-3">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between text-xs">
              <span className="text-gray-600">{item.quantity}x {item.name}</span>
              <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="h-px bg-gray-200 mt-4" />
          <div className="flex justify-between text-sm font-bold pt-2">
            <span className="uppercase tracking-widest">Total Paid</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={onClose}
        className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs"
      >
        Continue to Charles & Keith
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-white p-4 overflow-y-auto">
      <div className="max-w-xl w-full mx-auto relative lg:grid lg:grid-cols-1 items-center">
        {step !== 'confirmation' && (
          <button 
            onClick={onClose}
            className="absolute -top-12 right-0 p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center space-x-2 text-gray-500"
          >
            <span className="text-[10px] uppercase font-bold tracking-widest">Close</span>
            <X size={20} />
          </button>
        )}

        <div className="mb-12 flex justify-center">
          <div className="flex items-center space-x-12">
            {[
              { id: 'cart', icon: <ShoppingBag size={18} /> },
              { id: 'shipping', icon: <Truck size={18} /> },
              { id: 'payment', icon: <CreditCard size={18} /> },
              { id: 'confirmation', icon: <CheckCircle2 size={18} /> }
            ].map((s, idx) => (
              <div key={s.id} className="relative flex flex-col items-center">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500",
                  step === s.id ? "bg-black text-white scale-110 shadow-xl" : "bg-gray-50 text-gray-300"
                )}>
                  {s.icon}
                </div>
                {idx < 3 && (
                  <div className="absolute left-[calc(100%+8px)] top-6 w-8 h-px bg-gray-100" />
                )}
              </div>
            ))}
          </div>
        </div>

        <motion.div 
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl"
        >
          {step === 'shipping' && renderShipping()}
          {step === 'payment' && renderPayment()}
          {step === 'confirmation' && renderConfirmation()}
        </motion.div>
      </div>
    </div>
  );
};
