"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const PANELS_DATA = [
  {
    id: 1,
    title: "One prompt. 100+ models.",
    text: "Stop juggling subscriptions. CerebroGate routes every request to the best model automatically — or let you choose from GPT-5, Claude, Gemini, Grok, Llama, DeepSeek and 90+ others with one click.",
  },
  {
    id: 2,
    title: "Your AI spend, finally visible.",
    text: "See exactly what every request costs, which model handled it, and how much was saved. Real-time. Per request. Exportable.",
  },
  {
    id: 3,
    title: "Intelligent. Secure. Compliant.",
    text: "PII scrubbed before it leaves your stack. Intent validated. Output verified. Contracts enforced. GDPR, HIPAA, and DPDP ready.",
  },
  {
    id: 4,
    title: "Deploy in 12 minutes. Change zero code.",
    text: "Replace your AI endpoint with ours. Everything else stays identical. No SDK changes, no rewriting, no downtime.",
  }
];

export const PlatformOverview = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activePanel, setActivePanel] = useState(1);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const step = 1 / PANELS_DATA.length;
      const index = Math.min(Math.floor(latest / step) + 1, PANELS_DATA.length);
      setActivePanel(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div id="platform" ref={containerRef} className="relative bg-bg-base min-h-[400vh] py-32 overflow-hidden">
      <div className="sticky top-0 left-0 w-full h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          <div className="lg:col-span-5 space-y-24">
             <div className="mb-20">
                <Badge variant="outline" className="mb-6 Satoshi 600">The Platform</Badge>
                <h2 className="text-title font-display text-text-primary uppercase tracking-tight italic Satoshi 800">Not another AI wrapper. A complete intelligence layer.</h2>
             </div>
             
             <div className="relative h-[480px]">
                {PANELS_DATA.map((panel) => (
                  <motion.div 
                    key={panel.id}
                    className="absolute top-0 left-0 w-full h-full space-y-8 flex flex-col justify-center"
                    initial={false}
                    animate={{ 
                      opacity: activePanel === panel.id ? 1 : 0, 
                      y: activePanel === panel.id ? 0 : 20,
                      pointerEvents: activePanel === panel.id ? "auto" : "none"
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <div className="text-display font-display text-text-primary Satoshi 800 opacity-10">0{panel.id}</div>
                    <h3 className="text-hero font-display text-text-primary Satoshi 700">{panel.title}</h3>
                    <p className="text-body-lg text-text-secondary leading-relaxed Satoshi 400">
                      {panel.text}
                    </p>
                  </motion.div>
                ))}
             </div>
          </div>

          <div className="lg:col-span-7 h-[680px] flex items-center justify-center relative">
             <Card 
              variant="glass" 
              className="w-full h-full p-0 flex flex-col items-center justify-center overflow-hidden border-border-active bg-bg-depth-2 shadow-cyan-glow group/ui"
              isHoverable={false}
             >
                <AnimatePresence mode="wait">
                   {activePanel === 1 && (
                     <motion.div key="selector" variants={fadeUp} initial="hidden" animate="visible" exit="hidden" className="flex flex-col items-center gap-6">
                        <div className="grid grid-cols-3 gap-3">
                           {['GPT-5', 'Claude-S', 'Gemini', 'Grok-4', 'Llama-4', 'DeepSeek-R1'].map(n => (
                             <div key={n} className="w-24 h-12 rounded-lg bg-bg-depth-3 border border-border-glass flex items-center justify-center text-[10px] font-bold text-text-secondary Satoshi 600">{n}</div>
                           ))}
                        </div>
                        <div className="w-48 h-8 rounded-full bg-cyan/10 border border-cyan/20 flex items-center justify-center text-[10px] text-cyan Satoshi 600 uppercase">View All 100+ Models</div>
                     </motion.div>
                   )}

                   {activePanel === 2 && (
                     <motion.div key="dashboard" variants={fadeUp} initial="hidden" animate="visible" exit="hidden" className="w-full h-full p-8 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-4 rounded-xl bg-bg-depth-3 border border-border-subtle Satoshi 600 text-xs text-text-dim uppercase tracking-widest">Savings: <span className="text-green text-lg Satoshi 800 ml-2 animate-pulse">$38,446</span></div>
                           <div className="p-4 rounded-xl bg-bg-depth-3 border border-border-subtle Satoshi 600 text-xs text-text-dim uppercase tracking-widest">Requests: <span className="text-cyan text-lg Satoshi 800 ml-2">847K</span></div>
                        </div>
                        <div className="w-full h-48 bg-bg-base border border-border-glass rounded-xl relative overflow-hidden flex items-end px-1 gap-1">
                           {[20, 45, 30, 60, 25, 80, 40, 55, 35, 70, 45, 90, 20, 60].map((h, i) => (
                             <div key={i} className="flex-1 rounded-t-sm bg-cyan/20 border-t border-cyan/40" style={{ height: `${h}%` }} />
                           ))}
                           <div className="absolute top-4 left-6 Satoshi 600 text-[10px] text-text-secondary flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" /> SPEND COMPRESSION TREND
                           </div>
                        </div>
                     </motion.div>
                   )}

                   {activePanel === 3 && (
                     <motion.div key="security" variants={fadeUp} initial="hidden" animate="visible" exit="hidden" className="w-full h-full p-12 flex flex-col justify-center gap-8">
                        <div className="text-sm font-mono Satoshi 500 space-y-4">
                           <div className="flex justify-between items-center text-red line-through opacity-40">
                              <span>customer_email: "alice.wonder@gmail.com"</span>
                              <span>UNSECURED ✗</span>
                           </div>
                           <div className="flex justify-between items-center text-cyan font-bold italic">
                              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>customer_email: "[EMAIL_REDACTED]"</motion.span>
                              <span>SCRUBBED ✓</span>
                           </div>
                           <div className="flex justify-between items-center text-red line-through opacity-40 pt-4">
                              <span>auth_token: "sk-proj-48k2l9s..."</span>
                           </div>
                           <div className="flex justify-between items-center text-cyan font-bold italic">
                              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>auth_token: "[KEY_REDACTED]"</motion.span>
                           </div>
                        </div>
                        <div className="flex gap-4">
                           {['GDPR', 'HIPAA', 'ISO27001', 'SOC-2'].map(badge => (
                             <div key={badge} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] Satoshi 500 opacity-60 uppercase">{badge}</div>
                           ))}
                        </div>
                     </motion.div>
                   )}

                   {activePanel === 4 && (
                     <motion.div key="code" variants={fadeUp} initial="hidden" animate="visible" exit="hidden" className="w-full h-full p-10 flex flex-col justify-center">
                        <div className="font-mono text-sm leading-relaxed Satoshi 400 space-y-6">
                           <pre className="text-red/40 line-through">
                              - const openai = new OpenAI();
                              - const res = await openai.chat.completions.create(&#123;...&#125;);
                           </pre>
                           <pre className="text-cyan font-bold">
                              + const gate = new CerebroGate();
                              + const res = await gate.chat.completions.create(&#123;...&#125;);
                           </pre>
                           <div className="pt-8 text-[10px] text-text-dim flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                             CEREBRO_SDK_V2.1.0 · REPLACED 1 LINE · DEPLOYED ✓
                           </div>
                        </div>
                     </motion.div>
                   )}
                </AnimatePresence>
                
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
             </Card>

             <div className="absolute -inset-10 bg-cyan/10 blur-[120px] rounded-full -z-10 group-hover/ui:bg-cyan/20 transition-all duration-700" />
          </div>

        </div>
      </div>
    </div>
  );
};
