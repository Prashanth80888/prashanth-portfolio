import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [techIndex, setTechIndex] = useState(0);

  const keywords = [
    "COMPUTING...",
    "INTELLIGENT AGENTS...",
    "SYSTEM ARCHITECTURE...",
    "COMPUTER SCIENCE & DESIGN...",
    "MANDALA PATTERNS...",
    "ALGORITHMIC SYNTHESIS...",
    "CRAFTSMANSHIP..."
  ];

  useEffect(() => {
    // Increment progress counter
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600); // Hold briefly at 100%
          return 100;
        }
        // Accelerate near the end
        const step = prev > 75 ? Math.random() * 4 + 2 : Math.random() * 2 + 1;
        return Math.min(100, Math.round(prev + step));
      });
    }, 30);

    // Swap text keywords
    const textInterval = setInterval(() => {
      setTechIndex((prev) => (prev + 1) % keywords.length);
    }, 450);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      id="loader-root"
      className="fixed inset-0 bg-bg-dark z-50 flex flex-col justify-between p-8 md:p-16 noise-overlay animated-grid"
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 bg-accent-gold rounded-full animate-pulse" id="loader-dot" />
          <span className="font-mono text-xs tracking-[0.2em] text-text-muted">PRASHANTH GOUDA</span>
        </div>
        <span className="font-mono text-xs text-accent-gold tracking-widest">[ BE / CSD ]</span>
      </div>

      {/* Center Section: Big Typography progress */}
      <div className="my-auto max-w-4xl">
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-5xl md:text-8xl font-bold tracking-tight text-text-primary"
            id="loader-title"
          >
            SYSTEMS <span className="text-accent-gold">&</span> ART
          </motion.h1>
        </div>
        <div className="mt-4 h-10 overflow-hidden font-mono text-xs md:text-sm text-text-muted tracking-widest">
          <AnimatePresence mode="wait">
            <motion.div
              key={techIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {keywords[techIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Section: Progress bar and digits */}
      <div className="space-y-4">
        <div className="flex justify-between items-baseline font-mono">
          <span className="text-xs text-text-muted tracking-widest">INITIALIZING DIRECTORY</span>
          <span className="text-3xl md:text-6xl font-light text-accent-gold" id="loader-percent">
            {progress}%
          </span>
        </div>
        <div className="h-[2px] bg-white/5 w-full rounded-full overflow-hidden" id="loader-bar-track">
          <motion.div
            className="h-full bg-accent-gold rounded-full"
            id="loader-bar-fill"
            style={{ width: `${progress}%` }}
            layout
          />
        </div>
      </div>
    </motion.div>
  );
}
