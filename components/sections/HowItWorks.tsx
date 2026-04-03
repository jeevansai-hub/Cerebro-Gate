"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/index";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const STEPS = [
  { 
    id: "01", 
    title: "Intercept", 
    desc: "Request arrives at CerebroGate before any model",
    code: `{
  "request": "POST /v1/chat/completions",
  "source": "prod-app-server-3",
  "proxy_mode": "transparent",
  "timestamp": "2025-08-12T14:22:01.034Z"
}`
  },
  { 
    id: "02", 
    title: "Understand", 
    desc: "Intent, context, and output type extracted",
    code: `{
  "intent": "summarization",
  "complexity": 2.1,
  "priority": "normal",
  "output_format": "text/markdown"
}`
  },
  { 
    id: "03", 
    title: "PII Scrub", 
    desc: "Sensitive data detected and masked",
    code: `{
  "scrubbing": true,
  "detections": ["email", "zip_code"],
  "prompt": "Summarize this ticket from [REDACTED] regarding issue in [REDACTED]..."
}`
  },
  { 
    id: "04", 
    title: "Cache Check", 
    desc: "Vector DB queried for semantic match",
    code: `{
  "cache_check": "MISS",
  "vector_similarity": 0.54,
  "threshold": 0.85
}`
  },
  { 
    id: "05", 
    title: "Route", 
    desc: "Complexity scored, model selected",
    code: `{
  "model_selected": "mistral-7b",
  "reasoning": "low complexity task",
  "savings_est": "$0.042/req"
}`
  },
  { 
    id: "06", 
    title: "Verify", 
    desc: "Output validated against contract",
    code: `{
  "passed": true,
  "confidence": 0.94,
  "validation_rules": 8,
  "status": "APPROVED"
}`
  },
];

export const HowItWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const elements = containerRef.current?.querySelectorAll(".step-item");
      if (!elements) return;
      
      let found = 0;
      elements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2) {
          found = idx;
        }
      });
      setActiveStep(found);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="how-it-works" className="py-32 bg-bg-void relative overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center lg:text-left">
          <Badge variant="outline" className="mb-6 px-4 py-1 text-xs uppercase tracking-[0.2em] font-bold">Under the Hood</Badge>
          <h2 className="text-title font-syne mb-4 uppercase tracking-tight text-white italic">Six Decisions. Every Request. Milliseconds.</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* Left Timeline */}
          <div className="flex-1 relative">
            {/* Vertical Line */}
            <div className="absolute left-6 top-10 bottom-10 w-[1px] bg-border-dim" />
            <motion.div 
              style={{ scaleY }}
              className="absolute left-6 top-10 bottom-10 w-[1.5px] bg-accent-primary z-10 origin-top shadow-[0_0_15px_rgba(0,200,255,0.5)]" 
            />

            <div className="space-y-24">
              {STEPS.map((step, idx) => (
                <div key={step.id} className="step-item relative pl-20 group">
                  {/* Number Circle */}
                  <div className={cn(
                    "absolute left-0 top-0 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 z-20 bg-bg-void font-syne font-bold text-lg",
                    activeStep === idx 
                      ? "border-accent-primary text-accent-primary shadow-[0_0_20px_rgba(0,200,255,0.3)] scale-110" 
                      : "border-border-dim text-text-dim"
                  )}>
                    {step.id}
                  </div>
                  
                  <div className={cn(
                    "transition-all duration-500",
                    activeStep === idx ? "opacity-100 translate-x-2" : "opacity-30 translate-x-0"
                  )}>
                    <h3 className="text-2xl font-syne font-bold mb-2 uppercase tracking-wide italic text-white flex items-center gap-4">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary text-base leading-relaxed max-w-md">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Code Preview */}
          <div className="flex-1 sticky top-32 h-[500px] hidden lg:block overflow-hidden">
            <div className="w-full h-full bg-bg-surface border border-border-dim/50 rounded-2xl p-8 relative shadow-2xl overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-10 pb-4 border-b border-border-dim/30">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent-primary animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-widest text-text-dim">CEREBRO_LOGS_V3.8</span>
                </div>
                <div className="flex gap-2">
                   <div className="w-2 h-2 rounded-full bg-border-dim" />
                   <div className="w-2 h-2 rounded-full bg-border-dim" />
                   <div className="w-2 h-2 rounded-full bg-border-dim" />
                </div>
              </div>

              <div className="font-mono text-sm leading-relaxed text-accent-primary/80 flex-grow overflow-y-auto custom-scrollbar pt-6">
                <AnimatePresence mode="wait">
                  <motion.pre
                    key={activeStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="whitespace-pre-wrap select-all"
                  >
                    {STEPS[activeStep].code}
                  </motion.pre>
                </AnimatePresence>
              </div>

              {/* Decorative terminal artifacts */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg-surface to-transparent pointer-events-none" />
              <div className="absolute top-20 right-10 flex flex-col gap-10 opacity-10 pointer-events-none select-none text-xs font-mono text-text-dim">
                <span>01001101 01000101 01010100 01000001</span>
                <span>01000011 01000001 01000011 01001000</span>
                <span>01010100 01010010 01000001 01000011</span>
              </div>
            </div>
            {/* Glow sweep beneath active code area */}
            <div className="absolute inset-0 bg-accent-primary/5 blur-[120px] rounded-full pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
