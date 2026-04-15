import { motion } from "framer-motion";
import { Upload, Bot, Send, Headphones } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Data",
    description: "Share your business documents, website URL, FAQs, price lists — anything your customers might ask about. We accept PDFs, text, links, and more.",
    visual: "docs",
  },
  {
    number: "02",
    icon: Bot,
    title: "AI Learns Your Business",
    description: "Our RAG agent powered by Gemini 2.5 Flash processes your data and creates a knowledge base. It understands context, not just keywords.",
    visual: "training",
  },
  {
    number: "03",
    icon: Send,
    title: "Deploy on WhatsApp",
    description: "We connect the AI agent to your WhatsApp Business number. Customers can start chatting immediately — in any language they prefer.",
    visual: "deploy",
  },
  {
    number: "04",
    icon: Headphones,
    title: "24/7 Support & Monitoring",
    description: "We monitor your agent, optimize responses, and provide round-the-clock support. You focus on your business, we handle the tech.",
    visual: "support",
  },
];

function StepVisual({ visual }) {
  if (visual === "docs") {
    return (
      <div className="space-y-2">
        {["clinic_menu.pdf", "services.docx", "https://myclinic.com"].map((doc, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.15 }}
            className="flex items-center gap-3 bg-[#FAFAFA] rounded-lg px-4 py-3 border border-[#E4E4E7]"
          >
            <div className="w-8 h-8 rounded bg-[#25D366]/10 flex items-center justify-center">
              <Upload className="w-4 h-4 text-[#25D366]" />
            </div>
            <span className="text-xs text-[#52525B] font-mono">{doc}</span>
            <span className="ml-auto text-[10px] text-[#25D366] font-semibold">Uploaded</span>
          </motion.div>
        ))}
      </div>
    );
  }
  if (visual === "training") {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-2 flex-1 bg-[#E4E4E7] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="h-full bg-[#25D366] rounded-full"
            />
          </div>
          <span className="text-xs font-bold text-[#25D366]">100%</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["147 FAQs", "23 Services", "56 Timings"].map((stat, i) => (
            <div key={i} className="bg-[#FAFAFA] rounded-lg p-3 border border-[#E4E4E7] text-center">
              <p className="text-xs font-bold text-[#0A0A0A]">{stat.split(" ")[0]}</p>
              <p className="text-[10px] text-[#52525B]">{stat.split(" ")[1]}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (visual === "deploy") {
    return (
      <div className="flex items-center gap-3 bg-[#25D366]/5 rounded-xl p-4 border border-[#25D366]/20">
        <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center animate-pulse-green">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-[#0A0A0A]">WhatsApp Connected</p>
          <p className="text-[11px] text-[#52525B]">+91 98765 43210 — Active</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {[0,1,2].map((i) => (
          <div key={i} className="w-8 h-8 rounded-full bg-[#25D366]/20 border-2 border-white flex items-center justify-center">
            <Headphones className="w-3 h-3 text-[#25D366]" />
          </div>
        ))}
      </div>
      <div>
        <p className="text-sm font-bold text-[#0A0A0A]">24/7 Support Team</p>
        <p className="text-[11px] text-[#52525B]">Always monitoring your agent</p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" data-testid="how-it-works-section" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="uppercase tracking-[0.2em] text-xs font-bold text-[#25D366] mb-4">How It Works</p>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-4"
            style={{ fontFamily: 'Bricolage Grotesque' }}
          >
            Live in 10 minutes, not 10 days
          </h2>
          <p className="text-base sm:text-lg text-[#52525B] max-w-2xl mx-auto">
            Four simple steps to deploy an AI agent that speaks your customers' language.
          </p>
        </motion.div>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#FAFAFA] rounded-2xl border border-[#E4E4E7] p-6 sm:p-8 hover:border-[#25D366]/30 transition-all duration-300 hover:shadow-md">
                <div className="md:col-span-1">
                  <span
                    className="text-4xl font-bold text-[#E4E4E7] group-hover:text-[#25D366]/30 transition-colors"
                    style={{ fontFamily: 'Bricolage Grotesque' }}
                  >
                    {step.number}
                  </span>
                </div>
                <div className="md:col-span-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366] transition-colors">
                      <step.icon className="w-5 h-5 text-[#25D366] group-hover:text-white transition-colors" />
                    </div>
                    <h3
                      className="text-xl font-bold text-[#0A0A0A]"
                      style={{ fontFamily: 'Bricolage Grotesque' }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#52525B] leading-relaxed">{step.description}</p>
                </div>
                <div className="md:col-span-6">
                  <StepVisual visual={step.visual} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
