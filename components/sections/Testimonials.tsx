"use client";
import React from "react";
import { TESTIMONIALS } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export const Testimonials = () => {
  return (
    <section className="py-32 bg-bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <Badge variant="outline" className="Satoshi 600">Proof of Concept</Badge>
          <h2 className="text-title font-display text-text-primary uppercase Satoshi 800 italic tracking-tight underline-offset-8">Used in Production by Industry Leaders.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {TESTIMONIALS.map((t, idx) => (
             <Card 
              key={t.author} 
              variant="depth-3" 
              className="p-10 flex flex-col justify-between gap-10 group border-border-glass bg-bg-depth-3/40"
             >
                <div className="space-y-6">
                   <div className="w-10 h-10 rounded-full bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan group-hover:scale-110 transition-all Satoshi 800 italic group-hover:animate-bounce uppercase tracking-widest">
                     <Quote size={20} fill="currentColor" opacity="0.4" />
                   </div>
                   <p className="text-lg md:text-xl text-text-primary Satoshi 600 leading-relaxed italic">"{t.quote}"</p>
                </div>

                <div className="flex items-center gap-4 border-t border-border-glass pt-8">
                   <div className="w-12 h-12 rounded-full bg-bg-alpha/30 border border-white/5 flex items-center justify-center text-text-primary Satoshi 800 uppercase tracking-widest">{t.avatar}</div>
                   <div>
                      <div className="text-sm font-bold text-text-primary Satoshi 700">{t.author}</div>
                      <div className="text-[10px] text-text-dim uppercase tracking-widest Satoshi 400">{t.role}</div>
                   </div>
                </div>
             </Card>
           ))}
        </div>
      </div>
    </section>
  );
};
