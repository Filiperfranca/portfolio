import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiPython, SiC,
  SiReact, SiNextdotjs, SiVite,
  SiNodedotjs, SiPrisma,
  SiPostgresql, SiSqlite,
  SiGit, SiGithub,
  SiVercel, SiSupabase, SiGooglecloud
} from "react-icons/si";
import type { IconType } from "react-icons";

// ===== TYPES =====
export interface Skill {
  name: string;
  icon: IconType;
  category: "languages" | "frameworks" | "backend" | "databases" | "tools" | "infra";
  color: string;
  related: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  aesthetic: {
    accentColor: string;
    gradientFrom: string;
    gradientTo: string;
    style: string;
  };
  liveUrl?: string;
  githubUrl?: string;
  image: string;
}

export interface Course {
  id: string;
  institution: string;
  title: string;
  status: "completed" | "in-progress" | "planned";
  year: string;
  credentialUrl?: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    style: string;
  };
  description: string;
}

// ===== PERSONAL INFO =====
export const personalInfo = {
  name: "Filipe França",
  role: "Junior Full Stack Developer",
  greeting: "Olá, eu sou",
  roles: ["Desenvolvedor Web", "Front-end Developer", "Back-end Developer"],
  email: "dev.filipefranca@gmail.com",
  linkedin: "https://www.linkedin.com/in/filiperfranca/",
  github: "https://github.com/Filiperfranca",
  cvUrl: "/cv.pdf",
};

export const developerCard = {
  code: `const developer = {
  name: "Filipe França",
  role: "Junior Full Stack Dev",
  skills: ["HTML", "CSS", "JS",
           "React", "Next.js",
           "Node.js", "Python", "C"],
  education: "CS50x Harvard",
  passion: "Building the web"
}`,
};

// ===== SKILLS =====
export const skills: Skill[] = [
  // Languages
  { name: "HTML5", icon: SiHtml5, category: "languages", color: "#E34F26", related: ["CSS3", "JavaScript"] },
  { name: "CSS3", icon: SiCss, category: "languages", color: "#1572B6", related: ["HTML5", "JavaScript"] },
  { name: "JavaScript", icon: SiJavascript, category: "languages", color: "#F7DF1E", related: ["TypeScript", "React", "Node.js"] },
  { name: "TypeScript", icon: SiTypescript, category: "languages", color: "#3178C6", related: ["JavaScript", "React", "Next.js"] },
  { name: "Python", icon: SiPython, category: "languages", color: "#3776AB", related: ["C"] },
  { name: "C", icon: SiC, category: "languages", color: "#A8B9CC", related: ["Python"] },

  // Frameworks
  { name: "React", icon: SiReact, category: "frameworks", color: "#61DAFB", related: ["Next.js", "JavaScript", "TypeScript"] },
  { name: "Next.js", icon: SiNextdotjs, category: "frameworks", color: "#ffffff", related: ["React", "Vercel", "TypeScript"] },
  { name: "Vite", icon: SiVite, category: "frameworks", color: "#646CFF", related: ["React", "JavaScript"] },

  // Backend
  { name: "Node.js", icon: SiNodedotjs, category: "backend", color: "#339933", related: ["JavaScript", "PostgreSQL", "Prisma"] },
  { name: "Prisma", icon: SiPrisma, category: "backend", color: "#2D3748", related: ["Node.js", "PostgreSQL", "SQLite"] },

  // Databases
  { name: "PostgreSQL", icon: SiPostgresql, category: "databases", color: "#4169E1", related: ["Node.js", "Prisma", "Supabase"] },
  { name: "SQLite", icon: SiSqlite, category: "databases", color: "#003B57", related: ["Prisma", "Node.js"] },

  // Tools
  { name: "Git", icon: SiGit, category: "tools", color: "#F05032", related: ["GitHub"] },
  { name: "GitHub", icon: SiGithub, category: "tools", color: "#ffffff", related: ["Git", "Vercel"] },

  // Infra
  { name: "Vercel", icon: SiVercel, category: "infra", color: "#ffffff", related: ["Next.js", "GitHub"] },
  { name: "Supabase", icon: SiSupabase, category: "infra", color: "#3ECF8E", related: ["PostgreSQL", "Node.js"] },
  { name: "Google Cloud", icon: SiGooglecloud, category: "infra", color: "#4285F4", related: ["Node.js"] },
];

export const skillCategories = [
  { key: "languages", label: "Linguagens", emoji: "💻" },
  { key: "frameworks", label: "Frameworks", emoji: "⚛️" },
  { key: "backend", label: "Back-end", emoji: "🔧" },
  { key: "databases", label: "Bancos de Dados", emoji: "🗄️" },
  { key: "tools", label: "Ferramentas", emoji: "🛠️" },
  { key: "infra", label: "Infraestrutura", emoji: "☁️" },
];

// ===== PROJECTS =====
export const projects: Project[] = [
  {
    id: "filipe-franca",
    title: "Filipe R. França",
    description: "Blog e portfólio pessoal com design editorial clássico, inspirado em livros e jornais. Full-stack com autenticação e CMS.",
    stack: ["React", "Next.js", "Prisma", "PostgreSQL", "Supabase"],
    aesthetic: {
      accentColor: "#d4a574",
      gradientFrom: "#2a1f14",
      gradientTo: "#1a1510",
      style: "editorial",
    },
    liveUrl: "https://www.filiperfranca.shop/",
    githubUrl: "https://github.com/Filiperfranca/frfranca",
    image: "/FILIPEFRANCA.png",
  },
  {
    id: "monalisa",
    title: "Monalisa Molduras",
    description: "Site institucional para empresa de molduras e quadros. Design luxuoso e minimalista com tons dourados.",
    stack: ["HTML", "CSS", "JavaScript"],
    aesthetic: {
      accentColor: "#d4af37",
      gradientFrom: "#1a1a0f",
      gradientTo: "#0f0f0a",
      style: "luxury",
    },
    liveUrl: "https://www.monalisamoldurasdf.com/",
    githubUrl: "https://github.com/monalisamoldurasml/Monalisamolduras",
    image: "/MONALISAMOLDURAS.png",
  },
  {
    id: "samira",
    title: "Samira Rahhal",
    description: "Portfólio profissional com estética emocional e feminina. Paleta em tons de vinho e bordô.",
    stack: ["React", "Next.js", "CSS"],
    aesthetic: {
      accentColor: "#8b2252",
      gradientFrom: "#2a0f1a",
      gradientTo: "#1a0a10",
      style: "emotional",
    },
    liveUrl: "https://www.samirarahhal.com.br/",
    githubUrl: "https://github.com/Filiperfranca/imersao-mulher-inteira",
    image: "/SAMIRARAHHAL.png",
  },
  {
    id: "boletins",
    title: "Gerador de Boletins",
    description: "Sistema automatizado para geração de boletins escolares. Interface institucional e funcional.",
    stack: ["Node.js", "PostgreSQL", "JavaScript"],
    aesthetic: {
      accentColor: "#2d7a4f",
      gradientFrom: "#0f1a14",
      gradientTo: "#0a100d",
      style: "institutional",
    },
    liveUrl: "https://gerador-boletins.vercel.app/",
    githubUrl: "https://github.com/Filiperfranca/gerador-boletins",
    image: "/BOLETIM.png",
  },
];

// ===== COURSES =====
export const courses: Course[] = [
  {
    id: "cs50",
    institution: "Harvard University",
    title: "CS50x — Introduction to Computer Science",
    status: "completed",
    year: "2024",
    credentialUrl: "https://courses.edx.org/certificates/b9b8947df4fd4e3c8c6a6148f083f66a",
    theme: {
      primaryColor: "#A51C30",
      secondaryColor: "#f5f0e8",
      fontFamily: "var(--font-serif)",
      style: "academic",
    },
    description: "O curso mais famoso de Ciência da Computação do mundo. Fundamentos de algoritmos, estruturas de dados, engenharia de software e programação em C, Python e SQL.",
  },
  {
    id: "mit",
    institution: "MIT",
    title: "6.00.2x — Computational Thinking and Data Science",
    status: "in-progress",
    year: "2025",
    theme: {
      primaryColor: "#A31F34",
      secondaryColor: "#1a1a2e",
      fontFamily: "var(--font-mono)",
      style: "technical",
    },
    description: "Pensamento computacional, programação estocástica, machine learning e análise de dados com Python. Massachusetts Institute of Technology.",
  },
  {
    id: "iesb",
    institution: "IESB",
    title: "Ciência da Computação — Bacharelado",
    status: "planned",
    year: "2029",
    theme: {
      primaryColor: "#1a6b4a",
      secondaryColor: "#f0f5f3",
      fontFamily: "var(--font-sans)",
      style: "institutional",
    },
    description: "Graduação em Ciência da Computação com foco em engenharia de software, algoritmos avançados e sistemas computacionais.",
  },
];
