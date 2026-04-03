"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { fadeUp, stagger } from "@/lib/animations";
import { classifyPrompt, RoutingResult, cn } from "@/lib/utils";
import { Check, Loader2, Sparkles, Zap, Shield, Search, Globe, ChevronRight } from "lucide-react";

const STEPS = [
  { id: 1, label: "Intent Scanned", icon: Search },
  { id: 2, label: "Complexity Audit", icon: Zap },
  { id: 3, label: "Context Shielding (PII)", icon: Shield },
  { id: 4, label: "Semantic Cache Check", icon: Globe },
  { id: 5, label: "Model Selection", icon: Sparkles },
  { id: 6, label: "Cost Scoping", icon: Check },
];

export const RoutingVisualizer = () => {
  const [prompt, setPrompt] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<RoutingResult | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleAnalyze = () => {
    if (!prompt.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);
    setCurrentStep(0);

    let step = 1;
    const interval = setInterval(() => {
      setCurrentStep(step);
      step++;
      if (step > 6) {
        clearInterval(interval);
        const classification = classifyPrompt(prompt);
        setResult(classification);
        setIsAnalyzing(false);
      }
    }, 450);
  };

  const handleExample = (text: string) => {
    setPrompt(text);
  };

  return (
    <section id="visualizer" className="py-32 bg-bg-base relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <Badge variant="outline" className="Satoshi 600">Live Playground</Badge>
          <h2 className="text-title font-display text-text-primary uppercase Satoshi 800 italic tracking-tight">The Engine in Real-Time.</h2>
          <p className="text-body text-text-secondary max-w-xl mx-auto Satoshi 400">
             Input any prompt to see the 14ms routing decision cycle that saves our users millions in API credits.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Input Panel */}
          <div className="lg:col-span-12">
             <Card variant="depth-3" className="p-1 relative group bg-bg-depth-3/60 border-border-active shadow-cyan-glow-dim">
                <textarea 
                  className="w-full h-40 bg-black/40 border-none rounded-2xl p-8 text-text-primary font-mono text-lg focus:outline-none placeholder:text-text-dim/40 resize-none Satoshi 400"
                  placeholder="Test the gateway... e.g. 'Summarize this technical PDF and extract the key numbers'"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <div className="absolute bottom-6 right-6 flex flex-wrap gap-4 items-center">
                   <div className="flex gap-2">
                     {["Summarize this", "Fix this bug", "What's the weather?"].map(ex => (
                       <button key={ex} onClick={() => handleExample(ex)} className="px-3 py-1 text-[9px] Satoshi 800 uppercase tracking-widest text-text-dim hover:text-cyan hover:border-cyan/40 border border-transparent transition-all rounded bg-bg-base/40">
                         {ex}
                       </button>
                     ))}
                   </div>
                   <Button size="lg" onClick={handleAnalyze} disabled={isAnalyzing || !prompt.trim()} className="h-14 px-12 Satoshi 800 bg-cyan shadow-cyan-glow">
                      {isAnalyzing ? <Loader2 className="animate-spin" /> : "RUN SCRIBE ENGINE"}
                   </Button>
                </div>
             </Card>
          </div>

          {/* Trace Panel */}
          <div className="lg:col-span-7">
             <Card variant="depth-2" className="h-[480px] p-0 flex flex-col font-mono relative overflow-hidden">
                <div className="h-10 px-6 border-b border-border-glass flex items-center justify-between text-[10px] Satoshi 800 tracking-widest text-text-dim bg-white/5">
                   <span>ROUTING TRACE COMPLETED ... [0.{currentStep}S]</span>
                   <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-red/20" />
                      <div className="w-2 h-2 rounded-full bg-amber/20" />
                      <div className="w-2 h-2 rounded-full bg-green/20" />
                   </div>
                </div>
                
                <div className="flex-1 p-10 space-y-6 overflow-y-auto custom-scrollbar">
                   {STEPS.map((step, idx) => (
                     <div key={step.id} className={cn(
                        "flex items-center gap-6 transition-all duration-300",
                        currentStep > idx ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                     )}>
                        <div className={cn(
                           "w-8 h-8 rounded-lg flex items-center justify-center border transition-all",
                           currentStep > idx + 1 ? "bg-green/10 border-green/40 text-green" : 
                           currentStep === idx + 1 ? "bg-cyan/10 border-cyan/40 text-cyan animate-pulse" : 
                           "bg-bg-depth-3 border-border-glass text-text-dim"
                        )}>
                           <step.icon size={14} />
                        </div>
                        <div className="flex-1 flex justify-between items-center pr-4">
                           <span className={cn(
                              "text-xs Satoshi 700 uppercase tracking-widest font-bold",
                              currentStep > idx ? "text-text-primary" : "text-text-dim"
                           )}>{step.label}</span>
                           {currentStep > idx + 1 && (
                              <span className="text-[10px] text-green Satoshi 800 font-bold italic animate-pulse">OK ✓</span>
                           )}
                           {currentStep === idx + 1 && (
                              <span className="text-[10px] text-cyan Satoshi 800 font-bold uppercase tracking-widest animate-pulse">PROCESSING...</span>
                           )}
                        </div>
                     </div>
                   ))}

                   {result && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-6 mt-6 border-t border-border-glass space-y-4">
                        <div className="p-4 rounded-xl bg-cyan/10 border border-cyan/20 flex justify-between items-center group overflow-hidden relative">
                           <div className="absolute inset-0 bg-gradient-to-r from-cyan/20 to-transparent animate-shimmer bg-[length:200%_100%]" />
                           <div className="relative z-10 flex flex-col">
                              <span className="text-[9px] Satoshi 800 text-cyan uppercase tracking-widest italic font-bold">Recommended Route</span>
                              <span className="text-xl Satoshi 800 text-text-primary font-bold">{result.model}</span>
                           </div>
                           <ChevronRight className="relative z-10 text-cyan animate-bounce" />
                        </div>
                     </motion.div>
                   )}
                </div>
             </Card>
          </div>

          {/* Metrics Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">
             <Card variant="depth-3" className="flex-1 p-8 flex flex-col justify-center gap-6 bg-green/5 border-green/10 font-mono shadow-green-glow-dim">
                <div className="text-[10px] Satoshi 800 text-green uppercase tracking-[0.2em] font-bold">Cost Saved vs Default Model</div>
                <div className="text-6xl Satoshi 800 text-green drop-shadow-[0_0_15px_rgba(0,255,157,0.4)] transition-all">
                  {result ? result.savings : "0%"}
                </div>
                <div className="text-[10px] Satoshi 500 text-text-secondary uppercase">Estimated Savings: {result ? result.cost : "$0.00"}</div>
             </Card>
             
             <Card variant="depth-3" className="flex-1 p-8 flex flex-col justify-center gap-4 bg-violet/5 border-violet/10 font-mono">
                <div className="text-[10px] Satoshi 800 text-violet/80 uppercase tracking-[0.2em] font-bold">Intelligence Intensity</div>
                <div className="flex items-end gap-2 text-3xl font-bold Satoshi 800 text-violet">
                   {result ? result.score : "0.0"} <span className="text-xs Satoshi 400 text-text-dim pb-1 font-mono uppercase tracking-widest italic">/ 10</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                   <motion.div initial={{ width: 0 }} animate={{ width: result ? `${(result.score/10)*100}%` : "0%" }} className="h-full bg-violet shadow-[0_0_15px_rgba(124,58,237,0.4)]" transition={{ duration: 1.5 }} />
                </div>
             </Card>
          </div>

        </div>
      </div>
    </section>
  );
};
