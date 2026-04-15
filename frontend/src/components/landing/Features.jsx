import { motion } from "framer-motion";
import { FileUp, Brain, MessageCircle, Globe, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: FileUp,
    title: "Upload Anything",
    description: "PDFs, website URLs, text docs — upload your business knowledge and let the AI learn it instantly.",
    span: "md:col-span-7",
    accent: false,
  },
  {
    icon: Brain,
    title: "AI Trains in Seconds",
    description: "Powered by Gemini 2.5 Flash. Your agent understands context, nuance, and answers accurately from your data.",
    span: "md:col-span-5",
    accent: false,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Integration",
    description: "Customers message your business on WhatsApp and get instant, intelligent responses. No app downloads needed.",
    span: "md:col-span-5",
    accent: true,
  },
  {
    icon: Globe,
    title: "Multilingual by Default",
    description: "Customers chat in Kannada, Hindi, Tamil, Telugu, or any language. The AI responds naturally in their preferred language.",
    span: "md:col-span-7",
    accent: false,
  },
  {
    icon: Shield,
    title: "Reliable & Secure",
    description: "Your business data is encrypted and never shared. The AI only answers from your approved documents.",
    span: "md:col-span-4",
    accent: false,
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description: "Go live in under 10 minutes. We handle the entire setup for free — no technical skills required.",
    span: "md:col-span-4",
    accent: false,
  },
  {
    icon: MessageCircle,
    title: "Book Appointments",
    description: "Customers can schedule appointments, check availability, and get confirmations — all through WhatsApp chat.",
    span: "md:col-span-4",
    accent: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section id="features" data-testid="features-section" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.2em] text-xs font-bold text-[#25D366] mb-4">Features</p>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-4"
            style={{ fontFamily: 'Bricolage Grotesque' }}
          >
            Everything your business needs
          </h2>
          <p className="text-base sm:text-lg text-[#52525B] max-w-2xl mx-auto">
            From document upload to WhatsApp deployment — Wraft handles it all so you can focus on your business.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`${feature.span} group`}
            >
              <div
                className={`h-full rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  feature.accent
                    ? "bg-[#25D366] border-[#25D366] text-white"
                    : "bg-white border-[#E4E4E7] hover:border-[#25D366]/30"
                }`}
              >
                <feature.icon
                  className={`w-6 h-6 mb-4 ${feature.accent ? "text-white" : "text-[#25D366]"}`}
                />
                <h3
                  className={`text-lg font-bold mb-2 ${feature.accent ? "text-white" : "text-[#0A0A0A]"}`}
                  style={{ fontFamily: 'Bricolage Grotesque' }}
                >
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed ${feature.accent ? "text-white/85" : "text-[#52525B]"}`}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
