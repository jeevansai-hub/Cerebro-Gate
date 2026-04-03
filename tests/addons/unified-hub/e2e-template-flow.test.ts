// tests/addons/unified-hub/e2e-template-flow.test.ts
import { ModelRegistry } from '../../src/addons/unified-hub/registry';
import { TemplateRenderer } from '../../src/addons/unified-hub/templates/renderer';
import { USE_CASE_TEMPLATES } from '../../src/addons/unified-hub/templates/library';
import { CreditManager } from '../../src/addons/unified-hub/credits/manager';
import { RouterContext, SemanticRouter } from '../../src/routing';
import { FEATURES } from '../../src/config/features';

/**
 * 💬 EXAMPLE END-TO-END USER FLOW (Simulates full journey from Master Prompt)
 */
async function testTemplateJourney() {
  console.log('--- STARTING E2E TEMPLATE FLOW TEST ---');
  
  if (!FEATURES.ENABLE_UNIFIED_HUB) {
      console.warn('ENABLE_UNIFIED_HUB is false. Skipping test.');
      return;
  }

  const userId = 'user_99';
  const requestId = 'req_555';

  // 1. User selects "Code Review" template
  const templateId = 'code_review';
  const template = USE_CASE_TEMPLATES[templateId];
  console.log('[Step 1] Selected Template:', templateId);

  // 2. Variables provided by high-level UI
  const vars = { language: 'typescript', focus: 'security', format: 'json' };
  const renderedPrompt = TemplateRenderer.render(template, vars);
  console.log('[Step 2] Rendered Prompt sample:', renderedPrompt.substring(0, 50) + '...');

  // 3. Routing + Model Selection integration
  const context: RouterContext = { userId, requestId, timestamp: new Date().toISOString() };
  const optimalModel = await ModelRegistry.getOptimalModel(
    'code-review-intent',
    { 
      capabilitiesNeeded: template.category === 'coding' ? ['code'] : ['text'],
      minTier: template.recommendedModel ? 'premium' : 'standard'
    },
    context
  );
  console.log('[Step 3] Optimal Model chosen by Registry:', optimalModel?.name);

  // 4. POST-Success: Credit Consumption layer
  const success = await CreditManager.deductCredits(userId, template.estimatedCredits, {
    modelId: optimalModel?.id,
    templateId: templateId,
    savingsGenerated: template.estimatedCredits * 0.72 // Simulated 72% savings from glbgpt logic
  });
  console.log('[Step 4] Credit deduction status:', success);

  // 5. Final Balance for Dashboard
  const balance = await CreditManager.getBalance(userId);
  console.log('[Step 5] Final balance remaining:', balance.remainingCredits);
  
  console.log('--- E2E TEMPLATE FLOW TEST COMPLETED ---');
}

// Run the simulation if called directly
testTemplateJourney().catch(err => console.error('E2E Test Failed:', err));
