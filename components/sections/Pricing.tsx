"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PRICING_PLANS } from "@/lib/constants";
import { fadeUp, stagger } from "@/lib/animations";
import { cn, formatCurrency } from "@/lib/utils";

export const Pricing = () => {
  const [monthlySpend, setMonthlySpend] = useState(15000);
  const projectedSavings = monthlySpend * 0.72;
  const cerebroFee = projectedSavings * 0.20;
  const netGain = projectedSavings - cerebroFee;

  return (
    <section id="pricing" className="py-32 bg-bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 space-y-4">
          <Badge variant="outline" className="Satoshi 600">Pricing</Badge>
          <h2 className="text-display font-display text-text-primary uppercase Satoshi 800 italic tracking-tight">Net-Positive Cost Control.</h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto Satoshi 400 leading-relaxed">
            We don't charge you a subscription. We share in the money we save you. If we don't save you money, CerebroGate is free.
          </p>
        </div>

        {/* Dynamic Savings Calculator */}
        <div className="max-w-3xl mx-auto mb-32">
           <Card variant="depth-3" className="p-10 border-cyan/20 bg-cyan/5 relative group border-border-active shadow-cyan-glow-dim">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                 <div className="flex-1 space-y-6 w-full">
                    <div className="flex justify-between items-center Satoshi 700 text-xs text-text-dim uppercase tracking-widest mb-2">
                       <span>Monthly AI Spend</span>
                       <span className="text-cyan font-bold">{formatCurrency(monthlySpend)}</span>
                    </div>
                    <input 
                      type="range" 
                      min="1000" 
                      max="100000" 
                      step="1000"
                      value={monthlySpend}
                      onChange={(e) => setMonthlySpend(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-bg-depth-3 rounded-full appearance-none cursor-pointer accent-cyan border border-border-glass" 
                    />
                    <div className="flex justify-between text-[10px] Satoshi 500 text-text-dim uppercase tracking-tighter">
                       <span>$1,000</span>
                       <span>$100,000+</span>
                    </div>
                 </div>
                 
                 <div className="flex flex-col items-center gap-1 md:border-l border-border-glass md:pl-12">
                   <span className="text-[10px] Satoshi 700 text-green font-bold uppercase tracking-widest animate-pulse">PROJECTED NET GAIN / MO</span>
                   <span className="text-5xl Satoshi 800 text-green drop-shadow-[0_0_20px_rgba(0,255,157,0.4)] transition-all">
                     {formatCurrency(netGain)}
                    </span>
                   <span className="text-[10px] Satoshi 500 text-text-dim uppercase tracking-widest pt-2">After 20% CerebroGate Fee</span>
                 </div>
              </div>
              {/* Background ambient light following slider? Maybe too much, let's keep it steady. */}
           </Card>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {PRICING_PLANS.map((plan, idx) => (
             <Card 
              key={plan.name} 
              variant={plan.isPopular ? "depth-3" : "depth-2"} 
              className={cn(
                "p-10 flex flex-col gap-10 group border-border-glass bg-bg-depth-3/40",
                plan.isPopular && "border-cyan/40 bg-bg-depth-3/60 shadow-cyan-glow-dim h-[640px] relative -translate-y-4"
              )}
             >
                {plan.isPopular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full bg-cyan text-black text-[10px] font-bold Satoshi 800 uppercase tracking-widest shadow-cyan-glow">Most Popular</div>}
                
                <div className="space-y-4">
                   <div className="text-xs font-mono Satoshi 800 text-text-mono uppercase tracking-widest">{plan.name}</div>
                   <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-display text-text-primary Satoshi 800">{plan.price}</span>
                      <span className="text-sm font-mono Satoshi 500 text-text-dim lowercase tracking-tighter italic">/mo base</span>
                   </div>
                   <p className="text-sm text-text-secondary leading-relaxed Satoshi 400 h-12">{plan.description}</p>
                   <div className="pt-4 text-[10px] Satoshi 800 text-cyan uppercase font-bold tracking-widest animate-pulse italic">{plan.fee} SUCCESS FEE</div>
                </div>

                <div className="h-[1px] w-full bg-border-glass" />

                <ul className="space-y-4 flex-1">
                   {plan.features.map(f => (
                     <li key={f} className="flex gap-4 items-center group/item cursor-default text-sm md:text-base">
                        <div className="w-5 h-5 rounded-full border border-border-glass flex items-center justify-center text-[10px] text-text-dim group-hover/item:border-cyan group-hover/item:text-cyan transition-all Satoshi 800 italic group-hover/item:scale-110">✓</div>
                        <span className="text-sm text-text-secondary group-hover/item:text-text-primary transition-colors Satoshi 400">{f}</span>
                     </li>
                   ))}
                </ul>

                <Button variant={plan.isPopular ? "primary" : "outline"} className="w-full h-14 Satoshi 600 uppercase tracking-widest">{plan.cta}</Button>
             </Card>
           ))}
        </div>
      </div>
    </section>
  );
};
