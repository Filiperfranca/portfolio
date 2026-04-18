"use client";

import { motion } from "motion/react";

interface GlowButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  download?: boolean;
  className?: string;
  id?: string;
}

export default function GlowButton({
  children,
  href,
  onClick,
  variant = "primary",
  icon,
  download,
  className = "",
  id,
}: GlowButtonProps) {
  const baseClasses = `
    relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full
    font-semibold text-sm tracking-wide overflow-hidden
    transition-all duration-300 group
  `;

  const variantClasses =
    variant === "primary"
      ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white glow-purple hover:glow-purple-strong hover:scale-105"
      : "border border-purple-500/30 text-purple-300 hover:border-purple-400/60 hover:bg-purple-500/10 hover:scale-105";

  const content = (
    <>
      {/* Animated shine effect */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
        initial={false}
        whileHover={{ translateX: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      {icon && <span className="text-lg relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        id={id}
        href={href}
        download={download}
        className={`${baseClasses} ${variantClasses} ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      id={id}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      {content}
    </motion.button>
  );
}
