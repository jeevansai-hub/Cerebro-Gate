"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variant?: 'base' | 'depth-1' | 'depth-2' | 'depth-3' | 'glass';
  isHoverable?: boolean;
}

export const Card = ({ 
  children, 
  variant = 'depth-2', 
  isHoverable = true, 
  className,
  ...props 
}: CardProps) => {
  const styles = {
    base: "bg-bg-base border-border-subtle",
    "depth-1": "bg-bg-depth-1 border-border-subtle",
    "depth-2": "bg-bg-depth-2 border-border-subtle",
    "depth-3": "bg-bg-depth-3 border-border-subtle",
    glass: "glass-panel",
  };

  return (
    <motion.div
      className={cn(
        "rounded-2xl relative overflow-hidden transition-all duration-300 border backdrop-blur-md",
        styles[variant],
        isHoverable && "hover:-translate-y-1 hover:border-border-active hover:shadow-cyan-glow",
        className
      )}
      {...props}
    >
      {/* Mesh Gradient Bloom */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      {children}
    </motion.div>
  );
};
