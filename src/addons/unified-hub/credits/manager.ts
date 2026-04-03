// src/addons/unified-hub/credits/manager.ts
import { PlanType, UserCreditBalance, CreditTransaction, UsageForecast } from './types';

export class CreditManager {
  private static balances: Record<string, UserCreditBalance> = {};
  private static transactions: CreditTransaction[] = [];

  /**
   * Allocate credits based on plan
   * In a real system, this would sync with Stripe/Billing webhooks
   */
  static async allocateCredits(
    userId: string, 
    plan: PlanType, 
    billingCycle: 'monthly' | 'annual'
  ): Promise<void> {
    const caps = {
        basic: 1000,
        pro: 5000,
        unlimited: 1000000,
        enterprise: 5000000,
    };
    const multiplier = billingCycle === 'annual' ? 12 : 1;
    this.balances[userId] = {
      userId,
      plan,
      totalCredits: caps[plan] * multiplier,
      usedCredits: 0,
      remainingCredits: caps[plan] * multiplier,
      resetDate: new Date(),
      rolloverEnabled: plan === 'pro' || plan === 'enterprise',
    };
  }

  /**
   * Deduct credits AFTER successful response
   * This is a non-blocking, fire-and-forget logic in a production environment
   */
  static async deductCredits(
    userId: string, 
    cost: number, 
    transactionMeta: Partial<CreditTransaction>
  ): Promise<boolean> {
    const balance = this.balances[userId];
    if (!balance) return false;

    if (balance.remainingCredits < cost) {
        console.error(`[CreditManager] Insufficient balance for user: ${userId}`);
        return false;
    }

    balance.usedCredits += cost;
    balance.remainingCredits -= cost;

    const transaction: CreditTransaction = {
        id: `tx_${Date.now()}`,
        userId,
        modelId: transactionMeta.modelId || 'unknown',
        templateId: transactionMeta.templateId,
        tokensUsed: transactionMeta.tokensUsed,
        creditsConsumed: cost,
        savingsGenerated: transactionMeta.savingsGenerated || (cost * 0.4), // Default 40% savings
        timestamp: new Date(),
        metadata: transactionMeta.metadata || {},
    };

    this.transactions.push(transaction);
    console.log(`[CreditManager] Transaction successful using credits: ${cost} for user: ${userId}`);
    return true;
  }

  /**
   * Get current balance for dashboard display
   */
  static async getBalance(userId: string): Promise<UserCreditBalance> {
    if (!this.balances[userId]) {
        await this.allocateCredits(userId, 'pro', 'monthly'); // Default to pro for trial
    }
    return this.balances[userId];
  }

  /**
   * Forecast usage vs limits for proactive alerts
   */
  static async forecastUsage(userId: string, days: number): Promise<UsageForecast> {
    const balance = await this.getBalance(userId);
    const dailyAvg = balance.usedCredits / 7; // Average over hypothetical week
    
    const remainingDays = dailyAvg > 0 ? (balance.remainingCredits / dailyAvg) : Infinity;
    
    return {
      userId,
      estimatedRemainingDays: isFinite(remainingDays) ? Math.floor(remainingDays) : 365,
      projectedOverage: remainingDays < days ? Math.abs(balance.remainingCredits - (dailyAvg * days)) : 0,
      recommendation: remainingDays < days ? 'Upgrade to a higher tier plan.' : 'You are within your usage targets.'
    };
  }
}
