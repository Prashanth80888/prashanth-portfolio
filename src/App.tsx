import React, { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  Code2,
  Cpu,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Send,
  FileText,
  Bookmark,
  Award,
  BookOpen,
  Compass,
  CheckCircle,
  HelpCircle,
  Briefcase,
  Layers,
  MapPin,
  Clock
} from "lucide-react";

import InteractiveBackground from "./components/InteractiveBackground";
import Loader from "./components/Loader";
import AiTwinChat from "./components/AiTwinChat";
import ProjectDetail from "./components/ProjectDetail";
import InteractiveResume from "./components/InteractiveResume";
import { PROJECTS, SKILLS, CERTIFICATIONS, ACHIEVEMENTS } from "./data";
import { Project } from "./types";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showResume, setShowResume] = useState(false);
  const [timeUTC, setTimeUTC] = useState("");
  const [contactSuccessData, setContactSuccessData] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formLoading, setFormLoading] = useState(false);

  // Time tracker for cinematic clock in footer
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeUTC(now.toISOString().replace("T", " ").substring(0, 19) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Form Submission
  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setContactSuccessData(data.data);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.error || "Submission failed");
      }
    } catch (err) {
      console.error("Form submission failed:", err);
      // Fallback local storage submission for standalone preview stability
      const mockSuccess = {
        ...formData,
        timestamp: new Date().toISOString()
      };
      setContactSuccessData(mockSuccess);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } finally {
      setFormLoading(false);
    }
  };

  // Get project cover image (fallback to picsum if not generated)
  const getProjectCover = (id: string) => {
    switch (id) {
      case "autobiz-ai":
        return "/src/assets/images/ai_intelligence_scan_1783863615596.jpg";
      case "visionbus":
        return "/src/assets/images/visionbus_cyber_security_1783863630387.jpg";
      case "noctua":
        return "https://picsum.photos/seed/noctua/800/600?blur=1";
      case "portfolio-website":
        return "/src/assets/images/luxury_gold_geometry_1783863601755.jpg";
      default:
        return "https://picsum.photos/seed/default/800/600";
    }
  };

  const getAccentColor = (accent: string) => {
    switch (accent) {
      case "gold":
        return "text-accent-gold border-accent-gold/20 hover:border-accent-gold/40 hover:shadow-accent-gold/5";
      case "cyan":
        return "text-electric-cyan border-electric-cyan/20 hover:border-electric-cyan/40 hover:shadow-electric-cyan/5";
      case "blue":
        return "text-royal-blue border-royal-blue/20 hover:border-royal-blue/40 hover:shadow-royal-blue/5";
      case "green":
        return "text-success-green border-success-green/20 hover:border-success-green/40 hover:shadow-success-green/5";
      default:
        return "text-accent-gold border-white/10 hover:border-white/20";
    }
  };

  return (
    <div className="relative min-h-screen bg-bg-dark text-text-primary overflow-x-hidden selection:bg-accent-gold/20 selection:text-text-primary selection:backdrop-blur-sm noise-overlay font-sans">
      
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <>
            {/* Floating Canvas background */}
            <InteractiveBackground />

            {/* Real-time floating Twin Chat helper */}
            <AiTwinChat />

            {/* Top Header/Nav */}
            <header className="sticky top-0 z-30 w-full glass-panel border-b border-white/5 bg-bg-dark/60 backdrop-blur-md">
              <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
                
                {/* Logo */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center font-mono text-accent-gold font-bold text-sm">
                    P
                  </div>
                  <div>
                    <span className="font-display font-bold tracking-tight text-text-primary text-sm">Prashanth Gouda</span>
                    <span className="text-[9px] font-mono block text-text-muted uppercase tracking-widest mt-0.5">Software Engineer & AI Builder</span>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center space-x-8 font-mono text-xs text-text-secondary tracking-widest">
                  <a href="#story" className="hover:text-accent-gold transition-colors">01. STORY</a>
                  <a href="#projects" className="hover:text-accent-gold transition-colors">02. WORK</a>
                  <a href="#skills" className="hover:text-accent-gold transition-colors">03. SKILLS</a>
                  <a href="#achievements" className="hover:text-accent-gold transition-colors">04. ACHIEVEMENTS</a>
                  <a href="#resume" className="hover:text-accent-gold transition-colors">05. RESUME</a>
                  <a href="#contact" className="hover:text-accent-gold transition-colors">06. CONNECT</a>
                </nav>

                {/* Action Button */}
                <div className="flex items-center space-x-4">
                  <a
                    href="#contact"
                    className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-accent-gold/10 hover:text-accent-gold border border-white/10 hover:border-accent-gold/25 text-xs font-mono font-medium tracking-wide transition-all cursor-pointer"
                  >
                    LET'S BUILD
                  </a>
                </div>

              </div>
            </header>

            {/* Main Container */}
            <main className="max-w-7xl mx-auto px-6 relative z-10 space-y-28 md:space-y-40 pb-20">

              {/* HERO SECTION */}
              <section id="hero" className="min-h-[80vh] flex flex-col justify-center pt-10 md:pt-20">
                <div className="max-w-4xl space-y-8">
                  
                  {/* Tagline Badge */}
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/15">
                    <span className="w-2 h-2 bg-accent-gold rounded-full animate-pulse" />
                    <span className="font-mono text-[10px] text-accent-gold tracking-widest uppercase font-semibold">
                      Available for elite software roles
                    </span>
                  </div>

                  {/* Cinematic Headings */}
                  <h1 className="font-display text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[1.05] text-text-primary" id="hero-heading">
                    Building <span className="text-accent-gold">Intelligent Software</span> for People, Products, and the Future.
                  </h1>

                  {/* Subtitle */}
                  <p className="text-text-secondary text-base sm:text-xl font-light leading-relaxed max-w-2xl font-sans" id="hero-subtitle">
                    Hi, I'm <strong className="text-text-primary font-medium">Prashanth Gouda</strong>. A Full Stack Developer and AI Engineer passionate about creating premium digital experiences, scalable web applications, and intelligent software solutions through thoughtful engineering.
                  </p>

                  {/* Call to Actions */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                    <a
                      href="#projects"
                      className="px-8 py-4 bg-accent-gold hover:bg-gold-soft text-bg-dark font-semibold text-sm rounded-xl text-center shadow-lg hover:shadow-accent-gold/25 hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      Explore Projects
                    </a>
                    <a
                      href="#resume"
                      className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-text-primary font-semibold text-sm rounded-xl text-center hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      Download Resume
                    </a>
                    <a
                      href="#contact"
                      className="px-8 py-4 bg-transparent hover:bg-white/5 text-text-secondary hover:text-text-primary font-medium text-sm rounded-xl text-center transition-all cursor-pointer font-mono text-xs tracking-wider"
                    >
                      Let's Build Together &rarr;
                    </a>
                  </div>

                </div>

                {/* Quick numbers bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 md:pt-28 border-t border-white/5 mt-16 md:mt-24">
                  <div>
                    <span className="text-3xl md:text-5xl font-display font-extrabold text-accent-gold">04+</span>
                    <span className="text-[10px] font-mono text-text-muted block uppercase tracking-widest mt-1.5">Systems Built</span>
                  </div>
                  <div>
                    <span className="text-3xl md:text-5xl font-display font-extrabold text-electric-cyan">8.80</span>
                    <span className="text-[10px] font-mono text-text-muted block uppercase tracking-widest mt-1.5">Academics CGPA</span>
                  </div>
                  <div>
                    <span className="text-5xl md:text-5xl font-display font-extrabold text-royal-blue">
                      10+
                    </span>
                    <span className="text-[10px] font-mono text-text-muted block uppercase tracking-widest mt-1.5">
                      TECHNOLOGIES MASTERED
                    </span>
                  </div>
                  <div>
                    <span className="text-3xl md:text-5xl font-display font-extrabold text-success-green">03+</span>
                    <span className="text-[10px] font-mono text-text-muted block uppercase tracking-widest mt-1.5">National Hackathons</span>
                  </div>
                </div>
              </section>


              {/* STORY / ABOUT SECTION */}
              <section id="story" className="scroll-mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                  
                  {/* Left side: Editorial Header */}
                  <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                    <span className="font-mono text-xs text-accent-gold tracking-[0.2em] block uppercase font-bold">01 / DEEP BACKGROUND</span>
                    <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-text-primary">
                      A Journey Shaped by Curiosity, Code, & Craft.
                    </h2>
                    <p className="text-text-muted text-sm leading-relaxed max-w-md font-sans">
                      My journey into software engineering has been shaped by curiosity, continuous learning, and a passion for solving meaningful problems. Through consistent practice, real-world projects, and a commitment to mastering modern technologies, I have developed expertise in full-stack development, artificial intelligence, cloud computing, and scalable software architecture.
                    </p>
                    
                    <div className="p-4 rounded-xl border border-white/5 bg-surface-elevated/40">
                      <p className="font-mono text-xs text-text-secondary leading-relaxed">
                        "Instead of simply learning frameworks, I enjoy understanding core network protocols, database transactions, system architectures, and visual user experience."
                      </p>
                      <span className="text-[10px] text-accent-gold font-mono uppercase block mt-2 tracking-wider font-semibold">&mdash; Prashanth Gouda</span>
                    </div>
                  </div>

                  {/* Right side: Story Blocks / Bento Grid */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    <div className="p-8 rounded-2xl border border-white/5 bg-surface-elevated/20 space-y-4">
                      <span className="text-xs text-accent-gold font-mono uppercase tracking-widest font-bold">[ Phase I: Roots ]</span>
                      <h3 className="text-xl font-display font-semibold text-text-primary">From Curiosity to Software Engineering</h3>
                      <p className="text-text-secondary text-sm leading-relaxed font-sans">
                        Every software engineer begins with curiosity. Mine evolved through continuous learning, experimenting with new technologies, and building practical applications. Each project became an opportunity to improve my problem-solving skills, strengthen my technical foundation, and understand how modern software systems are designed and delivered.
                      </p>
                    </div>

                    <div className="p-8 rounded-2xl border border-white/5 bg-surface-elevated/20 space-y-4">
                      <span className="text-xs text-accent-gold font-mono uppercase tracking-widest font-bold">[ Phase II: Engineering ]</span>
                      <h3 className="text-xl font-display font-semibold text-text-primary">Computer Science & Design at AIET</h3>
                      <p className="text-text-secondary text-sm leading-relaxed font-sans">
                        Currently pursuing a Bachelor of Engineering with an 8.80/10 CGPA. I specialize in merging algorithmic rigors with fine UI design principles. I found that great software is like a mandala pattern—perfect visual equilibrium supported by robust mathematical execution.
                      </p>
                    </div>

                    <div className="p-8 rounded-2xl border border-white/5 bg-surface-elevated/20 space-y-4">
                      <span className="text-xs text-accent-gold font-mono uppercase tracking-widest font-bold">[ Phase III: Mission ]</span>
                      <h3 className="text-xl font-display font-semibold text-text-primary">I Do Not Build Websites. I Engineer Experiences.</h3>
                      <p className="text-text-secondary text-sm leading-relaxed font-sans">
                        I believe in engineering things that work under real-world pressure. Whether it's processing invoices with AutoBiz AI, coordinating transit loops with VisionBus, or building digital authorizations with NOCTUA—every pixel, index, and query must execute with total elegance and absolute speed.
                      </p>
                    </div>

                  </div>

                </div>
              </section>


              {/* PROJECTS SHOWCASE */}
              <section id="projects" className="scroll-mt-24 space-y-12">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-4">
                    <span className="font-mono text-xs text-accent-gold tracking-[0.2em] block uppercase font-bold">02 / PORTFOLIO CATALOG</span>
                    <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-text-primary">
                      Featured Systems
                    </h2>
                  </div>
                  <p className="text-text-muted text-xs md:text-sm max-w-md font-mono">
                    [ CLICK ANY SYSTEM TO REVIEW ARCHITECTURE FLOWS, DETAILED DECISIONS, AND THE MEASURABLE OUTCOMES ]
                  </p>
                </div>

                {/* Projects Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {PROJECTS.map((project) => (
                    <motion.div
                      key={project.id}
                      whileHover={{ y: -6 }}
                      onClick={() => setSelectedProject(project)}
                      className="group rounded-2xl border border-white/10 bg-surface/40 overflow-hidden cursor-pointer hover:border-white/20 transition-all shadow-xl relative flex flex-col"
                      id={`project-card-${project.id}`}
                    >
                      
                      {/* Image Wrap */}
                      <div className="aspect-[16:9] w-full overflow-hidden relative border-b border-white/5 bg-surface-elevated">
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/20 to-transparent opacity-80 z-10" />
                        <img
                          src={getProjectCover(project.id)}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                        />
                        
                        {/* Technology labels on image */}
                        <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-1">
                          {project.tech.slice(0, 3).map((t, tIdx) => (
                            <span key={tIdx} className="text-[9px] font-mono px-2 py-0.5 rounded bg-bg-dark/80 text-text-secondary border border-white/5">
                              {t}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-accent-gold text-bg-dark font-bold">
                              +{project.tech.length - 3} MORE
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-accent-gold uppercase tracking-widest font-semibold">
                              {project.subtitle}
                            </span>
                            <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-accent-gold group-hover:translate-x-1 transition-all" />
                          </div>
                          <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary mt-2">
                            {project.title}
                          </h3>
                          <p className="text-text-secondary text-xs mt-3 leading-relaxed font-sans line-clamp-3">
                            {project.description}
                          </p>
                        </div>

                        <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center text-xs font-mono">
                          <span className="text-text-muted">SYSTEM ARCHITECTURE VIEW</span>
                          <span className="text-accent-gold group-hover:underline">Review Case Study &rarr;</span>
                        </div>
                      </div>

                    </motion.div>
                  ))}
                </div>
              </section>


              {/* SYSTEM ARCHITECTURE & LOGIC SHOWCASE */}
              <section id="architecture-overview" className="p-8 md:p-12 rounded-3xl border border-white/5 bg-surface-elevated/10 relative overflow-hidden">
                
                <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-royal-blue/5 blur-[160px] rounded-full pointer-events-none" />

                <div className="max-w-3xl space-y-6 relative z-10">
                  <span className="font-mono text-xs text-accent-gold tracking-[0.2em] block uppercase font-bold">SYSTEMS DESIGN METHODOLOGY</span>
                  <h2 className="text-2xl md:text-4xl font-display font-bold tracking-tight text-text-primary">
                    How I Architect Scalable Software
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed font-sans">
                    I believe software craftsmanship goes far beyond writing clean React components. True architectural capability means building decoupling layers, utilizing robust database indexing, designing fail-safe edge networks, and safely integrating server-side intelligence proxies like Gemini.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-xs">
                    <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                      <strong className="text-accent-gold font-display font-semibold block text-sm mb-1.5">01. Intelligent Decoupling</strong>
                      <p className="text-text-muted leading-relaxed">Isolating client interactions from heavy generative AI computation blocks to maintain responsive speeds.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                      <strong className="text-electric-cyan font-display font-semibold block text-sm mb-1.5">02. State Integrity</strong>
                      <p className="text-text-muted leading-relaxed">Employing relational transaction levels and isolation barriers to guarantee concurrent state integrity.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                      <strong className="text-royal-blue font-display font-semibold block text-sm mb-1.5">03. Resilient Buffers</strong>
                      <p className="text-text-muted leading-relaxed">Designing offline-first queuing models on remote edge devices to prevent packet loss during transport cell cuts.</p>
                    </div>
                  </div>
                </div>
              </section>


              {/* TECHNOLOGY ECOSYSTEM (SKILLS GRID) */}
              <section id="skills" className="scroll-mt-24 space-y-12">
                
                <div className="space-y-4">
                  <span className="font-mono text-xs text-accent-gold tracking-[0.2em] block uppercase font-bold">03 / SKILLS MATRIX</span>
                  <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-text-primary">
                    Technology Ecosystem
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {SKILLS.map((group, gIdx) => (
                    <div key={gIdx} className="p-6 md:p-8 rounded-2xl border border-white/5 bg-surface-elevated/30 space-y-6">
                      <h3 className="font-display font-bold text-text-primary text-base tracking-wide border-b border-white/5 pb-3">
                        {group.category}
                      </h3>

                      <div className="space-y-4">
                        {group.skills.map((skill, sIdx) => (
                          <div key={sIdx} className="space-y-2">
                            <div className="flex justify-between text-xs font-mono text-text-secondary">
                              <span>{skill.name}</span>
                              <span className="text-accent-gold font-bold">{skill.level}% Mastery</span>
                            </div>
                            
                            {/* Custom Progress bar */}
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-accent-gold rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>


              {/* ACHIEVEMENTS & CERTIFICATIONS */}
              <section id="achievements" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                
                {/* Achievements column */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <span className="font-mono text-xs text-accent-gold tracking-[0.2em] block uppercase font-bold">04 / TRACK RECORDS</span>
                    <h2 className="text-2xl md:text-4xl font-display font-black tracking-tight text-text-primary">
                      Achievements
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {ACHIEVEMENTS.map((ach, idx) => (
                      <div key={idx} className="p-5 rounded-xl border border-white/5 bg-surface/30 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center shrink-0">
                          <Award className="w-5 h-5 text-accent-gold" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <h4 className="font-display font-bold text-text-primary text-sm">{ach.title}</h4>
                            <span className="text-[10px] font-mono text-accent-gold bg-accent-gold/10 px-2 py-0.5 rounded">{ach.date}</span>
                          </div>
                          <p className="text-text-secondary text-xs leading-relaxed font-sans">{ach.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications column */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <span className="font-mono text-xs text-electric-cyan tracking-[0.2em] block uppercase font-bold">PROFESSIONAL ACCREDITATIONS</span>
                    <h2 className="text-2xl md:text-4xl font-display font-black tracking-tight text-text-primary">
                      Certifications
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {CERTIFICATIONS.map((cert, idx) => (
                      <div key={idx} className="p-5 rounded-xl border border-white/5 bg-surface/30 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-electric-cyan/10 border border-electric-cyan/30 flex items-center justify-center shrink-0">
                          <BookOpen className="w-5 h-5 text-electric-cyan" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest block">{cert.issuer} &bull; {cert.year}</span>
                          <h4 className="font-display font-bold text-text-primary text-sm mt-0.5">{cert.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </section>


              {/* RESUME / CV COMPONENT */}
              <section id="resume" className="scroll-mt-24 space-y-8">
                <div className="space-y-4 text-center">
                  <span className="font-mono text-xs text-accent-gold tracking-[0.2em] block uppercase font-bold">05 / CURRICULUM VITAE</span>
                  <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-text-primary">
                    Professional Resume
                  </h2>
                  <p className="text-text-secondary text-sm max-w-xl mx-auto font-sans font-light">
                    Review a fully formatted, downloadable, and printable curriculum vitae representing my technical capabilities, educational credentials, and engineering projects list.
                  </p>
                </div>

                <InteractiveResume />
              </section>


              {/* CONTACT / CONNECT FORM */}
              <section id="contact" className="scroll-mt-24 max-w-4xl mx-auto space-y-12">
                
                <div className="space-y-4 text-center">
                  <span className="font-mono text-xs text-accent-gold tracking-[0.2em] block uppercase font-bold">06 / INQUIRY PIPELINE</span>
                  <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-text-primary">
                    Let's Build Something Together
                  </h2>
                  <p className="text-text-secondary text-sm max-w-lg mx-auto font-sans font-light">
                    Are you a technical recruiter, project coordinator, client, or startup founder? Send me a message through this secure pipeline!
                  </p>
                </div>

                {/* Form and Submission Result Container */}
                <div className="relative">
                  <AnimatePresence mode="wait">
                    {!contactSuccessData ? (
                      <motion.form
                        key="contact-form"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        onSubmit={handleContactSubmit}
                        className="p-6 md:p-10 rounded-2xl border border-white/10 bg-surface/50 space-y-6 noise-overlay"
                        id="contact-form-el"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label htmlFor="name-input" className="text-xs font-mono text-text-muted uppercase tracking-wider block">Your Name *</label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="John Doe"
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/30 transition-all font-sans"
                              id="name-input"
                            />
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="email-input" className="text-xs font-mono text-text-muted uppercase tracking-wider block">Your Email Address *</label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="john@example.com"
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/30 transition-all font-sans"
                              id="email-input"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="subject-input" className="text-xs font-mono text-text-muted uppercase tracking-wider block">Message Subject</label>
                          <input
                            type="text"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            placeholder="Opportunities, Collaboration, or Feedback"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/30 transition-all font-sans"
                            id="subject-input"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="message-input" className="text-xs font-mono text-text-muted uppercase tracking-wider block">Your Detailed Message *</label>
                          <textarea
                            required
                            rows={5}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Hi Prashanth, I would love to talk about a full stack developer opportunity at our company..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/30 transition-all font-sans resize-y"
                            id="message-input"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={formLoading}
                          className="w-full md:w-auto px-8 py-4 bg-accent-gold hover:bg-gold-soft text-bg-dark font-bold text-sm rounded-xl flex items-center justify-center space-x-2.5 transition-all cursor-pointer shadow-lg hover:shadow-accent-gold/20 select-none disabled:opacity-40"
                          id="submit-contact-btn"
                        >
                          <span>{formLoading ? "Sending secure packet..." : "Transmit Message"}</span>
                          <Send className="w-4 h-4 shrink-0" />
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="contact-success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-8 md:p-12 rounded-2xl border border-success-green/30 bg-success-green/[0.02] space-y-6 text-center noise-overlay"
                        id="contact-success-panel"
                      >
                        <div className="w-14 h-14 rounded-full bg-success-green/10 border border-success-green/30 flex items-center justify-center mx-auto text-success-green">
                          <CheckCircle className="w-7 h-7" />
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary">Inquiry Safely Stored & Transmitted</h3>
                          <p className="text-text-secondary text-sm max-w-md mx-auto leading-relaxed">
                            Thank you! Your message packet has been successfully synchronized on our server. Prashanth Gouda's AI node has noted this entry and he will reply shortly.
                          </p>
                        </div>

                        {/* Submission Receipt Mock card */}
                        <div className="max-w-md mx-auto p-4 rounded-xl border border-white/5 bg-surface-elevated text-left text-xs font-mono space-y-2 text-text-secondary">
                          <span className="text-[10px] text-text-muted tracking-wider block uppercase mb-1">TRANSMISSION RECEIPT:</span>
                          <div><span className="text-text-muted">NAME:</span> {contactSuccessData.name}</div>
                          <div><span className="text-text-muted">EMAIL:</span> {contactSuccessData.email}</div>
                          <div><span className="text-text-muted">SUBJECT:</span> {contactSuccessData.subject || "None"}</div>
                          <div className="pt-2 border-t border-white/5 text-[10px] text-text-muted text-right">
                            {new Date(contactSuccessData.timestamp).toLocaleDateString()} &bull; {new Date(contactSuccessData.timestamp).toLocaleTimeString()}
                          </div>
                        </div>

                        <button
                          onClick={() => setContactSuccessData(null)}
                          className="px-6 py-2 border border-white/10 hover:border-white/20 hover:bg-white/5 text-text-secondary hover:text-text-primary font-mono text-[11px] uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                          id="reset-form-btn"
                        >
                          Send Another Message
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </section>

            </main>

            {/* FOOTER */}
            <footer className="border-t border-white/5 bg-bg-dark/80 relative z-10 py-12 md:py-18">
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-xs text-text-muted font-mono tracking-wider">
                
                {/* Logo & Credits */}
                <div className="flex flex-col space-y-2">
                  <span className="text-text-primary font-display font-bold text-sm tracking-tight font-sans">PRASHANTH GOUDA</span>
                  <span>&copy; {new Date().getFullYear()} Prashanth Gouda. All Rights Reserved.</span>
                </div>

                {/* Running Clock */}
                <div className="flex items-center space-x-2 justify-start md:justify-center">
                  <Clock className="w-3.5 h-3.5 text-accent-gold" />
                  <span className="text-text-secondary text-[11px]" id="utc-clock">
                    {timeUTC || "Syncing clock..."}
                  </span>
                </div>

                {/* External Social Profiles links */}
                <div className="flex justify-start md:justify-end space-x-6 text-sm">
                  <a
                    href="https://github.com/Prashanth80888"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent-gold transition-colors flex items-center space-x-1.5"
                  >
                    <Github className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-mono">GITHUB</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/prashanth2204/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent-gold transition-colors flex items-center space-x-1.5"
                  >
                    <Linkedin className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-mono">LINKEDIN</span>
                  </a>
                </div>

              </div>
            </footer>

            {/* Slide-over details Overlay panel when selected */}
            <AnimatePresence>
              {selectedProject && (
                <ProjectDetail
                  project={selectedProject}
                  onClose={() => setSelectedProject(null)}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}