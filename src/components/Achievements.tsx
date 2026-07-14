import { useEffect, useState } from "react";
import { Award, Trophy, Code, Flame, Star, ShieldAlert, Sparkles, BookOpen } from "lucide-react";
import { ACHIEVEMENTS_DATA } from "../data";

// Custom count-up state hook helper for numerical values to create an expensive looking animation
function useCountUp(target: number, durationMs: number = 2000, trigger: boolean = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, durationMs, trigger]);

  return count;
}

export default function Achievements() {
  const [triggerCount, setTriggerCount] = useState(false);

  useEffect(() => {
    // Simple mock viewport threshold trigger (triggers counts shortly after mounting)
    const t = setTimeout(() => setTriggerCount(true), 500);
    return () => clearTimeout(t);
  }, []);

  // Numbers for competitive trackers
  const leetCodeCount = useCountUp(426, 2500, triggerCount);
  const codeChefRating = useCountUp(1648, 2500, triggerCount);
  const totalHackathons = useCountUp(18, 2000, triggerCount);
  const commitsTotal = useCountUp(1240, 3000, triggerCount);

  return (
    <section id="achievements" className="relative py-24 w-full overflow-hidden">
      {/* Background neon blur spot */}
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-[92%] max-w-7xl mx-auto z-10">
        
        {/* Section Heading */}
        <div className="mb-16 space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30">
            <Trophy className="w-3.5 h-3.5 text-cyber-cyan" />
            <span className="font-mono text-[10px] tracking-widest text-cyber-cyan uppercase">Accolades & Metrics</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Honors & Achievements
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base leading-relaxed">
            Quantifying academic and competitive accomplishments, platform ratings, and verified credentials.
          </p>
        </div>

        {/* 1. COMPETTIVE CODING COUNTERS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto mb-16">
          
          <div className="glass-panel border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-cyber-cyan/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 text-orange-400">
              <Code className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-wide">
              {leetCodeCount}+
            </span>
            <span className="font-mono text-[10px] text-gray-500 mt-1 uppercase tracking-widest">
              LeetCode Solved
            </span>
            <div className="text-[9px] font-mono text-orange-400/80 mt-1 bg-orange-500/5 border border-orange-500/10 px-2 py-0.5 rounded">
              TOP 12% GLOBALLY
            </div>
          </div>

          <div className="glass-panel border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-cyber-purple/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-cyber-purple/10 border border-cyber-purple/20 flex items-center justify-center mb-4 text-cyber-purple">
              <Flame className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-wide">
              {codeChefRating}
            </span>
            <span className="font-mono text-[10px] text-gray-500 mt-1 uppercase tracking-widest">
              CodeChef Max
            </span>
            <div className="text-[9px] font-mono text-cyber-purple/80 mt-1 bg-cyber-purple/5 border border-cyber-purple/10 px-2 py-0.5 rounded">
              3-STAR RATING
            </div>
          </div>

          <div className="glass-panel border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-cyber-cyan/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center mb-4 text-cyber-cyan">
              <Trophy className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-wide">
              {totalHackathons}
            </span>
            <span className="font-mono text-[10px] text-gray-500 mt-1 uppercase tracking-widest">
              Hacking Arenas
            </span>
            <div className="text-[9px] font-mono text-cyber-cyan/80 mt-1 bg-cyber-cyan/5 border border-cyber-cyan/10 px-2 py-0.5 rounded">
              STATE WINNERS
            </div>
          </div>

          <div className="glass-panel border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-cyber-teal/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-cyber-teal/10 border border-cyber-teal/20 flex items-center justify-center mb-4 text-cyber-teal">
              <Star className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-wide">
              {commitsTotal}+
            </span>
            <span className="font-mono text-[10px] text-gray-500 mt-1 uppercase tracking-widest">
              GitHub Commits
            </span>
            <div className="text-[9px] font-mono text-cyber-teal/80 mt-1 bg-cyber-teal/5 border border-cyber-teal/10 px-2 py-0.5 rounded">
              ACTIVE DEV CORE
            </div>
          </div>

        </div>

        {/* 2. CHRONOLOGICAL LIST OF HONORS (BENTO GRID STYLE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {ACHIEVEMENTS_DATA.map((ach) => (
            <div
              key={ach.id}
              className="glass-panel border-white/5 hover:border-cyber-cyan/25 transition-all duration-300 rounded-2xl p-6 flex items-start space-x-5 relative overflow-hidden group"
            >
              {/* Visual glass reflection details */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />

              {/* Icon container */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                ach.category === "hackathon"
                  ? "bg-cyber-cyan/10 border-cyber-cyan/20 text-cyber-cyan"
                  : ach.category === "certificate"
                  ? "bg-cyber-purple/10 border-cyber-purple/20 text-cyber-purple"
                  : "bg-gray-800 border-white/5 text-gray-400"
              }`}>
                {ach.category === "hackathon" ? (
                  <Trophy className="w-5 h-5" />
                ) : ach.category === "certificate" ? (
                  <Award className="w-5 h-5" />
                ) : (
                  <Code className="w-5 h-5" />
                )}
              </div>

              {/* Meta details text */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                    {ach.issuer} • {ach.date}
                  </span>
                  
                  {ach.metric && (
                    <span className="font-mono text-[9px] text-cyber-cyan bg-cyber-cyan/10 px-2 py-0.5 rounded border border-cyber-cyan/15">
                      {ach.metric}
                    </span>
                  )}
                </div>

                <h3 className="font-display font-bold text-base md:text-lg text-white group-hover:text-cyber-cyan transition-colors duration-300">
                  {ach.title}
                </h3>

                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {ach.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
