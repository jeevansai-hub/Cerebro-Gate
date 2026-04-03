"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Typewriter } from "@/components/ui/Typewriter";
import { fadeUp, stagger, scaleReveal } from "@/lib/animations";
import { Send, Plus, Search, Sparkles, Book, BarChart2, Image as ImageIcon, Video, UserPlus, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const NeuralScene = dynamic(() => import("../three/NeuralScene"), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-bg-base/20 animate-pulse" />
});

export const Hero = () => {
  const [activeTab, setActiveTab] = useState('Chat');
  const tabs = [
    { name: 'Chat', icon: Sparkles },
    { name: 'Image', icon: ImageIcon },
    { name: 'Video', icon: Video },
    { name: 'Agents', icon: UserPlus },
    { name: 'Search', icon: Globe }
  ];
  
  const models = {
    Chat: ['GPT-5 (OpenAI)', 'Claude 4 (Anthropic)', 'Gemini 2.5 Pro Ultra', 'Grok 4 (xAI)', 'Llama 4 Maverick', 'DeepSeek R1'],
    Image: ['Midjourney v7', 'DALL-E 4', 'Flux 1.1 Pro', 'Nano Banana', 'Ideogram 2.0', 'Stable Diffusion 4'],
    Video: ['Veo (Google)', 'Sora Gen-3', 'Kling 2.1', 'Runway Gen-4', 'Luma Dream Machine 3', 'Seedance'],
    Agents: ['Deep Research Agent', 'Perplexity Pro', 'Coding Co-pilot', 'Finance Auditor (Agentic)', 'Compliance Shield'],
    Search: ['Real-time Web Search', 'Semantic Academic', 'News Intelligence', 'Multimodal Search']
  };

  const trendingPrompts = {
    Chat: "Analyze this PDF and extract key insights for my venture fund",
    Image: "A high-fidelity 3D metallic gate in a neon void, cinematic lighting, 8k --v 7",
    Video: "A tracking shot of an AI neural network fluidly morphing into a city skyline",
    Agents: "Find the top 10 competitors in the AI infrastructure space and draft a SWOT",
    Search: "Latest benchmarks for Gemini 2.5 vs GPT-5 in reasoning and coding"
  };

  return (
    <section className="relative min-h-[110svh] pt-32 pb-4 overflow-hidden bg-bg-base flex flex-col justify-center">
      {/* Layer 0: Background */}
      <NeuralScene />
      
      {/* Layer 1: Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan/5 blur-[160px] pointer-events-none rounded-full" />
      
      {/* Layer 2: Main Layout */}
      <div className="max-w-7xl mx-auto px-6 w-full lg:grid lg:grid-cols-12 gap-12 lg:gap-20 relative z-20">
        
        {/* Left Side: Content */}
        <motion.div 
          className="lg:col-span-6 space-y-10 mb-16 lg:mb-0 relative z-10"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <Badge variant="hero" className="gap-4 py-2 px-5 bg-cyan/5 border-cyan/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
              </span>
              <span className="text-cyan font-mono Satoshi 700 uppercase tracking-widest text-[10px]">CerebroGate Mesh v2.8 :: Active</span>
            </Badge>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4">
             <h1 className="text-6xl md:text-7xl font-display text-text-primary tracking-tighter Satoshi 800 italic uppercase leading-[0.9]">
               Intelligence<br />
               <span className="text-gradient-cyan">Orchestrated.</span>
             </h1>
             <p className="text-lg text-text-secondary leading-relaxed max-w-lg Satoshi 400 pt-4">
               One API endpoint. Every frontier model. High-performance routing, semantic caching, and PII scrubbing built-in. 
               <span className="text-text-primary font-bold"> Zero latency overhead.</span>
             </p>
          </motion.div>

          <motion.div className="flex flex-wrap gap-6 items-center" variants={fadeUp}>
            <Button size="lg" className="h-[60px] px-12 Satoshi 700 bg-cyan text-black shadow-cyan-glow hover:scale-105 transition-transform uppercase tracking-widest">Connect SDK →</Button>
            <button className="text-[10px] font-bold Satoshi 800 text-text-dim hover:text-cyan transition-all flex items-center gap-4 group uppercase tracking-[0.2em]">
              Documentation
              <div className="w-8 h-8 rounded-lg bg-bg-depth-3 flex items-center justify-center border border-border-glass group-hover:bg-cyan/10 transition-colors">
                <Send size={12} className="text-cyan" />
              </div>
            </button>
          </motion.div>

          {/* Quick Metrics Dashboard in Hero */}
          <motion.div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5" variants={fadeUp}>
             <div className="space-y-1">
                <span className="text-[10px] Satoshi 500 text-text-dim uppercase tracking-widest">Global P50 Latency</span>
                <div className="text-2xl font-mono text-cyan Satoshi 700">14ms</div>
             </div>
             <div className="space-y-1">
                <span className="text-[10px] Satoshi 500 text-text-dim uppercase tracking-widest">Uptime Reliability</span>
                <div className="text-2xl font-mono text-green Satoshi 700">99.999%</div>
             </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Interactive Playground Mockup */}
        <motion.div 
          className="lg:col-span-6 flex items-center justify-center relative z-20"
          variants={scaleReveal}
          initial="hidden"
          animate="visible"
        >
          {/* Background Ambient Aura */}
          <div className="absolute -inset-20 bg-cyan/10 blur-[140px] -z-10 rounded-full animate-pulse-slow" />

          <Card 
            variant="glass" 
            className="w-full max-w-[580px] p-0 overflow-hidden group/card shadow-[0_40px_100px_rgba(0,0,0,0.5)] border-border-active transition-all duration-700" 
            isHoverable={false}
          >
            {/* Browser Header Bar */}
            <div className="h-12 px-6 border-b border-border-glass flex items-center justify-between bg-bg-depth-3/60 backdrop-blur-md">
              <div className="flex gap-2.5">
                <div className="w-3 h-3 rounded-full bg-red/40 border border-red/40" />
                <div className="w-3 h-3 rounded-full bg-amber/40 border border-amber/40" />
                <div className="w-3 h-3 rounded-full bg-green/40 border border-green/40" />
              </div>
              <div className="px-8 py-1.5 bg-black/50 rounded-full border border-white/5 flex items-center justify-center min-w-[280px]">
                <span className="text-[10px] Satoshi 500 text-text-dim/80 tracking-wide font-mono">gateway.cerebrogate.io/playground</span>
              </div>
              <div className="w-8 h-1 rounded-full bg-white/5" />
            </div>

            {/* Playground Tabs */}
            <div className="px-8 pt-8 border-b border-border-glass bg-bg-depth-2/30">
               <div className="flex gap-10 overflow-x-auto no-scrollbar pb-0.5">
                 {tabs.map(tab => (
                   <button 
                    key={tab.name} 
                    onClick={() => setActiveTab(tab.name)}
                    className={cn(
                      "pb-6 text-[11px] font-bold Satoshi 800 relative transition-all uppercase tracking-[0.1em] flex items-center gap-2 whitespace-nowrap",
                      activeTab === tab.name ? "text-cyan" : "text-text-dim hover:text-text-secondary"
                    )}
                   >
                     <tab.icon size={13} className={activeTab === tab.name ? "text-cyan" : "text-text-dim"} />
                     {tab.name}
                     {activeTab === tab.name && (
                       <motion.div 
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 w-full h-[3px] bg-cyan shadow-[0_0_15px_rgba(0,212,255,0.8)]" 
                       />
                     )}
                   </button>
                 ))}
               </div>
            </div>

            {/* Playground Content */}
            <div className="p-8 space-y-8 bg-bg-depth-2/10 backdrop-blur-sm min-h-[480px] flex flex-col">
              {/* Model Chip Collection */}
              <div className="flex flex-wrap gap-2.5 animate-in fade-in slide-in-from-top-2 duration-300">
                {(models as any)[activeTab].map((model: string) => (
                  <div key={model} className="px-4 py-2 rounded-xl bg-bg-depth-3/80 border border-border-subtle text-[10px] font-bold text-text-secondary hover:border-cyan/50 hover:text-cyan transition-all cursor-pointer Satoshi 800 uppercase tracking-tighter glass-panel">
                    {model}
                  </div>
                ))}
                <div className="px-4 py-2 rounded-xl bg-cyan text-black text-[10px] font-bold Satoshi 900 uppercase tracking-tighter shadow-cyan-glow cursor-pointer hover:scale-105 transition-transform">+ EXPLORE ALL</div>
              </div>

              {/* Status Bar */}
              <div className="flex items-center justify-between text-[10px] Satoshi 700 px-5 py-3 bg-cyan/5 border border-cyan/10 rounded-2xl glass-panel">
                 <div className="flex items-center gap-3">
                    <span className="text-cyan uppercase tracking-widest font-mono">ACTIVE: {(models as any)[activeTab][0]}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan/30" />
                    <span className="text-text-dim italic font-medium">Smart Latency Mode</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className="text-green uppercase tracking-tighter">98.4% SAVING</span>
                    <span className="text-cyan font-black cursor-pointer hover:underline">UPGRADE →</span>
                 </div>
              </div>

              {/* Enhanced Prompt Input */}
              <div className="relative flex-grow flex flex-col min-h-[220px]">
                 <div className="absolute inset-0 bg-black/40 rounded-2xl border border-border-glass p-6 group-focus-within/playground:border-cyan/30 transition-colors">
                    <div className="text-[10px] font-mono text-cyan/40 mb-3 uppercase Satoshi 800 tracking-widest">Input context</div>
                    <textarea 
                      readOnly
                      className="w-full bg-transparent border-none p-0 text-text-primary Satoshi 400 text-sm focus:outline-none placeholder:text-text-dim/40 resize-none h-full"
                      placeholder="Start writing, coding, or exploring at scale..."
                    />
                 </div>
                 
                 {/* Typewriter Overlay */}
                 <div className="absolute top-[68px] left-6 right-6 pointer-events-none">
                    <Typewriter 
                      words={[(trendingPrompts as any)[activeTab]]}
                      className="text-sm Satoshi 500 text-cyan opacity-80" 
                      speed={50}
                      delay={2000}
                    />
                 </div>

                 {/* Input Action Cluster */}
                 <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between">
                    <div className="flex items-center gap-4 glass-panel bg-white/5 border border-white/5 rounded-full px-4 py-2">
                       <Plus size={15} className="text-text-dim hover:text-cyan cursor-pointer transition-colors" />
                       <div className="w-px h-3 bg-white/10" />
                       <ImageIcon size={15} className="text-text-dim hover:text-cyan cursor-pointer transition-colors" />
                       <Search size={15} className="text-text-dim hover:text-cyan cursor-pointer transition-colors" />
                       <Book size={15} className="text-text-dim hover:text-cyan cursor-pointer transition-colors" />
                       <BarChart2 size={15} className="text-text-dim hover:text-cyan cursor-pointer transition-colors" />
                    </div>
                    <button className="w-12 h-12 bg-cyan text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-cyan-glow">
                       <Send size={20} fill="currentColor" strokeWidth={3} />
                    </button>
                 </div>
              </div>

              {/* Visual Confirmation Strip */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                 <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse shadow-green/40" />
                    <span className="text-[9px] Satoshi 800 text-text-dim/80 uppercase tracking-[0.2em]">CerebroGate Regional Node: Tokyo SV-2</span>
                 </div>
                 <div className="flex gap-4 text-[9px] font-mono font-black Satoshi 900 text-cyan/60 tracking-widest uppercase">
                    <span>14ms Latency</span>
                    <span className="w-px h-2 bg-white/10 my-auto" />
                    <span>0.00% Zero-Loss</span>
                 </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Background Section Mask (for overlap safety) */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bg-base to-transparent pointer-events-none z-10" />
    </section>
  );
};
