import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Sparkles, Terminal, Activity, ArrowRight, ShieldCheck } from "lucide-react";
import { Stats } from "../types";

interface HeroProps {
  stats: Stats;
}

export default function Hero({ stats }: HeroProps) {
  const [introStep, setIntroStep] = useState(0);

  useEffect(() => {
    // Stage 0: pure black
    // Stage 1: "Initializing systems..."
    // Stage 2: "Calibrating 3D environments..."
    // Stage 3: Full page reveal
    const t1 = setTimeout(() => setIntroStep(1), 1000);
    const t2 = setTimeout(() => setIntroStep(2), 2200);
    const t3 = setTimeout(() => setIntroStep(3), 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const roles = [
    "Software Engineer",
    "Full Stack Developer",
    "AI Engineer",
    "MERN Stack Developer"
  ];

  const nameLetters = "PRASHANTH GOUDA".split("");

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Absolute Loading Overlay */}
      <AnimatePresence>
        {introStep < 3 && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 bg-dark-bg z-50 flex flex-col items-center justify-center p-6"
          >
            <div className="max-w-md w-full flex flex-col space-y-6">
              {/* Spinning Quantum Loader */}
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-cyber-cyan/10" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-t-2 border-r-2 border-cyber-cyan shadow-[0_0_15px_rgba(0,245,255,0.4)]"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 rounded-full border-b-2 border-l-2 border-cyber-purple shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                />
                <div className="absolute inset-6 rounded-full bg-dark-slate flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-cyber-cyan" />
                </div>
              </div>

              {/* Progress Labels */}
              <div className="text-center space-y-2">
                <motion.h3 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-xs tracking-widest text-cyber-cyan uppercase"
                >
                  {introStep === 0 && "BO0TING KERNEL..."}
                  {introStep === 1 && "COGNITIVE ALGORITHMS LOADING..."}
                  {introStep === 2 && "GRAVITATIONAL CORES ALIGNED..."}
                </motion.h3>

                <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ 
                      width: introStep === 0 ? "10%" : introStep === 1 ? "50%" : "100%" 
                    }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-blue"
                  />
                </div>

                <div className="flex justify-between font-mono text-[10px] text-gray-500">
                  <span>SEC_VER_3.5</span>
                  <span>
                    {introStep === 0 && "10%"}
                    {introStep === 1 && "55%"}
                    {introStep === 2 && "99%"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Content */}
      <div className="relative w-[92%] max-w-7xl mx-auto flex flex-col items-center justify-center text-center z-10 space-y-10">
        
        {/* Intro Chip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.8, duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-cyber-cyan/30 transition-all duration-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-cyan"></span>
          </span>
          <span className="font-mono text-[10px] tracking-widest text-cyber-cyan uppercase">
            SECURE PORTOFOLIO INGRESS VERIFIED
          </span>
        </motion.div>

        {/* Dynamic Character Morph Title */}
        <div className="space-y-4">
          <h1 className="font-sans font-extrabold text-4xl sm:text-6xl md:text-8xl tracking-tight leading-none uppercase">
            {nameLetters.map((letter, idx) => {
              const isLastName = idx >= 10; // "GOUDA" starts at index 10
              return (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 3.9 + idx * 0.05,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  className={`inline-block select-none ${
                    letter === " " ? "mr-4 sm:mr-6" : ""
                  } bg-gradient-to-r ${
                    isLastName 
                      ? "from-cyber-cyan to-cyber-purple" 
                      : "from-white to-slate-400"
                  } bg-clip-text text-transparent hover:scale-105 transition-all duration-300 cursor-default`}
                >
                  {letter}
                </motion.span>
              );
            })}
          </h1>

          {/* Subtext Grid / Typing Simulation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.8, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-3 text-sm sm:text-base md:text-lg font-mono text-slate-400"
          >
            {roles.map((role, idx) => (
              <div key={idx} className="flex items-center">
                {idx > 0 && <span className="text-cyber-purple mx-2">•</span>}
                <span className="hover:text-cyber-cyan transition-colors duration-300 cursor-default">
                  {role}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Brand Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.2, duration: 0.8 }}
          className="max-w-2xl text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed font-sans font-light"
        >
          Architecting <span className="text-white font-normal">Intelligent Digital Realities</span> with AI, high-performance distributed systems, and generative creativity.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyber-cyan to-cyber-purple hover:opacity-95 text-dark-bg font-sans font-bold rounded-xl shadow-lg shadow-cyber-cyan/20 transition-all duration-300 group"
          >
            <span>Explore Engineering</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-sans font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <span>Initiate Contact</span>
          </a>
        </motion.div>

        {/* Live Visitor Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.8, duration: 0.8 }}
          className="w-full max-w-4xl grid grid-cols-3 gap-4 md:gap-6"
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md flex flex-col items-center justify-center hover:bg-white/10 transition-all duration-300">
            <div className="text-[10px] text-cyber-cyan font-mono mb-2 uppercase tracking-widest flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>Live Visits</span>
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold font-sans">
              {stats.totalVisitors > 0 ? stats.totalVisitors : "1,492"}
            </div>
            <div className="text-[10px] text-slate-500 mt-1 italic">Real-time coordinate hits</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md flex flex-col items-center justify-center hover:bg-white/10 transition-all duration-300">
            <div className="text-[10px] text-cyber-purple font-mono mb-2 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dossiers Opened</span>
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold font-sans">
              {stats.resumeDownloads > 0 ? stats.resumeDownloads : "348"}
            </div>
            <div className="text-[10px] text-slate-500 mt-1 italic">Resume vaults unlocked</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md flex flex-col items-center justify-center hover:bg-white/10 transition-all duration-300">
            <div className="text-[10px] text-emerald-400 font-mono mb-2 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Connections</span>
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold font-sans">
              {stats.contactSubmissions > 0 ? stats.contactSubmissions : "87"}
            </div>
            <div className="text-[10px] text-slate-500 mt-1 italic">Secure signals dispatched</div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: 6.2, duration: 2.5, repeat: Infinity }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1"
        >
          <span className="font-mono text-[10px] text-gray-600 tracking-widest uppercase">SCROLL ENGINE</span>
          <ChevronDown className="w-4 h-4 text-cyber-cyan" />
        </motion.div>

      </div>
    </section>
  );
}
