import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Github, Linkedin, MessageSquare } from "lucide-react";

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Check if scrolled
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home", id: "home" },
    { label: "Timeline", href: "#timeline", id: "timeline" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Achievements", href: "#achievements", id: "achievements" },
    { label: "Vault", href: "#vault", id: "vault" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-blue z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-40 transition-all duration-300 rounded-full glass-panel ${
          isScrolled
            ? "shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-white/15 py-3"
            : "border-white/5 py-4"
        }`}
      >
        <div className="px-6 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-gradient-to-tr from-cyber-cyan to-cyber-purple rounded-lg flex items-center justify-center font-bold text-xs shadow-lg shadow-cyber-cyan/20 group-hover:scale-105 transition-transform duration-300 text-dark-bg">
              PG
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-tighter uppercase opacity-80 font-sans">
              Portfolio 2026
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`relative px-4 py-2 font-sans text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-300 ${
                    isActive ? "text-cyber-cyan" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-cyber-cyan rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions / Socials */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="https://github.com/Prashanth80888"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-cyber-cyan transition-all duration-300 hover:scale-110"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/prashanth2204/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-cyber-purple transition-all duration-300 hover:scale-110"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-cyber-cyan hover:text-dark-bg transition-all duration-300"
            >
              Available for Projects
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-gray-400 hover:text-cyber-cyan focus:outline-none transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-20 z-40 lg:hidden glass-panel-neon border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col space-y-4"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl font-mono text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-between ${
                      isActive
                        ? "bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/10 text-cyber-cyan border-l-2 border-cyber-cyan"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] font-semibold text-gray-600">
                      /{item.id.substring(0, 3)}
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-cyber-cyan transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  https://www.linkedin.com/in/prashanth2204/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-cyber-purple transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-1 px-4 py-2.5 bg-gradient-to-r from-cyber-cyan to-cyber-purple text-dark-bg font-mono text-xs tracking-widest uppercase rounded-xl font-bold transition-all duration-300"
              >
                <span>Connect</span>
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
