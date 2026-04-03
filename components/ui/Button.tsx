"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  children: React.ReactNode;
}

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) => {
  const variants = {
    primary: "bg-cyan text-black hover:shadow-cyan-glow hover:scale-[1.03]",
    secondary: "bg-bg-depth-3 text-text-primary hover:bg-bg-depth-2",
    outline: "border border-border-active transparent text-text-primary hover:bg-cyan hover:text-black",
    ghost: "bg-transparent text-text-secondary hover:text-text-primary",
    link: "bg-transparent text-text-primary underline-offset-4 hover:underline",
  };

  const sizes = {
    sm: "px-4 h-9 text-xs",
    md: "px-6 h-11 text-sm",
    lg: "px-10 h-14 text-lg",
    icon: "w-11 h-11 flex items-center justify-center p-0",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-bold transition-all duration-200 uppercase tracking-widest disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
