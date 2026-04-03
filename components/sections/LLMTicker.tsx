"use client";
import React from "react";
import { LLM_LOGOS, LLM_MODELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const LLMTicker = () => {
  return (
    <section className="relative w-full bg-bg-base pt-20 pb-16 border-b border-border-subtle overflow-hidden">
      {/* Top/Bottom Gradient Fade */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg-base to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg-base to-transparent pointer-events-none z-10" />
      
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col items-center">
         <span className="text-[10px] Satoshi 800 text-text-dim uppercase tracking-[0.3em] bg-bg-depth-3 px-4 py-1.5 rounded-full border border-border-subtle">Direct Infrastructure Access</span>
      </div>

      {/* Row 1: Brand Logos (Left to Right) */}
      <div className="flex gap-24 animate-ticker items-center whitespace-nowrap mb-16 hover:[animation-play-state:paused] transition-all duration-500">
        {[...LLM_LOGOS, ...LLM_LOGOS, ...LLM_LOGOS].map((logo, idx) => (
          <div key={`${logo.name}-${idx}`} className="flex items-center gap-5 group cursor-pointer transition-transform hover:scale-110">
             <div className="w-10 h-10 flex items-center justify-center filter grayscale contrast-0 brightness-200 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500">
                <img 
                  src={`https://cdn.simpleicons.org/${logo.icon}/${logo.color.replace('#', '')}`}
                  alt={logo.name}
                  className="w-full h-full object-contain"
                />
             </div>
             <div className="flex flex-col">
                <span className="text-[13px] font-display font-black Satoshi 900 text-text-dim group-hover:text-text-primary transition-colors uppercase tracking-widest leading-none">{logo.name}</span>
                <span className="text-[8px] Satoshi 500 text-text-dim/40 transition-colors uppercase tracking-widest mt-1">Provider node ready</span>
             </div>
          </div>
        ))}
      </div>

      {/* Row 2: Model Names (Right to Left) */}
      <div className="flex gap-16 animate-ticker items-center whitespace-nowrap [animation-direction:reverse] hover:[animation-play-state:paused] transition-all duration-500">
        {[...LLM_MODELS, ...LLM_MODELS, ...LLM_MODELS].map((model, idx) => (
          <div key={`${model}-${idx}`} className="flex items-center gap-6 group cursor-default">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan/20 group-hover:bg-cyan transition-colors" />
            <span className="text-xs font-mono font-black Satoshi 900 text-text-dim/60 group-hover:text-cyan transition-all tracking-[0.2em] uppercase">{model}</span>
          </div>
        ))}
      </div>
      
      {/* Visual background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] font-display font-black opacity-[0.015] pointer-events-none Satoshi 900 italic select-none">
        OMNIGATEWAY
      </div>
    </section>
  );
};
