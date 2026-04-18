"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/data";
import { HiExternalLink } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";

// ============================================================
// Holographic Modal
// ============================================================
function HolographicModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal Content */}
      <motion.div
        className="holo-card relative z-10 w-full max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-2xl overflow-hidden my-auto"
        initial={{ scale: 0.3, opacity: 0, rotateY: 90, filter: "blur(20px)" }}
        animate={{
          scale: 1,
          opacity: 1,
          rotateY: 0,
          filter: "blur(0px)",
        }}
        exit={{
          scale: 0.5,
          opacity: 0,
          rotateY: -60,
          filter: "blur(15px)",
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.8,
        }}
        onClick={(e) => e.stopPropagation()}
        style={{ perspective: 1200 }}
      >
        {/* Holographic border glow */}
        <div className="absolute -inset-[1px] rounded-2xl holo-border z-0" />

        {/* Scanline overlay */}
        <div className="absolute inset-0 holo-scanlines pointer-events-none z-20 rounded-2xl" />

        {/* Content */}
        <div className="relative z-10 bg-[#0c0c14]/95 backdrop-blur-xl rounded-2xl p-4 sm:p-5 md:p-8 max-h-[85vh] overflow-y-auto">
          {/* Header with project image */}
          <motion.div
            className="relative w-full h-32 sm:h-40 md:h-56 rounded-xl overflow-hidden mb-4 sm:mb-5 shrink-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 500px"
            />
            {/* Holographic shimmer on image */}
            <div className="absolute inset-0 holo-shimmer opacity-30" />
          </motion.div>

          {/* Project title */}
          <motion.h3
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 holo-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {project.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-text-muted text-sm mb-6 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            {project.description}
          </motion.p>

          {/* Stack tags */}
          <motion.div
            className="flex flex-wrap gap-2 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
          >
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-medium border border-purple-500/30 text-purple-300 bg-purple-500/10"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-3 py-3 md:px-5 md:py-3.5 rounded-xl font-semibold text-xs md:text-sm transition-all duration-300 glass-strong hover:bg-white/10 border border-white/10 hover:border-purple-500/50 group"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                data-hover
              >
                <FaGithub className="text-lg group-hover:text-purple-400 transition-colors" />
                <span className="group-hover:text-purple-400 transition-colors">
                  GitHub
                </span>
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-3 py-3 md:px-5 md:py-3.5 rounded-xl font-semibold text-xs md:text-sm transition-all duration-300 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white glow-purple group"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                data-hover
              >
                <HiExternalLink className="text-lg" />
                <span>Visitar Site</span>
              </motion.a>
            )}
          </motion.div>

          {/* Close hint */}
          <motion.p
            className="text-center text-text-muted/40 text-xs mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Clique fora ou pressione ESC para fechar
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================
// Project Card
// ============================================================
function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [10, -10]),
    { stiffness: 200, damping: 20 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
    { stiffness: 200, damping: 20 }
  );

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

  return (
    <motion.div
      ref={cardRef}
      className="project-card group relative cursor-pointer"
      onClick={() => onSelect(project)}
      style={{
        perspective: 1200,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-hover
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden glass-strong h-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Project screenshot */}
        <div
          className="relative h-48 md:h-56 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.aesthetic.gradientFrom}, ${project.aesthetic.gradientTo})`,
          }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            loading="eager"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Hover overlay with accent color */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at center, ${project.aesthetic.accentColor}30, transparent 70%)`,
            }}
          />

          {/* Corner accent */}
          <div
            className="absolute top-0 right-0 w-20 h-20 opacity-60"
            style={{
              background: `linear-gradient(225deg, ${project.aesthetic.accentColor}40, transparent 70%)`,
            }}
          />

          {/* Click hint overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30">
            <motion.div
              className="px-4 py-2 rounded-full glass-strong text-sm font-medium text-purple-300 border border-purple-500/30"
              initial={false}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Clique para ver mais
            </motion.div>
          </div>
        </div>

        {/* Project info */}
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-text-muted text-sm leading-relaxed">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-full text-xs font-medium glass text-purple-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ backgroundColor: project.aesthetic.accentColor }}
        />
      </motion.div>
    </motion.div>
  );
}

// ============================================================
// Projects Section
// ============================================================
export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelector(".projects-title"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      }
    );

    gsap.fromTo(
      sectionRef.current.querySelectorAll(".project-card"),
      { opacity: 0, y: 60, rotateX: 15 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      }
    );
  }, { scope: sectionRef });

  return (
    <>
      <section
        ref={sectionRef}
        id="projetos"
        className="relative py-24 px-6 md:px-12 lg:px-20"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-purple-700/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="projects-title text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
              <span className="gradient-text">Projetos</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Cada projeto é um universo — com identidade própria, desafios
              únicos e soluções criativas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onSelect={setSelectedProject}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Holographic Popup */}
      <AnimatePresence>
        {selectedProject && (
          <HolographicModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
