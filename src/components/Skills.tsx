import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Brain, Cpu, Database, Cloud, Terminal, Compass, Zap } from "lucide-react";
import { SKILLS_DATA } from "../data";
import { SkillItem } from "../types";

const categoryIconMap: Record<string, any> = {
  ai: Brain,
  frontend: Cpu,
  backend: Database,
  cloud: Cloud,
  languages: Terminal,
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  const categories = [
    { id: "all", label: "All Vectors" },
    { id: "ai", label: "Artificial Intel" },
    { id: "frontend", label: "Frontend/Vessels" },
    { id: "backend", label: "Backend Core" },
    { id: "languages", label: "Core Dialects" },
    { id: "cloud", label: "Cloud & Ops" },
  ];

  const filteredSkills = selectedCategory === "all"
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="relative py-24 w-full overflow-hidden">
      {/* Background decoration grids */}
      <div className="absolute inset-0 cyber-grid-fine opacity-10 pointer-events-none" />

      <div className="relative w-[92%] max-w-7xl mx-auto z-10">
        
        {/* Section Heading */}
        <div className="mb-16 space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyber-purple/10 border border-cyber-purple/30">
            <Compass className="w-3.5 h-3.5 text-cyber-purple" />
            <span className="font-mono text-[10px] tracking-widest text-cyber-purple uppercase">Cognitive Arsenal</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Holographic Skill Universe
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base leading-relaxed">
            Hover over any technological vessel to trigger visual quantum overload, exploding neural particles, and vector specifications.
          </p>
        </div>

        {/* Category Filter Nodes */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl font-mono text-xs tracking-wider uppercase border transition-all duration-300 relative focus:outline-none ${
                  isActive
                    ? "bg-gradient-to-r from-cyber-cyan/10 to-cyber-purple/10 border-cyber-cyan text-cyber-cyan shadow-[0_0_15px_rgba(0,245,255,0.15)]"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <span>{cat.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryGlow"
                    className="absolute inset-0 rounded-xl border border-cyber-purple/30 pointer-events-none"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Outer universe layout - Two Column Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Holographic grid container */}
          <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md relative min-h-[400px]">
            {/* Visual tech lines overlay */}
            <div className="absolute top-0 right-10 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />
            <div className="absolute left-10 right-10 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

            {/* floating particles helper */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-10 w-2 h-2 bg-cyber-cyan rounded-full animate-ping opacity-20" />
              <div className="absolute bottom-20 right-20 w-3 h-3 bg-cyber-purple rounded-full animate-ping opacity-15" />
            </div>

            <motion.div 
              layout 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill) => {
                  const CategoryIcon = categoryIconMap[skill.category] || Terminal;
                  const isHovered = hoveredSkill?.name === skill.name;

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="relative"
                    >
                      {/* Floating holographic card body */}
                      <div
                        className={`p-4 rounded-xl border transition-all duration-500 flex flex-col items-center justify-center text-center cursor-crosshair min-h-[120px] relative overflow-hidden group ${
                          isHovered
                            ? "bg-dark-bg border-cyber-cyan shadow-[0_0_20px_rgba(34,211,238,0.25)] -translate-y-2 scale-105"
                            : "bg-white/5 border-white/10 hover:border-cyber-purple/40 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                        }`}
                        style={{
                          borderColor: isHovered ? skill.color : undefined,
                        }}
                      >
                        {/* Dynamic backdrop wave on hover */}
                        <div 
                          className="absolute inset-0 bg-radial-glow transition-all duration-700 pointer-events-none opacity-0 group-hover:opacity-100"
                          style={{
                            background: `radial-gradient(circle at center, ${skill.color}22 0%, transparent 70%)`
                          }}
                        />

                        {/* Interactive particles explosion representation */}
                        {isHovered && (
                          <div className="absolute inset-0 pointer-events-none">
                            <span className="absolute top-2 left-2 w-1 h-1 rounded-full animate-ping" style={{ backgroundColor: skill.color }} />
                            <span className="absolute bottom-2 right-4 w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: skill.color }} />
                            <span className="absolute top-1/2 right-2 w-1 h-1 rounded-full animate-ping" style={{ backgroundColor: skill.color }} />
                          </div>
                        )}

                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 relative"
                          style={{
                            backgroundColor: isHovered ? `${skill.color}15` : "rgba(255,255,255,0.02)",
                            border: `1px solid ${isHovered ? skill.color : "rgba(255,255,255,0.05)"}`
                          }}
                        >
                          <CategoryIcon 
                            className="w-5 h-5 transition-transform duration-500 group-hover:rotate-12"
                            style={{ color: isHovered ? skill.color : "#94A3B8" }}
                          />
                        </div>

                        <span className="font-display font-bold text-sm tracking-wide text-white">
                          {skill.name}
                        </span>

                        <span className="font-mono text-[9px] text-gray-500 mt-1 uppercase tracking-widest">
                          LVL_0{skill.level}
                        </span>

                        {/* Holographic loading level line */}
                        <div className="w-12 h-[2px] bg-white/5 rounded-full mt-2.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 0.8 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: skill.color }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Interactive terminal details card */}
          <div className="lg:col-span-4 flex">
            <div className="w-full glass-panel border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              {/* Terminal Title Bar */}
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                    Vector Inspector
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {hoveredSkill ? (
                    <motion.div
                      key={hoveredSkill.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm"
                          style={{
                            backgroundColor: `${hoveredSkill.color}20`,
                            color: hoveredSkill.color,
                            border: `1px solid ${hoveredSkill.color}50`
                          }}
                        >
                          {hoveredSkill.name[0]}
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-lg text-white">
                            {hoveredSkill.name}
                          </h3>
                          <span className="font-mono text-[10px] text-gray-500 uppercase">
                            Category: {hoveredSkill.category}
                          </span>
                        </div>
                      </div>

                      {/* Code Terminal Output block */}
                      <div className="bg-dark-bg border border-white/5 rounded-xl p-4 font-mono text-[11px] space-y-3 relative overflow-hidden">
                        <div className="absolute top-2 right-2 flex items-center space-x-1.5">
                          <Zap className="w-3 h-3 text-cyber-cyan animate-pulse" />
                          <span className="text-[8px] text-cyber-cyan tracking-widest uppercase">ACTIVE</span>
                        </div>

                        <div>
                          <span className="text-gray-500">&gt;_ cat specs.json</span>
                        </div>
                        <div className="text-gray-400 space-y-1">
                          <p>
                            <span className="text-cyber-purple">"capacity"</span>:{" "}
                            <span className="text-cyber-cyan">"{hoveredSkill.level}%"</span>,
                          </p>
                          <p>
                            <span className="text-cyber-purple">"efficiency"</span>:{" "}
                            <span className="text-cyber-cyan">"OPTIMIZED"</span>,
                          </p>
                          <p>
                            <span className="text-cyber-purple">"sector"</span>:{" "}
                            <span className="text-cyber-cyan">"{hoveredSkill.category.toUpperCase()}"</span>
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider block">
                          Mission parameters
                        </span>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {hoveredSkill.description}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="no-hover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4"
                    >
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center text-gray-500">
                        <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: "12s" }} />
                      </div>
                      <p className="font-mono text-xs text-gray-500 max-w-[200px] leading-relaxed uppercase">
                        Awaiting neural connection. Overpass cursor on a technological capsule.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Static visual stats */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-gray-600">
                <span>SECTOR: GRID_CORE</span>
                <span>SYS_TEMP: 28°C</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
