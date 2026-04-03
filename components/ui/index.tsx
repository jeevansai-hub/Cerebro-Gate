/* components/ui/Button.tsx */
"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    const variants = {
      primary: "bg-accent-primary text-bg-void font-syne font-bold hover:bg-cyan-400 btn-glow",
      secondary: "bg-bg-elevated text-text-primary border border-border-dim hover:border-border-glow",
      outline: "border border-accent-primary text-accent-primary hover:bg-accent-primary/10",
      ghost: "hover:bg-accent-primary/5 text-text-secondary hover:text-text-primary",
      link: "text-accent-primary underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-12 px-8 py-2 text-base rounded-md",
      sm: "h-9 px-4 text-sm rounded-md",
      lg: "h-14 px-10 text-lg rounded-md",
      icon: "h-12 w-12 rounded-full flex items-center justify-center",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };

/* components/ui/Badge.tsx */
export function Badge({ className, children, variant = "default", ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "outline" | "dim" | "success" | "warning" | "danger" }) {
  const styles = {
    default: "bg-accent-primary text-bg-void",
    outline: "border border-accent-primary text-accent-primary",
    dim: "bg-bg-elevated border border-border-dim text-text-secondary",
    success: "bg-accent-secondary/10 border border-accent-secondary text-accent-secondary",
    warning: "bg-accent-warm/10 border border-accent-warm text-accent-warm",
    danger: "bg-accent-danger/10 border border-accent-danger text-accent-danger",
  };
  
  return (
    <div className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-mono font-semibold transition-colors", styles[variant], className)} {...props}>
      {children}
    </div>
  );
}

/* components/ui/Card.tsx */
export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("bg-bg-surface border border-border-dim rounded-2xl p-6 card-hover", className)} {...props}>
      {children}
    </div>
  );
}
