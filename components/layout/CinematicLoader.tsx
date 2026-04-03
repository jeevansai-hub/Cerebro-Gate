"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hexagon } from "lucide-react";

export const CinematicLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-base overflow-hidden"
          exit={{ 
            y: "-100%",
            transition: { duration: 1, ease: [0.77, 0, 0.175, 1], delay: 0.5 }
          }}
        >
          {/* Layer 0: Background Grid */}
          <div className="absolute inset-0 bg-40px-grid-cyan opacity-[0.03] pointer-events-none" />
          
          {/* Layer 1: Ambient Glow */}
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="absolute w-[400px] h-[400px] bg-cyan/10 blur-[100px] rounded-full"
          />

          <div className="relative flex flex-col items-center">
            {/* Core Hexagon Logo */}
            <motion.div
              initial={{ scale: 0.8, rotate: -30, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <Hexagon size={64} className="text-cyan drop-shadow-[0_0_20px_rgba(0,212,255,0.8)]" strokeWidth={1.5} />
            </motion.div>

            {/* System Status Text */}
            <div className="space-y-4 text-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xs font-mono font-black Satoshi 900 uppercase tracking-[0.5em] text-cyan"
              >
                CerebroGate Systems
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-2 justify-center"
              >
                <div className="h-1 w-24 bg-bg-depth-3 rounded-full overflow-hidden relative">
                   <motion.div 
                    initial={{ left: "-100%" }}
                    animate={{ left: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-y-0 w-12 bg-cyan shadow-cyan-glow"
                   />
                </div>
                <span className="text-[10px] font-mono text-text-dim uppercase tracking-widest Satoshi 600">Initializing Neural Mesh</span>
              </motion.div>
            </div>
            
            {/* Background floating IDs */}
            {[...Array(6)].map((_, i) => (
               <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.2, 0], 
                  y: [-20, 20],
                  x: [-20, 20]
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2, 
                  repeat: Infinity,
                  delay: i * 0.4 
                }}
                className="absolute text-[10px] font-mono text-cyan/40 whitespace-nowrap Satoshi 500"
                style={{ 
                  top: `${Math.random() * 200 - 100}px`,
                  left: `${Math.random() * 400 - 200}px` 
                }}
               >
                 NODE_SV_{Math.floor(Math.random() * 999)} :: AUTH_VERIFIED
               </motion.div>
            ))}
          </div>

          {/* Bottom progress bar */}
          <motion.div
            className="absolute bottom-16 w-64 h-px bg-white/5"
          >
             <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="h-full bg-cyan shadow-cyan-glow"
             />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
