// src/addons/unified-hub/templates/library.ts
import { PromptTemplate } from './types';

export const USE_CASE_TEMPLATES: Record<string, PromptTemplate> = {
  code_review: {
    id: 'code_review',
    category: 'coding',
    prompt: "Review this {{language}} code for {{focus:bugs|security|performance}}. Output format: {{format}}",
    variables: {
      language: { type: 'enum', options: ['python', 'javascript', 'typescript', 'go'], default: 'typescript' },
      focus: { type: 'enum', options: ['bugs', 'security', 'performance', 'all'], default: 'all' },
      format: { type: 'enum', options: ['json', 'markdown', 'plain'], default: 'json' }
    },
    recommendedModel: 'claude-sonnet-4',
    outputContract: {
      type: 'json',
      schema: {
        issues: { type: 'array', items: { type: 'object', properties: { line: 'number', severity: 'enum', description: 'string' } } },
        suggestions: { type: 'array', items: 'string' },
        score: { type: 'number', min: 0, max: 10 }
      }
    },
    cacheStrategy: 'semantic-24h',
    piiFields: ['code_comments'],
    estimatedCredits: 150
  },
  
  video_script: {
    id: 'video_script',
    category: 'video',
    prompt: "Create a {{duration}} second video script about {{topic}} for {{audience}}. Include scene descriptions and voiceover text.",
    variables: {
      duration: { type: 'number', min: 15, max: 180, default: 60 },
      topic: { type: 'string', required: true },
      audience: { type: 'enum', options: ['social', 'corporate', 'educational', 'personal'], default: 'social' }
    },
    recommendedModel: 'veo-3', 
    requiresWebAccess: false,
    estimatedCredits: 500
  },
  
  market_research: {
    id: 'market_research',
    category: 'research',
    prompt: "Analyze {{topic}} using recent sources. Structure output as: {{outline}}. Cite all sources with URLs.",
    variables: {
      topic: { type: 'string', required: true },
      outline: { type: 'enum', options: ['executive-summary', 'swot', 'competitor-analysis', 'full-report'], default: 'executive-summary' }
    },
    recommendedModel: 'perplexity-pro',
    cacheStrategy: 'semantic-7d',
    requiresWebAccess: true,
    estimatedCredits: 300
  },

  content_summarize: {
    id: 'content_summarize',
    category: 'writing',
    prompt: "Summarize this content: {{content}} into a {{length}} word summary. Tone: {{tone}}.",
    variables: {
      content: { type: 'string', required: true },
      length: { type: 'number', min: 10, max: 500, default: 100 },
      tone: { type: 'enum', options: ['professional', 'casual', 'humorous', 'factual'], default: 'professional' }
    },
    recommendedModel: 'gpt-4o-mini',
    cacheStrategy: 'semantic-24h',
    estimatedCredits: 100
  }
};
