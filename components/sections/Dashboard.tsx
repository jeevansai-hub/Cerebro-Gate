"use client";
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { MOCK_DASHBOARD_STATS, RECENT_ROUTING_DECISIONS } from "@/lib/constants";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { formatCurrency, cn } from "@/lib/utils";
import { LayoutDashboard, Compass, Database, Shield, FileBarChart2 } from "lucide-react";

const KPI_CARD = ({ stat }: { stat: any }) => (
  <Card className="flex flex-col p-6 rounded-xl border border-border-subtle bg-bg-depth-3/40 backdrop-blur-md">
    <div className="text-xs font-mono font-bold uppercase tracking-widest text-text-dim mb-4">{stat.label}</div>
    <div className="flex items-end justify-between">
      <div className={cn("font-display font-bold text-3xl", 
        stat.color === 'green' ? 'text-green' : 
        stat.color === 'cyan' ? 'text-cyan' : 
        stat.color === 'accent' ? 'text-text-primary' : 'text-amber'
      )}>
        <AnimatedNumber 
          value={stat.value} 
          prefix={stat.prefix} 
          suffix={stat.suffix} 
          className="text-3xl font-display font-bold" 
          decimals={stat.value % 1 !== 0 ? 1 : 0}
        />
      </div>
      <div className={`text-[10px] uppercase font-mono font-bold tracking-tighter ${stat.trend.includes('-') ? 'text-red' : 'text-green'}`}>
        {stat.trend}
      </div>
    </div>
  </Card>
);

const LineChart = () => (
  <div className="relative w-full h-full p-4 flex flex-col">
    <div className="flex justify-between items-center mb-6">
       <span className="text-xs font-mono font-bold tracking-widest text-text-dim uppercase">Daily API Spend (30d)</span>
       <div className="flex gap-4">
         <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red" /> <span className="text-[10px] text-text-dim">BEFORE</span></div>
         <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green" /> <span className="text-[10px] text-text-dim">AFTER</span></div>
       </div>
    </div>
    <div className="flex-grow bg-bg-base/40 rounded-xl relative overflow-hidden p-4">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 400" preserveAspectRatio="none">
        {/* Grid Lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line key={i} x1="0" y1={i * 100} x2="1000" y2={i * 100} stroke="rgba(0,212,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
        ))}
        {/* Red Line (Before) */}
        <motion.path
          d="M 0 50 L 100 80 L 200 40 L 300 90 L 400 60 L 500 120 L 600 70 L 700 90 L 800 60 L 900 100 L 1000 80"
          stroke="var(--red)"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        {/* Green Line (After) */}
        <motion.path
          d="M 0 350 L 100 370 L 200 360 L 300 380 L 400 375 L 500 385 L 600 380 L 700 390 L 800 382 L 900 388 L 1000 385"
          stroke="var(--green)"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  </div>
);

export const Dashboard = () => {
  return (
    <section id="dashboard" className="py-32 relative overflow-hidden bg-bg-base">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6 Satoshi 600">Cost Intelligence</Badge>
          <motion.h2 variants={fadeUp} className="text-title font-display mb-4 uppercase tracking-tight text-white italic">Finally, Full Visibility Into Your AI Spend</motion.h2>
        </div>

        {/* Browser Window Mockup */}
        <motion.div
           initial={{ opacity: 0, y: 40, rotateX: 2 }}
           whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: [0.16,1,0.3,1] }}
           className="w-full bg-bg-depth-2 border border-border-active rounded-2xl overflow-hidden shadow-2xl relative"
        >
          {/* Browser Header */}
          <div className="h-12 border-b border-border-subtle bg-bg-depth-3 flex items-center justify-between px-6">
             <div className="flex gap-2">
               <div className="w-2.5 h-2.5 rounded-full bg-red/30" />
               <div className="w-2.5 h-2.5 rounded-full bg-amber/30" />
               <div className="w-2.5 h-2.5 rounded-full bg-green/30" />
             </div>
             <div className="bg-black/40 px-6 py-1 rounded-md text-[10px] font-mono text-text-dim flex items-center gap-2">
               <span className="w-3 h-3 text-cyan opacity-50">🔒</span>
               app.cerebrogate.io/dashboard
             </div>
             <div className="w-10 h-1 rounded-full bg-border-active" />
          </div>

          <div className="flex h-[720px]">
             {/* Local Sidebar Mock */}
             <div className="w-64 border-r border-border-subtle bg-bg-depth-3/30 p-6 space-y-8 hidden md:block">
                <div className="space-y-4">
                  {[
                    { icon: LayoutDashboard, label: "Overview", active: true },
                    { icon: Compass, label: "Routing Logs" },
                    { icon: Database, label: "Vector Cache" },
                    { icon: Shield, label: "Security Trace" },
                    { icon: FileBarChart2, label: "Cost Reports" }
                  ].map((item, i) => (
                    <div key={i} className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono Satoshi 600 transition-colors cursor-pointer",
                      item.active ? "bg-cyan/10 text-cyan" : "text-text-dim hover:text-text-secondary hover:bg-white/5"
                    )}>
                      <item.icon size={14} />
                      {item.label}
                    </div>
                  ))}
                </div>
             </div>

             {/* Main Dashboard Area */}
             <div className="flex-1 overflow-y-auto p-8 bg-bg-base/20 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                   {MOCK_DASHBOARD_STATS.map((stat, i) => (
                     <KPI_CARD key={i} stat={stat} />
                   ))}
                </div>

                {/* Big Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[400px]">
                   <div className="lg:col-span-8 bg-bg-depth-3/20 border border-border-subtle rounded-2xl overflow-hidden glass-panel">
                      <LineChart />
                   </div>
                   <div className="lg:col-span-4 bg-bg-depth-3/20 border border-border-subtle rounded-2xl p-6 glass-panel flex flex-col">
                      <span className="text-xs font-mono font-bold tracking-widest text-text-dim uppercase mb-6">Traffic by Model</span>
                      <div className="space-y-4 flex-grow flex flex-col justify-center">
                         {[
                           { name: "Llama 3 70B", val: 65, color: "bg-cyan" },
                           { name: "GPT-4o", val: 18, color: "bg-green" },
                           { name: "Claude Sonnet", val: 12, color: "bg-amber" },
                           { name: "Other Models", val: 5, color: "bg-text-dim" }
                         ].map((m, i) => (
                           <div key={i} className="space-y-1">
                             <div className="flex justify-between text-[10px] font-mono Satoshi 600">
                                <span>{m.name}</span>
                                <span className={cn(m.color.replace('bg-', 'text-'))}>{m.val}%</span>
                             </div>
                             <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                               <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${m.val}%` }}
                                transition={{ duration: 1.5, delay: i * 0.1 }}
                                className={cn("h-full", m.color)} 
                               />
                             </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                {/* Recent Activity Mini-Table */}
                <div className="bg-bg-depth-3/20 border border-border-subtle rounded-2xl p-6 glass-panel">
                   <div className="flex justify-between items-center mb-6">
                     <span className="text-xs font-mono font-bold tracking-widest text-text-dim uppercase">Recent Routing Decisions</span>
                     <button className="text-[10px] font-mono Satoshi 700 text-cyan hover:underline uppercase tracking-widest">Full Trace Log →</button>
                   </div>
                   <div className="space-y-3">
                      {RECENT_ROUTING_DECISIONS.map((row, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-border-subtle last:border-0 text-[10px] font-mono">
                           <div className="flex items-center gap-6">
                             <span className="text-text-dim w-12">{row.time}</span>
                             <span className="text-text-primary Satoshi 600 truncate max-w-[200px]">{row.request}</span>
                           </div>
                           <div className="flex items-center gap-8">
                             <div className="flex flex-col items-end">
                                <span className="text-text-dim text-[8px] uppercase">Route</span>
                                <span className="text-cyan">{row.model}</span>
                             </div>
                             <div className="flex flex-col items-end">
                                <span className="text-text-dim text-[8px] uppercase">Saving</span>
                                <span className="text-green">{row.saving}</span>
                             </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
