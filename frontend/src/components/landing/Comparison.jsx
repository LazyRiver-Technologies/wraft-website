import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

const comparisonData = [
  { feature: "Standard Plan Messages", wraft: "2,000/mo", chatbase: "500/mo", wraftWins: true },
  { feature: "Standard Plan Price", wraft: "~$12/mo (₹999)", chatbase: "$32/mo", wraftWins: true },
  { feature: "Cost per Message (Standard)", wraft: "₹0.50", chatbase: "~₹5.30", wraftWins: true },
  { feature: "WhatsApp Integration", wraft: true, chatbase: true, wraftWins: null },
  { feature: "Website Chat Widget", wraft: true, chatbase: true, wraftWins: null },
  { feature: "Multilingual (Indian Languages)", wraft: "10+ Indian languages", chatbase: "80+ (generic)", wraftWins: true },
  { feature: "Free Setup & Onboarding", wraft: true, chatbase: false, wraftWins: true },
  { feature: "24/7 Support", wraft: true, chatbase: "Enterprise only", wraftWins: true },
  { feature: "RAG Document Training", wraft: true, chatbase: true, wraftWins: null },
  { feature: "Custom Branding", wraft: "Included", chatbase: "$39/mo extra", wraftWins: true },
  { feature: "Appointment Booking", wraft: true, chatbase: "Via integrations", wraftWins: true },
  { feature: "Business Plan (40K msgs)", wraft: "₹4,999/mo", chatbase: "$400+/mo", wraftWins: true },
];

function CellValue({ value, isWraft }) {
  if (value === true) return <Check className="w-5 h-5 text-[#25D366]" />;
  if (value === false) return <X className="w-5 h-5 text-red-400" />;
  if (value === null) return <Minus className="w-4 h-4 text-[#52525B]/30" />;
  return (
    <span className={`text-sm font-medium ${isWraft ? "text-[#0A0A0A]" : "text-[#52525B]"}`}>
      {value}
    </span>
  );
}

export default function Comparison() {
  return (
    <section id="comparison" data-testid="comparison-section" className="py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.2em] text-xs font-bold text-[#25D366] mb-4">Why Wraft</p>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-4"
            style={{ fontFamily: 'Bricolage Grotesque' }}
          >
            Wraft vs Chatbase
          </h2>
          <p className="text-base sm:text-lg text-[#52525B] max-w-2xl mx-auto">
            10x more messages at a fraction of the cost. Built for Indian businesses.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-[#E4E4E7] overflow-hidden bg-white"
        >
          {/* Header */}
          <div className="grid grid-cols-3 border-b border-[#E4E4E7]">
            <div className="p-4 sm:p-6">
              <span className="text-sm font-medium text-[#52525B]">Feature</span>
            </div>
            <div className="p-4 sm:p-6 bg-[#25D366]/5 border-x border-[#25D366]/10">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#0A0A0A]" style={{ fontFamily: 'Bricolage Grotesque' }}>
                  wraft<span className="text-[#25D366]">.</span>
                </span>
                <span className="text-[10px] font-bold bg-[#25D366] text-white px-2 py-0.5 rounded-full">YOU</span>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <span className="text-sm font-medium text-[#52525B]">Chatbase</span>
            </div>
          </div>

          {/* Rows */}
          {comparisonData.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 border-b border-[#E4E4E7] last:border-b-0 ${
                row.wraftWins === true ? "bg-[#25D366]/[0.02]" : ""
              }`}
            >
              <div className="p-4 sm:px-6 sm:py-4 flex items-center">
                <span className="text-sm text-[#52525B]">{row.feature}</span>
              </div>
              <div className="p-4 sm:px-6 sm:py-4 flex items-center bg-[#25D366]/5 border-x border-[#25D366]/10">
                <CellValue value={row.wraft} isWraft={true} />
              </div>
              <div className="p-4 sm:px-6 sm:py-4 flex items-center">
                <CellValue value={row.chatbase} isWraft={false} />
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-[#52525B]">
            Pricing comparison based on publicly available data as of Dec 2025. Chatbase prices in USD converted at approximate rates.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
