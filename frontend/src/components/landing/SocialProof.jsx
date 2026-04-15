import { motion } from "framer-motion";

const proofPoints = [
  { value: "Free Setup", sub: "We do it for you" },
  { value: "24/7", sub: "Agent + Support" },
  { value: "10 min", sub: "To go live" },
  { value: "₹0.50", sub: "Per message" },
  { value: "10+", sub: "Indian languages" },
];

export default function SocialProof() {
  return (
    <section data-testid="social-proof-section" className="py-10 border-y border-[#E4E4E7] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-between gap-6"
        >
          {proofPoints.map((p, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <span
                className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A] tracking-tight"
                style={{ fontFamily: 'Bricolage Grotesque' }}
              >
                {p.value}
              </span>
              <span className="text-[11px] text-[#52525B] mt-0.5">{p.sub}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
