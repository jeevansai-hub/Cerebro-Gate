// src/addons/unified-hub/registry/index.ts
import { AIModel, AIProvider, ModelConstraints } from './types';
import { RouterContext } from '../../../routing';
import { FEATURES } from '../../../config/features';

export class ModelRegistry {
    private static models: AIModel[] = [];
    private static initialized = false;

    /**
     * Load models from configuration
     * In a production environment, this would hit a secure API or local JSON config
     */
    static async loadFromConfig(config?: AIModel[]): Promise<void> {
        if (!FEATURES.ENABLE_UNIFIED_HUB) {
            console.warn('[ModelRegistry] Unified Hub is disabled. Skipping initialization.');
            return;
        }

        // Mocking JSON config load
        this.models = config || [
            {
                id: 'claude-sonnet-4',
                name: 'Claude 4 (Anthropic)',
                provider: 'anthropic',
                tier: 'premium',
                capabilities: ['text', 'code', 'research'],
                costPerKTokens: { input: 0.003, output: 0.015 },
                latencyProfile: { p50: 800, p95: 2100 },
                compliance: ['GDPR', 'SOC2'],
                enabled: true,
                metadata: {
                    version: '2026.02',
                    contextWindow: 200000,
                    supportsStreaming: true,
                    providerIcon: 'anthropic'
                }
            },
            {
                id: 'veo-3',
                name: 'Veo (Google Video)',
                provider: 'video',
                tier: 'specialized',
                capabilities: ['video'],
                latencyProfile: { p50: 45000, p95: 120000 },
                compliance: ['GDPR'],
                enabled: true,
                metadata: {
                    version: '3.0',
                    maxOutputTokens: 180,
                    providerIcon: 'google'
                }
            }
        ];
        this.initialized = true;
        console.log(`[ModelRegistry] Successfully loaded ${this.models.length} models into the hub.`);
    }

    /**
     * Hot-reload models without gateway restart
     */
    static async reload(): Promise<void> {
        console.log('[ModelRegistry] Hot-reloading model registry...');
        await this.loadFromConfig();
    }

    /**
     * Integration point with EXISTING Semantic Router
     * Returns the optimal registered model based on intent and constraints
     */
    static async getOptimalModel(
        intent: string,
        constraints: ModelConstraints,
        existingRouterContext: RouterContext
    ): Promise<AIModel | null> {
        if (!this.initialized) await this.loadFromConfig();

        console.log(`[ModelRegistry] Finding optimal model for intent: ${intent} [UID: ${existingRouterContext.userId}]`);

        // Simple filtering logic
        const filtered = this.models.filter(model => {
            if (!model.enabled) return false;
            
            // Capability match
            const hasCapabilities = constraints.capabilitiesNeeded.every(cap => 
                model.capabilities.includes(cap)
            );
            if (!hasCapabilities) return false;

            // Compliance filter
            if (constraints.requiredCompliance) {
                const satisfiesCompliance = constraints.requiredCompliance.every(comp => 
                    model.compliance.includes(comp)
                );
                if (!satisfiesCompliance) return false;
            }

            // Latency constraint
            if (constraints.maxLatencyP95 && model.latencyProfile.p95 > constraints.maxLatencyP95) {
                return false;
            }

            return true;
        });

        if (filtered.length === 0) {
            console.error('[ModelRegistry] No models matched constraints for intent:', intent);
            return null;
        }

        // Return the one with the best tier/priority for the intent
        return filtered.sort((a, b) => {
            const tiers = { economy: 1, standard: 2, premium: 3, specialized: 4 };
            return tiers[b.tier] - tiers[a.tier];
        })[0];
    }

    static async healthCheck(modelId: string): Promise<{ status: string; latency: number }> {
        const model = this.models.find(m => m.id === modelId);
        if (!model) throw new Error(`Model ${modelId} not found in registry`);

        // Mocking health check latency
        return { 
            status: model.enabled ? 'healthy' : 'degraded',
            latency: model.latencyProfile.p50 + Math.random() * 50 
        };
    }
}
