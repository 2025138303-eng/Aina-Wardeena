import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, X, Check, RefreshCcw, ScanLine } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const FootScanner = () => {
  const { isScanning, setIsScanning, setScannedSize } = useAppContext();
  const [step, setStep] = useState<'intro' | 'scanning' | 'results'>('intro');
  const [scanProgress, setScanProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (step === 'scanning') {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setStep('results');
            setScannedSize(38); // Simulated result
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [step]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setStep('scanning');
    } catch (err) {
      console.error("Camera access denied", err);
      // Fallback for demo
      setStep('scanning');
    }
  };

  if (!isScanning) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative"
      >
        <button 
          onClick={() => {
            setIsScanning(false);
            setStep('intro');
          }}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/10 hover:bg-black/20 flex items-center justify-center rounded-full transition-colors"
        >
          <X size={20} className="text-gray-900" />
        </button>

        <div className="p-8">
          {step === 'intro' && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-black">
                <Camera size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Precision Fit AI</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Our AI-powered scanner uses clinical-grade vision algorithms to measure your foot length, width, and arch for the perfect shoe fit.
              </p>
              <ul className="text-left space-y-4 mb-10 text-sm text-gray-600">
                <li className="flex items-center space-x-3">
                  <Check size={16} className="text-green-500" />
                  <span>Remove socks for better accuracy</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check size={16} className="text-green-500" />
                  <span>Place your foot on a plain floor</span>
                </li>
              </ul>
              <button 
                onClick={startCamera}
                className="w-full bg-black text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs"
              >
                Launch Scanner
              </button>
            </div>
          )}

          {step === 'scanning' && (
            <div className="relative aspect-[3/4] bg-gray-950 rounded-2xl overflow-hidden mb-6">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover opacity-70"
              />
              
              {/* Scan Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div 
                  className="w-64 h-80 border-2 border-white/50 rounded-3xl relative overflow-hidden"
                  animate={{ borderColor: ['rgba(255,255,255,0.5)', 'rgba(0,255,100,0.8)', 'rgba(255,255,255,0.5)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div 
                    initial={{ top: '0%' }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-x-0 h-0.5 bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.8)]"
                  />
                </motion.div>
                
                <div className="absolute bottom-10 inset-x-0 px-10 text-center">
                  <p className="text-white text-[10px] uppercase tracking-widest font-bold mb-3">Analyzing Arch Profile...</p>
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-green-400"
                      initial={{ width: '0%' }}
                      animate={{ width: `${scanProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 'results' && (
            <div className="text-center py-8">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white"
              >
                <Check size={32} />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Scan Complete</h2>
              <p className="text-gray-500 mb-8">We've calculated your perfect fit across our Signature Series.</p>
              
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Recommended Size</p>
                  <p className="text-3xl font-black text-gray-900">EU 38</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Width Profile</p>
                  <p className="text-xl font-bold text-gray-900 uppercase">Regular</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => setIsScanning(false)}
                  className="flex-1 bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs"
                >
                  Apply To Shop
                </button>
                <button 
                  onClick={() => {
                    setStep('intro');
                    setScanProgress(0);
                  }}
                  className="w-14 h-14 bg-gray-100 flex items-center justify-center rounded-xl hover:bg-gray-200"
                >
                  <RefreshCcw size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
