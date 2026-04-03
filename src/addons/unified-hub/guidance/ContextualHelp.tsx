// src/addons/unified-hub/guidance/ContextualHelp.tsx
import React, { useEffect, useState } from "react";
import { ExplainabilityEngine, RequestTrace } from "../../../core/explainability";
import { GuidanceContext, GuidanceTip } from "./types";
import { FEATURES } from "../../../config/features";

export const ContextualHelp: React.FC<GuidanceContext> = ({ 
  currentFeature, 
  userRole 
}) => {
  const [tip, setTip] = useState<GuidanceTip | null>(null);

  useEffect(() => {
    if (!FEATURES.ENABLE_UNIFIED_HUB) return;

    const generateTip = async () => {
      const trace = await ExplainabilityEngine.getLatestTrace("current-user");
      if (!trace) return;

      const newTip = getTipForRoleAndTrace(userRole, trace, currentFeature);
      setTip(newTip);
    };

    generateTip();
  }, [currentFeature, userRole]);

  const getTipForRoleAndTrace = (
    role: string, 
    trace: RequestTrace, 
    feature: string
  ): GuidanceTip => {
    // Role-specific and trace-aware logic
    if (role === 'developer' && feature === 'semantic-router') {
        return {
            id: 'dev_01',
            title: 'Latency Optimization',
            content: `Model ${trace.model} was chosen for its low latency of ${trace.latency}ms. Switch to GPT-4o-mini for faster throughput in simple intents.`,
            severity: 'tip',
            dismissible: true
        };
    }
    
    if (role === 'compliance-officer' && trace.piiScrubbed?.length) {
        return {
            id: 'comp_01',
            title: 'PII Scrubbing Active',
            content: `The following fields were auto-masked before external call: ${trace.piiScrubbed.join(', ')}. This meets GDPR compliance.`,
            severity: 'success',
            dismissible: false
        };
    }

    if (role === 'executive') {
        return {
            id: 'exec_01',
            title: 'Financial Efficiency',
            content: `This single request saved you $${trace.savingsGenerated.toFixed(2)} compared to a direct API call by leveraging regional model routing.`,
            severity: 'info',
            dismissible: true
        };
    }

    return {
        id: 'gen_01',
        title: 'Ready for production',
        content: `Your current routing tier is ${trace.tier.toUpperCase()}. Stable and cost-optimized.`,
        severity: 'info',
        dismissible: true
    };
  };

  if (!tip || !FEATURES.ENABLE_UNIFIED_HUB) return null;

  return (
    <div className="p-5 rounded-2xl bg-bg-depth-3 border border-border-glass shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <div className="w-12 h-12 rounded-full border-2 border-cyan" />
        </div>
        <h4 className="text-xs font-mono font-bold text-cyan uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-cyan animate-ping" />
            {tip.title}
        </h4>
        <p className="text-sm text-text-secondary Satoshi 400 leading-relaxed">
            {tip.content}
        </p>
        <div className="mt-4 flex justify-between items-center">
            <span className="text-[9px] Satoshi 500 text-text-dim uppercase tracking-tighter">Powered by Explainability Engine</span>
            <button className="text-[10px] Satoshi 800 text-cyan uppercase tracking-widest hover:underline cursor-pointer">Learn More →</button>
        </div>
    </div>
  );
};
