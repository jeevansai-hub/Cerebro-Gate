// src/addons/unified-hub/credits/types.ts

export type PlanType = 'basic' | 'pro' | 'unlimited' | 'enterprise';

export interface CreditTransaction {
  id: string;
  userId: string;
  modelId: string;
  templateId?: string; // If used via template
  tokensUsed?: number; // For token-based models
  computeUnits?: number; // For video/image models
  creditsConsumed: number; // Calculated: base cost * tier multiplier
  savingsGenerated: number; // From EXISTING savings logic
  timestamp: Date;
  metadata: Record<string, any>;
}

export interface UserCreditBalance {
  userId: string;
  plan: PlanType;
  totalCredits: number;
  usedCredits: number;
  remainingCredits: number;
  resetDate: Date; // Monthly or annual
  rolloverEnabled: boolean;
}

export interface UsageForecast {
  userId: string;
  estimatedRemainingDays: number;
  projectedOverage: number;
  recommendation: string;
}
