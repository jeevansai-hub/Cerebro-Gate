"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { fadeUp, drawPath } from "@/lib/animations";
import { cn } from "@/lib/utils";

const PIPELINE_STEPS = [
  { id: "01", name: "Intercept", time: "< 1ms", desc: "Raw HTTP request arrives at CerebroGate before any model. No SDK changes required.", code: `{ "method": "POST", "endpoint": "/v1/chat/completions", "model": "gpt-4o", "tokens_in": 847 }` },
  { id: "02", name: "Understand", time: "< 3ms", desc: "Intent, domain, and output requirements extracted for routing intelligence.", code: `{ "intent": "summarization", "domain": "email", "output_type": "paragraph", "complexity_score": 1.8 }` },
  { id: "03", name: "PII Scrub", time: "< 2ms", desc: "Sensitive data (Names, Emails, PII) detected and masked locally.", code: `- "Email from john.doe@gmail.com..."\n+ "Email from [EMAIL_REDACTED]..."` },
  { id: "04", name: "Cache Check", time: "< 2ms", desc: "Vector database queried for a semantically similar cached response.", code: `{ "semantic_similarity": 0.97, "threshold": 0.85, "result": "CACHE_HIT", "cost": "$0.0000" }` },
  { id: "05", name: "Route", time: "< 4ms", desc: "Match complexity score to the most cost-efficient capable model tier.", code: `{ "complexity": "SIMPLE", "model_selected": "llama-3-8b", "savings_pct": "99.5%" }` },
  { id: "06", name: "Verify", time: "< 2ms", desc: "Final model output validated against your custom contract and intent.", code: `{ "relevance_score": 0.96, "contract_passed": true, "confidence": 0.94, "delivered": true }` },
];

export const Pipeline = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="py-32 bg-bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 space-y-4">
          <Badge variant="outline" className="Satoshi 600">Under the Hood</Badge>
          <h2 className="text-title font-display text-text-primary uppercase Satoshi 800 italic tracking-tight">6 Decisions in &lt; 14ms. Every Request.</h2>
        </div>

        {/* Horizontal SVG Pipeline */}
        <div className="relative mb-20 overflow-x-auto custom-scrollbar pb-10">
           <svg 
            width="1200" 
            height="200" 
            viewBox="0 0 1200 200" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
           >
              {/* Animated Path Connections */}
              <motion.path 
                d="M100 100 H1100" 
                stroke="rgba(0,212,255,0.15)"
                strokeWidth={2}
                strokeDasharray="8 8"
                variants={drawPath}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />

              {/* Glowing Data Packet Animation */}
              <motion.circle
                cx={100}
                cy={100}
                r={4}
                fill="#00d4ff"
                initial={{ cx: 100, opacity: 0 }}
                animate={{ 
                    cx: [100, 1100],
                    opacity: [0, 1, 1, 0]
                }}
                transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "linear" 
                }}
                className="shadow-cyan-glow"
              />

              {/* Node Placements */}
              {PIPELINE_STEPS.map((step, idx) => {
                const x = 100 + (idx * 200);
                const isActive = activeStep === idx;
                
                return (
                  <g 
                    key={step.id} 
                    className="cursor-pointer group"
                    onClick={() => setActiveStep(idx)}
                  >
                     {/* Outer Ring Glow */}
                     <motion.circle 
                        cx={x} 
                        cy={100} 
                        r={isActive ? 28 : 24} 
                        fill={isActive ? "rgba(0,212,255,0.1)" : "rgba(10,21,32,0.6)"}
                        stroke={isActive ? "#00d4ff" : "rgba(0,212,255,0.2)"}
                        strokeWidth={1.5}
                        className="transition-all duration-300 group-hover:stroke-cyan"
                     />
                     {/* Inner Number Circle */}
                     <circle 
                        cx={x} 
                        cy={100} 
                        r={18} 
                        fill="#060d12"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth={1}
                     />
                     <text 
                        x={x} 
                        y={105} 
                        textAnchor="middle" 
                        fill={isActive ? "#00d4ff" : "#6b93ac"} 
                        className="text-[10px] font-mono Satoshi 700 uppercase select-none transition-colors"
                     >
                        {step.id}
                     </text>
                     {/* Label below node */}
                     <text 
                        x={x} 
                        y={150} 
                        textAnchor="middle" 
                        fill={isActive ? "#00d4ff" : "#2a4f68"} 
                        className="text-[10px] Satoshi 800 uppercase tracking-widest transition-colors font-bold"
                     >
                        {step.name}
                     </text>
                     <text 
                        x={x} 
                        y={168} 
                        textAnchor="middle" 
                        fill="#2a4f68" 
                        className="text-[8px] Satoshi 400 uppercase tracking-[0.2em]"
                     >
                        {step.time}
                     </text>
                  </g>
                );
              })}
           </svg>
        </div>

        {/* Step Expansion Panel */}
        <div className="max-w-4xl mx-auto">
           <AnimatePresence mode="wait">
              <motion.div 
               key={activeStep}
               initial={{ opacity: 0, scale: 0.98, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.98, y: -10 }}
               transition={{ duration: 0.4, ease: "easeOut" }}
              >
                 <Card variant="depth-3" className="flex flex-col md:flex-row gap-10 p-10 border-border-active bg-bg-depth-3/80 backdrop-blur-3xl overflow-visible">
                    <div className="flex-1 space-y-6">
                       <div className="flex items-center gap-4">
                          <div className="text-3xl font-display text-cyan Satoshi 800 opacity-20">0{activeStep + 1}</div>
                          <h3 className="text-2xl font-display text-text-primary Satoshi 700">{PIPELINE_STEPS[activeStep].name}</h3>
                          <Badge variant="dim" className="ml-auto">{PIPELINE_STEPS[activeStep].time}</Badge>
                       </div>
                       <p className="text-body text-text-secondary leading-relaxed Satoshi 400">
                          {PIPELINE_STEPS[activeStep].desc}
                       </p>
                    </div>

                    <div className="flex-1">
                       <div className="relative group/terminal rounded-xl overflow-hidden border border-border-glass bg-black/40">
                          {/* Mac-style title bar */}
                          <div className="h-8 px-4 flex items-center gap-2 bg-white/5 border-b border-border-glass">
                             <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-red/40" />
                                <div className="w-1.5 h-1.5 rounded-full bg-amber/40" />
                                <div className="w-1.5 h-1.5 rounded-full bg-green/40" />
                             </div>
                             <span className="text-[8px] font-mono Satoshi 400 text-text-dim uppercase tracking-widest pl-2">Step_{PIPELINE_STEPS[activeStep].name.toLowerCase()}.json</span>
                          </div>
                          
                          <pre className="p-6 text-[11px] font-mono text-cyan/70 whitespace-pre-wrap leading-relaxed Satoshi 400 group-hover/terminal:text-cyan transition-colors">
                             {PIPELINE_STEPS[activeStep].code}
                          </pre>
                       </div>
                    </div>

                    {/* Decorative glow pointing back to node top-left */}
                    <div className="absolute -top-10 -left-10 bg-cyan/5 blur-[80px] w-64 h-64 rounded-full pointer-events-none -z-10" />
                 </Card>
              </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
