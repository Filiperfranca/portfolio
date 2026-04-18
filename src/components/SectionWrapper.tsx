"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

interface SectionWrapperProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  delay?: number;
}

export default function SectionWrapper({ children, id, className = "", delay = 0 }: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll("[data-animate]");

    elements.forEach((el, i) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: delay + i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Refresh on load to handle layout shifts
    ScrollTrigger.refresh();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative min-h-screen py-24 px-6 md:px-12 lg:px-20 ${className}`}
    >
      {children}
    </section>
  );
}
