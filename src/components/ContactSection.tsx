"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";
import { personalInfo } from "@/lib/data";
import GlowButton from "./GlowButton";
import { HiMail, HiDownload } from "react-icons/hi";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

const contactLinks = [
  {
    id: "contact-email",
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    icon: <HiMail />,
    color: "#a855f7",
  },
  {
    id: "contact-linkedin",
    label: "LinkedIn",
    value: "Filipe França",
    href: personalInfo.linkedin,
    icon: <FaLinkedinIn />,
    color: "#0077b5",
  },
  {
    id: "contact-github",
    label: "GitHub",
    value: "@Filiperfranca",
    href: personalInfo.github,
    icon: <FaGithub />,
    color: "#ffffff",
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelector(".contact-title"),
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      }
    );

    gsap.fromTo(
      sectionRef.current.querySelectorAll(".contact-link"),
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="contato" className="relative min-h-[80vh] py-24 px-6 md:px-12 lg:px-20 flex items-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-purple-700/30 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto w-full text-center">
        <div className="contact-title space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black">
            Vamos <span className="gradient-text">conversar</span>?
          </h2>
          <p className="text-text-muted text-lg">
            Estou sempre aberto a novas oportunidades, projetos interessantes e parcerias.
          </p>
        </div>

        {/* Contact links */}
        <div className="space-y-4 mb-12">
          {contactLinks.map((link) => (
            <motion.a
              key={link.id}
              id={link.id}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="contact-link glass rounded-xl p-5 flex items-center gap-4 transition-all duration-300 hover:glass-strong hover:scale-[1.02] group block"
              whileHover={{ x: 5 }}
              data-hover
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${link.color}15`,
                  color: link.color,
                }}
              >
                {link.icon}
              </div>
              <div className="text-left">
                <p className="text-xs text-text-muted uppercase tracking-wider">{link.label}</p>
                <p className="font-medium group-hover:text-purple-400 transition-colors">{link.value}</p>
              </div>
              <motion.span
                className="ml-auto text-text-muted text-lg"
                initial={{ x: 0, opacity: 0.5 }}
                whileHover={{ x: 5, opacity: 1 }}
              >
                →
              </motion.span>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <GlowButton
            href={personalInfo.cvUrl}
            download
            icon={<HiDownload />}
            id="contact-download-cv"
          >
            Baixar CV
          </GlowButton>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-20 pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-text-muted text-sm">
              Projeto idealizado e desenvolvido por{" "}
              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground font-medium hover:text-purple-400 transition-colors underline-offset-4 hover:underline"
              >
                {personalInfo.name}
              </a>
            </p>
            <p className="text-text-muted/50 text-xs">
              © {new Date().getFullYear()} — Todos os direitos reservados
            </p>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
