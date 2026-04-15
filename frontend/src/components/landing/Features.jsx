import { motion } from "framer-motion";
import { FileUp, Brain, MessageCircle, Globe, Zap, CalendarCheck, Shield } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "WhatsApp-Native AI Agent",
    description: "Your customers already use WhatsApp. Now they get instant, intelligent answers without downloading anything new.",
    span: "md:col-span-7",
    accent: true,
    visual: "whatsapp",
  },
  {
    icon: Globe,
    title: "Speaks Their Language",
    description: "Kannada, Hindi, Tamil, Telugu, Marathi — your agent replies naturally in whatever language the customer prefers.",
    span: "md:col-span-5",
    accent: false,
    visual: "lang",
  },
  {
    icon: FileUp,
    title: "Upload Anything as Knowledge",
    description: "PDFs, website URLs, text files, spreadsheets — your agent learns from all of it and answers accurately.",
    span: "md:col-span-5",
    accent: false,
    visual: null,
  },
  {
    icon: Brain,
    title: "Powered by Gemini 2.5 Flash",
    description: "Not a keyword matcher. A real AI that understands context, handles follow-ups, and gives relevant answers.",
    span: "md:col-span-7",
    accent: false,
    visual: null,
  },
  {
    icon: CalendarCheck,
    title: "Books Appointments",
    description: "Customers check availability and book slots directly through chat. Confirmations sent automatically.",
    span: "md:col-span-4",
    accent: false,
    visual: null,
  },
  {
    icon: Zap,
    title: "Live in 10 Minutes",
    description: "We handle the entire setup for free. No developers, no coding, no waiting weeks.",
    span: "md:col-span-4",
    accent: false,
    visual: null,
  },
  {
    icon: Shield,
    title: "Your Data, Fully Secure",
    description: "Encrypted, private, never shared. The AI only answers from your approved documents.",
    span: "md:col-span-4",
    accent: false,
    visual: null,
  },
];

function WhatsAppVisual() {
  return (
    <div className="mt-4 flex items-center gap-3">
      <div className="flex -space-x-1">
        {["🇮🇳", "🏥", "🍽️", "📚"].map((emoji, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm border-2 border-[#25D366]"
          >
            {emoji}
          </motion.div>
        ))}
      </div>
      <span className="text-[11px] text-white/70 font-medium">Clinics, restaurants, schools & more</span>
    </div>
  );
}

function LangVisual() {
  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      {["ಕನ್ನಡ", "हिंदी", "English", "தமிழ்", "తెలుగు", "मराठी"].map((lang, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.08 }}
          className="text-[10px] font-semibold bg-[#25D366]/10 text-[#25D366] px-2.5 py-1 rounded-full border border-[#25D366]/20"
        >
          {lang}
        </motion.span>
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Features() {
  return (
    <section id="features" data-testid="features-section" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.2em] text-xs font-bold text-[#25D366] mb-4">What You Get</p>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-4"
            style={{ fontFamily: 'Bricolage Grotesque' }}
          >
            Everything your business needs,
            <br />
            <span className="text-[#52525B]">nothing it doesn't</span>
          </h2>
          <p className="text-base sm:text-lg text-[#52525B] max-w-xl mx-auto">
            An AI agent that actually understands your business and your customers' language.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4"
        >
          {features.map((f, i) => (
            <motion.div key={i} variants={itemVariants} className={`${f.span} group`}>
              <div
                className={`h-full rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  f.accent
                    ? "bg-[#25D366] border-[#25D366] text-white"
                    : "bg-white border-[#E4E4E7] hover:border-[#25D366]/30"
                }`}
              >
                <f.icon className={`w-6 h-6 mb-4 ${f.accent ? "text-white" : "text-[#25D366]"}`} />
                <h3
                  className={`text-lg font-bold mb-2 ${f.accent ? "text-white" : "text-[#0A0A0A]"}`}
                  style={{ fontFamily: 'Bricolage Grotesque' }}
                >
                  {f.title}
                </h3>
                <p className={`text-sm leading-relaxed ${f.accent ? "text-white/85" : "text-[#52525B]"}`}>
                  {f.description}
                </p>
                {f.visual === "whatsapp" && <WhatsAppVisual />}
                {f.visual === "lang" && <LangVisual />}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
