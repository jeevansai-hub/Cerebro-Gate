"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

const NEW_FEATURES = [
  {
    id: "budget",
    title: "Prompt Budget Enforcer",
    problem: "@engineering teams have no control over individual app spend.",
    solution: "Set hard/soft spend limits per project. Auto-downgrade to cheaper models as budget thresholds approach.",
    tag: "Cost Control",
    ui: "budget"
  },
  {
    id: "diff",
    title: "Semantic Diff Engine",
    problem: "Repeating identical queries costs double. Minor wording changes shouldn't.",
    solution: "Detect semantically identical queries using vector similarity beyond exact-match caching.",
    tag: "Trust",
    ui: "diff"
  },
  {
    id: "shield",
    title: "Hallucination Shield",
    problem: "LLMs confidently state false facts. No system catches this before the user.",
    solution: "CerebroGate cross-references factual outputs against a lightweight fact-check model instantly.",
    tag: "Enterprise",
    ui: "shield"
  },
  {
    id: "consensus",
    title: "Multi-Model Consensus",
    problem: "High-stakes decisions shouldn't rely on a single model's potentially biased output.",
    solution: "Run sensitive queries against a committee of 3 models simultaneously and output the consensus answer.",
    tag: "High Stakes",
    ui: "consensus"
  }
];

export const NewFeatures = () => {
  return (
    <section className="py-32 bg-bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 space-y-4">
          <Badge variant="outline" className="Satoshi 600">Beyond Routing</Badge>
          <h2 className="text-title font-display text-text-primary uppercase Satoshi 800 italic tracking-tight italic">Built for the Actual Production Problems.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {NEW_FEATURES.map((feat, idx) => (
             <Card 
              key={feat.id} 
              variant="depth-3" 
              className="p-10 flex flex-col gap-10 group border-border-glass bg-bg-depth-3/40"
             >
                <div className="space-y-6">
                   <div className="flex items-center justify-between">
                      <div className="text-2xl font-display text-text-primary Satoshi 700">{feat.title}</div>
                      <Badge variant="dim" className="px-3 py-1 text-[8px] Satoshi 800 tracking-widest uppercase">{feat.tag}</Badge>
                   </div>
                   <div className="text-sm font-mono Satoshi 500 space-y-1">
                      <p className="text-red opacity-60 line-through Satoshi 400 italic">✗ {feat.problem}</p>
                      <p className="text-text-secondary Satoshi 400">✓ {feat.solution}</p>
                   </div>
                </div>

                <div className="h-48 rounded-2xl bg-black/40 border border-border-glass p-8 relative overflow-hidden flex items-center justify-center">
                   {/* Abstract UI Mini-Demos */}
                   {feat.ui === "budget" && (
                      <div className="w-full space-y-4 flex flex-col justify-center">
                         <div className="flex justify-between items-center Satoshi 600 text-xs text-text-dim uppercase tracking-widest mb-2">
                            <span>Project: "Support Bot"</span>
                            <span className="text-cyan font-bold">$380 / $500 used (76%)</span>
                         </div>
                         <div className="h-4 w-full bg-bg-depth-1 rounded-full overflow-hidden border border-border-dim">
                            <motion.div initial={{ width: 0 }} whileInView={{ width: "76%" }} className="h-full bg-cyan shadow-cyan-glow" transition={{ duration: 1.5 }} />
                         </div>
                         <div className="flex gap-2 text-[9px] Satoshi 800 text-text-dim uppercase tracking-widest pt-2">
                           <div className="px-2 py-0.5 rounded bg-bg-alpha/10 border border-white/5 opacity-40 Satoshi 700">80% → DOWNGRADE TIER</div>
                           <div className="px-2 py-0.5 rounded bg-amber/5 border border-amber/20 text-amber animate-pulse Satoshi 700">95% → HARD BLOCK</div>
                         </div>
                      </div>
                   )}

                   {feat.ui === "diff" && (
                      <div className="w-full space-y-4 font-mono text-[10px] Satoshi 500 flex flex-col justify-center">
                         <div className="flex justify-between items-center text-text-dim Satoshi 400 italic px-2">
                            <span>"Capital of France?"</span>
                            <span>"France's capital city?"</span>
                         </div>
                         <div className="h-10 w-full rounded bg-cyan/5 border border-cyan/20 flex items-center justify-center gap-4 group/similarity relative">
                            <div className="text-lg Satoshi 800 text-cyan opacity-80 italic animate-shimmer">0.97 SIMILARITY</div>
                            <div className="absolute inset-0 bg-cyan opacity-5 blur-[20px] rounded-full -z-10" />
                            <div className="px-3 py-1 text-[9px] Satoshi 600 bg-bg-depth-3 border border-border-active text-cyan uppercase font-bold animate-pulse Satoshi 700">✓ CACHE HIT</div>
                         </div>
                         <div className="flex justify-between text-text-dim uppercase tracking-widest px-2 Satoshi 400">
                            <span>Cost: $0.000</span>
                            <span className="text-green font-bold italic">Savings: 100%</span>
                         </div>
                      </div>
                   )}

                   {feat.ui === "shield" && (
                      <div className="w-full space-y-6 font-mono text-[9px] Satoshi 500 flex flex-col justify-center">
                         <div className="space-y-2 p-3 rounded-lg bg-bg-alpha/5 border border-white/5 Satoshi 400">
                            <p className="opacity-40 Satoshi 400 italic">"What year was Anthropic founded?"</p>
                            <p className="text-text-primary Satoshi 400 italic">"Anthropic was founded in 2021"</p>
                         </div>
                         <div className="flex items-center gap-3">
                            <div className="w-16 h-4 rounded-md bg-green/20 border border-green/40 flex items-center justify-center text-green Satoshi 800 uppercase font-bold tracking-widest italic animate-pulse">✓ VERIFIED</div>
                            <div className="h-4 flex-1 bg-green/5 border border-green/10 rounded flex items-center px-4 Satoshi 500 italic opacity-40">Wikipedia, Crunchbase, Reuters</div>
                         </div>
                      </div>
                   )}

                   {feat.ui === "consensus" && (
                      <div className="w-full space-y-4 font-mono text-[9px] Satoshi 500 flex flex-col justify-center">
                         <div className="text-[10px] Satoshi 800 text-text-mono uppercase tracking-widest text-center px-4 pt-1 mb-2">Multi-Model Committee Review</div>
                         <div className="grid grid-cols-3 gap-2">
                            {['GPT-5', 'Claude', 'Gemini'].map((m, i) => (
                              <div key={m} className={cn(
                                "p-2 rounded border Satoshi 400 text-center flex flex-col gap-1",
                                i === 2 ? "bg-amber/5 border-amber/20 text-amber" : "bg-green/5 border-green/20 text-green"
                              )}>
                                 <span className="text-[7px] Satoshi 800 opacity-60 uppercase">{m}</span>
                                 <span className="text-[9px] Satoshi 800">{i === 1 ? "HIGH RISK" : i === 0 ? "HIGH RISK" : "MED RISK"}</span>
                              </div>
                            ))}
                         </div>
                         <div className="p-3 rounded bg-cyan/10 border border-cyan/40 text-center text-cyan uppercase font-bold italic tracking-widest shadow-cyan-glow-dim animate-pulse Satoshi 700">
                            Consensus: HIGH RISK (2/3) · confidence: 0.87
                         </div>
                      </div>
                   )}

                   {/* Background Glow */}
                   <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg-base to-transparent pointer-events-none" />
                </div>
             </Card>
           ))}
        </div>
      </div>
    </section>
  );
};
