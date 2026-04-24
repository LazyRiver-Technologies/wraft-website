import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    messages: "50 messages/mo",
    description: "Try Wraft with no commitment",
    features: [
      "50 AI messages per month",
      "1 WhatsApp agent",
      "Basic document upload",
      "Website preview",
      "Community support",
    ],
    cta: "Start Free",
    popular: false,
    accent: false,
  },
  {
    name: "Standard",
    price: "999",
    period: "/month",
    messages: "2,000 messages/mo",
    description: "Perfect for growing businesses",
    features: [
      "2,000 AI messages per month",
      "WhatsApp + Website integration",
      "Unlimited document uploads",
      "Multilingual support (10+ languages)",
      "Appointment booking",
      "Email support",
      "Free setup & onboarding",
    ],
    cta: "Get Started",
    popular: true,
    accent: false,
  },
  {
    name: "Pro",
    price: "1,899",
    period: "/month",
    messages: "8,000 messages/mo",
    description: "For high-traffic businesses",
    features: [
      "8,000 AI messages per month",
      "Everything in Standard",
      "Priority support",
      "Advanced analytics",
      "Custom branding",
      "Multiple agents",
      "API access",
    ],
    cta: "Get Started",
    popular: false,
    accent: true,
  },
  {
    name: "Business",
    price: "4,999",
    period: "/month",
    messages: "40,000 messages/mo",
    description: "Enterprise-grade for large operations",
    features: [
      "40,000 AI messages per month",
      "Everything in Pro",
      "Dedicated account manager",
      "24/7 phone support",
      "Custom integrations",
      "SLA guarantee",
      "White-label option",
    ],
    cta: "Contact Sales",
    popular: false,
    accent: false,
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <section id="pricing" data-testid="pricing-section" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 18 }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.2em] text-xs font-bold text-[#25D366] mb-4">Pricing</p>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-4"
            style={{ fontFamily: 'Bricolage Grotesque' }}
          >
            Simple, transparent pricing
          </h2>
          <p className="text-base sm:text-lg text-[#52525B] max-w-2xl mx-auto">
            Start free. Scale as you grow. No hidden fees, no surprises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 100, damping: 20 }}
              className={`relative group ${plan.popular ? "z-10" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                  <span className="bg-gradient-to-r from-[#25D366] to-[#1EAC52] text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-[0_4px_12px_rgba(37,211,102,0.3)]">
                    Most Popular
                  </span>
                </div>
              )}
              {plan.popular && (
                <div className="absolute -inset-[1px] bg-gradient-to-br from-[#25D366] via-emerald-200 to-[#1EAC52] rounded-[17px] blur-[1px] opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              )}
              {plan.accent && (
                <div className="absolute -inset-[1px] bg-gradient-to-r from-gray-700 via-gray-400 to-gray-700 rounded-[17px] blur-[1px] opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
              )}
              <div
                data-testid={`pricing-${plan.name.toLowerCase()}-card`}
                className={`relative h-full rounded-2xl border p-6 sm:p-7 flex flex-col transition-all duration-500 hover:-translate-y-2 shiny-card ${
                  plan.accent
                    ? "bg-gradient-to-b from-[#0A0A0A] to-[#171717] border-[#2A2A2A] text-white hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
                    : plan.popular
                    ? "bg-white/95 backdrop-blur-xl border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_-15px_rgba(37,211,102,0.3)]"
                    : "bg-white/80 backdrop-blur-sm border-[#E4E4E7] hover:shadow-[0_12px_30px_rgb(0,0,0,0.04)] hover:border-[#25D366]/30"
                }`}
              >
                <div className="mb-6">
                  <h3
                    className={`text-lg font-bold mb-1 ${plan.accent ? "text-white" : "text-[#0A0A0A]"}`}
                    style={{ fontFamily: 'Bricolage Grotesque' }}
                  >
                    {plan.name}
                  </h3>
                  <p className={`text-xs ${plan.accent ? "text-white/60" : "text-[#52525B]"}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-sm ${plan.accent ? "text-white/60" : "text-[#52525B]"}`}>&#8377;</span>
                    <span
                      className={`text-4xl font-bold tracking-tight ${plan.accent ? "text-white" : "text-[#0A0A0A]"}`}
                      style={{ fontFamily: 'Bricolage Grotesque' }}
                    >
                      {plan.price}
                    </span>
                    <span className={`text-sm ${plan.accent ? "text-white/60" : "text-[#52525B]"}`}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 font-medium ${plan.accent ? "text-[#25D366]" : "text-[#25D366]"}`}>
                    {plan.messages}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.accent ? "text-[#25D366]" : "text-[#25D366]"}`} />
                      <span className={`text-sm ${plan.accent ? "text-white/80" : "text-[#52525B]"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  data-testid={`pricing-${plan.name.toLowerCase()}-btn`}
                  onClick={() => navigate("/dashboard")}
                  className={`w-full py-3.5 rounded-full text-sm font-semibold transition-all duration-500 hover:-translate-y-1 flex items-center justify-center gap-2 ${
                    plan.accent
                      ? "bg-white text-[#0A0A0A] hover:bg-gray-100 shadow-md"
                      : plan.popular
                      ? "bg-gradient-to-r from-[#25D366] to-[#1EAC52] text-white hover:shadow-[0_8px_20px_rgba(37,211,102,0.4)]"
                      : "bg-[#0A0A0A] text-white hover:bg-[#25D366] hover:shadow-lg"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
