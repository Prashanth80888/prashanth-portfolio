import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, GraduationCap, Cpu, Trophy, BrainCircuit, Sparkles, Calendar, BookOpen, Layers } from "lucide-react";
import { TIMELINE_DATA } from "../data";
import { TimelineMilestone } from "../types";

const iconMap: Record<string, any> = {
  Home,
  GraduationCap,
  Cpu,
  Trophy,
  BrainCircuit,
  Sparkles,
};

export default function About() {
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineMilestone>(TIMELINE_DATA[0]);

  return (
    <section id="timeline" className="relative py-24 w-full overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 radial-cyan-glow opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 radial-purple-glow opacity-30 pointer-events-none" />

      <div className="relative w-[92%] max-w-7xl mx-auto z-10">
        
        {/* Section Heading */}
        <div className="mb-16 space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30">
            <BookOpen className="w-3.5 h-3.5 text-cyber-cyan" />
            <span className="font-mono text-[10px] tracking-widest text-cyber-cyan uppercase">Biographical Vectors</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Interactive Timeline
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base leading-relaxed">
            Explore the journey of continuous learning, innovation, and engineering excellence that transformed curiosity into building modern AI-powered applications, scalable systems, and premium digital experiences.
          </p>
        </div>

        {/* Desktop Interactive Layout (Side by Side) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
          
          {/* Timeline Nodes Selector */}
          <div className="lg:col-span-5 flex flex-col space-y-4 relative">
            {/* Connected glowing track */}
            <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-cyber-cyan via-cyber-purple to-cyber-blue opacity-20" />

            {TIMELINE_DATA.map((milestone) => {
              const Icon = iconMap[milestone.icon] || Cpu;
              const isSelected = selectedMilestone.id === milestone.id;

              return (
                <button
                  key={milestone.id}
                  onClick={() => setSelectedMilestone(milestone)}
                  className={`flex items-start text-left p-4 rounded-xl transition-all duration-500 relative group focus:outline-none ${
                    isSelected
                      ? "bg-gradient-to-r from-cyber-cyan/10 via-cyber-purple/5 to-transparent border border-cyber-cyan/20 shadow-[0_0_20px_rgba(0,245,255,0.03)]"
                      : "bg-transparent border border-transparent hover:bg-white/5"
                  }`}
                >
                  {/* Outer active indicator pulse */}
                  {isSelected && (
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-cyber-cyan rounded-r-full shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
                  )}

                  {/* Icon Node */}
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-all duration-300 relative z-10 shrink-0 ${
                      isSelected
                        ? "bg-dark-bg border-cyber-cyan shadow-[0_0_15px_rgba(0,245,255,0.2)] text-cyber-cyan"
                        : "bg-dark-slate/40 border-white/5 text-gray-400 group-hover:border-cyber-cyan/40 group-hover:text-white"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title & Metadata */}
                  <div className="ml-5">
                    <span className={`font-mono text-xs tracking-wider font-semibold ${
                      isSelected ? "text-cyber-cyan" : "text-gray-500"
                    }`}>
                      {milestone.year}
                    </span>
                    <h3 className={`font-display font-bold text-base md:text-lg tracking-wide mt-0.5 transition-colors duration-300 ${
                      isSelected ? "text-white" : "text-gray-400 group-hover:text-white"
                    }`}>
                      {milestone.title}
                    </h3>
                    <p className="font-mono text-[10px] text-gray-500 mt-0.5 uppercase tracking-wider">
                      {milestone.organization}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed 3D Glass Milestone Display Card */}
          <div className="lg:col-span-7 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMilestone.id}
                initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                className="glass-panel-neon border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between h-full min-h-[460px]"
              >
                {/* Visual Glass Reflections */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyber-purple/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />

                {/* Top header block */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-cyber-cyan">
                      <Calendar className="w-4 h-4" />
                      <span className="font-mono text-xs tracking-widest uppercase font-semibold">
                        {selectedMilestone.year}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] px-3 py-1 bg-white/5 border border-white/10 text-gray-400 uppercase tracking-widest rounded-full">
                      VECTOR / {selectedMilestone.type}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-wide">
                      {selectedMilestone.title}
                    </h3>
                    <p className="font-mono text-xs text-cyber-purple uppercase tracking-wider">
                      {selectedMilestone.organization}
                    </p>
                  </div>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
                    {selectedMilestone.description}
                  </p>
                </div>

                {/* Footer specs (Tech / Accomplishments) */}
                <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
                  
                  {/* Tech stack tags */}
                  {selectedMilestone.tech && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Layers className="w-3.5 h-3.5" />
                        <span className="font-mono text-[10px] uppercase tracking-wider">Tech Vectors</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedMilestone.tech.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[10px] px-2.5 py-1 bg-cyber-cyan/5 border border-cyber-cyan/15 text-cyber-cyan rounded-md"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Achievements bullet list */}
                  {selectedMilestone.achievements && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-cyber-purple">
                        <Trophy className="w-3.5 h-3.5" />
                        <span className="font-mono text-[10px] uppercase tracking-wider">Key Ingress Points</span>
                      </div>
                      <ul className="space-y-1.5 pl-1">
                        {selectedMilestone.achievements.map((ach, idx) => (
                          <li key={idx} className="flex items-start text-xs text-gray-400">
                            <span className="text-cyber-purple mr-2">»</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
