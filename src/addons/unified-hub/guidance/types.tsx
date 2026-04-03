// src/addons/unified-hub/guidance/types.tsx
import { RequestTrace, ErrorTrace } from '../../../core/explainability';

export interface GuidanceContext {
  currentFeature: string; // e.g., 'semantic-router', 'pii-scrub', 'template-engine'
  userRole: 'developer' | 'product-manager' | 'compliance-officer' | 'executive';
}

export interface GuidanceTip {
  id: string;
  title: string;
  content: string;
  action?: { label: string; handler: () => void };
  severity: 'info' | 'tip' | 'warning' | 'success';
  dismissible: boolean;
}
