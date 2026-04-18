"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import GlowButton from "./GlowButton";
import { personalInfo, developerCard } from "@/lib/data";
import { HiDownload } from "react-icons/hi";

// Pre-compute syntax highlighted code lines at module level to avoid
// server/client hydration mismatches from regex chain interactions.
function highlightLine(line: string): string {
  // Tokenize into segments to avoid regex replacements matching previously inserted HTML
  const tokens: { type: string; value: string }[] = [];
  let remaining = line;

  while (remaining.length > 0) {
    // Match comments first (highest priority)
    const commentMatch = remaining.match(/^\/\/.*/);
    if (commentMatch) {
      tokens.push({ type: "comment", value: commentMatch[0] });
      remaining = remaining.slice(commentMatch[0].length);
      continue;
    }

    // Match strings
    const stringMatch = remaining.match(/^"[^"]*"/);
    if (stringMatch) {
      tokens.push({ type: "string", value: stringMatch[0] });
      remaining = remaining.slice(stringMatch[0].length);
      continue;
    }

    // Match keywords
    const keywordMatch = remaining.match(/^\b(const|let|var)\b/);
    if (keywordMatch) {
      tokens.push({ type: "keyword", value: keywordMatch[0] });
      remaining = remaining.slice(keywordMatch[0].length);
      continue;
    }

    // Match property names (word followed by colon)
    const propMatch = remaining.match(/^(\w+)(?=:)/);
    if (propMatch) {
      tokens.push({ type: "property", value: propMatch[0] });
      remaining = remaining.slice(propMatch[0].length);
      continue;
    }

    // Match brackets
    const bracketMatch = remaining.match(/^[{}[\]]/);
    if (bracketMatch) {
      tokens.push({ type: "bracket", value: bracketMatch[0] });
      remaining = remaining.slice(1);
      continue;
    }

    // Plain text (consume one character at a time for non-matched chars)
    tokens.push({ type: "plain", value: remaining[0] });
    remaining = remaining.slice(1);
  }

  return tokens
    .map((t) => {
      switch (t.type) {
        case "comment":
          return `<span class="code-comment">${t.value}</span>`;
        case "string":
          return `<span class="code-string">${t.value}</span>`;
        case "keyword":
          return `<span class="code-keyword">${t.value}</span>`;
        case "property":
          return `<span class="code-property">${t.value}</span>`;
        case "bracket":
          return `<span class="code-bracket">${t.value}</span>`;
        default:
          return t.value;
      }
    })
    .join("");
}

const highlightedCodeLines = developerCard.code
  .split("\n")
  .map((line) => highlightLine(line));

function TypewriterText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const roles = personalInfo.roles;

  useEffect(() => {
    const currentRole = roles[currentIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.substring(0, displayText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, roles]);

  return (
    <span className="text-purple-400">
      {displayText}
      <span className="inline-block w-[2px] h-[1em] bg-purple-500 ml-1 animate-typing-cursor align-middle" />
    </span>
  );
}

function CodeCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const lines = highlightedCodeLines;

  return (
    <motion.div
      ref={cardRef}
      className="glass rounded-2xl p-6 max-w-md w-full"
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
    >
      {/* Window dots */}
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-xs text-text-muted font-mono">developer.js</span>
      </div>
      {/* Code content */}
      <pre className="font-mono text-sm leading-relaxed">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.8 + i * 0.08 }}
            className="flex"
          >
            <span className="text-text-muted/40 w-6 text-right mr-4 select-none text-xs">{i + 1}</span>
            <span
              dangerouslySetInnerHTML={{ __html: line }}
            />
          </motion.div>
        ))}
      </pre>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-700/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left side — Text */}
        <div className="space-y-8">
          <div className="space-y-4">
            <motion.p
              className="text-text-muted text-lg md:text-xl font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {personalInfo.greeting}
            </motion.p>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="gradient-text text-glow">{personalInfo.name}</span>
            </motion.h1>

            <motion.div
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium h-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <span className="text-text-muted mr-2">→</span>
              <TypewriterText />
            </motion.div>
          </div>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <GlowButton
              href={personalInfo.cvUrl}
              download
              icon={<HiDownload />}
              id="hero-download-cv"
            >
              Baixar CV
            </GlowButton>
            <GlowButton href="#projetos" variant="secondary" id="hero-see-projects">
              Ver Projetos
            </GlowButton>
          </motion.div>
        </div>

        {/* Right side — Code Card */}
        <div className="hidden lg:flex justify-end">
          <CodeCard />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-text-muted text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-5 h-8 rounded-full border border-purple-500/40 flex justify-center pt-1.5"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-1 h-2 rounded-full bg-purple-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
