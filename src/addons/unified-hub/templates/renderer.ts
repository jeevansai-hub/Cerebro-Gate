// src/addons/unified-hub/templates/renderer.ts
import { PromptTemplate } from './types';

export class TemplateRenderer {
  /**
   * Render a template with provided variables
   * Substitutes {{variable_name}} with values from vars object
   */
  static render(template: PromptTemplate, vars: Record<string, any>): string {
    let prompt = template.prompt;
    
    for (const [key, variable] of Object.entries(template.variables)) {
      const value = vars[key] ?? variable.default;
      
      if (variable.required && value === undefined) {
          throw new Error(`Missing required template variable: ${key}`);
      }

      // Handle simple substitution: {{key}}
      const simpleRegex = new RegExp(`{{${key}}}`, 'g');
      prompt = prompt.replace(simpleRegex, String(value));

      // Handle enum sub-definitions: {{focus:bugs|security|performance}}
      const enumRegex = new RegExp(`{{${key}:[^{}]+}}`, 'g');
      prompt = prompt.replace(enumRegex, String(value));
    }
    
    return prompt;
  }
}
