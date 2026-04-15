import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, CheckCircle2, FileText, Globe, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { value: "₹0.50", label: "Per message" },
  { value: "10x", label: "Cheaper than competitors" },
  { value: "10min", label: "Setup time" },
];

/* ── Full-screen animated product demo ── */
const flowSteps = [
  { id: "upload", label: "Upload Data" },
  { id: "train", label: "AI Learns" },
  { id: "chat", label: "Customer Chats" },
];

function UploadScreen() {
  const files = [
    { name: "clinic_services.pdf", size: "2.4 MB", icon: "pdf" },
    { name: "appointment_timings.xlsx", size: "890 KB", icon: "xls" },
    { name: "https://myclinic.com", size: "Website URL", icon: "url" },
    { name: "faq_responses.txt", size: "12 KB", icon: "txt" },
  ];
  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold text-[#0A0A0A]">Knowledge Base</h4>
          <p className="text-[11px] text-[#52525B]">Upload anything — PDFs, URLs, text</p>
        </div>
        <span className="text-[10px] bg-[#25D366]/10 text-[#25D366] font-bold px-2.5 py-1 rounded-full">4 sources</span>
      </div>
      <div className="space-y-2.5">
        {files.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.35 }}
            className="flex items-center gap-3 bg-[#F4F4F5] rounded-xl px-4 py-3"
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${f.icon === "url" ? "bg-blue-50" : f.icon === "pdf" ? "bg-red-50" : "bg-[#25D366]/10"}`}>
              {f.icon === "pdf" && <FileText className="w-4 h-4 text-red-500" />}
              {f.icon === "xls" && <FileText className="w-4 h-4 text-[#25D366]" />}
              {f.icon === "url" && <Globe className="w-4 h-4 text-blue-500" />}
              {f.icon === "txt" && <FileText className="w-4 h-4 text-[#52525B]" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#0A0A0A] truncate">{f.name}</p>
              <p className="text-[10px] text-[#52525B]">{f.size}</p>
            </div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 + i * 0.35 }}>
              <CheckCircle2 className="w-5 h-5 text-[#25D366]" />
            </motion.div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mt-4 bg-[#25D366]/5 border border-[#25D366]/20 rounded-xl px-4 py-3 flex items-center gap-2"
      >
        <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
        <span className="text-xs font-semibold text-[#25D366]">All sources processed — Ready to train</span>
      </motion.div>
    </div>
  );
}

function TrainScreen() {
  const items = [
    { text: "Extracting text from 4 documents...", delay: 0.3 },
    { text: "Building knowledge graph (236 entries)", delay: 0.9 },
    { text: "Optimizing for Kannada, Hindi, English", delay: 1.5 },
    { text: "Testing response accuracy...", delay: 2.1 },
    { text: "Agent ready — 98.5% accuracy", delay: 2.7, highlight: true },
  ];
  return (
    <div className="p-5 sm:p-6">
      <div className="text-center mb-5">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-3"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        </motion.div>
        <p className="text-sm font-bold text-[#0A0A0A]">Gemini 2.5 Flash is learning...</p>
        <p className="text-[11px] text-[#52525B] mt-0.5">This usually takes under 30 seconds</p>
      </div>
      <div className="space-y-3 mb-5">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: item.delay }}
            className="flex items-center gap-3"
          >
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: item.delay + 0.3 }}>
              <CheckCircle2 className={`w-4 h-4 ${item.highlight ? "text-[#25D366]" : "text-[#25D366]/50"}`} />
            </motion.div>
            <span className={`text-xs ${item.highlight ? "font-bold text-[#25D366]" : "text-[#52525B]"}`}>{item.text}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 3.2, ease: "easeOut" }}
        className="h-2 bg-[#25D366] rounded-full"
      />
      <div className="flex justify-between mt-2">
        <span className="text-[10px] text-[#52525B]">Training...</span>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} className="text-[10px] font-bold text-[#25D366]">Complete!</motion.span>
      </div>
    </div>
  );
}

function ChatScreen() {
  const messages = [
    { from: "user", text: "ನಮಸ್ಕಾರ, Dr. Sharma ಇವತ್ತು available ಇದ್ದಾರಾ?", delay: 0.3, lang: "Kannada" },
    { from: "bot", text: "ನಮಸ್ಕಾರ! ಹೌದು, Dr. Sharma ಇಂದು 2 PM - 6 PM available ಇದ್ದಾರೆ. 3 slots open. Appointment book ಮಾಡಲೇ?", delay: 1.2, lang: "Kannada" },
    { from: "user", text: "हां, 3 बजे का appointment बुक करो", delay: 2.4, lang: "Hindi" },
    { from: "bot", text: "Done! ✓ Dr. Sharma, 3:00 PM, today. Confirmation SMS sent to your number. Anything else?", delay: 3.4, lang: "Multilingual" },
  ];
  return (
    <div>
      <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center">
          <span className="text-white text-xs font-bold">W</span>
        </div>
        <div className="flex-1">
          <p className="text-white text-sm font-semibold">City Clinic AI</p>
          <p className="text-white/60 text-[10px]">Powered by Wraft</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span className="text-[10px] text-white/40">online</span>
        </div>
      </div>
      <div className="bg-[#ECE5DD] px-4 py-4 space-y-3 min-h-[220px]">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: m.delay, duration: 0.3 }}
            className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[85%] px-3 py-2.5 rounded-xl text-[12px] leading-relaxed shadow-sm ${
              m.from === "user" ? "bg-[#DCF8C6] rounded-tr-none" : "bg-white rounded-tl-none"
            }`}>
              {m.text}
              <p className={`text-[9px] mt-1 ${m.from === "user" ? "text-[#52525B]/40 text-right" : "text-[#52525B]/40"}`}>{m.lang}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="bg-[#F0F0F0] px-3 py-2.5 flex items-center gap-2">
        <div className="flex-1 bg-white rounded-full px-4 py-2.5 text-xs text-[#52525B]/40">Type a message...</div>
        <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
        </div>
      </div>
    </div>
  );
}

function ProductDemo() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const durations = [3500, 4000, 5000];
    const timer = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, durations[activeStep]);
    return () => clearTimeout(timer);
  }, [activeStep]);

  return (
    <div className="relative w-full max-w-[480px]">
      <div className="rounded-2xl bg-white border border-[#E4E4E7] shadow-2xl shadow-black/10 overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-[#E4E4E7] bg-[#FAFAFA]">
          {flowSteps.map((step, i) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(i)}
              className={`flex-1 py-3 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 relative ${
                activeStep === i ? "text-[#25D366]" : "text-[#52525B]/40 hover:text-[#52525B]"
              }`}
            >
              <span className="mr-1 text-[10px] opacity-50">{String(i + 1).padStart(2, "0")}</span>
              {step.label}
              {activeStep === i && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#25D366]" />}
            </button>
          ))}
        </div>
        {/* Content */}
        <div className="min-h-[320px]">
          <AnimatePresence mode="wait">
            {activeStep === 0 && <motion.div key="u" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}><UploadScreen /></motion.div>}
            {activeStep === 1 && <motion.div key="t" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}><TrainScreen /></motion.div>}
            {activeStep === 2 && <motion.div key="c" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}><ChatScreen /></motion.div>}
          </AnimatePresence>
        </div>
        {/* Progress dots */}
        <div className="flex gap-1.5 px-5 pb-4">
          {flowSteps.map((_, i) => (
            <div key={i} className="flex-1 h-1 rounded-full bg-[#E4E4E7] overflow-hidden">
              <motion.div
                className="h-full bg-[#25D366] rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: activeStep === i ? "100%" : activeStep > i ? "100%" : "0%" }}
                transition={{ duration: activeStep === i ? [3.5, 4, 5][i] / 1000 : 0.3 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Floating badges */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -right-4 bg-white rounded-xl px-3.5 py-2.5 shadow-xl border border-[#E4E4E7] z-10"
      >
        <p className="text-[11px] font-bold text-[#0A0A0A]">Gemini 2.5 Flash</p>
        <p className="text-[9px] text-[#52525B]">Powered by Google AI</p>
      </motion.div>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -bottom-4 -left-4 bg-[#0A0A0A] rounded-xl px-3.5 py-2.5 shadow-xl z-10"
      >
        <p className="text-[11px] font-bold text-[#25D366]">10+ Languages</p>
        <p className="text-[9px] text-white/40">Kannada, Hindi, Tamil...</p>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section data-testid="hero-section" className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#25D366]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#B5C9B3]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white text-[11px] font-bold px-4 py-1.5 rounded-full mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              Most affordable AI WhatsApp agent in India
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tighter leading-[1.08] text-[#0A0A0A] mb-5" style={{ fontFamily: 'Bricolage Grotesque' }}>
              Turn WhatsApp into your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#25D366]">smartest employee</span>
                <motion.span initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 0.5, duration: 0.6 }} className="absolute bottom-1 left-0 h-3 bg-[#25D366]/15 -z-0" />
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#52525B] leading-relaxed mb-7 max-w-lg">
              Upload your docs. Your AI agent answers customers on WhatsApp in <strong className="text-[#0A0A0A]">Kannada, Hindi, or any language</strong> — books appointments, answers FAQs, and works 24/7. Setup takes 10 minutes.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <button
                data-testid="hero-cta-button"
                onClick={() => navigate("/register")}
                className="group bg-[#25D366] hover:bg-[#1EAC52] text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#25D366]/25 flex items-center gap-2"
              >
                Start Free — 50 Messages
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#try-it"
                data-testid="hero-secondary-cta"
                className="group text-sm font-semibold text-[#0A0A0A] border border-[#E4E4E7] px-6 py-3.5 rounded-full hover:border-[#0A0A0A] transition-all duration-300 flex items-center gap-2"
              >
                <Play className="w-4 h-4 text-[#25D366]" />
                Try It Live
              </a>
            </div>

            <div className="flex items-center gap-8">
              {stats.map((s, i) => (
                <div key={i}>
                  <span className="text-xl font-extrabold text-[#0A0A0A] tracking-tight" style={{ fontFamily: 'Bricolage Grotesque' }}>{s.value}</span>
                  <span className="block text-[11px] text-[#52525B]">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Bigger Product Demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <ProductDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
