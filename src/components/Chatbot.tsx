import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Hello! I'm your Charles & Keith AI Stylist. How can I help you find the perfect pair of heels today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        config: {
          systemInstruction: "You are a professional luxury fashion stylist for Charles & Keith. You specialize in heels. You are helpful, elegant, and modern. Your goal is to help users select heels based on their occasion, comfort needs, and style preferences. You know about our 'Interchangeable Heel' technology (Stiletto, Block, Mid). Keep responses concise and formatted with markdown.",
        },
        contents: [{ role: "user", parts: [{ text: userMessage }] }]
      });

      const botResponse = response.text || "I'm sorry, I'm having trouble connecting right now. How else can I assist you?";
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'bot', text: "I'm having a little trouble thinking. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-10rem)] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-ink p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xs uppercase tracking-widest">AI Stylist</h3>
                  <div className="flex items-center space-x-1.5">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                    <p className="text-white/60 text-[9px] uppercase tracking-[0.22em] font-bold">Active Now</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 bg-bg"
            >
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div className={cn(
                    "p-4 rounded-none text-sm leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-ink text-white" 
                      : "bg-white text-ink shadow-sm border border-luxury-border"
                  )}>
                    <div className="markdown-body">
                      {msg.role === 'bot' ? (
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      ) : (
                        <p>{msg.text}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest font-black text-ink/30 mt-3 px-1">
                    {msg.role === 'user' ? 'You' : 'AI Stylist'}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center space-x-2 text-ink/30 italic text-xs">
                  <Bot size={14} className="animate-bounce" />
                  <span className="tracking-widest uppercase text-[10px] font-bold">Stylist is thinking...</span>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-luxury-border">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask for style recommendations..."
                  className="w-full bg-bg border-none rounded-none py-4 pl-6 pr-14 text-xs font-bold uppercase tracking-widest focus:ring-1 focus:ring-ink transition-all placeholder:text-ink/20"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 w-10 h-10 bg-ink text-white rounded-none flex items-center justify-center hover:opacity-80 transition-opacity disabled:opacity-30"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-black text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold">1</div>
        )}
      </button>
    </div>
  );
};

// Helper for Tailwind classes inside this file
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
