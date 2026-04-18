"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";
import { courses } from "@/lib/data";
import { HiAcademicCap, HiExternalLink } from "react-icons/hi";

function CourseCard({ course, index }: { course: typeof courses[0]; index: number }) {
  const isHarvard = course.id === "cs50";
  const isMIT = course.id === "mit";

  const statusConfig = {
    completed: { label: "✅ Concluído", color: "#34d399" },
    "in-progress": { label: "🔄 Em andamento", color: "#fbbf24" },
    planned: { label: `📅 ${course.year} (previsão)`, color: "#60a5fa" },
  };

  const status = statusConfig[course.status];

  return (
    <motion.div
      className="course-card relative z-10"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Timeline connector */}
      {index < courses.length - 1 && (
        <div className="absolute left-8 top-full w-[2px] h-12 bg-gradient-to-b from-purple-500/40 to-transparent hidden md:block" />
      )}

      <div
        className="relative rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-lg"
        style={{
          borderColor: `${course.theme.primaryColor}30`,
          background: `linear-gradient(135deg, ${course.theme.primaryColor}08, ${course.theme.secondaryColor}05)`,
        }}
      >
        {/* Institution header bar */}
        <div
          className="px-6 py-4 flex items-center gap-4"
          style={{
            background: `linear-gradient(135deg, ${course.theme.primaryColor}20, transparent)`,
            borderBottom: `1px solid ${course.theme.primaryColor}20`,
          }}
        >
          {/* Institution icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold"
            style={{
              backgroundColor: `${course.theme.primaryColor}20`,
              color: course.theme.primaryColor,
            }}
          >
            {isHarvard ? (
              <HiAcademicCap className="text-2xl" />
            ) : isMIT ? (
              <span className="text-sm font-mono font-bold">MIT</span>
            ) : (
              <HiAcademicCap className="text-2xl" />
            )}
          </div>

          <div className="flex-1">
            <h4
              className="font-bold text-lg"
              style={{
                fontFamily: course.theme.fontFamily,
                color: course.theme.primaryColor,
              }}
            >
              {course.institution}
            </h4>
            <p className="text-text-muted text-xs">{course.year}</p>
          </div>

          {/* Status badge */}
          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${status.color}15`,
              color: status.color,
              border: `1px solid ${status.color}30`,
            }}
          >
            {status.label}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3
            className="text-xl font-bold"
            style={{ fontFamily: course.theme.fontFamily }}
          >
            {course.title}
          </h3>
          <p className="text-text-muted text-sm leading-relaxed">
            {course.description}
          </p>

          {course.credentialUrl && (
            <motion.a
              href={course.credentialUrl}
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: course.theme.primaryColor }}
              whileHover={{ x: 3 }}
              data-hover
              target="_blank"
              rel="noopener noreferrer"
            >
              <HiExternalLink />
              Ver credencial
            </motion.a>
          )}
        </div>

        {/* Decorative elements based on institution style */}
        <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none opacity-5">
          {isHarvard && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-24 h-24 border-4 rounded-full" style={{ borderColor: course.theme.primaryColor }} />
              <div className="absolute w-12 h-16 border-2" style={{ borderColor: course.theme.primaryColor }} />
            </div>
          )}
          {isMIT && (
            <div className="w-full h-full p-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-[1px] mb-3 opacity-60"
                  style={{
                    backgroundColor: course.theme.primaryColor,
                    width: `${60 + i * 10}%`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function CoursesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelector(".courses-title"),
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      }
    );

    gsap.fromTo(
      sectionRef.current.querySelectorAll(".course-card"),
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0, duration: 0.7, stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="educacao" className="relative min-h-screen py-24 px-6 md:px-12 lg:px-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-purple-700/30 to-transparent" />

      <div className="relative z-40 max-w-4xl mx-auto">
        <div className="courses-title text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
            <span className="gradient-text">Educação</span> & Certificados
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Aprendizado contínuo, das melhores instituições do mundo. Cada curso é um degrau na construção de algo maior.
          </p>
        </div>

        <div className="space-y-8 relative">
          {/* Timeline line */}


          {courses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
