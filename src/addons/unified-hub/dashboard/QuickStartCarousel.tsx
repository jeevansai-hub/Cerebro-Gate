// src/addons/unified-hub/dashboard/QuickStartCarousel.tsx
import React from 'react';
import { USE_CASE_TEMPLATES } from '../templates/library';
import { Card } from '../../../components/ui/Card';
import { Send, Zap, Clock, ShieldCheck } from 'lucide-react';
import { FEATURES } from '../../../config/features';

export const QuickStartCarousel: React.FC = () => {
  if (!FEATURES.ENABLE_UNIFIED_HUB) return null;

  const templates = Object.values(USE_CASE_TEMPLATES).slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h3 className="text-xl font-display font-bold text-text-primary Satoshi 800 italic uppercase">Quick Deploy templates</h3>
          <p className="text-xs text-text-secondary Satoshi 400">Launch optimized AI workflows in one click.</p>
        </div>
        <button className="text-[10px] Satoshi 800 text-cyan uppercase tracking-widest hover:underline">View All 100+ Templates</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <Card 
            key={template.id} 
            variant="depth-3" 
            className="p-6 h-full flex flex-col justify-between group hover:border-cyan/40 transition-all cursor-pointer relative overflow-hidden"
          >
             {/* Background glow per category? Maybe simpler, just hover glow */}
             <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan/5 blur-[40px] rounded-full group-hover:bg-cyan/10 transition-all" />
             
             <div className="space-y-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-bg-depth-3 border border-border-glass flex items-center justify-center text-cyan group-hover:scale-110 transition-transform">
                   {template.category === 'coding' && <Zap size={18} />}
                   {template.category === 'video' && <Clock size={18} />}
                   {template.category === 'research' && <ShieldCheck size={18} />}
                   {template.category === 'writing' && <Zap size={18} />}
                </div>
                <div className="space-y-1">
                   <h4 className="text-sm font-bold text-text-primary Satoshi 700 uppercase tracking-tight italic">{template.id.replace('_', ' ')}</h4>
                   <p className="text-[10px] text-text-dim Satoshi 400 leading-snug">Optimized for: {template.recommendedModel}</p>
                </div>
             </div>

             <div className="pt-6 flex justify-between items-center relative z-10">
                <span className="text-[9px] Satoshi 800 font-mono text-green uppercase tracking-widest">{template.estimatedCredits} Credits</span>
                <div className="w-8 h-8 rounded-full bg-cyan text-black flex items-center justify-center translate-x-4 opacity-0 group-hover:px-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                   <Send size={12} fill="currentColor" />
                </div>
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
