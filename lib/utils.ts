import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export type RoutingResult = {
  tier: "SIMPLE" | "MEDIUM" | "COMPLEX" | "CACHE" | "CONSENSUS";
  model: string;
  cost: string;
  savings: string;
  intent: string;
  score: number;
};

export function classifyPrompt(prompt: string): RoutingResult {
  const p = prompt.toLowerCase();
  
  const rules = [
    { 
      keywords: ['design', 'architect', 'distributed', 'system', 'microservice'],
      tier: 'COMPLEX' as const, 
      model: 'Claude 3.5 Sonnet', 
      cost: '$0.041', 
      savings: '0%',
      intent: 'Architectural Reasoning',
      score: 8.5
    },
    { 
      keywords: ['summarize', 'tldr', 'brief', 'short', 'summary'],
      tier: 'SIMPLE' as const, 
      model: 'Llama 3 8B', 
      cost: '$0.0001', 
      savings: '99.7%',
      intent: 'Summarization',
      score: 1.8
    },
    { 
      keywords: ['translate', 'french', 'spanish', 'german', 'language'],
      tier: 'SIMPLE' as const, 
      model: 'Mistral 7B', 
      cost: '$0.0002', 
      savings: '99.5%',
      intent: 'Translation',
      score: 2.1
    },
    { 
      keywords: ['sql', 'schema', 'database', 'query', 'join'],
      tier: 'MEDIUM' as const, 
      model: 'Mistral Medium', 
      cost: '$0.006', 
      savings: '84.6%',
      intent: 'Data Logic',
      score: 5.2
    },
    { 
      keywords: ['percent', '%', 'calculate', 'math', 'number', '15%'],
      tier: 'CACHE' as const, 
      model: 'Cache HIT', 
      cost: '$0.000', 
      savings: '100%',
      intent: 'Semantic Cache Match',
      score: 0.1
    },
    { 
      keywords: ['contract', 'legal', 'liability', 'review', 'clause'],
      tier: 'CONSENSUS' as const, 
      model: 'GPT-5 + Claude + Gemini', 
      cost: '$0.12', 
      savings: '65%',
      intent: 'High-Stakes Legal Review',
      score: 9.8
    },
  ];

  for (const rule of rules) {
    if (rule.keywords.some(k => p.includes(k))) {
      return {
        tier: rule.tier,
        model: rule.model,
        cost: rule.cost,
        savings: rule.savings,
        intent: rule.intent,
        score: rule.score
      };
    }
  }

  // Fallback
  return {
    tier: "MEDIUM",
    model: "Llama 3 70B",
    cost: "$0.0008",
    savings: "91.2%",
    intent: "General Routing",
    score: 3.2,
  };
}
