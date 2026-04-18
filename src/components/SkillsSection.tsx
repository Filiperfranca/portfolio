"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";
import { skills, skillCategories } from "@/lib/data";
import type { Skill } from "@/lib/data";

function SkillIcon({ skill, isActive, onHover, onLeave }: {
  skill: Skill;
  isActive: boolean;
  onHover: (skill: Skill) => void;
  onLeave: () => void;
}) {
  const Icon = skill.icon;

  return (
    <motion.div
      className="relative group"
      onMouseEnter={() => onHover(skill)}
      onMouseLeave={onLeave}
      data-hover

    >
      <motion.div
        className={`
          relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl
          transition-all duration-300
          ${isActive
            ? "glass-strong scale-110 z-20"
            : "glass hover:glass-strong"
          }
        `}
        whileHover={{ scale: 1.15, y: -8 }}
        whileTap={{ scale: 0.95 }}
        animate={isActive ? {
          boxShadow: `0 0 30px ${skill.color}40, 0 0 60px ${skill.color}20`,
        } : {
          boxShadow: "0 0 0px transparent",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Icon
          className="text-2xl md:text-3xl transition-colors duration-300"
          style={{ color: isActive ? skill.color : "#8888a0" }}
        />
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg glass-strong text-xs font-medium whitespace-nowrap z-30"
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <span style={{ color: skill.color }}>{skill.name}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelector(".skills-title"),
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      }
    );

    gsap.fromTo(
      sectionRef.current.querySelectorAll(".skill-item"),
      { opacity: 0, y: 30, scale: 0.8 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.04,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      }
    );
  }, { scope: sectionRef });

  const filteredSkills = activeCategory
    ? skills.filter((s) => s.category === activeCategory)
    : skills;

  const relatedNames = activeSkill?.related || [];

  return (
    <section ref={sectionRef} id="skills" className="relative py-24 px-6 md:px-12 lg:px-20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Title */}
        <div className="skills-title text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
            <span className="gradient-text">Skills</span> & Tecnologias
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Meu ecossistema de desenvolvimento — cada tecnologia conectada, cada ferramenta com propósito.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <motion.button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === null
                ? "bg-purple-600 text-white glow-purple"
                : "glass text-text-muted hover:text-foreground"
            }`}
            onClick={() => setActiveCategory(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Todos
          </motion.button>
          {skillCategories.map((cat) => (
            <motion.button
              key={cat.key}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.key
                  ? "bg-purple-600 text-white glow-purple"
                  : "glass text-text-muted hover:text-foreground"
              }`}
              onClick={() => setActiveCategory(activeCategory === cat.key ? null : cat.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.emoji} {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-6"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => {
              const isRelated = relatedNames.includes(skill.name);
              const isActive = activeSkill?.name === skill.name || isRelated;

              return (
                <motion.div
                  key={skill.name}
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <SkillIcon
                    skill={skill}
                    isActive={isActive}
                    onHover={setActiveSkill}
                    onLeave={() => setActiveSkill(null)}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Active skill info panel */}
        <AnimatePresence>
          {activeSkill && (
            <motion.div
              className="mt-12 glass rounded-2xl p-6 max-w-lg mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-2" style={{ color: activeSkill.color }}>
                {activeSkill.name}
              </h3>
              <p className="text-text-muted text-sm">
                Conecta com:{" "}
                {activeSkill.related.map((r, i) => (
                  <span key={r}>
                    <span className="text-purple-400">{r}</span>
                    {i < activeSkill.related.length - 1 && ", "}
                  </span>
                ))}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
