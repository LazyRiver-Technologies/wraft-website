import { motion } from "framer-motion";
import { FileUp, Brain, MessageCircle, Globe, Zap, CalendarCheck, Shield, Building2, HeartPulse, Utensils, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <MessageCircle className="w-6 h-6 text-white drop-shadow-sm" strokeWidth={2.5} />,
    title: "WhatsApp-Native AI Agent",
    description: "Your customers already use WhatsApp. Now they get instant, intelligent answers without downloading anything new.",
    span: "md:col-span-8 lg:col-span-8",
    status: "Hero Feature",
    tags: ["WhatsApp", "No App"],
    accent: true,
    visual: "whatsapp",
  },
  {
    icon: <Globe className="w-6 h-6 text-[#25D366]" strokeWidth={2.5} />,
    title: "Speaks Their Language",
    description: "Kannada, Hindi, Tamil, Telugu, Marathi — replies naturally in their preferred language.",
    span: "md:col-span-4 lg:col-span-4",
    status: "Multilingual",
    tags: ["Indic Support"],
    accent: false,
    visual: "lang",
  },
  {
    icon: <Brain className="w-6 h-6 text-[#25D366]" strokeWidth={2.5} />,
    title: "Understands Context, Not Just Keywords",
    description: "Ask a follow-up question, change languages mid-chat, or throw in slang — your agent keeps up effortlessly.",
    span: "md:col-span-6 lg:col-span-6",
    status: "Smart",
    tags: ["Contextual", "Fast"],
    accent: false,
  },
  {
    icon: <FileUp className="w-6 h-6 text-[#25D366]" strokeWidth={2.5} />,
    title: "Upload Anything",
    description: "PDFs, website URLs, text files, spreadsheets — your agent learns from all of it.",
    span: "md:col-span-6 lg:col-span-6",
    status: "Knowledge Base",
    tags: ["PDFs", "URLs"],
    accent: false,
  },
  {
    icon: <CalendarCheck className="w-6 h-6 text-[#25D366]" strokeWidth={2.5} />,
    title: "Books Appointments",
    description: "Customers check availability and book slots directly through chat. Confirmations sent automatically.",
    span: "md:col-span-4 lg:col-span-4",
    status: "Automation",
    tags: ["Booking"],
    accent: false,
  },
  {
    icon: <Zap className="w-6 h-6 text-[#25D366]" strokeWidth={2.5} />,
    title: "Live in 10 Minutes",
    description: "We handle the entire setup for free. No developers, no coding, no waiting weeks.",
    span: "md:col-span-4 lg:col-span-4",
    status: "Fast Setup",
    tags: ["No Code"],
    accent: false,
  },
  {
    icon: <Shield className="w-6 h-6 text-[#25D366]" strokeWidth={2.5} />,
    title: "Your Data, Fully Secure",
    description: "Encrypted, private, never shared. The AI only answers from your approved documents.",
    span: "md:col-span-4 lg:col-span-4",
    status: "Private",
    tags: ["Secure"],
    accent: false,
  },
];

function WhatsAppVisual() {
  const icons = [
    <Building2 className="w-3.5 h-3.5 text-white" />,
    <HeartPulse className="w-3.5 h-3.5 text-white" />,
    <Utensils className="w-3.5 h-3.5 text-white" />,
    <BookOpen className="w-3.5 h-3.5 text-white" />
  ];

  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="flex -space-x-1">
        {icons.map((icon, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/40 shadow-[0_2px_10px_rgba(0,0,0,0.1)] backdrop-blur-md relative z-10"
          >
            {icon}
          </motion.div>
        ))}
      </div>
      <span className="text-xs text-white/90 font-medium hidden sm:block">Clinics, restaurants & more</span>
    </div>
  );
}

function LangVisual() {
  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      {["ಕನ್ನಡ", "हिंदी", "English", "தமிழ்"].map((lang, i) => (
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
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Features() {
  return (
    <section id="features" data-testid="features-section" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.2em] text-xs font-bold text-[#25D366] mb-4">What You Get</p>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-4"
            style={{ fontFamily: 'Satoshi' }}
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
          {features.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={cn(
                "group relative p-6 sm:p-8 rounded-2xl overflow-hidden transition-all duration-500 shiny-card",
                item.accent ? "bg-gradient-to-br from-[#25D366] to-[#1EAC52] text-white border border-[#25D366]" : "border border-[#E4E4E7] bg-white/80 backdrop-blur-sm",
                "hover:-translate-y-1 will-change-transform",
                item.span,
                {
                  "shadow-[0_8px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.4)]": item.accent,
                  "hover:border-[#25D366]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]": !item.accent
                }
              )}
            >
              <div
                  className={`absolute inset-0 ${
                      item.accent
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                  } transition-opacity duration-300 pointer-events-none`}
              >
                  <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] ${item.accent ? 'bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)]' : ''} bg-[length:4px_4px]`} />
              </div>

              <div className="relative flex flex-col h-full z-10">
                  <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 ${
                        item.accent 
                          ? "bg-white/20 shadow-inner backdrop-blur-md border border-white/20" 
                          : "bg-gradient-to-br from-[#25D366]/10 to-[#25D366]/5 shadow-[0_2px_10px_rgba(37,211,102,0.1)] border border-[#25D366]/10 group-hover:bg-[#25D366]/20"
                      }`}>
                          {item.icon}
                      </div>
                      <span
                          className={cn(
                              "text-xs font-medium px-2.5 py-1 rounded-lg backdrop-blur-sm",
                              item.accent ? "bg-white/20 text-white" : "bg-[#25D366]/10 text-[#25D366]",
                              "transition-colors duration-300"
                          )}
                      >
                          {item.status || "Active"}
                      </span>
                  </div>

                  <div className="space-y-2 flex-grow">
                      <h3 className={cn(
                        "text-xl font-bold tracking-tight",
                        item.accent ? "text-white" : "text-[#0A0A0A]"
                      )} style={{ fontFamily: 'Satoshi' }}>
                          {item.title}
                      </h3>
                      <p className={cn(
                        "text-sm leading-relaxed",
                        item.accent ? "text-white/90" : "text-[#52525B]"
                      )}>
                          {item.description}
                      </p>
                  </div>

                  {item.visual === "whatsapp" && <WhatsAppVisual />}
                  {item.visual === "lang" && <LangVisual />}

                  <div className={`flex items-center justify-between mt-6 pt-4 border-t ${item.accent ? 'border-white/20' : 'border-[#E4E4E7]'}`}>
                      <div className="flex items-center space-x-2 text-[10px] sm:text-xs">
                          {item.tags?.map((tag, i) => (
                              <span
                                  key={i}
                                  className={cn(
                                    "px-2 py-1 rounded-md backdrop-blur-sm transition-all duration-200",
                                    item.accent ? "bg-white/20 text-white hover:bg-white/30" : "bg-[#FAFAFA] text-[#52525B] border border-[#E4E4E7] hover:bg-[#E4E4E7]/50"
                                  )}
                              >
                                  #{tag}
                              </span>
                          ))}
                      </div>
                      <span className={cn(
                        "text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-2",
                        item.accent ? "text-white" : "text-[#25D366]"
                      )}>
                          {item.cta || "Explore →"}
                      </span>
                  </div>
              </div>

              {!item.accent && <div
                  className={`absolute inset-0 z-0 rounded-2xl p-px bg-gradient-to-br from-[#25D366]/0 via-[#25D366]/5 to-[#25D366]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
