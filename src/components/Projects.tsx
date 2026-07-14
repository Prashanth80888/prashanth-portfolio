import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, Code, Layers, Hammer, Shield, ChevronRight, X, Sparkles, Monitor } from "lucide-react";
import { PROJECTS_DATA } from "../data";
import { ProjectItem } from "../types";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [isLaunching, setIsLaunching] = useState(false);

  // Simple Mouse Tilt effect configuration (calculating cursor position within card coordinates)
  const [tiltStyle, setTiltStyle] = useState<Record<string, string>>({});

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, id: string) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Divide coordinates to limit rotation angles (max ~10deg)
    const rotateX = -(y / (box.height / 2)) * 8;
    const rotateY = (x / (box.width / 2)) * 8;

    setTiltStyle({
      [id]: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({});
    setHoveredCardId(null);
  };

  return (
    <section id="projects" className="relative py-24 w-full overflow-hidden">
      {/* Glow overlays */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-[92%] max-w-7xl mx-auto z-10">
        
        {/* Section Heading */}
        <div className="mb-16 space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30">
            <Monitor className="w-3.5 h-3.5 text-cyber-cyan" />
            <span className="font-mono text-[10px] tracking-widest text-cyber-cyan uppercase">System Deployments</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Project Spotlights
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base leading-relaxed">
            A curation of high-fidelity platforms integrating autonomous AI agent structures, real-time WebGL security telemetry, and performant backend pipelines.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {PROJECTS_DATA.map((project) => {
            const isHovered = hoveredCardId === project.id;
            const currentTilt = tiltStyle[project.id] || "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

            return (
              <div
                key={project.id}
                onMouseMove={(e) => {
                  setHoveredCardId(project.id);
                  handleMouseMove(e, project.id);
                }}
                onMouseLeave={handleMouseLeave}
                className="relative cursor-pointer group rounded-2xl"
                style={{ transition: "transform 0.1s ease-out" }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Visual Glass Wrapper Card with custom CSS Mouse Tilt */}
                <div
                  className="w-full h-full glass-panel border-white/5 rounded-2xl overflow-hidden transition-all duration-300 relative"
                  style={{ transform: currentTilt }}
                >
                  {/* Glowing perimeter border on hover */}
                  <div
                    className="absolute inset-0 border-2 rounded-2xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-20"
                    style={{
                      borderImage: "linear-gradient(135deg, #22d3ee, #a855f7, transparent) 1",
                      borderImageSlice: 1
                    }}
                  />

                  {/* Top image wrapper with sleek custom shading */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-slate via-dark-slate/50 to-transparent" />
                    
                    {/* Floating top category chip */}
                    <div className="absolute top-4 left-4 flex gap-2 z-10">
                      <span className="font-mono text-[9px] px-3 py-1 bg-dark-bg/80 backdrop-blur-md border border-white/10 text-cyber-cyan uppercase tracking-wider rounded-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Spotlight glow marker */}
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-cyber-cyan shadow-[0_0_8px_rgba(0,245,255,1)] animate-ping" />
                  </div>

                  {/* Details bottom block */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] text-cyber-purple tracking-wider uppercase">
                        {project.tagline}
                      </span>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-wide group-hover:text-cyber-cyan transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech tag list */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[9px] px-2.5 py-1 bg-white/5 border border-white/5 text-gray-400 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="font-mono text-[9px] px-2 py-1 text-gray-500 font-bold">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Bottom CTA trigger bar */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-500 group-hover:text-white transition-colors duration-300">
                      <span>INSPECT ENGINE BLUEPRINT</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 text-cyber-cyan" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Extended Architectural Inspect Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-bg/80 backdrop-blur-md overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.9, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 30, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                className="w-full max-w-4xl glass-panel-neon rounded-2xl overflow-hidden shadow-2xl relative my-8"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-dark-bg/80 border border-white/10 text-gray-400 hover:text-white transition-colors z-30 focus:outline-none"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Hero visual header */}
                <div className="relative h-64 sm:h-80 w-full">
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 sm:left-10 right-6 z-10">
                    <span className="font-mono text-[10px] text-cyber-cyan uppercase tracking-widest bg-cyber-cyan/15 px-3 py-1.5 rounded-full border border-cyber-cyan/20">
                      {selectedProject.category}
                    </span>
                    <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mt-3 tracking-wide">
                      {selectedProject.title}
                    </h2>
                    <p className="font-mono text-xs sm:text-sm text-gray-400 mt-1">
                      {selectedProject.tagline}
                    </p>
                  </div>
                </div>

                {/* Modal Tab Content Layout */}
                <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 bg-dark-bg">
                  
                  {/* Left Column: Narrative Specs */}
                  <div className="md:col-span-8 space-y-6">
                    <div className="space-y-2">
                      <h4 className="font-mono text-xs text-cyber-purple tracking-widest uppercase">System Core Architecture</h4>
                      <p className="text-gray-300 text-sm leading-relaxed font-sans">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div className="space-y-3 bg-white/3 border border-white/5 rounded-xl p-5">
                      <div className="flex items-center space-x-2 text-cyber-cyan">
                        <Hammer className="w-4.5 h-4.5" />
                        <h4 className="font-display font-bold text-sm text-white">Engineering Hurdles & Solutions</h4>
                      </div>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                        {selectedProject.challenges}
                      </p>
                    </div>

                    <div className="space-y-3 bg-white/3 border border-white/5 rounded-xl p-5">
                      <div className="flex items-center space-x-2 text-cyber-purple">
                        <Layers className="w-4.5 h-4.5" />
                        <h4 className="font-display font-bold text-sm text-white">System Schema / Data Flow</h4>
                      </div>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                        {selectedProject.architecture}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Parameters & Links */}
                  <div className="md:col-span-4 space-y-6">
                    <div className="space-y-3">
                      <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Repository Vectors</h4>
                      <div className="flex flex-col space-y-2">
                        {selectedProject.githubUrl && (
                          <a
                            href={selectedProject.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between px-4 py-2.5 bg-dark-slate hover:bg-dark-slate/80 text-white rounded-xl border border-white/5 text-xs font-mono tracking-wider transition-colors"
                          >
                            <span>SOURCE_CODE</span>
                            <Github className="w-4 h-4 text-cyber-purple" />
                          </a>
                        )}
                        <button
                          disabled={isLaunching}
                          onClick={() => {
                            setIsLaunching(true);
                            setTimeout(() => setIsLaunching(false), 2000);
                          }}
                          className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-cyber-cyan/10 to-cyber-blue/10 hover:from-cyber-cyan hover:to-cyber-blue text-cyber-cyan hover:text-dark-bg rounded-xl border border-cyber-cyan/20 hover:border-transparent text-xs font-mono tracking-wider transition-all duration-300 disabled:opacity-50"
                        >
                          <span>{isLaunching ? "INITIALIZING..." : "LIVE_DEPLOY"}</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Stack Manifest</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[9px] px-2.5 py-1 bg-white/5 border border-white/10 text-gray-400 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-white/5 font-mono text-[10px] text-gray-500">
                      <div className="flex justify-between">
                        <span>MISSION_TIMELINE:</span>
                        <span className="text-white font-bold">{selectedProject.timeline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>INGRESS_PORT:</span>
                        <span className="text-cyber-cyan">HTTPS_3000</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Modal Footer features bullet specs */}
                <div className="bg-dark-slate/30 border-t border-white/5 p-6 sm:px-10">
                  <h4 className="font-mono text-xs text-cyber-teal uppercase tracking-widest mb-3">Core Operational Capabilities</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan mt-1.5 shrink-0" />
                        <span className="text-xs text-gray-400 font-sans">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
