// src/addons/unified-hub/registry/types.ts

export type AIProvider = 'openai' | 'anthropic' | 'google' | 'local' | 'community' | 'video' | 'image';

export interface AIModel {
  id: string;                    // e.g., "claude-sonnet-4", "veo-3", "unikorn-v7"
  name: string;
  provider: AIProvider;
  tier: 'economy' | 'standard' | 'premium' | 'specialized';
  capabilities: Array<'text' | 'image' | 'video' | 'code' | 'research' | 'pdf'>;
  costPerKTokens?: { input: number; output: number };
  latencyProfile: { p50: number; p95: number };
  compliance: Array<'GDPR' | 'HIPAA' | 'SOC2' | 'DPDP'>;
  enabled: boolean;
  metadata: {
    version: string;
    contextWindow?: number;
    maxOutputTokens?: number;
    supportsStreaming?: boolean;
    requiresApiKey?: boolean;
    providerIcon?: string;
  };
}

export interface ModelConstraints {
  minTier?: 'economy' | 'standard' | 'premium' | 'specialized';
  requiredCompliance?: Array<'GDPR' | 'HIPAA' | 'SOC2' | 'DPDP'>;
  maxLatencyP95?: number;
  maxCostPerKTokens?: number;
  capabilitiesNeeded: Array<'text' | 'image' | 'video' | 'code' | 'research' | 'pdf'>;
}
