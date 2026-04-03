"use client";
import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Code, Hexagon, Zap, Shield, Database } from "lucide-react";
import { cn } from "@/lib/utils";

const FlowNode = ({ label, icon: Icon, isCentral, sublabels, description }: { label: string, icon: any, isCentral?: boolean, sublabels?: string[], description?: string }) => (
  <div className="flex flex-col items-center gap-6 relative z-10 w-full md:w-auto group">
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className={cn(
        "relative flex items-center justify-center p-8 rounded-3xl transition-all duration-500",
        isCentral 
          ? "bg-bg-base border-2 border-cyan shadow-cyan-glow md:h-72 md:w-64" 
          : "bg-bg-depth-3 border border-border-subtle h-28 w-28 hover:border-cyan/40"
      )}
    >
      {isCentral ? (
        <div className="flex flex-col items-center gap-6">
          <Hexagon className="text-cyan animate-pulse" size={38} />
          <span className="text-sm font-display font-bold uppercase tracking-[0.2em] text-text-primary Satoshi 800">{label}</span>
          <div className="flex flex-col gap-2.5 mt-2 text-[10px] uppercase tracking-widest text-text-dim text-center Satoshi 700">
            {sublabels?.map((s, i) => (
              <span key={i} className="hover:text-cyan transition-colors cursor-default inline-flex items-center gap-2 justify-center">
                 <div className="w-1 h-1 rounded-full bg-cyan/40" /> {s}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <Icon size={32} className="text-text-secondary group-hover:text-cyan transition-all duration-300" />
      )}
    </motion.div>
    <div className="text-center space-y-1">
      <span className={cn(
        "text-xs font-mono font-bold uppercase tracking-[0.2em] Satoshi 700",
        isCentral ? "text-cyan" : "text-text-dim group-hover:text-text-secondary transition-colors"
      )}>
        {label}
      </span>
      {description && <p className="text-[10px] text-text-dim Satoshi 400 max-w-[120px]">{description}</p>}
    </div>
  </div>
);

const PipelineVisual = () => (
  <div className="relative w-full max-w-6xl mx-auto py-24 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20 px-6">
    {/* Background Pipeline SVG */}
    <svg className="absolute inset-0 w-full h-full hidden md:block pointer-events-none opacity-20" style={{ zIndex: 0 }}>
       <motion.path
          d="M 100 200 H 1100"
          stroke="var(--cyan)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />
        <motion.circle
          cx={100}
          cy={200}
          r="3"
          fill="var(--cyan)"
          initial={{ cx: 100 }}
          animate={{ cx: [100, 1100] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
    </svg>

    <FlowNode label="CLIENT APP" icon={Code} description="Existing SDK or direct HTTP call" />
    
    <FlowNode 
      label="CEREBROGATE" 
      icon={Hexagon} 
      isCentral 
      sublabels={[
        "CLASSIFICATION",
        "COMPRESSION",
        "PII SCRUBBING",
        "SEMANTIC CACHE"
      ]} 
    />

    <div className="flex flex-col gap-8 md:translate-x-12">
       {[
         { icon: Database, label: "OPTIMIZED CACHE", color: "text-green", desc: "No tokens consumed" },
         { icon: Zap, label: "TIERED ROUTING", color: "text-cyan", desc: "Most efficient provider" },
         { icon: Shield, label: "VERIFIED OUTPUT", color: "text-amber", desc: "Validated contract" }
       ].map((res, i) => (
         <motion.div 
          key={i}
          whileHover={{ x: 10 }}
          className={cn(
            "flex flex-col items-start gap-1 p-5 border border-border-subtle rounded-2xl bg-bg-depth-3/20 backdrop-blur-md relative overflow-hidden group/res w-52",
            "hover:border-cyan/30 transition-all duration-300"
          )}
         >
            <div className={cn("absolute top-0 left-0 w-1 h-full", res.color.replace('text-', 'bg-'))} />
            <div className="flex items-center gap-3 mb-1">
               <res.icon size={14} className={res.color} />
               <span className="text-[10px] font-mono font-bold Satoshi 800 uppercase tracking-widest text-text-primary">{res.label}</span>
            </div>
            <p className="text-[9px] text-text-dim Satoshi 400">{res.desc}</p>
         </motion.div>
       ))}
    </div>
  </div>
);

export const Solution = () => {
  return (
    <section id="solution" className="py-40 relative overflow-hidden bg-bg-base">
       {/* Cinematic Background Glows */}
       <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan/5 blur-[140px] rounded-full pointer-events-none" />
       
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-6">
          <Badge variant="outline" className="Satoshi 600">The Solution</Badge>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-title font-display text-text-primary uppercase tracking-tight Satoshi 800 italic"
          >
            A Unified Intelligence Layer
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto Satoshi 400"
          >
            CerebroGate acts as an intelligent proxy between your application and any LLM provider,
            optimizing every request for cost, security, and performance.
          </motion.p>
        </div>

        <PipelineVisual />

        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
             { title: "Drop-In Deployment", desc: "Zero code changes required. Just update your base URL to our gateway endpoint.", icon: Zap },
             { title: "Dynamic Routing", desc: "Automatically match request complexity to the most cost-efficient capable model.", icon: Compass },
             { title: "PII Shield", desc: "Local-first scrubbing ensures sensitive data never leaves your infrastructure.", icon: Shield },
             { title: "Semantic Cache", desc: "Identical prompts are served from the cache at zero cost and near-zero latency.", icon: Database }
           ].map((item, i) => (
             <Card key={i} variant="depth-3" className="p-8 space-y-6 group/card hover:border-cyan/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-bg-base border border-border-subtle flex items-center justify-center text-cyan group-hover/card:scale-110 transition-transform">
                   <item.icon size={22} />
                </div>
                <div className="space-y-3">
                   <h4 className="text-lg font-display font-bold text-text-primary Satoshi 800 tracking-tight uppercase italic">{item.title}</h4>
                   <p className="text-[13px] text-text-secondary leading-relaxed Satoshi 400">{item.desc}</p>
                </div>
             </Card>
           ))}
        </div>
      </div>
    </section>
  );
};
import { Compass } from "lucide-react";
