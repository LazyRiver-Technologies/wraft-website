import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const chatMessages = [
  { type: "user", text: "ನಮಸ್ಕಾರ, ಡಾಕ್ಟರ್ ಇವತ್ತು available ಇದ್ದಾರಾ?", lang: "Kannada" },
  { type: "bot", text: "ನಮಸ್ಕಾರ! ಹೌದು, Dr. Sharma ಇಂದು ಮಧ್ಯಾಹ್ನ 2-6 ಗಂಟೆ available ಇದ್ದಾರೆ. ನಿಮಗೆ appointment book ಮಾಡಲೇ?", lang: "Kannada" },
  { type: "user", text: "हां, 3 बजे का appointment बुक करो", lang: "Hindi" },
  { type: "bot", text: "Done! Dr. Sharma ಜೊತೆ ಇಂದು 3:00 PM ಗೆ appointment confirm ಆಗಿದೆ. Confirmation SMS ಕಳಿಸಿದ್ದೇನೆ.", lang: "Multilingual" },
];

function ChatMockup() {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= chatMessages.length) {
      const timer = setTimeout(() => {
        setVisibleMessages([]);
        setCurrentIndex(0);
      }, 4000);
      return () => clearTimeout(timer);
    }

    const delay = currentIndex === 0 ? 1000 : chatMessages[currentIndex].type === "bot" ? 1800 : 1200;
    
    if (chatMessages[currentIndex].type === "bot") {
      setIsTyping(true);
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages((prev) => [...prev, chatMessages[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(typingTimer);
    }

    const timer = setTimeout(() => {
      setVisibleMessages((prev) => [...prev, chatMessages[currentIndex]]);
      setCurrentIndex((prev) => prev + 1);
    }, delay);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-[340px]">
      {/* Phone frame */}
      <div className="rounded-[2rem] bg-[#0A0A0A] p-2 shadow-2xl shadow-black/20">
        <div className="rounded-[1.6rem] bg-[#ECE5DD] overflow-hidden">
          {/* WhatsApp header */}
          <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center">
              <span className="text-white text-xs font-bold">W</span>
            </div>
            <div>
              <p className="text-white text-sm font-semibold">City Clinic AI</p>
              <p className="text-white/70 text-[10px]">online</p>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              <span className="text-[10px] text-white/60">Powered by Wraft</span>
            </div>
          </div>

          {/* Chat body */}
          <div className="px-3 py-4 space-y-2.5 min-h-[280px] max-h-[280px] overflow-hidden">
            {visibleMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-[13px] leading-relaxed shadow-sm ${
                    msg.type === "user"
                      ? "bg-[#DCF8C6] text-[#0A0A0A] rounded-tr-none"
                      : "bg-white text-[#0A0A0A] rounded-tl-none"
                  }`}
                >
                  {msg.text}
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[9px] text-[#52525B]/50">{msg.lang}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white px-4 py-3 rounded-lg rounded-tl-none shadow-sm flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#52525B]/40 typing-dot" />
                  <span className="w-2 h-2 rounded-full bg-[#52525B]/40 typing-dot" />
                  <span className="w-2 h-2 rounded-full bg-[#52525B]/40 typing-dot" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Input bar */}
          <div className="bg-[#F0F0F0] px-3 py-2 flex items-center gap-2">
            <div className="flex-1 bg-white rounded-full px-4 py-2 text-[11px] text-[#52525B]/50">
              Type a message...
            </div>
            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -right-4 bg-white rounded-xl px-3 py-2 shadow-lg border border-[#E4E4E7]"
      >
        <p className="text-[10px] font-bold text-[#25D366]">RAG Powered</p>
        <p className="text-[9px] text-[#52525B]">Answers from your docs</p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -bottom-2 -left-4 bg-white rounded-xl px-3 py-2 shadow-lg border border-[#E4E4E7]"
      >
        <p className="text-[10px] font-bold text-[#0A0A0A]">10+ Languages</p>
        <p className="text-[9px] text-[#52525B]">Kannada, Hindi, English...</p>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section data-testid="hero-section" className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#25D366]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#B5C9B3]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#25D366]/10 text-[#1EAC52] text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered WhatsApp Agent
            </motion.div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-[#0A0A0A] mb-6"
              style={{ fontFamily: 'Bricolage Grotesque' }}
            >
              Your business,{" "}
              <span className="relative">
                <span className="relative z-10">every language</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#25D366]/20 -z-0" />
              </span>
              <br />
              <span className="text-[#25D366]">one WhatsApp agent</span>
            </h1>

            <p className="text-base sm:text-lg text-[#52525B] leading-relaxed mb-8 max-w-lg">
              Set up an AI chatbot for your business in minutes. Customers chat in Kannada, Hindi, or any language
              &mdash; your agent answers from your documents, books appointments, and handles queries 24/7.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                data-testid="hero-cta-button"
                onClick={() => navigate("/dashboard")}
                className="group bg-[#25D366] hover:bg-[#1EAC52] text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#25D366]/25 flex items-center gap-2"
              >
                Start Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#how-it-works"
                data-testid="hero-secondary-cta"
                className="text-sm font-semibold text-[#0A0A0A] border border-[#E4E4E7] px-7 py-3.5 rounded-full hover:border-[#0A0A0A] transition-all duration-300 hover:-translate-y-0.5"
              >
                See How It Works
              </a>
            </div>

            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-[#E4E4E7]">
              <div>
                <p className="text-2xl font-bold text-[#0A0A0A]" style={{ fontFamily: 'Bricolage Grotesque' }}>24/7</p>
                <p className="text-xs text-[#52525B]">Always Available</p>
              </div>
              <div className="w-px h-10 bg-[#E4E4E7]" />
              <div>
                <p className="text-2xl font-bold text-[#0A0A0A]" style={{ fontFamily: 'Bricolage Grotesque' }}>Free</p>
                <p className="text-xs text-[#52525B]">Setup & Onboarding</p>
              </div>
              <div className="w-px h-10 bg-[#E4E4E7]" />
              <div>
                <p className="text-2xl font-bold text-[#0A0A0A]" style={{ fontFamily: 'Bricolage Grotesque' }}>10+</p>
                <p className="text-xs text-[#52525B]">Languages</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Chat Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <ChatMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
