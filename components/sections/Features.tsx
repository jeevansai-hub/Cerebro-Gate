"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { FEATURES } from "@/lib/constants";
import * as LucideIcons from "lucide-react";
import { Typewriter } from "@/components/ui/Typewriter";
import { cn } from "@/lib/utils";

const FeatureCard = ({ feature, index }: { feature: any, index: number }) => {
  const IconComponent = (LucideIcons as any)[feature.icon] || LucideIcons.Zap;

  return (
    <motion.div
      variants={fadeUp}
      className={feature.isLarge ? "col-span-1 lg:col-span-2" : "col-span-1"}
    >
      <Card variant="depth-3" className="h-full flex flex-col p-10 group relative overflow-hidden hover:border-cyan/30 transition-all duration-500">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/5 blur-[50px] group-hover:bg-cyan/10 transition-all rounded-full -mr-16 -mt-16" />
        
        <div className="flex items-start justify-between mb-10">
          <div className="w-16 h-16 rounded-2xl bg-bg-base/60 border border-border-subtle flex items-center justify-center text-cyan group-hover:scale-110 transition-transform shadow-cyan-glow/10">
            <IconComponent size={28} />
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            {feature.tags.map((tag: string) => (
              <Badge key={tag} variant="dim" className="px-2.5 py-1 text-[9px] uppercase font-bold tracking-widest Satoshi 800">{tag}</Badge>
            ))}
          </div>
        </div>

        <div className="space-y-4 flex-grow">
          <h3 className="text-2xl font-display font-bold text-text-primary Satoshi 800 italic uppercase tracking-tight">{feature.name}</h3>
          <p className="text-cyan/60 italic text-xs font-mono Satoshi 600 uppercase tracking-widest">{feature.analogy}</p>
          <p className="text-text-secondary text-[15px] leading-relaxed Satoshi 400">{feature.description}</p>
        </div>
        
        {feature.id === 'routing' && <RoutingDemo />}
      </Card>
    </motion.div>
  );
};

const RoutingDemo = () => {
  const examples = [
    { text: "Summarize this Slack message", status: "SIMPLE", model: "Llama 3", cost: "$0.0001", color: "text-green" },
    { text: "Design a microservices architecture", status: "COMPLEX", model: "Claude 3.5", cost: "$0.0410", color: "text-red" },
    { text: "What's 2+2?", status: "CACHE HIT", model: "Instant", cost: "$0.0000", color: "text-cyan" },
    { text: "Fix this Python bug", status: "MEDIUM", model: "Mistral", cost: "$0.0060", color: "text-amber" },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % examples.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-10 p-6 rounded-2xl bg-black/60 border border-border-glass relative h-[120px] flex flex-col justify-center overflow-hidden group/demo">
      <div className="text-[10px] uppercase tracking-widest text-text-dim mb-3 flex items-center gap-2 Satoshi 700">
         <span className="w-2 h-2 rounded-full bg-cyan animate-pulse shadow-cyan-glow" />
         Live Intelligence Routing 
      </div>
      <div className="text-sm font-mono text-text-primary mb-3 flex justify-between items-center overflow-hidden">
         <span className="text-text-dim mr-3 Satoshi 700">INPUT: </span>
         <Typewriter 
          words={examples.map(e => e.text)} 
          speed={40} 
          deleteSpeed={20} 
          className="text-cyan truncate max-w-[280px]" 
         />
      </div>
      <AnimatePresence mode="wait">
        <motion.div 
          key={current}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          className="flex justify-between items-center text-xs font-bold font-mono"
        >
          <span className={cn("uppercase tracking-widest Satoshi 800", examples[current].color)}>
            {examples[current].status} → {examples[current].model}
          </span>
          <span className="text-text-dim Satoshi 700 text-[10px]">
             COST: {examples[current].cost}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export const Features = () => {
  return (
    <section id="features" className="py-32 relative overflow-hidden bg-bg-base">
      {/* Background Decorative Glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan/5 blur-[160px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 space-y-6">
          <Badge variant="outline" className="Satoshi 600">Core Capabilities</Badge>
          <motion.h2 variants={fadeUp} className="text-title font-display text-text-primary uppercase tracking-tight Satoshi 800 italic">Everything AI Needs to Run Responsibly</motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-text-secondary max-w-2xl mx-auto Satoshi 400">
            CerebroGate is the world's most performant gateway for enterprise AI pipelines, providing one API for every model.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
