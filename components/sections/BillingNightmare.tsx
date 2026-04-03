"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { fadeUp, stagger } from "@/lib/animations";
import { cn, formatCurrency } from "@/lib/utils";

const BILLING_BEFORE = [
  { item: "summarize_email.py", model: "gpt-4o", cost: 0.0430, isRed: true },
  { item: "check_grammar.py", model: "gpt-4o", cost: 0.0310, isRed: true },
  { item: "get_weather_intent.py", model: "gpt-4o", cost: 0.0380, isRed: true },
  { item: "classify_ticket.py", model: "gpt-4o", cost: 0.0290, isRed: true },
  { item: "translate_to_french.py", model: "gpt-4o", cost: 0.0410, isRed: true },
  { item: "fix_python_bug.py", model: "gpt-4o", cost: 0.0350, isRed: true },
];

const BILLING_AFTER = [
  { item: "summarize_email.py", model: "llama-3", cost: 0.0002, saving: "99.5%" },
  { item: "check_grammar.py", model: "mistral", cost: 0.0001, saving: "99.7%" },
  { item: "get_weather_intent.py", model: "cache ✓", cost: 0.0000, saving: "100%" },
  { item: "classify_ticket.py", model: "llama-3", cost: 0.0002, saving: "99.3%" },
  { item: "translate_to_french.py", model: "mistral", cost: 0.0003, saving: "99.3%" },
  { item: "fix_python_bug.py", model: "claude-haiku", cost: 0.0012, saving: "96.6%" },
];

export const BillingNightmare = () => {
  const [isOptimized, setIsOptimized] = useState(false);

  return (
    <section className="py-32 bg-bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <Badge variant="outline" className="Satoshi 600">The Reality</Badge>
          <h2 className="text-title font-display text-text-primary uppercase Satoshi 800 italic tracking-tight">The Hidden Cost of Flat-Rate AI</h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto Satoshi 400">
             Every request hitting GPT-4o regardless of complexity. That's not intelligence — that's waste.
          </p>
        </div>

        <div className="flex justify-center mb-12">
            <div className="p-1 rounded-full bg-bg-depth-3 border border-border-subtle flex items-center relative gap-1">
               <button 
                onClick={() => setIsOptimized(false)}
                className={cn(
                    "px-6 py-2 text-xs font-bold Satoshi 600 uppercase transition-colors relative z-10 rounded-full",
                    !isOptimized ? "text-black" : "text-text-secondary hover:text-text-primary"
                )}
               >
                 Unmanaged
               </button>
               <button 
                onClick={() => setIsOptimized(true)}
                className={cn(
                    "px-6 py-2 text-xs font-bold Satoshi 600 uppercase transition-colors relative z-10 rounded-full",
                    isOptimized ? "text-black" : "text-text-secondary hover:text-text-primary"
                )}
               >
                 Optimized
               </button>
               <motion.div 
                layoutId="billingToggle"
                className={cn(
                    "absolute top-1 bottom-1 w-[124px] rounded-full",
                    isOptimized ? "bg-green right-1" : "bg-red left-1"
                )}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
               />
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
           {/* Left Mock Invoice Panel */}
           <div className="lg:col-span-8">
              <Card variant="depth-3" className="p-0 overflow-hidden font-mono border-border-active shadow-2xl relative">
                 {/* Cyan Glow Pool for optimized state */}
                 <AnimatePresence>
                    {isOptimized && (
                      <motion.div 
                       initial={{ opacity: 0 }} 
                       animate={{ opacity: 0.1 }} 
                       exit={{ opacity: 0 }} 
                       className="absolute inset-0 bg-green/40 blur-[100px] pointer-events-none" 
                      />
                    )}
                 </AnimatePresence>

                 {/* Terminal Header */}
                 <div className="h-12 px-6 border-b border-border-glass flex items-center justify-between bg-white/5 Satoshi 600 text-[10px] tracking-widest text-text-dim">
                    <span className="flex items-center gap-4">
                       <span className={cn("inline-block w-2 h-2 rounded-full animate-pulse", isOptimized ? "bg-green" : "bg-red")} />
                       AI INVOICE #08-2025 · {isOptimized ? "[OPTIMIZED / MANAGED]" : "[UNMANAGED / LEGACY]"}
                    </span>
                    <span className="opacity-40">INTERNAL_ONLY_DOCS</span>
                 </div>

                 {/* Invoice Content */}
                 <div className="p-8 space-y-4 min-h-[460px] relative">
                    <AnimatePresence mode="wait">
                       <motion.div 
                        key={isOptimized ? "optimized" : "unmanaged"}
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="space-y-3"
                       >
                          {(isOptimized ? BILLING_AFTER : BILLING_BEFORE).map((row, idx) => (
                            <motion.div key={row.item} variants={fadeUp} className="flex justify-between items-center text-sm md:text-base group hover:bg-white/5 transition-colors p-2 rounded">
                               <div className="flex gap-4 md:gap-12 items-center flex-1">
                                  <span className="text-text-dim opacity-60 Satoshi 400">{row.item}</span>
                                  <span className={cn("text-xs font-bold Satoshi 600 px-2 py-0.5 rounded", isOptimized ? "bg-cyan/10 text-cyan border border-cyan/20" : "bg-red/10 text-red border border-red/20")}>
                                     {row.model}
                                  </span>
                               </div>
                               <div className="flex items-center gap-8">
                                  {isOptimized && <span className="text-[10px] text-green Satoshi 600 font-bold italic tracking-widest opacity-80">{(row as any).saving} SAVED</span>}
                                  <span className={cn("text-right Satoshi 700", isOptimized ? "text-green" : "text-red")}>
                                     {formatCurrency(row.cost)}
                                  </span>
                               </div>
                            </motion.div>
                          ))}
                          
                          <div className="pt-8 mt-12 border-t border-border-glass space-y-4">
                             <div className="flex justify-between items-center opacity-60 Satoshi 500">
                                <span className="text-text-dim Satoshi 400">... 847,283 MORE REQUESTS SCALED IDENTICALLY</span>
                                <span className="line-through Satoshi 400">{isOptimized ? "$48,293.00" : ""}</span>
                             </div>
                             
                             {!isOptimized ? (
                                <div className="flex justify-between items-end">
                                   <span className="text-lg font-bold Satoshi 800 text-text-primary">TOTAL AUGUST SPEND</span>
                                   <span className="text-4xl Satoshi 800 text-red animate-pulse">$48,293.00</span>
                                </div>
                             ) : (
                                <div className="space-y-4">
                                   <div className="flex justify-between items-center text-green Satoshi 600 font-bold tracking-widest uppercase">
                                      <span>Optimized Spend</span>
                                      <span className="text-2xl">$9,847.00</span>
                                   </div>
                                   <div className="flex justify-between items-center text-green Satoshi 800 font-bold uppercase py-4 border-y border-green/20">
                                      <span className="text-xl">Documented Savings</span>
                                      <motion.span initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-5xl drop-shadow-[0_0_20px_rgba(0,255,157,0.4)]">$38,446.00</motion.span>
                                   </div>
                                   <div className="flex justify-between items-center text-text-secondary Satoshi 600 opacity-60">
                                      <span>CerebroGate FEE (20%)</span>
                                      <span>$7,689.00</span>
                                   </div>
                                   <div className="flex justify-between items-end text-cyan pt-4 Satoshi 800">
                                      <span className="text-2xl uppercase">NET RETAINED GAIN</span>
                                      <span className="text-6xl drop-shadow-[0_0_25px_rgba(0,212,255,0.4)]">$30,757.00</span>
                                   </div>
                                </div>
                             )}
                          </div>
                       </motion.div>
                    </AnimatePresence>
                 </div>
              </Card>
           </div>

           {/* Right Pain Points Side */}
           <div className="lg:col-span-4 space-y-8">
              <AnimatePresence mode="wait">
                 {!isOptimized ? (
                   <motion.div key="legacy" variants={stagger} initial="hidden" animate="visible" exit="hidden" className="space-y-8">
                      {[
                        { title: "Unmanaged Cost Scaling", desc: "Linear costs that explode with usage. GPT-4 price for Llama tasks." },
                        { title: "Zero Data Reuse", desc: "Semantically identical queries computed 1,000s of times daily." },
                        { title: "PII Security Gaps", desc: "Sensitive logs sent directly to model providers unmasked." },
                        { title: "Total Blindness", desc: "Zero visibility into intent, performance, or true request ROI." }
                      ].map((p, i) => (
                        <div key={p.title} className="flex gap-6 group">
                           <div className="w-10 h-10 rounded-lg bg-red/10 border border-red/20 flex items-center justify-center text-red group-hover:animate-bounce transition-all Satoshi 800">✗</div>
                           <div>
                              <h4 className="text-text-primary Satoshi 600 font-bold mb-1">{p.title}</h4>
                              <p className="text-sm text-text-secondary Satoshi 400 leading-relaxed">{p.desc}</p>
                           </div>
                        </div>
                      ))}
                   </motion.div>
                 ) : (
                   <motion.div key="managed" variants={stagger} initial="hidden" animate="visible" exit="hidden" className="space-y-8">
                      {[
                         { title: "Elastic Tiered Routing", desc: "Match prompt complexity to the cheapest capable model tier." },
                         { title: "Semantic Core Cache", desc: "Identify and serve 70% of redundant requests from local cache." },
                         { title: "Context Shielding", desc: "Remove enterprise noise before it hits your token budget." },
                         { title: "PII Scrubber", desc: "Mask data locally. Remain GDPR and HIPAA compliant natively." }
                      ].map((p, i) => (
                        <div key={p.title} className="flex gap-6 group">
                           <div className="w-10 h-10 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan group-hover:scale-110 transition-all Satoshi 800">✓</div>
                           <div>
                              <h4 className="text-text-primary Satoshi 600 font-bold mb-1">{p.title}</h4>
                              <p className="text-sm text-text-secondary Satoshi 400 leading-relaxed">{p.desc}</p>
                           </div>
                        </div>
                      ))}
                   </motion.div>
                 )}
              </AnimatePresence>
           </div>
        </div>
      </div>
    </section>
  );
};
