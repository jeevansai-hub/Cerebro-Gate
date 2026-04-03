"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Typewriter } from "@/components/ui/Typewriter";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

const ROUTING_PROMPTS = [
  { text: "Summarize this Slack message", tier: "SIMPLE", model: "Llama 3", cost: "$0.0001", saving: "99.7%", color: "green" },
  { text: "Design a distributed cache", tier: "COMPLEX", model: "Claude 3.5", cost: "$0.041", saving: "0%", color: "red" },
  { text: "What's 15% of 340?", tier: "CACHE HIT", model: "Instant Search", cost: "$0.000", saving: "100%", color: "cyan" },
  { text: "Generate SQL schema", tier: "MEDIUM", model: "Mistral Large", cost: "$0.006", saving: "84%", color: "amber" }
];

export const Capabilities = () => {
  const [routeIdx, setRouteIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRouteIdx((prev) => (prev + 1) % ROUTING_PROMPTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 bg-bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <Badge variant="outline" className="Satoshi 600">Capabilities</Badge>
          <h2 className="text-title font-display text-text-primary uppercase Satoshi 800 italic tracking-tight underline-offset-8">Built for Every Failure Mode You've Hit.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[280px] gap-6">
          
          {/* Cell A: Semantic Routing (4 cols) */}
          <Card variant="depth-3" className="md:col-span-4 md:row-span-1 p-0 flex flex-col justify-between group overflow-hidden">
            <div className="p-6 pb-2 Satoshi 700 text-xs text-text-mono uppercase tracking-widest flex items-center justify-between">
               <span>Live Routing Preview</span>
               <div className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(0,212,255,0.6)] animate-pulse" />
            </div>
            
            <div className="flex-1 px-8 py-4 flex flex-col justify-center space-y-4">
               <div className="bg-black/30 rounded-lg p-3 min-h-[60px] flex items-center">
                  <Typewriter 
                    key={routeIdx}
                    words={[ROUTING_PROMPTS[routeIdx].text]} 
                    className="text-xs Satoshi 400 text-text-primary italic" 
                  />
               </div>
               
               <AnimatePresence mode="wait">
                  <motion.div 
                    key={routeIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex justify-between items-center"
                  >
                     <div className="flex flex-col gap-1">
                        <span className={cn(
                           "text-[10px] Satoshi 800 font-bold uppercase",
                           ROUTING_PROMPTS[routeIdx].color === "red" && "text-red",
                           ROUTING_PROMPTS[routeIdx].color === "amber" && "text-amber",
                           ROUTING_PROMPTS[routeIdx].color === "green" && "text-green",
                           ROUTING_PROMPTS[routeIdx].color === "cyan" && "text-cyan",
                        )}>
                           {ROUTING_PROMPTS[routeIdx].tier}
                        </span>
                        <span className="text-[9px] Satoshi 500 text-text-dim uppercase tracking-tighter">via {ROUTING_PROMPTS[routeIdx].model}</span>
                     </div>
                     <div className="text-right flex flex-col gap-1">
                        <span className="text-[10px] Satoshi 800 text-text-primary font-bold">{ROUTING_PROMPTS[routeIdx].cost}</span>
                        <span className="text-[9px] Satoshi 500 text-green uppercase font-bold tracking-widest italic">{ROUTING_PROMPTS[routeIdx].saving} ↓</span>
                     </div>
                  </motion.div>
               </AnimatePresence>
            </div>
             
            <div className="h-1 bg-bg-depth-1 w-full relative">
               <motion.div 
                className={cn(
                   "h-full absolute top-0 left-0 transition-colors duration-500",
                   ROUTING_PROMPTS[routeIdx].color === "red" && "bg-red w-[90%]",
                   ROUTING_PROMPTS[routeIdx].color === "amber" && "bg-amber w-[60%]",
                   ROUTING_PROMPTS[routeIdx].color === "green" && "bg-green w-[20%]",
                   ROUTING_PROMPTS[routeIdx].color === "cyan" && "bg-cyan w-[5%]",
                )}
                transition={{ duration: 0.8 }}
               />
            </div>
          </Card>

          {/* Cell B: Prompt Compression (4 cols) */}
          <Card variant="depth-3" className="md:col-span-4 md:row-span-1 p-8 grid grid-cols-2 gap-4 group">
             <div className="space-y-4">
                <div className="text-[8px] Satoshi 700 text-text-dim uppercase tracking-widest">Before (1.2k)</div>
                <div className="space-y-1.5">
                   {[1,2,3,4,5,6].map(i => <div key={i} className="h-1 rounded bg-red/10 w-full" />)}
                </div>
                <div className="text-[10px] Satoshi 800 text-red font-bold animate-pulse">$0.0431</div>
             </div>
             
             <div className="space-y-4 border-l border-border-glass pl-4">
                <div className="text-[8px] Satoshi 700 text-text-dim uppercase tracking-widest">After (240)</div>
                <div className="space-y-1.5">
                   {[1,2].map(i => <div key={i} className="h-1 rounded bg-green/20 w-full" />)}
                </div>
                <div className="text-xs Satoshi 800 text-green font-bold animate-shimmer">$0.0004</div>
                <div className="text-[8px] Satoshi 800 text-green italic uppercase font-bold tracking-widest">↓ 86% COMPRESSION</div>
             </div>
          </Card>

          {/* Cell C: Response Cache (4 cols) */}
          <Card variant="depth-3" className="md:col-span-4 md:row-span-1 p-8 flex flex-col justify-center gap-6 group">
             <div className="flex justify-between items-center">
                <div className="space-y-1">
                   <div className="text-[10px] Satoshi 800 text-text-mono uppercase tracking-widest">Semantic Cache HIT Cache</div>
                   <div className="text-lg Satoshi 800 text-text-primary">64.7% REUSE</div>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-bg-depth-1 border-t-cyan animate-spin" />
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-[9px] Satoshi 500 text-text-dim uppercase">
                   <span>Last hit: 12ms ago</span>
                   <span className="text-green font-bold">Saved $0.039</span>
                </div>
                <div className="h-1 w-full bg-bg-depth-1 rounded-full overflow-hidden">
                   <motion.div initial={{ width: 0 }} whileInView={{ width: "64.7%" }} className="h-full bg-cyan shadow-cyan-glow" transition={{ duration: 1.5 }} />
                </div>
             </div>
          </Card>

          {/* Cell D: PII Scrubber (6 cols) */}
          <Card variant="depth-3" className="md:col-span-6 md:row-span-1 p-10 flex flex-col justify-center gap-8 group">
             <div className="space-y-6 font-mono text-[11px] leading-relaxed">
                <div className="p-4 rounded-lg bg-red/5 border border-red/10 text-red/60 line-through Satoshi 400">
                   "Send report to sarah.chen@acme.com, card ending 4892, SSN 123-45-XXX"
                </div>
                <div className="p-4 rounded-lg bg-green/5 border border-green/10 text-green/80 font-bold Satoshi 400">
                   "Send report to <span className="text-cyan underline underline-offset-4">[EMAIL]</span>, card ending <span className="text-cyan underline underline-offset-4">[CARD_LAST4]</span>, SSN <span className="text-cyan underline underline-offset-4">[PII_REDACTED]</span>"
                </div>
             </div>
             <div className="flex gap-3">
                {['Name', 'Email', 'Financial', 'Personal ID', 'Phone'].map(tag => (
                   <div key={tag} className="px-2.5 py-1 rounded bg-bg-alpha/10 border border-white/5 text-[8px] Satoshi 700 uppercase tracking-widest text-text-dim group-hover:text-text-secondary transition-colors">{tag}</div>
                ))}
                <div className="ml-auto flex items-center gap-2 text-[9px] Satoshi 800 text-green uppercase font-bold tracking-widest animate-pulse">✓ ENTITIES MASKED</div>
             </div>
          </Card>

          {/* Cell E: Intent Alignment Engine (6 cols) */}
          <Card variant="depth-3" className="md:col-span-6 md:row-span-1 grid grid-cols-2 p-0 overflow-hidden group">
             <div className="p-10 border-r border-border-glass bg-red/5 flex flex-col justify-center space-y-4 filter blur-[0.5px]">
                <div className="text-[9px] Satoshi 800 text-red/60 uppercase tracking-widest">Without CerebroGate</div>
                <div className="space-y-2">
                   {[1,2,3,4,5].map(i => <div key={i} className="h-1.5 rounded bg-red/10 w-full" />)}
                </div>
                <p className="text-[10px] Satoshi 400 text-red/40 italic">Generic, unfocused response</p>
             </div>
             <div className="p-10 flex flex-col justify-center space-y-4">
                <div className="text-[9px] Satoshi 800 text-green uppercase tracking-widest">With Intent Alignment</div>
                <div className="space-y-4">
                   <div className="flex gap-2">
                      <div className="h-3 w-16 rounded bg-cyan/20 border border-cyan/40" />
                      <div className="h-3 w-12 rounded bg-green/20 border border-green/40" />
                   </div>
                   <div className="space-y-2">
                      {[1,2,3].map(i => <div key={i} className="h-1.5 rounded bg-cyan/10 w-full" />)}
                   </div>
                   <div className="text-[10px] Satoshi 600 text-cyan uppercase font-bold italic tracking-widest animate-pulse">→ TARGETED OUTPUT</div>
                </div>
             </div>
          </Card>

        </div>
      </div>
    </section>
  );
};
