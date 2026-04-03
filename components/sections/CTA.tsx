"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

export const CTA = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="py-64 bg-bg-base relative overflow-hidden flex items-center justify-center">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan/10 blur-[240px] pointer-events-none rounded-full animate-pulse-slow" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-12">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            <Badge variant="hero" className="gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-ping" />
               Limited Beta: Enterprise Slots Open
            </Badge>
          </motion.div>
          
          <motion.h2 
            className="text-display font-display text-text-primary tracking-tighter Satoshi 800 italic uppercase"
            variants={fadeUp}
          >
            Stop Paying for <br />
            <span className="text-gradient-cyan">AI Inefficiency.</span>
          </motion.h2>

          <motion.p 
            className="text-body-lg text-text-secondary leading-relaxed max-w-xl mx-auto Satoshi 400 mt-8"
            variants={fadeUp}
          >
            Deploy CerebroGate in 12 minutes. See your spend drop by 40% in week one. One line of code. Infinite model access. Join the production AI era.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-6 justify-center mt-12">
             <Button size="lg" className="h-16 px-16 Satoshi 800 bg-cyan shadow-cyan-glow text-lg uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform">Get Started Free →</Button>
             <Button variant="outline" size="lg" className="h-16 px-16 Satoshi 800 uppercase tracking-widest hover:bg-cyan/10 transition-colors">Talk to Sales</Button>
          </motion.div>

          <motion.div variants={fadeUp} className="pt-16 flex flex-col md:flex-row gap-12 items-center justify-center opacity-40 grayscale group">
             {['OpenAI', 'Anthropic', 'Google', 'Meta', 'Mistral'].map((brand) => (
               <span key={brand} className="text-xs font-mono font-bold tracking-widest text-text-dim Satoshi 400 uppercase hover:text-text-primary transition-colors cursor-default">{brand}</span>
             ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Canvas elements? Let's add a few SVG particles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
         {isMounted && [...Array(20)].map((_, i) => (
           <motion.div 
            key={i}
            className="absolute w-0.5 h-0.5 bg-cyan rounded-full"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%` 
            }}
            animate={{ 
              opacity: [0, 0.5, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{ 
              duration: 2 + Math.random() * 4, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
           />
         ))}
      </div>
    </section>
  );
};
