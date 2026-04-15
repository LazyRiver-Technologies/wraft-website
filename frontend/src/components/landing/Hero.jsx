import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { value: "₹0.50", label: "Per message" },
  { value: "10x", label: "Cheaper than competitors" },
  { value: "10min", label: "Setup time" },
];

/* ── Animated product flow demo ── */
const flowSteps = [
  {
    id: "upload",
    label: "Upload",
    screen: "upload",
  },
  {
    id: "train",
    label: "AI Trains",
    screen: "train",
  },
  {
    id: "chat",
    label: "Customer Chats",
    screen: "chat",
  },
];

function UploadScreen() {
  const files = [
    { name: "clinic_services.pdf", size: "2.4 MB", done: true },
    { name: "appointment_slots.xlsx", size: "890 KB", done: true },
    { name: "https://myclinic.com", size: "Website", done: true },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">Knowledge Base</span>
        <span className="text-[10px] bg-[#25D366]/10 text-[#25D366] font-bold px-2 py-0.5 rounded-full">3 sources</span>
      </div>
      {files.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.4 }}
          className="flex items-center gap-3 bg-[#F4F4F5] rounded-lg px-3 py-2.5"
        >
          <div className="w-7 h-7 rounded bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2.5" strokeLinecap="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14,2 14,8 20,8" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-[#0A0A0A] truncate">{f.name}</p>
            <p className="text-[9px] text-[#52525B]">{f.size}</p>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 + i * 0.4 }}
          >
            <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

function TrainScreen() {
  return (
    <div className="space-y-4">
      <div className="text-center mb-3">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-2"
        >
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2"
          >
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </motion.svg>
        </motion.div>
        <p className="text-[11px] font-bold text-[#0A0A0A]">Training your agent...</p>
      </div>
      <div className="space-y-2">
        {["Extracting text from documents", "Building knowledge graph", "Optimizing for Kannada & Hindi", "Agent ready!"].map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.6 }}
            className="flex items-center gap-2"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + i * 0.6 }}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${i === 3 ? "text-[#25D366]" : "text-[#25D366]/60"}`} />
            </motion.div>
            <span className={`text-[11px] ${i === 3 ? "font-bold text-[#25D366]" : "text-[#52525B]"}`}>{step}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 2.8, ease: "easeOut" }}
        className="h-1.5 bg-[#25D366] rounded-full"
      />
    </div>
  );
}

function ChatScreen() {
  const messages = [
    { type: "user", text: "ನಮಸ್ಕಾರ, ಇಂದು ಡಾಕ್ಟರ್ available ಇದ್ದಾರಾ?", delay: 0.3 },
    { type: "bot", text: "ನಮಸ್ಕಾರ! Dr. Sharma ಇಂದು 2-6 PM available. Appointment book ಮಾಡಲೇ?", delay: 1.2 },
    { type: "user", text: "हां, 3 बजे book करो", delay: 2.2 },
    { type: "bot", text: "Done! 3:00 PM confirmed. SMS sent.", delay: 3.2 },
  ];
  return (
    <div>
      <div className="flex items-center gap-2 mb-3 bg-[#075E54] rounded-t-lg px-3 py-2">
        <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center">
          <span className="text-white text-[8px] font-bold">W</span>
        </div>
        <div>
          <p className="text-white text-[10px] font-semibold">City Clinic AI</p>
          <p className="text-white/60 text-[8px]">Powered by Wraft</p>
        </div>
      </div>
      <div className="bg-[#ECE5DD] rounded-b-lg px-3 py-3 space-y-2 min-h-[140px]">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: msg.delay, duration: 0.3 }}
            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[85%] px-2.5 py-1.5 rounded-lg text-[10px] leading-relaxed ${
              msg.type === "user" ? "bg-[#DCF8C6] rounded-tr-none" : "bg-white rounded-tl-none"
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProductDemo() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[380px]">
      <div className="rounded-2xl bg-white border border-[#E4E4E7] shadow-2xl shadow-black/8 overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-[#E4E4E7]">
          {flowSteps.map((step, i) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(i)}
              className={`flex-1 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                activeStep === i
                  ? "text-[#25D366] border-b-2 border-[#25D366] bg-[#25D366]/5"
                  : "text-[#52525B]/50 hover:text-[#52525B]"
              }`}
            >
              <span className="mr-1 text-[9px]">{String(i + 1).padStart(2, "0")}</span>
              {step.label}
            </button>
          ))}
        </div>
        {/* Content */}
        <div className="p-4 min-h-[220px]">
          <AnimatePresence mode="wait">
            {activeStep === 0 && (
              <motion.div key="upload" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <UploadScreen />
              </motion.div>
            )}
            {activeStep === 1 && (
              <motion.div key="train" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <TrainScreen />
              </motion.div>
            )}
            {activeStep === 2 && (
              <motion.div key="chat" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <ChatScreen />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Progress bar */}
        <div className="flex gap-1 px-4 pb-3">
          {flowSteps.map((_, i) => (
            <div key={i} className="flex-1 h-1 rounded-full bg-[#E4E4E7] overflow-hidden">
              <motion.div
                className="h-full bg-[#25D366] rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: activeStep === i ? "100%" : activeStep > i ? "100%" : "0%" }}
                transition={{ duration: activeStep === i ? 4 : 0.3 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Floating badges */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-3 -right-3 bg-white rounded-xl px-3 py-2 shadow-lg border border-[#E4E4E7] z-10"
      >
        <p className="text-[10px] font-bold text-[#25D366]">Gemini 2.5 Flash</p>
        <p className="text-[8px] text-[#52525B]">Powered by Google AI</p>
      </motion.div>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -bottom-3 -left-3 bg-[#0A0A0A] rounded-xl px-3 py-2 shadow-lg z-10"
      >
        <p className="text-[10px] font-bold text-[#25D366]">10+ Languages</p>
        <p className="text-[8px] text-white/50">Kannada, Hindi, Tamil...</p>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section data-testid="hero-section" className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#25D366]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#B5C9B3]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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

            <h1
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tighter leading-[1.08] text-[#0A0A0A] mb-5"
              style={{ fontFamily: 'Bricolage Grotesque' }}
            >
              Turn WhatsApp into your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#25D366]">smartest employee</span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute bottom-1 left-0 h-3 bg-[#25D366]/15 -z-0"
                />
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#52525B] leading-relaxed mb-7 max-w-lg">
              Upload your docs. Your AI agent answers customers on WhatsApp in <strong className="text-[#0A0A0A]">Kannada, Hindi, or any language</strong> — books appointments, answers FAQs, and works 24/7. Setup takes 10 minutes. Costs start at <strong className="text-[#0A0A0A]">₹0</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <button
                data-testid="hero-cta-button"
                onClick={() => navigate("/dashboard")}
                className="group bg-[#25D366] hover:bg-[#1EAC52] text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#25D366]/25 flex items-center gap-2"
              >
                Start Free — 50 Messages
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#how-it-works"
                data-testid="hero-secondary-cta"
                className="group text-sm font-semibold text-[#0A0A0A] border border-[#E4E4E7] px-6 py-3.5 rounded-full hover:border-[#0A0A0A] transition-all duration-300 flex items-center gap-2"
              >
                <Play className="w-4 h-4 text-[#25D366]" />
                Watch How It Works
              </a>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-8">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xl font-extrabold text-[#0A0A0A] tracking-tight" style={{ fontFamily: 'Bricolage Grotesque' }}>{s.value}</span>
                  <span className="text-[11px] text-[#52525B]">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Product Demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex justify-center lg:justify-end"
          >
            <ProductDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
