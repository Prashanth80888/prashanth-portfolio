import { Briefcase, Calendar, MapPin, Award, Star } from "lucide-react";
import { EXPERIENCE_DATA } from "../data";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 w-full overflow-hidden">
      {/* Abstract Glowing light spots */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyber-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-[92%] max-w-7xl mx-auto z-10">
        
        {/* Section Heading */}
        <div className="mb-16 space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyber-purple/10 border border-cyber-purple/30">
            <Briefcase className="w-3.5 h-3.5 text-cyber-purple" />
            <span className="font-mono text-[10px] tracking-widest text-cyber-purple uppercase">Professional Footprints</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Experience Journey
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base leading-relaxed">
            The technical career roadmap representing corporate contributions, rapid full-stack pivots, and engineering milestones.
          </p>
        </div>

        {/* Chronological Roadmap Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central vertical glowing cable line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-cyber-cyan via-cyber-purple to-cyber-blue opacity-30" />

          <div className="space-y-16">
            {EXPERIENCE_DATA.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row items-stretch ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Glowing Node Marker on central line */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-6 w-5 h-5 rounded-full bg-dark-bg border-2 border-cyber-cyan shadow-[0_0_12px_rgba(0,245,255,0.8)] z-10 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-purple animate-ping" />
                  </div>

                  {/* Left Column (Relative space spacing on large screen) */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Glassmorphic Experience Card */}
                  <div className="w-full md:w-1/2 pl-10 md:pl-0 md:px-8">
                    <div className="glass-panel hover:border-cyber-cyan/35 transition-all duration-500 rounded-2xl p-6 sm:p-8 relative overflow-hidden group">
                      
                      {/* Interactive subtle corner ambient lighting */}
                      <div className="absolute -top-16 -right-16 w-32 h-32 bg-cyber-cyan/5 rounded-full blur-2xl group-hover:bg-cyber-cyan/15 transition-all duration-700 pointer-events-none" />

                      {/* Header Specs */}
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-mono text-xs text-cyber-cyan font-bold bg-cyber-cyan/10 px-3 py-1 rounded-md border border-cyber-cyan/15">
                            {exp.period}
                          </span>
                          
                          <div className="flex items-center space-x-1 text-gray-500 font-mono text-[11px]">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{exp.location}</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-wide group-hover:text-cyber-cyan transition-colors duration-300">
                            {exp.role}
                          </h3>
                          <p className="font-mono text-xs text-cyber-purple uppercase tracking-wider font-semibold">
                            {exp.company}
                          </p>
                        </div>

                        {/* Bullet achievements description */}
                        <ul className="space-y-3.5 pt-2">
                          {exp.description.map((desc, dIdx) => (
                            <li key={dIdx} className="flex items-start text-xs sm:text-sm text-gray-400 leading-relaxed">
                              <span className="text-cyber-cyan mr-3 font-mono shrink-0 mt-0.5">▪</span>
                              <span>{desc}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Visual Highlight card */}
                        <div className="flex items-start space-x-2.5 bg-cyber-purple/5 border border-cyber-purple/10 rounded-xl p-4 mt-4">
                          <Star className="w-4 h-4 text-cyber-purple mt-0.5 shrink-0 fill-cyber-purple/30" />
                          <p className="text-xs text-gray-400 font-sans italic leading-relaxed">
                            <strong className="text-white font-semibold not-italic">Major Impact:</strong> {exp.highlight}
                          </p>
                        </div>

                        {/* Sub technology chips */}
                        <div className="pt-4 border-t border-white/5 space-y-2">
                          <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block">
                            Deployed Vessels
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.skills.map((skill) => (
                              <span
                                key={skill}
                                className="font-mono text-[9px] px-2.5 py-1 bg-white/5 border border-white/5 text-gray-400 rounded-md hover:border-cyber-cyan/30 transition-colors"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
