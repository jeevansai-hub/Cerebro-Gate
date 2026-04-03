"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isHoverable = target.closest("button, a, input, textarea, [role='button'], .card-hover");
      setIsHovered(!!isHoverable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <div 
        id="custom-cursor-dot" 
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 10000,
          mixBlendMode: 'difference'
        }}
      >
        <motion.div
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
            width: 8,
            height: 8,
            backgroundColor: "white",
            borderRadius: "50%",
            scale: isClicking ? 0.6 : 1,
          }}
        />
      </div>

      <div 
        id="custom-cursor-ring"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 10000,
          mixBlendMode: 'difference'
        }}
      >
        <motion.div
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
            width: isHovered ? 60 : 40,
            height: isHovered ? 60 : 40,
            border: isHovered ? "2px solid var(--accent-primary)" : "1px solid white",
            borderRadius: "50%",
            scale: isClicking ? 0.9 : 1,
            backgroundColor: isHovered ? "rgba(0, 200, 255, 0.05)" : "transparent",
            transition: { width: { duration: 0.2 }, height: { duration: 0.2 } }
          }}
        />
      </div>
    </>
  );
}
