import { 
  Shield, 
  Zap, 
  Search, 
  Sparkles, 
  Check, 
  Cpu, 
  Lock, 
  Coins, 
  Code2, 
  Activity, 
  BarChart3, 
  Globe2,
  GitBranch,
  Layers,
  Fingerprint,
  TrendingDown
} from "lucide-react";

export const NAV_LINKS = [
  { name: "Home", href: "#" },
  { name: "Platform", href: "#platform" },
  { name: "Models", href: "#models" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
];

export const LLM_LOGOS = [
  { name: "ChatGPT", icon: "openai", color: "#74AA9C" },
  { name: "Claude 4", icon: "anthropic", color: "#D17651" },
  { name: "Gemini 2.5", icon: "google", color: "#4285F4" },
  { name: "Llama 4", icon: "meta", color: "#0668E1" },
  { name: "Grok 4", icon: "x", color: "#FFFFFF" },
  { name: "Perplexity", icon: "perplexity", color: "#22B8CF" },
  { name: "Mistral AI", icon: "mistralai", color: "#F5D142" },
  { name: "DeepSeek", icon: "intel", color: "#0055FF" },
  { name: "Midjourney", icon: "discord", color: "#5865F2" },
  { name: "Veo", icon: "google", color: "#EA4335" },
];

export const LLM_MODELS = [
  "GPT-5", "Claude Opus 4", "Gemini 2.5 Pro", "Grok 4", "Llama 4 Maverick", 
  "DeepSeek R1", "Mistral Large", "Command R+", "Gemma 3", "Phi-4", 
  "Qwen 3", "Yi-1.5", "Falcon 3", "DBRX", "Aya"
];

export const FEATURES = [
  {
    id: "routing",
    name: "Semantic Routing",
    description: "Intelligently directs requests to the most efficient model based on complexity, intent, and performance requirements.",
    analogy: "The hospital triage nurse for AI.",
    icon: GitBranch,
    tags: ["Efficiency", "Cost Control"],
    isLarge: true,
  },
  {
    id: "compression",
    name: "Prompt Compression",
    description: "Reduces token usage by up to 40% without losing semantic meaning or context, significantly lowering API costs.",
    analogy: "The telegram era, automated.",
    icon: TrendingDown,
    tags: ["Cost Control"],
  },
  {
    id: "caching",
    name: "Response Cache",
    description: "Identifies semantically similar queries and serves cached results instantly, slashing costs and latency.",
    analogy: "The library reference desk.",
    icon: Layers,
    tags: ["Latency", "Cost"],
  },
  {
    id: "pii",
    name: "PII Scrubber",
    description: "Automatically detects and masks sensitive information before it reaches model providers, ensuring compliance.",
    analogy: "The mail room security scan.",
    icon: Fingerprint,
    tags: ["Security", "GDPR"],
  },
];

export const PRICING_PLANS = [
  {
    name: "Starter",
    price: "0",
    description: "For rapid hacking. Free forever. Scaled for individual builders.",
    fee: "20% of savings",
    features: [
      "Semantic routing (3 tiers)",
      "PII scrubbing",
      "Basic cache",
      "7-day history",
      "Email support",
    ],
    cta: "Get Started Free",
    isPopular: false,
  },
  {
    name: "Growth",
    price: "0",
    description: "For production apps. Net-positive cost reduction guaranteed.",
    fee: "20% of savings",
    features: [
      "All Starter features",
      "Advanced routing (7 tiers)",
      "Intent alignment",
      "Output verification",
      "30-day history + export",
      "Slack alerts",
      "Priority support",
    ],
    cta: "Request Access",
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For high-scale teams. Dedicated regional deployments.",
    fee: "Negotiable",
    features: [
      "All Growth features",
      "Custom model integrations",
      "On-premise option",
      "Contract enforcement",
      "HIPAA/GDPR audit reports",
      "Dedicated SRE",
      "99.99% SLA guarantee",
    ],
    cta: "Talk to Sales",
    isPopular: false,
  },
];

export const TESTIMONIALS = [
  {
    quote: "CerebroGate reduced our monthly OpenAI bill from $47K to $11K in the first 30 days. The routing alone paid for itself in week one.",
    author: "Priya Nair",
    role: "Head of AI Platform, NeuralFlow",
    avatar: "PN",
  },
  {
    quote: "The PII scrubbing alone ended three months of compliance conversations. Integrated in 12 minutes via our existing proxy.",
    author: "Arjun Mehta",
    role: "CTO, VaultAI",
    avatar: "AM",
  },
  {
    quote: "64% of our queries now serve from cache at zero API cost. Users don't notice any change. Finance noticed immediately.",
    author: "Sarah Chen",
    role: "VP Engineering, Quantra",
    avatar: "SC",
  },
];

export const MOCK_DASHBOARD_STATS = [
  { label: "Monthly Savings", value: 38446, prefix: "$", color: "green", trend: "+79.6%" },
  { label: "Requests Routed", value: 847289, color: "cyan", trend: "+12.4%" },
  { label: "Cache Hit Rate", value: 64.7, suffix: "%", color: "accent", trend: "+5.1%" },
  { label: "Average Latency", value: 42, suffix: "ms", color: "amber", trend: "-18.2%" },
];

export const RECENT_ROUTING_DECISIONS = [
  { time: "2s ago", request: "Summarize this ticket...", model: "Llama-3-8B", saving: "94.2%" },
  { time: "12s ago", request: "Translate to French...", model: "Mistral-7B", saving: "88.1%" },
  { time: "45s ago", request: "Code review PR #842...", model: "Claude-3.5", saving: "12.4%" },
  { time: "1m ago", request: "Translate to German...", model: "GPT-4o (Cache)", saving: "100.0%" },
  { time: "2m ago", request: "Query DB context...", model: "Gemini-1.5", saving: "45.7%" },
];
