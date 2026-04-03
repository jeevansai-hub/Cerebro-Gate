// src/addons/unified-hub/templates/types.ts

export type TemplateCategory = 'writing' | 'coding' | 'research' | 'image' | 'video' | 'productivity';

export interface TemplateVariable {
  type: 'enum' | 'string' | 'number';
  required?: boolean;
  default?: string | number;
  options?: string[];
  min?: number;
  max?: number;
}

export interface PromptTemplate {
  id: string;  // e.g., "code_review", "video_script", "market_research"
  category: TemplateCategory;
  prompt: string; // Mustache-style: "Review this {{language}} code for {{focus}}"
  variables: Record<string, TemplateVariable>;
  recommendedModel?: string; // Optional: hint for router
  outputContract?: {
    type: 'json' | 'markdown' | 'plain';
    schema?: Record<string, any>;
  };
  cacheStrategy?: 'none' | 'exact' | 'semantic-1h' | 'semantic-24h' | 'semantic-7d';
  piiFields?: string[]; // Auto-scrub these fields
  requiresWebAccess?: boolean;
  estimatedCredits: number; // For credit tracking
}
