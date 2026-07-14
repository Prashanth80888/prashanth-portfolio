import { Github, Linkedin, Mail, Instagram, ArrowUp, Cpu } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-transparent border-t border-white/10 overflow-hidden pt-16 pb-8">
      {/* Background visual twinkle stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-1 h-1 bg-white rounded-full opacity-30 animate-pulse" />
        <div
          className="absolute top-20 right-1/3 w-0.5 h-0.5 bg-white rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute bottom-10 left-1/2 w-1.5 h-1.5 bg-cyber-cyan/40 rounded-full opacity-20 animate-ping" />
      </div>

      <div className="relative w-[92%] max-w-7xl mx-auto z-10 flex flex-col items-center">
        {/* Bottom Core navigation nodes */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-white/5 pb-12 mb-12 text-center md:text-left">
          {/* Logo Brand */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-cyber-cyan to-cyber-purple rounded-lg flex items-center justify-center font-bold text-xs shadow-lg shadow-cyber-cyan/20 text-dark-bg">
                PG
              </div>

              <span className="font-sans font-bold text-sm tracking-tighter uppercase opacity-80 text-white">
                PRASHANTH GOUDA
              </span>
            </div>

            <p className="text-gray-500 text-xs max-w-xs leading-relaxed">
              Crafting scalable full-stack pipelines, intelligent agent schemas,
              and bespoke front-end experiences.
            </p>
          </div>

          {/* Social Profiles Grid */}
          <div className="flex flex-col items-center space-y-4">
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
              Social Coordinate Channels
            </span>

            <div className="flex space-x-4">
              {/* GitHub */}
              <a
                href="https://github.com/Prashanth80888"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/3 border border-white/5 hover:border-cyber-cyan text-gray-400 hover:text-cyber-cyan flex items-center justify-center transition-all duration-300 hover:scale-110"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/prashanth2204/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/3 border border-white/5 hover:border-cyber-purple text-gray-400 hover:text-cyber-purple flex items-center justify-center transition-all duration-300 hover:scale-110"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              {/* Email */}
              <a
                href="mailto:goudaprashanth2204@gmail.com"
                className="w-10 h-10 rounded-xl bg-white/3 border border-white/5 hover:border-cyber-cyan text-gray-400 hover:text-cyber-cyan flex items-center justify-center transition-all duration-300 hover:scale-110"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/3 border border-white/5 hover:border-pink-500 text-gray-400 hover:text-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Actions Scroll Top */}
          <div className="flex flex-col items-center md:items-end space-y-3">
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-white/3 border border-white/5 hover:border-cyber-cyan text-gray-400 hover:text-cyber-cyan flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 focus:outline-none"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>

            <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">
              RESET COORDINATES
            </span>
          </div>
        </div>

        {/* Legal copyright bar */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-gray-600">
          <div className="flex items-center space-x-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyber-cyan animate-pulse" />
            <span>© 2026 PRASHANTH GOUDA. ALL VECTORS CONTEXTUALIZED.</span>
          </div>

          <div className="flex space-x-4">
            <span className="hover:text-cyber-cyan cursor-default">
              LOC: Bengaluru, IN
            </span>
            <span>SYS_OK: 100%</span>
          </div>
        </div>
      </div>
    </footer>
  );
}