import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const competitors = ["wraft", "Chatbase", "WATI", "AiSensy", "Interakt"];

const rows = [
  {
    feature: "Standard Plan Price",
    values: ["₹999/mo", "$32/mo (~₹2,700)", "₹4,899/mo", "₹999/mo", "₹2,499/mo"],
    wraftBest: true,
  },
  {
    feature: "Messages Included",
    values: ["2,000", "500", "1,000", "Pay per msg", "1,000"],
    wraftBest: true,
  },
  {
    feature: "Cost Per Message",
    values: ["₹0.50", "~₹5.40", "~₹4.90", "~₹1.04+", "~₹2.50"],
    wraftBest: true,
  },
  {
    feature: "WhatsApp Integration",
    values: [true, true, true, true, true],
    wraftBest: false,
  },
  {
    feature: "Indian Language Focus",
    values: ["10+ native", "Generic 80+", "Basic", "Basic", "Basic"],
    wraftBest: true,
  },
  {
    feature: "Free Setup & Onboarding",
    values: [true, false, false, false, false],
    wraftBest: true,
  },
  {
    feature: "24/7 Support (All Plans)",
    values: [true, false, false, false, false],
    wraftBest: true,
  },
  {
    feature: "RAG Document Training",
    values: [true, true, false, false, false],
    wraftBest: true,
  },
  {
    feature: "Custom Branding",
    values: ["Free", "$39/mo extra", "Extra cost", "Extra cost", "Extra cost"],
    wraftBest: true,
  },
  {
    feature: "Appointment Booking",
    values: [true, "Via 3rd party", false, false, false],
    wraftBest: true,
  },
];

function CellValue({ value, isWraft }) {
  if (value === true) return <Check className="w-4 h-4 text-[#25D366]" />;
  if (value === false) return <X className="w-4 h-4 text-red-400" />;
  return (
    <span className={`text-xs font-medium ${isWraft ? "text-[#0A0A0A] font-semibold" : "text-[#52525B]"}`}>
      {value}
    </span>
  );
}

export default function Comparison() {
  const navigate = useNavigate();

  return (
    <section id="comparison" data-testid="comparison-section" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="uppercase tracking-[0.2em] text-xs font-bold text-[#25D366] mb-4">Compare</p>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-4"
            style={{ fontFamily: 'Bricolage Grotesque' }}
          >
            Why businesses choose Wraft
          </h2>
          <p className="text-base sm:text-lg text-[#52525B] max-w-2xl mx-auto">
            4x more messages, free setup, native Indian language support — at a fraction of what others charge.
          </p>
        </motion.div>

        {/* Highlight banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 bg-[#0A0A0A] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <h3 className="text-white text-lg sm:text-xl font-bold mb-1" style={{ fontFamily: 'Bricolage Grotesque' }}>
              ₹0.50 per message vs ₹5+ on competitors
            </h3>
            <p className="text-white/50 text-sm">2,000 messages at ₹999/mo — that's 10x better value than Chatbase's 500 messages at ₹2,700/mo</p>
          </div>
          <button
            data-testid="comparison-cta-btn"
            onClick={() => navigate("/dashboard")}
            className="flex-shrink-0 bg-[#25D366] hover:bg-[#1EAC52] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 flex items-center gap-2"
          >
            Start Free <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-[#E4E4E7] overflow-x-auto bg-white"
        >
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-[#E4E4E7]">
                <th className="text-left text-xs font-medium text-[#52525B] p-4 sm:p-5 w-[200px]">Feature</th>
                {competitors.map((c, i) => (
                  <th key={c} className={`text-center p-4 sm:p-5 ${i === 0 ? "bg-[#25D366]/5" : ""}`}>
                    {i === 0 ? (
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm font-bold text-[#0A0A0A]" style={{ fontFamily: 'Bricolage Grotesque' }}>
                          wraft<span className="text-[#25D366]">.</span>
                        </span>
                        <span className="text-[9px] font-bold bg-[#25D366] text-white px-2 py-0.5 rounded-full">BEST VALUE</span>
                      </div>
                    ) : (
                      <span className="text-xs font-medium text-[#52525B]">{c}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-b border-[#E4E4E7] last:border-b-0">
                  <td className="text-xs text-[#52525B] p-4 sm:p-5 font-medium">{row.feature}</td>
                  {row.values.map((val, vi) => (
                    <td key={vi} className={`text-center p-4 sm:p-5 ${vi === 0 ? "bg-[#25D366]/5" : ""}`}>
                      <CellValue value={val} isWraft={vi === 0} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 text-center text-xs text-[#52525B]/60"
        >
          Pricing based on publicly available data as of Dec 2025. Competitor prices may vary by plan and region.
        </motion.p>
      </div>
    </section>
  );
}
