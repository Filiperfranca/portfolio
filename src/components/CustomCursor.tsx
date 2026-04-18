"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Detect hoverable elements
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll("a, button, [role='button'], input, textarea, select, [data-hover]");
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Inner dot — follows instantly */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
          scale: isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "tween", duration: 0.05 }}
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#a855f7",
        }}
      />
      {/* Outer ring — follows with spring delay */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        animate={{
          x: mousePos.x - (isHovering ? 24 : 20),
          y: mousePos.y - (isHovering ? 24 : 20),
          width: isHovering ? 48 : 40,
          height: isHovering ? 48 : 40,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.2,
        }}
        style={{
          borderRadius: "50%",
          border: "1.5px solid rgba(168, 85, 247, 0.5)",
          backgroundColor: isHovering ? "rgba(168, 85, 247, 0.1)" : "transparent",
        }}
      />
    </>
  );
}
