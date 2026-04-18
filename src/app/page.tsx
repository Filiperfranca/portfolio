import ClientShell from "@/components/ClientShell";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CoursesSection from "@/components/CoursesSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <ClientShell>
      <main className="relative z-10">
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <CoursesSection />
        <ContactSection />
      </main>
    </ClientShell>
  );
}
