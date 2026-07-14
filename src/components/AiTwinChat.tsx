import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Sparkles, User, ShieldCheck } from "lucide-react";

interface ChatMessage {
  role: "user" | "ai";
  content: string;
  timestamp: string;
}

export default function AiTwinChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "ai",
      content: "Hi there! I am Prashanth Gouda's digital twin. Ask me anything about my software systems, academic background, or my design journey from Kannada medium to CS & Design engineering!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickPrompts = [
    "Tell me your story",
    "What is AutoBiz AI?",
    "Show me your tech stack",
    "What is NOCTUA?",
  ];

  // Scroll to bottom on updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          chatHistory: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      if (response.ok && data.text) {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: data.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        throw new Error(data.error || "Failed to fetch response");
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "I encountered a minor network latency issue connecting with Prashanth's neural node. Feel free to re-request, or reach out directly at goudaprashantcsd@gmail.com!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans" id="ai-chat-root">
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-accent-gold text-bg-dark flex items-center justify-center shadow-lg cursor-pointer hover:shadow-accent-gold/20 hover:shadow-2xl relative group overflow-hidden border border-gold-soft/30"
        id="chat-toggle-btn"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <X className="w-6 h-6" key="close-icon" />
          ) : (
            <div className="relative flex items-center justify-center" key="open-icons">
              <MessageSquare className="w-6 h-6" />
              <Sparkles className="w-3.5 h-3.5 absolute -top-1.5 -right-1.5 text-bg-dark animate-pulse" />
            </div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Floating Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="absolute bottom-18 right-0 w-[92vw] sm:w-[420px] h-[520px] rounded-2xl glass-panel shadow-2xl flex flex-col overflow-hidden border border-white/10 z-50"
            id="chat-panel"
          >
            {/* Panel Header */}
            <div className="p-4 bg-surface-elevated/80 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-accent-gold" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary tracking-wide">Prashanth's AI Twin</h3>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 bg-success-green rounded-full animate-ping" />
                    <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider">Gemini 3.5 Active</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-muted hover:text-text-primary transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" id="chat-messages-container">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                    msg.role === "user" 
                      ? "bg-white/5 border-white/10" 
                      : "bg-accent-gold/10 border-accent-gold/20"
                  }`}>
                    {msg.role === "user" ? (
                      <User className="w-3.5 h-3.5 text-text-muted" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div className={`max-w-[75%] rounded-xl p-3.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-white/5 text-text-primary border border-white/5"
                      : "bg-surface-elevated/40 text-text-secondary border border-white/5"
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    <span className="text-[9px] text-text-muted font-mono block mt-1.5 text-right uppercase">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-accent-gold animate-spin" />
                  </div>
                  <div className="bg-surface-elevated/40 rounded-xl p-3.5 text-sm text-text-muted border border-white/5">
                    <div className="flex space-x-1.5 items-center py-1">
                      <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts list (shown only when thread is short or quiet) */}
            <div className="px-4 py-2 border-t border-white/5 bg-surface/30">
              <span className="text-[10px] font-mono tracking-wider text-text-muted block mb-1.5 uppercase">Quick Prompts</span>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSend(prompt)}
                    className="text-[11px] bg-white/5 hover:bg-accent-gold/10 hover:text-accent-gold border border-white/5 hover:border-accent-gold/20 rounded-lg px-2.5 py-1 text-text-secondary transition-all cursor-pointer whitespace-nowrap"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Panel Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputMessage);
              }}
              className="p-3 bg-surface border-t border-white/5 flex gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me something..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-text-primary focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/30 transition-all font-sans"
                id="chat-input-text"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="w-9 h-9 bg-accent-gold text-bg-dark rounded-xl flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gold-soft transition-colors"
                id="chat-submit-btn"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
