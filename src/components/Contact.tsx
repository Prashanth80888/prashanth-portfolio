import { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Mail, User, BookOpen, MessageSquare, ShieldAlert, CheckCircle2, Sparkles, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";

interface ContactProps {
  onContactSubmitted: () => void;
}

export default function Contact({ onContactSubmitted }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError(null);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const triggerFancyConfetti = () => {
    // Custom explosive visual confetti sequence
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Confetti burst from side coordinates
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Simple validation triggers
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill out all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please supply a structurally valid email.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        triggerFancyConfetti();
        
        // Reset form
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        // Trigger live global stats reload in App
        onContactSubmitted();
      } else {
        setError(data.error || "An error occurred. Please try again.");
      }
    } catch (err: any) {
      console.error("Submission failed:", err);
      setError("Failed to establish server contact. Verify connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 w-full overflow-hidden">
      {/* Background visual neon orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 radial-cyan-glow opacity-25 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-cyber-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-[92%] max-w-7xl mx-auto z-10">
        
        {/* Section Heading */}
        <div className="mb-16 space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30">
            <Mail className="w-3.5 h-3.5 text-cyber-cyan" />
            <span className="font-mono text-[10px] tracking-widest text-cyber-cyan uppercase">Direct Link</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Initiate Contact
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base leading-relaxed">
            Whether for hiring proposals, innovative AI consultations, or technical collaborations, dispatch a secure signal.
          </p>
        </div>

        {/* TWO-COLUMN CONTACT DASHBOARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto items-stretch">
          
          {/* Left Column: Coordinates & Visual Indicators */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            
            <div className="space-y-6">
              <h3 className="font-display font-bold text-xl text-white tracking-wide">
                Connection Parameters
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Form inputs are routed through a secure Express pipeline, backed by rate limit checks and automated SMTP auto-responses.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-white/3 border border-white/5 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/15 flex items-center justify-center text-cyber-cyan shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="font-mono text-[9px] text-gray-500 block">SYSTEM_MAILBOX</span>
                  <a href="mailto:goudaprashant2204@gmail.com" className="text-white text-xs sm:text-sm font-mono truncate hover:text-cyber-cyan transition-colors">
                    goudaprashant2204@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-3 bg-white/3 border border-white/5 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-cyber-purple/10 border border-cyber-purple/15 flex items-center justify-center text-cyber-purple shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-gray-500 block">OPERATOR_LOC</span>
                  <span className="text-white text-xs sm:text-sm font-display font-medium">
                    Bengaluru, India [IST]
                  </span>
                </div>
              </div>
            </div>

            <div className="font-mono text-[9px] text-gray-600 border-t border-white/5 pt-4 flex justify-between uppercase">
              <span>PORT_INGRESS: HTTP_3000</span>
              <span>VER: SSL_SECURE</span>
            </div>
          </div>

          {/* Right Column: Premium Contact Form */}
          <div className="lg:col-span-8">
            <div className="glass-panel-neon border-white/10 rounded-3xl p-6 sm:p-10 relative overflow-hidden h-full">
              {/* Top lighting block */}
              <div className="absolute top-0 right-10 left-10 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/20 to-transparent" />

              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Error Box */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center space-x-3 text-red-400 font-mono text-xs"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name field */}
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder=" "
                          className="peer w-full bg-dark-bg/40 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-cyber-cyan hover:border-white/20 transition-colors placeholder-transparent"
                        />
                        <label className="absolute left-4 top-3.5 text-gray-500 text-xs sm:text-sm font-mono tracking-wider transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-[-9px] peer-focus:text-[10px] peer-focus:text-cyber-cyan peer-focus:bg-dark-bg peer-focus:px-2 peer-valid:top-[-9px] peer-valid:text-[10px] peer-valid:text-cyber-cyan peer-valid:bg-dark-bg peer-valid:px-2">
                          OPERATOR_NAME *
                        </label>
                      </div>

                      {/* Email field */}
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder=" "
                          className="peer w-full bg-dark-bg/40 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-cyber-cyan hover:border-white/20 transition-colors placeholder-transparent"
                        />
                        <label className="absolute left-4 top-3.5 text-gray-500 text-xs sm:text-sm font-mono tracking-wider transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-[-9px] peer-focus:text-[10px] peer-focus:text-cyber-cyan peer-focus:bg-dark-bg peer-focus:px-2 peer-valid:top-[-9px] peer-valid:text-[10px] peer-valid:text-cyber-cyan peer-valid:bg-dark-bg peer-valid:px-2">
                          CORRESPOND_EMAIL *
                        </label>
                      </div>
                    </div>

                    {/* Subject field */}
                    <div className="relative">
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full bg-dark-bg/40 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-cyber-cyan hover:border-white/20 transition-colors placeholder-transparent"
                      />
                      <label className="absolute left-4 top-3.5 text-gray-500 text-xs sm:text-sm font-mono tracking-wider transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-[-9px] peer-focus:text-[10px] peer-focus:text-cyber-cyan peer-focus:bg-dark-bg peer-focus:px-2 peer-valid:top-[-9px] peer-valid:text-[10px] peer-valid:text-cyber-cyan peer-valid:bg-dark-bg peer-valid:px-2">
                        SIGNAL_SUBJECT
                      </label>
                    </div>

                    {/* Message textarea */}
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder=" "
                        className="peer w-full bg-dark-bg/40 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-cyber-cyan hover:border-white/20 transition-colors placeholder-transparent resize-none"
                      />
                      <label className="absolute left-4 top-3.5 text-gray-500 text-xs sm:text-sm font-mono tracking-wider transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-[-9px] peer-focus:text-[10px] peer-focus:text-cyber-cyan peer-focus:bg-dark-bg peer-focus:px-2 peer-valid:top-[-9px] peer-valid:text-[10px] peer-valid:text-cyber-cyan peer-valid:bg-dark-bg peer-valid:px-2">
                        TRANSMISSION_PAYLOAD *
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-purple hover:opacity-95 text-dark-bg font-mono font-bold text-xs tracking-widest uppercase rounded-xl shadow-[0_0_15px_rgba(0,245,255,0.15)] hover:shadow-[0_0_30px_rgba(0,245,255,0.35)] transition-all duration-300 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <div className="w-4.5 h-4.5 border-2 border-dark-bg border-t-transparent rounded-full animate-spin" />
                          <span>BROADCASTING DATA...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>DISPATCH SECURE BEACON</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-container"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12 space-y-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan relative">
                      <div className="absolute inset-0 rounded-full border-2 border-cyber-cyan animate-ping opacity-25" />
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                        TRANSMISSION LOGGED
                      </h3>
                      <p className="max-w-md text-gray-400 text-xs sm:text-sm font-sans leading-relaxed">
                        Your message vector is securely logged. The automated auto-reply confirmation has been triggered. Prashanth will analyze your data coordinates shortly.
                      </p>
                    </div>

                    <div className="w-full max-w-sm bg-dark-bg border border-white/5 rounded-xl p-4 font-mono text-[11px] text-gray-500">
                      SEC_TRANS_ID: {Math.random().toString(36).substring(2, 11).toUpperCase()}
                    </div>

                    <button
                      onClick={() => setSuccess(false)}
                      className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-mono text-xs tracking-widest uppercase rounded-xl border border-white/10 transition-colors"
                    >
                      SEND ANOTHER BEACON
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
