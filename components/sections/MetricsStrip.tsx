"use client";
import React from "react";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { cn } from "@/lib/utils";

export const MetricsStrip = () => {
  const metrics = [
    { label: "API Cost Reduction", value: 78, prefix: "↓", suffix: "%", color: "text-green" },
    { label: "Requests Routed", value: 847, suffix: "M+", color: "text-cyan" },
    { label: "Routing Latency", value: 14, prefix: "<", suffix: "ms", color: "text-amber" },
    { label: "PII Events Blocked", value: 1847, color: "text-violet" },
    { label: "Cache Hit Rate", value: 64.7, suffix: "%", decimals: 1, color: "text-green" }
  ];

  return (
    <div className="relative w-full h-[120px] bg-bg-depth-1 border-y border-border-subtle flex items-center overflow-hidden">
      {/* 3D Shimmer Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/5 to-transparent animate-shimmer bg-[length:200%_100%] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-2 md:grid-cols-5 items-center gap-8 md:gap-0">
        {metrics.map((metric, idx) => (
          <div key={metric.label} className={cn(
             "flex flex-col items-center justify-center relative",
             idx !== metrics.length - 1 && "md:border-r md:border-border-subtle"
          )}>
            <div className={cn("text-3xl font-mono font-bold tracking-tighter Satoshi 700 mb-1", metric.color)}>
               <AnimatedNumber 
                value={metric.value} 
                prefix={metric.prefix}
                suffix={metric.suffix}
                decimals={metric.decimals}
                duration={2}
               />
            </div>
            <div className="text-[10px] Satoshi 500 font-mono font-bold tracking-widest text-text-dim uppercase text-center px-4">
               {metric.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
