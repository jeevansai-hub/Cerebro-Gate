"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'dim' | 'outline' | 'hero';
  children: React.ReactNode;
  className?: string;
}

export const Badge = ({ 
  variant = 'primary', 
  children, 
  className 
}: BadgeProps) => {
  const styles = {
    primary: "bg-cyan-dim border-cyan/20 text-cyan",
    secondary: "bg-bg-depth-3 border-border-subtle text-text-primary",
    success: "bg-green-dim border-green/20 text-green",
    warning: "bg-amber/10 border-amber/20 text-amber",
    danger: "bg-red/10 border-red/20 text-red",
    dim: "bg-bg-depth-1 border-border-subtle text-text-dim",
    outline: "border border-border-active bg-bg-depth-3 text-text-secondary shadow-cyan-glow/10",
    hero: "bg-bg-depth-3 border border-border-active text-text-primary backdrop-blur-md",
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] border transition-all duration-300",
      styles[variant],
      className
    )}>
      {children}
    </div>
  );
};
