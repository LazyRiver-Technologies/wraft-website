import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { Upload, Bot, Send, Headphones, CheckCircle2, ArrowRight, FileText, BarChart3, Globe } from "lucide-react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload your business data",
    subtitle: "PDFs, website URLs, price lists, FAQs — anything your customers ask about.",
  },
  {
    number: "02",
    icon: Bot,
    title: "AI learns everything in seconds",
    subtitle: "Gemini 2.5 Flash reads, understands context, and builds your agent's brain.",
  },
  {
    number: "03",
    icon: Send,
    title: "Customers chat on WhatsApp",
    subtitle: "In Kannada, Hindi, Tamil, or any language. Instant answers, 24/7, from your data.",
  },
  {
    number: "04",
    icon: Headphones,
    title: "We handle everything else",
    subtitle: "Free setup, free onboarding, 24/7 monitoring. You focus on your business.",
  },
];

function DemoWrapper({ children }) {
  return (
    <div className="w-full h-[480px] flex items-center justify-center">
      <div className="w-full max-w-[520px] h-[400px] flex flex-col">
        {children}
      </div>
    </div>
  );
}

function StepDemo({ stepIndex }) {
  if (stepIndex === 0) {
    const files = [
      { name: "clinic_menu.pdf", icon: FileText, iconColor: "text-red-500 bg-red-50", status: "Uploaded" },
      { name: "doctor_schedule.xlsx", icon: BarChart3, iconColor: "text-[#25D366] bg-[#25D366]/10", status: "Uploaded" },
      { name: "https://myclinic.com", icon: Globe, iconColor: "text-blue-500 bg-blue-50", status: "Crawled" },
    ];
    return (
      <DemoWrapper>
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-7 shadow-sm h-full flex flex-col justify-center">
          <div className="flex items-center justify-between mb-5">
            <span className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wider">Sources</span>
            <span className="text-xs font-bold text-[#25D366] bg-[#25D366]/10 px-3 py-1 rounded-full">3 added</span>
          </div>
          <div className="space-y-2.5">
            {files.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex items-center gap-4 bg-[#FAFAFA] rounded-xl px-5 py-3 border border-[#E4E4E7]/50"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${f.iconColor}`}>
                  <f.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-[#0A0A0A] flex-1 truncate">{f.name}</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.3 }}
                  className="text-[10px] font-bold text-[#25D366]"
                >{f.status}</motion.span>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-5 flex items-center gap-2.5 bg-[#25D366]/5 rounded-xl px-4 py-2.5"
          >
            <CheckCircle2 className="w-5 h-5 text-[#25D366]" />
            <span className="text-xs font-semibold text-[#25D366]">All sources processed successfully</span>
          </motion.div>
        </div>
      </DemoWrapper>
    );
  }

  if (stepIndex === 1) {
    return (
      <DemoWrapper>
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-7 shadow-sm h-full flex flex-col justify-center">
          <div className="text-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-3"
            >
              <Bot className="w-7 h-7 text-[#25D366]" />
            </motion.div>
            <p className="text-sm font-bold text-[#0A0A0A]">Training with Gemini 2.5 Flash</p>
          </div>
          <div className="space-y-3 mb-6">
            {["Parsed 147 FAQ entries", "Indexed 23 services", "Mapped 56 time slots", "Ready for 10+ languages"].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex items-center gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                <span className="text-sm text-[#52525B]">{item}</span>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="h-2 bg-[#25D366] rounded-full"
          />
        </div>
      </DemoWrapper>
    );
  }

  if (stepIndex === 2) {
    const msgs = [
      { from: "user", text: "ಡಾಕ್ಟರ್ ಯಾವಾಗ free ಇರ್ತಾರೆ?", delay: 0.3 },
      { from: "bot", text: "Dr. Sharma ಇವತ್ತು 2 PM - 6 PM free ಇದ್ದಾರೆ. 4 PM ಗೆ book ಮಾಡಲಾ?", delay: 1.0 },
      { from: "user", text: "हां 4 बजे ठीक है", delay: 1.8 },
      { from: "bot", text: "Booked! 4 PM confirmed. SMS sent to your number.", delay: 2.6 },
    ];
    return (
      <DemoWrapper>
        <div className="bg-white rounded-2xl border border-[#E4E4E7] overflow-hidden shadow-sm h-full flex flex-col">
          <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">W</span>
            </div>
            <span className="text-white text-sm font-semibold">City Clinic AI</span>
            <span className="ml-auto text-xs text-white/50">Wraft Agent</span>
          </div>
          <div className="bg-[#ECE5DD] p-4 space-y-3 flex-1 overflow-hidden">
            {msgs.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: m.delay, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm leading-relaxed shadow-sm ${
                  m.from === "user" ? "bg-[#DCF8C6] rounded-tr-none" : "bg-white rounded-tl-none"
                }`}>
                  {m.text}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </DemoWrapper>
    );
  }

  if (stepIndex === 3) {
    return (
      <DemoWrapper>
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-7 shadow-sm overflow-hidden relative h-full flex flex-col justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#25D366]/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#25D366]"></span>
              </div>
              <span className="text-sm font-bold text-[#0A0A0A] tracking-wider uppercase">Agent Status</span>
            </div>
            <span className="text-xs font-bold text-[#25D366] bg-[#25D366]/10 px-3 py-1 rounded-full">24/7 Active</span>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-xl border border-[#E4E4E7]/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0A0A0A]">Uptime</p>
                  <p className="text-xs text-[#52525B]">Last 30 days</p>
                </div>
              </div>
              <span className="text-lg font-bold text-[#25D366]">99.99%</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-xl border border-[#E4E4E7]/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0A0A0A]">Chats Handled</p>
                  <p className="text-xs text-[#52525B]">While you sleep</p>
                </div>
              </div>
              <span className="text-lg font-bold text-[#0A0A0A]">1,402</span>
            </div>
          </div>

          {/* Scrolling logs */}
          <div className="relative h-20 bg-[#0A0A0A] rounded-xl p-3 overflow-hidden border border-[#52525B]/20">
            <div className="absolute top-0 left-0 w-full h-5 bg-gradient-to-b from-[#0A0A0A] to-transparent z-10" />
            <div className="absolute bottom-0 left-0 w-full h-5 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10" />
            <motion.div
              animate={{ y: [0, -72] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="flex flex-col gap-2"
            >
              {[
                "03:14 AM — Auto-reply sent to +91 98***123",
                "03:15 AM — Appointment booked for 4 PM",
                "03:22 AM — FAQ answered: Return Policy",
                "03:45 AM — System health check: OK",
                "04:01 AM — Auto-reply sent to +91 88***442",
                "04:12 AM — Lead captured and saved to CRM",
              ].map((log, i) => (
                <div key={i} className="flex gap-2 text-xs font-mono">
                  <span className="text-[#25D366]">{"›"}</span>
                  <span className="text-[#A1A1AA]">{log}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </DemoWrapper>
    );
  }

  return null;
}

export default function HowItWorks() {
  const scrollContent = steps.map((step, index) => ({
    title: (
      <>
        <span className="block text-[10px] lg:text-xs font-bold tracking-[0.2em] mb-2 uppercase text-[#25D366]">
          STEP {step.number}
        </span>
        {step.title}
      </>
    ),
    description: step.subtitle,
    icon: step.icon,
    content: <StepDemo stepIndex={index} />
  }));

  return (
    <section id="how-it-works" data-testid="how-it-works-section" className="relative py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.2em] text-xs font-bold text-[#25D366] mb-4">How It Works</p>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-4"
            style={{ fontFamily: 'Bricolage Grotesque' }}
          >
            From zero to live in 10 minutes
          </h2>
          <p className="text-base sm:text-lg text-[#52525B] max-w-2xl mx-auto">
            No coding. No technical setup. Upload your data and your AI agent starts working instantly.
          </p>
        </motion.div>

        <StickyScroll content={scrollContent} />
      </div>

      {/* Themed Section Divider */}
      <div className="w-full border-t border-[#E4E4E7]/60 mt-16 lg:mt-24" />
    </section>
  );
}
