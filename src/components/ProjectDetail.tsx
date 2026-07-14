import { motion } from "motion/react";
import { X, Github, ExternalLink, Cpu, CheckCircle2, Server, ArrowRight, Database, Play, AlertCircle, ArrowUpRight } from "lucide-react";
import { Project } from "../types";

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  // Map type to visual indicator
  const getStepIcon = (type: string) => {
    switch (type) {
      case "input":
        return <Play className="w-4 h-4 text-royal-blue" />;
      case "process":
        return <Server className="w-4 h-4 text-electric-cyan" />;
      case "ai":
        return <Cpu className="w-4 h-4 text-accent-gold" />;
      case "database":
        return <Database className="w-4 h-4 text-success-green" />;
      case "output":
        return <CheckCircle2 className="w-4 h-4 text-gold-soft" />;
      default:
        return <Server className="w-4 h-4 text-text-muted" />;
    }
  };

  const getStepColorClass = (type: string) => {
    switch (type) {
      case "input":
        return "border-royal-blue/30 bg-royal-blue/5 text-royal-blue";
      case "process":
        return "border-electric-cyan/30 bg-electric-cyan/5 text-electric-cyan";
      case "ai":
        return "border-accent-gold/40 bg-accent-gold/10 text-accent-gold shadow-[0_0_15px_rgba(201,162,39,0.15)]";
      case "database":
        return "border-success-green/30 bg-success-green/5 text-success-green";
      case "output":
        return "border-gold-soft/30 bg-gold-soft/5 text-gold-soft";
      default:
        return "border-white/10 bg-white/5 text-text-muted";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-bg-dark/95 backdrop-blur-md flex justify-end font-sans"
      id="project-detail-overlay"
    >
      {/* Background click to dismiss */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Slide-over Container */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 220 }}
        className="relative w-full max-w-4xl bg-surface border-l border-white/10 shadow-2xl h-full flex flex-col noise-overlay overflow-y-auto"
        id="project-detail-panel"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 p-6 bg-surface-elevated/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs text-accent-gold uppercase tracking-widest">{project.subtitle}</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mt-1">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:text-text-primary hover:border-white/20 transition-all cursor-pointer bg-white/5"
            id="close-detail-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-10 space-y-12 flex-1 pb-20">
          
          {/* Top Banner & Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-6 rounded-2xl border border-white/5 bg-surface-elevated/40 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-wider text-text-muted uppercase block mb-2">Executive Summary</span>
                <p className="text-text-secondary text-base leading-relaxed font-sans">{project.description}</p>
              </div>
              
              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mt-6">
                {project.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-text-secondary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Action Links */}
            <div className="p-6 rounded-2xl border border-white/5 bg-surface-elevated/40 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-wider text-text-muted uppercase block mb-4">Repository & Actions</span>
                <div className="space-y-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 hover:border-accent-gold/40 hover:bg-accent-gold/5 transition-all text-sm text-text-secondary hover:text-text-primary group"
                  >
                    <div className="flex items-center space-x-3">
                      <Github className="w-4 h-4 text-text-muted group-hover:text-accent-gold" />
                      <span>Browse Source</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-accent-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  <a
                    href={project.demo}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 hover:border-electric-cyan/40 hover:bg-electric-cyan/5 transition-all text-sm text-text-secondary hover:text-text-primary group"
                  >
                    <div className="flex items-center space-x-3">
                      <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-electric-cyan" />
                      <span>Live Demonstration</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-electric-cyan transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>DEPLOYED VIA</span>
                  <span className="text-text-secondary">AWS / CLOUD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Case Study Content */}
          <div className="space-y-8">
            <h3 className="text-lg font-display font-semibold text-text-primary tracking-wide border-b border-white/5 pb-3 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-accent-gold rounded-full" />
              <span>THE ENGINEERING PROCESS</span>
            </h3>

            {/* Problem & Solution Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-white/5 bg-[#171111]/30">
                <span className="text-[10px] font-mono tracking-wider text-rose-400 uppercase block mb-3 font-semibold">01. THE PROBLEM</span>
                <p className="text-text-secondary text-sm leading-relaxed">{project.problem}</p>
              </div>

              <div className="p-6 rounded-2xl border border-white/5 bg-[#111714]/30">
                <span className="text-[10px] font-mono tracking-wider text-success-green uppercase block mb-3 font-semibold">02. THE SOLUTION</span>
                <p className="text-text-secondary text-sm leading-relaxed">{project.solution}</p>
              </div>
            </div>

            {/* Overview Detail */}
            <div className="p-6 rounded-2xl border border-white/5 bg-surface-elevated/10">
              <span className="text-[10px] font-mono tracking-wider text-text-muted uppercase block mb-3">Project Deep Dive</span>
              <p className="text-text-secondary text-sm leading-relaxed">{project.overview}</p>
            </div>
          </div>

          {/* Interactive Architecture Flow Diagram */}
          <div className="space-y-8">
            <h3 className="text-lg font-display font-semibold text-text-primary tracking-wide border-b border-white/5 pb-3 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-accent-gold rounded-full" />
              <span>SYSTEM ARCHITECTURE DIAGRAM</span>
            </h3>

            <div className="p-6 rounded-2xl border border-white/5 bg-surface-elevated/40" id="architecture-box">
              <p className="text-xs text-text-muted mb-6 font-mono tracking-wider text-center uppercase">
                Interactive Multi-Stage Process pipeline
              </p>

              {/* Dynamic steps chain */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-2">
                {project.architecture.map((step, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row items-center flex-1">
                    {/* Node */}
                    <div
                      className={`w-full p-4 rounded-xl border text-center flex flex-col items-center justify-center transition-all duration-300 ${getStepColorClass(
                        step.type
                      )}`}
                    >
                      <div className="flex items-center space-x-2 mb-1.5">
                        {getStepIcon(step.type)}
                        <span className="font-mono text-xs font-bold uppercase">{step.title}</span>
                      </div>
                      <p className="text-[10px] text-text-muted line-clamp-2 leading-relaxed">{step.desc}</p>
                      <span className="text-[9px] font-mono mt-1.5 opacity-60">Step {step.step}</span>
                    </div>

                    {/* Arrow (except last item) */}
                    {idx < project.architecture.length - 1 && (
                      <div className="flex items-center justify-center p-2 text-text-muted shrink-0 rotate-90 md:rotate-0">
                        <ArrowRight className="w-4 h-4 text-white/20" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Obstacles & Strategic Decisions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-white/5 bg-surface-elevated/20">
              <div className="flex items-center space-x-2.5 mb-4 text-amber-500">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <h4 className="font-display font-semibold text-text-primary tracking-wide">Key Challenges</h4>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">{project.challenges}</p>
            </div>

            <div className="p-6 rounded-2xl border border-white/5 bg-surface-elevated/20">
              <div className="flex items-center space-x-2.5 mb-4 text-accent-gold">
                <Cpu className="w-5 h-5 shrink-0" />
                <h4 className="font-display font-semibold text-text-primary tracking-wide">Engineering Decisions</h4>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">{project.decisions}</p>
            </div>
          </div>

          {/* Auditable Outcomes Checklist */}
          <div className="p-6 md:p-8 rounded-2xl border border-white/5 bg-surface-elevated/40">
            <span className="text-[10px] font-mono tracking-wider text-success-green uppercase block mb-4 font-semibold">
              03. MEASURABLE RESULTS & OUTCOMES
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.results.map((res, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-success-green shrink-0 mt-0.5" />
                  <span className="text-xs text-text-secondary leading-relaxed">{res}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
