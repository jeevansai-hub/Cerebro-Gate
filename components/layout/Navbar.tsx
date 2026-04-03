"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, LLM_LOGOS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModelsOpen, setIsModelsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full h-[60px] z-50 transition-all duration-300",
        isScrolled
          ? "bg-bg-glass backdrop-blur-3xl border-b border-border-subtle"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-[18px] h-[18px]">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-cyan">
              <motion.polygon
                points="50,5 90,25 90,75 50,95 10,75 10,25"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <circle cx="50" cy="50" r="10" fill="currentColor" className="animate-pulse-slow" />
            </svg>
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-text-primary group-hover:text-cyan transition-colors">
            <span className="text-cyan">C</span>erebroGate
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            if (link.name === "Models") {
              return (
                <div 
                  key={link.name} 
                  className="relative group py-1"
                  onMouseEnter={() => setIsModelsOpen(true)}
                  onMouseLeave={() => setIsModelsOpen(false)}
                >
                  <button className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors Satoshi 450">
                    {link.name}
                    <ChevronDown size={14} className={cn("transition-transform", isModelsOpen && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {isModelsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 w-[480px] pt-4"
                      >
                        <div className="bg-bg-depth-2 border border-border-glass rounded-xl p-4 shadow-2xl backdrop-blur-3xl grid grid-cols-3 gap-2">
                          {LLM_LOGOS.slice(0, 9).map((logo) => (
                            <div key={logo.name} className="flex items-center gap-2 p-2 rounded-lg hover:bg-bg-depth-3 transition-colors group/logo cursor-pointer">
                              <div className="w-5 h-5 rounded bg-bg-alpha/10 opacity-40 group-hover/logo:opacity-100 transition-opacity" />
                              <span className="text-[10px] Satoshi 500 text-text-secondary group-hover/logo:text-text-primary">{logo.name}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </div>
              );
            }
            return (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm text-text-secondary hover:text-text-primary transition-colors Satoshi 450 group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="hidden md:block">
          <Button variant="outline" size="sm" className="Satoshi 600">
            Request Access
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-text-primary p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-bg-base z-[1001] md:hidden flex flex-col items-center justify-center gap-8"
          >
            <button
              className="absolute top-5 right-6 text-text-primary p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            
            {NAV_LINKS.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-4xl font-display font-bold text-text-primary hover:text-cyan"
              >
                {link.name}
              </motion.a>
            ))}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <Button size="lg" className="Satoshi 600">Request Access</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
