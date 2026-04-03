"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { DollarSign, ShieldOff, RefreshCcw } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { cn } from "@/lib/utils";

export const Problem = () => {
  const [isAfter, setIsAfter] = useState(false);

  return (
    <section id="problem" className="py-32 bg-bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-6">
          <Badge variant="outline" className="Satoshi 600">The Problem</Badge>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-title font-display text-text-primary uppercase tracking-tight Satoshi 800 italic"
          >
            The Hidden Cost of Unmanaged AI
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto Satoshi 400"
          >
            Every unrouted request is money left on the table. Legacy infrastructure creates massive waste through flat-rate model routing.
          </motion.p>
        </div>

        {/* Invoice Visualizer */}
        <div className="mb-24">
          <div className="flex justify-center mb-12">
            <div className="bg-bg-depth-3 p-1 rounded-full border border-border-subtle flex items-center">
              <button
                onClick={() => setIsAfter(false)}
                className={`px-8 py-2 rounded-full text-xs font-mono font-bold tracking-widest transition-all ${
                  !isAfter ? "bg-cyan text-bg-base shadow-cyan-glow/50" : "text-text-dim hover:text-text-secondary"
                }`}
              >
                BEFORE CEREBROGATE
              </button>
              <button
                onClick={() => setIsAfter(true)}
                className={`px-8 py-2 rounded-full text-xs font-mono font-bold tracking-widest transition-all ${
                  isAfter ? "bg-green text-bg-base shadow-green/50" : "text-text-dim hover:text-text-secondary"
                }`}
              >
                AFTER CEREBROGATE
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-bg-depth-3/30 border border-border-active rounded-3xl p-10 lg:p-16 backdrop-blur-xl relative overflow-hidden group">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan/5 blur-[120px] rounded-full group-hover:bg-cyan/10 transition-all duration-700" />
            
            <div className="font-mono text-[11px] leading-relaxed p-8 bg-black/60 border border-border-glass rounded-2xl overflow-hidden shadow-2xl relative z-10 transition-transform duration-500 hover:scale-[1.02]">
              <div className="flex justify-between items-center mb-10 border-b border-border-glass pb-6">
                <span className="text-text-primary Satoshi 800 tracking-widest text-lg italic">AI_INVOICE #08-25</span>
                <Badge variant={isAfter ? "success" : "danger"}>
                  {isAfter ? "OPTIMIZED ✓" : "UNMANAGED ✗"}
                </Badge>
              </div>

              <div className="space-y-5">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={isAfter ? 'after' : 'before'}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {isAfter ? (
                      <>
                        <div className="flex justify-between items-center text-cyan">
                           <span>summarize_email.py  →  llama-3</span>
                           <span>$0.0002</span>
                        </div>
                        <div className="flex justify-between items-center text-cyan">
                           <span>check_grammar.py     →  mistral</span>
                           <span>$0.0001</span>
                        </div>
                        <div className="flex justify-between items-center text-green">
                           <span>get_weather_intent.py →  cache_hit</span>
                           <span>$0.0000</span>
                        </div>
                        <div className="flex justify-between items-center text-cyan">
                           <span>classify_ticket.py    →  llama-3</span>
                           <span>$0.0002</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between items-center text-text-dim">
                           <span>summarize_email.py  →  gpt-4o</span>
                           <span>$0.0430</span>
                        </div>
                        <div className="flex justify-between items-center text-text-dim">
                           <span>check_grammar.py     →  gpt-4o</span>
                           <span>$0.0310</span>
                        </div>
                        <div className="flex justify-between items-center text-text-dim">
                           <span>get_weather_intent.py →  gpt-4o</span>
                           <span>$0.0380</span>
                        </div>
                        <div className="flex justify-between items-center text-text-dim">
                           <span>classify_ticket.py    →  gpt-4o</span>
                           <span>$0.0290</span>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
                
                <div className="text-text-dim/40 italic py-6 Satoshi 400 tracking-tight">... 847,289 more request objects processed ...</div>
                
                <div className="border-t border-border-glass pt-8">
                  <div className="flex justify-between items-end text-2xl font-display Satoshi 800 mb-2">
                    <span className="text-text-primary uppercase text-sm tracking-widest Satoshi 600">TOTAL COST</span>
                    <div className={cn("flex flex-col items-end", isAfter ? "text-green" : "text-red")}>
                      <AnimatedNumber 
                        value={isAfter ? 9847 : 48293} 
                        prefix="$" 
                        decimals={0}
                        className="text-4xl"
                      />
                    </div>
                  </div>
                  {isAfter && (
                    <div className="flex justify-between items-center text-green font-mono font-bold text-[10px] tracking-widest mt-4 bg-green/5 p-3 rounded-lg border border-green/10">
                      <span className="animate-pulse">REDUCING OPEX SAVINGS</span>
                      <span>$38,446.00 (79.6%)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-10 relative z-10">
              <div className="space-y-4">
                <h3 className="text-3xl font-display font-bold text-text-primary Satoshi 800 italic tracking-tight">The AI Billing Nightmare</h3>
                <p className="text-lg text-text-secondary leading-relaxed Satoshi 400">
                  Most companies pay for peak-intensity processing on every single request. Using premium models for 
                  simple summarization or grammar checks is an architectural failure.
                </p>
              </div>
              <div className="space-y-6">
                {[
                  "Unnecessary cost scaling (linear usage patterns)",
                  "Zero reuse of semantically identical requests",
                  "Raw exposure of PII to third-party providers",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-bg-base/40 border border-border-glass hover:border-red/20 transition-all hover:bg-red/5">
                    <div className="w-8 h-8 rounded-full flex-shrink-0 bg-red/10 border border-red/20 flex items-center justify-center text-red">
                      <span className="text-sm font-bold Satoshi 800">✗</span>
                    </div>
                    <span className="text-text-secondary text-sm pt-1 Satoshi 500 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Problem Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { icon: DollarSign, title: "Flat-Rate Routing", body: "Every request hits premium models regardless of complexity or performance needs. Cost scaling is infinite." },
            { icon: ShieldOff, title: "Raw PII Exposure", body: "Sensitive user data travels unmasked to third-party LLMs without audit logs, encryption, or local scrubbing." },
            { icon: RefreshCcw, title: "Zero Response Reuse", body: "Identical semantic requests cost full price every time. No semantic cache layer means paying for the same answer twice." },
          ].map((item, idx) => (
            <motion.div key={idx} variants={fadeUp}>
              <Card variant="glass" className="h-full p-10 hover:border-cyan/40 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-bg-depth-3 border border-border-subtle flex items-center justify-center text-cyan mb-8 group-hover:scale-110 transition-transform shadow-cyan-glow/10">
                  <item.icon size={28} />
                </div>
                <h4 className="text-2xl font-display font-bold text-text-primary mb-4 Satoshi 800 italic uppercase tracking-tight">{item.title}</h4>
                <p className="text-text-secondary text-sm leading-relaxed Satoshi 400">{item.body}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
