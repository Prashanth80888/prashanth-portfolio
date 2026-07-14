export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  overview: string;
  problem: string;
  solution: string;
  challenges: string;
  decisions: string;
  results: string[];
  github: string;
  demo: string;
  accent: "gold" | "cyan" | "blue" | "green";
  architecture: Array<{
    step: string;
    title: string;
    desc: string;
    type: "input" | "process" | "ai" | "output" | "database";
  }>;
}

export interface SkillGroup {
  category: string;
  skills: Array<{ name: string; level: number; icon: string }>;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
}
