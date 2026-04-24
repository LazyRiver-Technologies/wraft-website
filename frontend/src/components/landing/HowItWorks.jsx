import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { Upload, Bot, Send, Headphones, CheckCircle2, ArrowRight, FileText, BarChart3, Globe } from "lucide-react";

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

function StepDemo({ stepIndex }) {
  if (stepIndex === 0) {
    const files = [
      { name: "clinic_menu.pdf", icon: FileText, iconColor: "text-red-500 bg-red-50", status: "Uploaded" },
      { name: "doctor_schedule.xlsx", icon: BarChart3, iconColor: "text-[#25D366] bg-[#25D366]/10", status: "Uploaded" },
      { name: "https://myclinic.com", icon: Globe, iconColor: "text-blue-500 bg-blue-50", status: "Crawled" },
    ];
    return (
      <div className="bg-white rounded-xl border border-[#E4E4E7] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">Sources</span>
          <span className="text-[10px] font-bold text-[#25D366] bg-[#25D366]/10 px-2 py-0.5 rounded-full">3 added</span>
        </div>
        <div className="space-y-2.5">
          {files.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.3 }}
              className="flex items-center gap-3 bg-[#FAFAFA] rounded-lg px-4 py-3 border border-[#E4E4E7]/50"
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${f.iconColor}`}>
                <f.icon className="w-4 h-4" />
              </div>
              <span className="text-[12px] font-medium text-[#0A0A0A] flex-1 truncate">{f.name}</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.3 }}
                className="text-[9px] font-bold text-[#25D366]"
              >{f.status}</motion.span>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-4 flex items-center gap-2 bg-[#25D366]/5 rounded-lg px-3 py-2"
        >
          <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
          <span className="text-[11px] font-semibold text-[#25D366]">All sources processed successfully</span>
        </motion.div>
      </div>
    );
  }

  if (stepIndex === 1) {
    return (
      <div className="bg-white rounded-xl border border-[#E4E4E7] p-5 shadow-sm">
        <div className="text-center mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-2"
          >
            <Bot className="w-5 h-5 text-[#25D366]" />
          </motion.div>
          <p className="text-[11px] font-bold text-[#0A0A0A]">Training with Gemini 2.5 Flash</p>
        </div>
        <div className="space-y-2 mb-4">
          {["Parsed 147 FAQ entries", "Indexed 23 services", "Mapped 56 time slots", "Ready for 10+ languages"].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.5 }}
              className="flex items-center gap-2"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
              <span className="text-[11px] text-[#52525B]">{item}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="h-1.5 bg-[#25D366] rounded-full"
        />
      </div>
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
      <div className="bg-white rounded-xl border border-[#E4E4E7] overflow-hidden shadow-sm">
        <div className="bg-[#075E54] px-3 py-2 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center">
            <span className="text-white text-[8px] font-bold">W</span>
          </div>
          <span className="text-white text-[10px] font-semibold">City Clinic AI</span>
          <span className="ml-auto text-[8px] text-white/50">Wraft Agent</span>
        </div>
        <div className="bg-[#ECE5DD] p-3 space-y-2 min-h-[160px]">
          {msgs.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: m.delay, duration: 0.25 }}
              className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] px-2.5 py-1.5 rounded-lg text-[10px] leading-relaxed shadow-sm ${
                m.from === "user" ? "bg-[#DCF8C6] rounded-tr-none" : "bg-white rounded-tl-none"
              }`}>
                {m.text}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }
}

import { StickyScroll } from "../ui/sticky-scroll-reveal";

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
    <section id="how-it-works" data-testid="how-it-works-section" className="relative py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
    </section>
  );
}
