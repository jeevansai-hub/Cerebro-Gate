"use client";
import React from "react";
import { Github, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-bg-base pt-32 pb-12 overflow-hidden">
      {/* Top Border Gradient */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent opacity-20" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
        {/* Brand Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-[18px] h-[18px] bg-cyan rounded-sm animate-pulse-slow" />
             <span className="text-xl font-display font-bold text-text-primary tracking-tight">CerebroGate</span>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed Satoshi 400">
            The intelligent layer between your application and every AI model. Infrastructure for the production AI era.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green animate-ping" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-text-dim Satoshi 400 uppercase">All Systems Operational</span>
          </div>
          <div className="flex items-center gap-4">
            <Github className="w-5 h-5 text-text-dim hover:text-cyan transition-colors cursor-pointer" />
            <Twitter className="w-5 h-5 text-text-dim hover:text-cyan transition-colors cursor-pointer" />
            <Linkedin className="w-5 h-5 text-text-dim hover:text-cyan transition-colors cursor-pointer" />
          </div>
        </div>

        {/* Product Column */}
        <div>
          <h4 className="text-xs font-mono font-bold tracking-widest text-text-dim uppercase mb-8 Satoshi 400">Product</h4>
          <ul className="space-y-4">
            {["Platform", "Models", "Pricing", "Changelog", "Status"].map((link) => (
              <li key={link}>
                <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors Satoshi 400">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h4 className="text-xs font-mono font-bold tracking-widest text-text-dim uppercase mb-8 Satoshi 400">Company</h4>
          <ul className="space-y-4">
            {["About", "Engineering", "Pricing", "Careers", "Security", "Contact"].map((link) => (
              <li key={link}>
                <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors Satoshi 400">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h4 className="text-xs font-mono font-bold tracking-widest text-text-dim uppercase mb-8 Satoshi 400">Legal</h4>
          <ul className="space-y-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"].map((link) => (
              <li key={link}>
                <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors Satoshi 400">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-32 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-text-dim Satoshi 400">© 2025 CerebroGate · Built with purpose, not hype.</p>
        <p className="text-xs text-text-dim Satoshi 400 underline underline-offset-4 cursor-pointer hover:text-text-secondary">Infrastructure for the production AI era.</p>
      </div>
    </footer>
  );
};
