"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const navItems = [
  { id: "hero", label: "Início" },
  { id: "skills", label: "Skills" },
  { id: "projetos", label: "Projetos" },
  { id: "educacao", label: "Educação" },
  { id: "contato", label: "Contato" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Detect active section
      const sections = navItems.map((item) => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.el) {
          const rect = section.el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top nav bar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div
          className={`max-w-5xl mx-auto rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "glass-strong" : ""
          }`}
        >
          {/* Logo */}
          <motion.button
            className="text-lg font-bold gradient-text"
            onClick={() => scrollToSection("hero")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-hover
          >
            FF<span className="text-purple-500">.</span>
          </motion.button>

          {/* Nav links — desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? "text-purple-400 bg-purple-500/10"
                    : "text-text-muted hover:text-foreground"
                }`}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-hover
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Side dots — desktop */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            className="group relative flex items-center justify-end"
            onClick={() => scrollToSection(item.id)}
            data-hover
          >
            {/* Label */}
            <AnimatePresence>
              <span className="absolute right-6 px-2 py-1 rounded text-xs font-medium text-text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {item.label}
              </span>
            </AnimatePresence>

            {/* Dot */}
            <motion.div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeSection === item.id
                  ? "bg-purple-500 scale-125 glow-purple"
                  : "bg-text-muted/30 hover:bg-text-muted/60"
              }`}
              whileHover={{ scale: 1.5 }}
            />
          </motion.button>
        ))}
      </div>
    </>
  );
}
